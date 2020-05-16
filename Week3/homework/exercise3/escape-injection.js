const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "new_world"
});

const execQuery = util.promisify(connection.query.bind(connection));


function getPopulation(Country, name, code, cb) {
    connection.query("SELECT Population FROM ?? WHERE Name = ? and code = ?", [Country, name, code], function(err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
        }
    );
}

async function seedDatabase() {
    connection.connect();

    try {
        await getPopulation("country", "Netherlands", "NLD", function(err, data) {
            if (err) throw err;
            console.log(data);
        });

        await getPopulation("country", "Netherlands", "777 OR 1=1", function(err, data) {
            if (err) throw err;
            console.log(data);
        });
        connection.end();
    } catch (error) {
        console.error(error);
        connection.end();
    }
}

seedDatabase();