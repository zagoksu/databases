const mysql = require("mysql");
const util = require("util");
const fs = require("fs");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "transactions"
});

const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {
    connection.connect();

    try {

        const accountsData = await readFile(__dirname +"/accounts.json", "utf8");
        const accounts = await JSON.parse(accountsData);
        const accountsPromises = await accounts.map(account =>
            execQuery("INSERT INTO account SET ?", account)
        );
    
        const accountChangesData = await readFile(__dirname +"/account-changes.json", "utf8");
        const accountChanges = await JSON.parse(accountChangesData);
        const accountChangesPromises = await accountChanges.map(accountChange => {
            execQuery("INSERT INTO account_changes SET ?", accountChange);
            console.log(accountChange);
        });

        await Promise.all[(accountsPromises, accountChangesPromises)];
    } catch (error) {
        console.error(error);
        connection.end()
    } 
    
    connection.end()
}

seedDatabase(); 