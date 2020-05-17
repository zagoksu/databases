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
  'INSERT INTO Invitee SET invitee_no = "1", invitee_name = "John", invited_by = "Kelly"',
  'INSERT INTO Invitee SET invitee_no = "1", invitee_name = "Jack", invited_by = "Lara"',
  'INSERT INTO Invitee SET invitee_no = "1", invitee_name = "Tommy", invited_by = "Pam"',
  'INSERT INTO Invitee SET invitee_no = "1", invitee_name = "Ari", invited_by = "Lizbeth"',
  'INSERT INTO Invitee SET invitee_no = "1", invitee_name = "Carlos", invited_by = "Alexa"',

  // room values
  'INSERT INTO Room SET room_no = "1", room_name = "Absinth", floor_number = "1"',
  'INSERT INTO Room SET room_no = "2", room_name = "Baraonda", floor_number = "2"',
  'INSERT INTO Room SET room_no = "3", room_name = "Druo", floor_number = "3"',
  'INSERT INTO Room SET room_no = "4", room_name = "Nasomatto", floor_number = "4"',
  'INSERT INTO Room SET room_no = "5", room_name = "Nudiflorum", floor_number = "5"',

  // meeting values
  'INSERT INTO Meeting SET meeting_no= "1", meeting_title ="Climate", starting_time ="2019-07-07 09:00", ending_time ="2020-01-01 12:00", room_no ="101"',
  'INSERT INTO Meeting SET meeting_no= "2", meeting_title ="Economy", starting_time ="2019-07-07 09:00", ending_time ="2020-01-01 12:00", room_no ="102"',
  'INSERT INTO Meeting SET meeting_no= "3", meeting_title ="Corruption", starting_time ="2019-07-07 09:00", ending_time ="2020-01-01 12:00", room_no ="103"',
  'INSERT INTO Meeting SET meeting_no= "4", meeting_title ="Development", starting_time ="2019-07-07 09:00", ending_time ="2020-01-01 12:00", room_no ="104"',
  'INSERT INTO Meeting SET meeting_no= "5", meeting_title ="AI", starting_time ="2019-07-07 09:00", ending_time ="2020-01-01 12:00", room_no ="105"'
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
