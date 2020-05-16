const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword"
});

const execQuery = util.promisify(connection.query.bind(connection));

const DELETE_OLD_DATABASE = `DROP DATABASE IF EXISTS transactions`;

const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS transactions`;

const USE_DATABASE = `USE transactions`;

const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account(
      account_number INT NOT NULL PRIMARY KEY,
      balance float
    )`;

const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes(
      change_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      account_number int,
      amount float,
      changed_date date,
      remark varchar(100)
      )`;

async function seedDatabase() {
    let queries = [
        DELETE_OLD_DATABASE,
        CREATE_DATABASE,
        USE_DATABASE,
        CREATE_ACCOUNT_TABLE,
        CREATE_ACCOUNT_CHANGES_TABLE
    ];

    connection.connect();

    try {
        for (let i = 0; i < queries.length; i++){
            await execQuery(queries[i]);
        }
        connection.end();
    } catch (error) {
        console.error(error);
        connection.end();
    }
}

seedDatabase();