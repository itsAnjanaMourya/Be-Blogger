import dotenv from "dotenv"; 
dotenv.config();
import mysql from "mysql"
console.log(process.env.HOST)
export const db = mysql.createConnection({
    
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
})

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });