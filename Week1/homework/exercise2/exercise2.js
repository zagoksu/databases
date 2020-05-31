const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

connection.query("SELECT * FROM city WHERE Population > 8000000", async function (err, result) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
    console.log('1. What are the names of countries with population greater than 8 million?');
    for (let i in results) {
      console.log(`${results[i].Name}, Population: ${results[i].Population}`);
    }
});

connection.query('SELECT name FROM country WHERE name LIKE "%land%"', async function (err,result) {
  if (err) throw err;
  let results = await JSON.parse(JSON.stringify(result))
  console.log("2. What are the names of countries that have “land” in their names?", results);
  });

connection.query(
  "SELECT Name, Population FROM city WHERE Population BETWEEN 500000 AND 1000000",
  async function (err, result, field) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
    console.log("3. What are the names of the cities with population in between 500,000 and 1 million?", results);
    }
);

connection.query('SELECT Name, Continent FROM country WHERE Continent = "Europe"', async function (err, result) {
  if (err) throw err;
      let results = await JSON.parse(JSON.stringify(result))
      console.log("4. What's the name of all the countries on the continent ‘Europe’?", results);
    }
);

connection.query("SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC", async function (err, result) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
    console.log("5. List all the countries in the descending order of their surface areas.", results);
    }
);

connection.query('SELECT * FROM city WHERE CountryCode = "NLD"', async function (err, result) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
    console.log("6.  What are the names of all the cities in the Netherlands?");
    console.log(results.Name, results.CountryCode);
    }
);

connection.query('SELECT Name, Population FROM city WHERE name = "Rotterdam"', async function (err, result) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
    console.log("7. What is the population of Rotterdam?",'\n', results);
    }
);


connection.query("SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10", async function (err, result, field) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
    console.log("8. What's the top 10 countries by Surface Area?");
    
    for (let i in results) {
      console.log(results[i].Name, results[i].SurfaceArea);
    }
  }
);

connection.query(
  "SELECT * FROM city ORDER BY Population DESC LIMIT 10", async function (err, result, field) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
    console.log("9. What's the top 10 most populated cities?");
    for (let i in results) {
      console.log(results[i].Name, results[i].Population);
    }
  }
);

connection.query(
  "SELECT SUM(population) AS 'World Population' FROM country",
  async function (err, result, field) {
    if (err) throw err;
    let results = await JSON.parse(JSON.stringify(result))
      console.log("10. What is the population number of the world?",'\n', results[0]);
  }
);

connection.end();