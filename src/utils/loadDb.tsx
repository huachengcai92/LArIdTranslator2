import initSqlJs, { Database } from 'sql.js';

const loadDb = async (): Promise<Database> => {
  try {
    const response = await fetch('LArIdSkimmed.db');
    const arrayBuffer = await response.arrayBuffer();
    const sqljs = await initSqlJs({ locateFile: () => './sql-wasm.wasm' });
    const db = new sqljs.Database(new Uint8Array(arrayBuffer));
    return db;
  } catch (error) {
    console.error('Error loading database:', error);
    throw error;
  }
};

export default loadDb;

