const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
};

const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS databasehw`;

const USE_DATABASE = `USE databasehw`;

const CREATE_AUTHORS_TABLE = `
  CREATE TABLE IF NOT EXISTS Authors (
    author_no INT PRIMARY KEY,
    author_name VARCHAR(50),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m', 'f')
  );`;

  const ADD_COLUMN = `
    ALTER TABLE Authors ADD Collaborator INT `;

const ADD_FOREIGNKEY_TABLE = ` ALTER TABLE Authors ADD CONSTRAINT fk_Authors FOREIGN KEY(Collaborator) 
  REFERENCES authors(Author_no);`;

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  connection.connect();
  
  try {
    await execQuery(CREATE_DATABASE);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_COLUMN);
    await execQuery(ADD_FOREIGNKEY_TABLE);
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();