const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transactions',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function transaction() {
  try {
    await executeQuery('SET autocommit = 0');
    await executeQuery('START TRANSACTION');
    await executeQuery(
      `UPDATE account SET balance = balance - 1000 WHERE account_number = '101'`,
    );
    await executeQuery(
      `UPDATE account SET balance = balance + 1000 WHERE account_number = '102'`,
    );
    await executeQuery(`INSERT INTO account_changes SET ?`, {
      account_number: '101',
      amount: -1000,
      changed_date: '2020-05-13',
      remark: 'this can be anything',
    });
    await executeQuery(`INSERT INTO account_changes SET ?`, {
      account_number: '102',
      amount: 1000,
      changed_date: '2020-05-13',
      remark: 'this can be anything',
    });
    await executeQuery('COMMIT');

    connection.end();
  } catch (error) {
    console.error(error);
    await executeQuery('ROLLBACK');
    connection.end();
  }
}

transaction();