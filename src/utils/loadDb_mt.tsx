import initSqlJs, { Database } from 'sql.js';

const createWorker = (workerCode: string, segment): Worker => {
  const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(workerBlob);
  return new Worker(workerUrl);
};

const loadDb_mt = async (threadCount: number): Promise<Database> => {
  try {
    const response = await fetch('LArIdSkimmed.db');
    const arrayBuffer = await response.arrayBuffer();
    console.log("before split", arrayBuffer);      
    //const sqljs = await initSqlJs({ locateFile: () => 'http://localhost:3001/sql-wasm.wasm' });

    const workerCode = `
      import initSqlJs from 'sql.js';    
      self.importScripts('http://localhost:3001/sql-wasm.js');

      self.onmessage = async (event, segment) => {
        try {
          const SQL = await initSqlJs({ locateFile: () => 'http://localhost:3001/sql-wasm.wasm' });
          const db = new SQL.Database(new Uint8Array(event.data));
          self.postMessage({ db });
        } catch (error) {
          self.postMessage({ error: error.message });
        }
      };
    `;

    const workers: Worker[] = [];
    const segmentSize = Math.ceil(arrayBuffer.byteLength / threadCount);

    for (let i = 0; i < threadCount; i++) {
      console.log("starting worker",i)
      const start = i * segmentSize;
      const end = Math.min((i + 1) * segmentSize, arrayBuffer.byteLength);
      const segment = arrayBuffer.slice(start, end);

      const worker = await createWorker(workerCode, segment);
      workers.push(worker);

      worker.onmessage = (event, segment) => {
        if (event.data.error) {
          console.error('Error loading database:', event.data.error);
          cleanupWorkers();
          reject(event.data.error);
        } else {
          resolve(event.data.db);
        }
      };

      worker.postMessage(segment, [segment]);
    }

  return new Promise<Database>((resolve, reject) => {
    let completedWorkers = 0;
    console.log("DEBUG>> checking completion...")

    const cleanupWorkers = () => {
      let i=0;
      for (const worker of workers) {
        console.log("Debug>> terminating..",i)
        i++;
        worker.terminate();
        URL.revokeObjectURL(worker.workerUrl);        
      }
    };

    const checkCompletion = () => {
      completedWorkers++;
      if (completedWorkers == threadCount) {
        console.log("debug completedWorkers=",completedWorkers)
        cleanupWorkers();
        //console.error('Error loading database: No worker completed successfully');
        //reject(new Error('No worker completed successfully'));
      }
    };

    for (const worker of workers) {
      /*
      worker.onerror = () => {
        console.log('status: on error');
        checkCompletion();
      };

      worker.onmessageerror = () => {
        console.log('status: on messageerror');        
        checkCompletion();
      };
      */
      worker.onmessage = (event, segment) => {
        if (event.data.error) {
          console.error('Error loading database:', event.data.error);
          cleanupWorkers();
          reject(event.data.error);
        } else {
          console.log('resolving..',completedWorkers)
          resolve(event.data.db);
          checkCompletion();            
          //cleanupWorkers();          
        }
      };
    }
  }
  );
}
catch (error) {
    // Handle the error
    console.error(error);
    throw error; // Optionally rethrow the error
  };
};

export default loadDb_mt;
