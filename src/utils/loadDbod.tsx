import mysql from 'mysql2';
import { exec } from 'child_process';

const connectionConfig = {
  host: "dbod-laridtranslator-demo.cern.ch",
  port: 5500,
  user: "admin",
  password: XXXX,
  database: "LArIdSkimmed"
};

export async function connectToDatabase() {
  let connection;
  try {
    console.log('Connecting now...');
    connection = mysql.createConnection(connectionConfig);
    await connection.promise().connect();
    console.log('Connected...');

    // Retrieve the list of databases
    connection.query('SHOW DATABASES', (error, results) => {
      if (error) {
        console.error('Error retrieving database list:', error);
        throw error;
      }

      console.log('List of databases:');
      results.forEach((row) => {
        console.log(row['Database']);
      });
      //connection.end(); // Close the connection
    });

    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
