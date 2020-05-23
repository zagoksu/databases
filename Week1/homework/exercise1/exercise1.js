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
const queryDataInvitee = [
  // invitee values
  {invitee_no: "1", invitee_name: "John", invited_by : "Kelly"},
  {invitee_no: "2", invitee_name : "Jack", invited_by : "Lara"},
  {invitee_no: "3", invitee_name : "Tommy", invited_by : "Pam"},
  {invitee_no: "4", invitee_name : "Ari", invited_by : "Lizbeth"},
  {invitee_no: "5", invitee_name : "Carlos", invited_by : "Alexa"},
]
const queryDataRoom = [
  // room values
  {room_no: "1", room_name : "Absinth", floor_number : "1"},
  {room_no: "2", room_name :"Baraonda", floor_number : "2"},
  {room_no : "3", room_name : "Druo", floor_number : "3"},
  {room_no : "4", room_name : "Nasomatto", floor_number : "4"},
  {room_no : "5", room_name : "Nudiflorum", floor_number : "5"}
]

const queryDataMeeting= [
  // meeting values
  {meeting_no: "1", meeting_title :"Climate", starting_time :"2019-07-07 09:00", ending_time :"2020-01-01 12:00", room_no :"101"},
  {meeting_no: "2", meeting_title :"Economy", starting_time :"2019-07-07 09:00", ending_time :"2020-01-01 12:00", room_no :"102"},
  {meeting_no: "3", meeting_title :"Corruption", starting_time :"2019-07-07 09:00", ending_time :"2020-01-01 12:00", room_no :"103"},
  {meeting_no: "4", meeting_title :"Development", starting_time :"2019-07-07 09:00", ending_time :"2020-01-01 12:00", room_no :"104"},
  {meeting_no: "5", meeting_title :"AI", starting_time :"2019-07-07 09:00", ending_time :"2020-01-01 12:00", room_no :"105"}
];

queryDataInvitee.forEach(value => {
  connection.query('INSERT INTO Invitee SET ?', value, function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
  console.log("Values are inserted");
});

queryDataRoom.forEach(value => {
  connection.query('INSERT INTO Room SET ?', value, function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
  console.log("Values are inserted");
});

queryDataMeeting.forEach(value => {
  connection.query('INSERT INTO Meeting SET ?', value, function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
  console.log("Values are inserted");
});
  
connection.end();
