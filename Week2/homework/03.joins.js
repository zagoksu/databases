const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "databasehw"
});

const execQuery = util.promisify(connection.query.bind(
	connection));

async function seedDatabase() {

	const PRINT_AUTHORS_AND_COLLABORATORS = `
    SELECT table1.author_name AS 'Author Name',
      table2.author_name AS 'Collaborator Name'
      FROM authors AS table1
      LEFT JOIN authors AS table2
      ON table1.author_no = table2.collaborator`

    const PRINT_AUTHORS_AND_PAPERS = `
    SELECT table1.author_name AS 'Author Name',
        table3.paper_title AS 'Research Paper'
        FROM authors AS table1
        LEFT JOIN author_paper_relation AS table2
        ON table1.author_no = table2.author_id
        LEFT JOIN research_papers AS table3
        ON table2.paper_id = table3.paper_id`;

	try {
		const collaboratorName = await execQuery(PRINT_AUTHORS_AND_COLLABORATORS);
		console.log("AUTHORS AND COLLABORATORS:\n", collaboratorName);

		const researchPapers = await execQuery(PRINT_AUTHORS_AND_PAPERS);
		console.log("AUTHORS AND THEIR RESEARCH PAPERS: \n", researchPapers);
		connection.end()
	} catch (error) {
		console.error(error);
		connection.end();
	} 
}

seedDatabase();