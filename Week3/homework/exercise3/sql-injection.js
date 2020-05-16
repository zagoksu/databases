const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "new_world"
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

function getPopulation(Country, name, code, cb) {
    connection.query(
        `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
        function(err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
        }
    );
}
getPopulation("country", "Netherlands", "777 OR 1=1", function (error, result) {
    if (error) 
        throw error;
    if (result.length == 0) 
        throw new Error("Not found");
    console.log(result);
});
        
connection.end();



