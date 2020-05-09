const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "databasehw"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
	const RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS_CONTRIBUTED = `
		SELECT E1.paper_title AS 'RESEARCH PAPER',
			COUNT(E2.author_id) AS 'THE NUMBER OF AUTHORS CONTRIBUTED'
			FROM research_papers AS E1
			LEFT JOIN author_paper_relation AS E2
			ON E1.paper_id=E2.paper_id
			GROUP BY E1.paper_id`;

	const SUM_OF_RESEARCH_PAPERS_BY_FEMALE_AUTHORS = `
		SELECT COUNT(E1.paper_id) AS 'The sum of papers published by all female authors'
			FROM research_papers AS E1
			LEFT JOIN author_paper_relation AS E2
			ON E1.paper_id = E2.paper_id
			LEFT JOIN authors AS E3
			ON E2.author_id = E3.author_no
			WHERE E3.gender='f'`;

	const AVERAGE_H_INDEX_PER_UNIVERSITY = `
    SELECT university AS University, AVG(h_index) AS 'Average h-index'
      FROM authors
      GROUP BY university`;

	const SUM_RESEARCH_PAPERS_PER_UNIVERSITY = `
    SELECT E1.university AS 'UNIVERSITY',
      COUNT(E2.paper_id) AS 'Number of the research papers'
      FROM research_papers AS E2
      LEFT JOIN author_paper_relation AS E3
      ON E2.paper_id=E3.paper_id
      RIGHT JOIN authors AS E1
      ON E3.author_id = E1.author_no
      GROUP BY university`;

	const MIN_AND_MAX_H_INDEX_PER_UNIVERSITY = `
    SELECT university, MIN(h_index) AS 'h-index(MIN)',
      MAX(h_index) AS 'h-index(MAX)'
      FROM authors
      GROUP BY university`;

	connection.connect();

	try {

		console.log("All research papers and the number of authors that wrote that paper:", await execQuery(RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS_CONTRIBUTED));
		console.log("Sum of the research papers published by all female authors:", await execQuery(SUM_OF_RESEARCH_PAPERS_BY_FEMALE_AUTHORS));
		console.log("Average of the h-index of all authors per university:",await execQuery(AVERAGE_H_INDEX_PER_UNIVERSITY));
		console.log("Sum of the research papers of the authors per university:", await execQuery(SUM_RESEARCH_PAPERS_PER_UNIVERSITY));
		console.log("inimum and maximum of the h-index of all authors per university:",await execQuery(MIN_AND_MAX_H_INDEX_PER_UNIVERSITY) );
		
		connection.end();
	} catch (error) {
		console.error(error);
		connection.end();
	} 
}

seedDatabase();