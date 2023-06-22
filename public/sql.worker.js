import initSqlJs from 'sql.js/dist/sql-wasm.js';

let db = null;

const handleDatabaseLoaded = () => {
  self.postMessage({ type: 'databaseLoaded' });
};

const handleQueryExecuted = (resultSet) => {
  self.postMessage({ type: 'queryExecuted', result: resultSet });
};

self.onmessage = async (event) => {
  const { buffer, type, query } = event.data;

  if (type === 'executeQuery') {
    const resultSet = db.exec(query);
    handleQueryExecuted(resultSet);
  } else {
    await initSqlJs({ locateFile: () => 'sql-wasm.wasm' });
    db = new SQL.Database(new Uint8Array(buffer));
    handleDatabaseLoaded();
  }
};
