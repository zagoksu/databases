const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
});

connection.connect();

const databaseName = 'meetup';

// 1. deleting old database if exists.
connection.query(`DROP DATABASE IF EXISTS ${databaseName}`, function (err, result) {
  if (err) throw err;
  console.log("Database deleted");
});

// 2. creating new database.
connection.query(`CREATE DATABASE  ${databaseName}`, function(error, results) {
    if (error) {
        throw error
  }})


connection.query(`USE ${databaseName}`, function (err, result) {
  if (err) throw err;
  console.log("Database selected");
});

// 3. creating tables
  const tablesData = [
    "CREATE TABLE Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))",
    "CREATE TABLE Room (room_no int, room_name varchar(50), floor_number int)",
    "CREATE TABLE Meeting (meeting_no int, meeting_title varchar(50), starting_time timestamp,ending_time timestamp, room_no int)"
  ];
  
  tablesData.forEach(table => {
    connection.query(table, function (error, results) {
        if (error) {
            throw error;
        }
        console.log("Tables are created");
    });
  })
  
// 4.inserting values
const queryData = [
  // invitee values
  'INSERT INTO Invitee VALUES(1, "John", "Kelly")',
  'INSERT INTO Invitee VALUES (2, "Jack", "Lara")',
  'INSERT INTO Invitee VALUES (3, "Tommy", "Pam")',
  'INSERT INTO Invitee VALUES (4, "Ari", "Lizbeth")',
  'INSERT INTO Invitee VALUES (5, "Carlos", "Alexa")',
  // room values
  'INSERT INTO Room VALUES(1, "Absinth", "1")',
  'INSERT INTO Room VALUES(2, "Baraonda", "2")',
  'INSERT INTO Room VALUES(3, "Duro", "3")',
  'INSERT INTO Room VALUES(4, "Nasomatto", "4")',
  'INSERT INTO Room VALUES(5, "Nudiflorum", "5")',
  // meeting values
  'INSERT INTO meeting VALUES(1, "Climate Change", "2019-07-07 09:00", "2020-01-01 12:00", 101)',
  'INSERT INTO meeting VALUES(2, "World Economy", "2020-07-12 09:00", "2020-01-02 12:00", 201)',
  'INSERT INTO meeting VALUES(3, "Corruption", "2020-01-03 10:00", "2020-01-03 12:00", 301)',
  'INSERT INTO meeting VALUES(4, "Development", "2020-01-04 10:00", "2020-01-04 12:00", 401)',
  'INSERT INTO meeting VALUES(5, "Artificial Intelligence", "2020-01-05 10:00", "2020-01-05 12:00", 501)'
];

queryData.forEach(value => {
  connection.query(value, function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
  console.log("Values are inserted");
});
  
connection.end();
