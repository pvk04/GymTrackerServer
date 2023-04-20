import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "gymtracker",
	password: "1234",
});

export default connection;
