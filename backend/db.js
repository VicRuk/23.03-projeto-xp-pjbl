import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PVA/8094",
    database: "yup",
    port: 3306
});