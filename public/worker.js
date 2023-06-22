importScripts('./sql-wasm.js');
//importScripts('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/sql-wasm.js');


self.onmessage = async (event) => {
  const arrayBuffer = event.data;
  const sqljs = await initSqlJs({ locateFile: () => './sql-wasm.wasm' });
  const db = new sqljs.Database(new Uint8Array(arrayBuffer));
  self.postMessage(db);
};
