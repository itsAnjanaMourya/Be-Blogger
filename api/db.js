import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"MyRoot#15",
    database:"blog",
    port:"3306",
})

