const util = require("util");
const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "databasehw"
});

const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

const CREATE_RESEARCH_PAPERS_TABLE = `
CREATE TABLE IF NOT EXISTS research_papers (
paper_id INT PRIMARY KEY,
paper_title TEXT,
conference TEXT,
publish_date DATE
);`;

const CREATE_AUTHOR_PAPER_RELATION_TABLE = `
CREATE TABLE IF NOT EXISTS author_paper_relation (
author_id int,
paper_id int,
CONSTRAINT FK_Author FOREIGN KEY(author_id)
REFERENCES authors(author_no),
CONSTRAINT FK_Paper FOREIGN KEY(paper_id)
REFERENCES research_papers(paper_id),
CONSTRAINT PK_Author_Paper
PRIMARY KEY(author_id, paper_id)
)`;

async function seedDatabase() {
	connection.connect();

	try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHOR_PAPER_RELATION_TABLE);

    const authorsData = await readFile(__dirname +
        "/authors.json", "utf8");
    const authors = await JSON.parse(authorsData);
    const authorsPromises = await authors.map(author =>
        execQuery("INSERT INTO authors SET ?", author)
    );

    const papersData = await readFile(
        __dirname + "/research_papers.json",
        "utf8"
    );
    const papers = await JSON.parse(papersData);
    const papersPromises = await papers.map(paper =>
        execQuery("INSERT INTO research_papers SET ?",
            paper)
    );

    const relationsData = await readFile(__dirname + '/relations.json', 'utf8');
    const relations = await JSON.parse(relationsData);
    const relationsPromises = await relations.map(relation =>
        execQuery("INSERT INTO author_paper_relation SET ?", relation)
    );

    await Promise.all[relationsPromises];
    
    } catch (error) {
        console.error(error);
        connection.end();
    } finally {
        connection.end();
    }
    }


seedDatabase();