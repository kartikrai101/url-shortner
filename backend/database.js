const mysql = require('mysql2');

// create a new mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'URL_Shortner',
    user: 'root',
    password: 'Kartik@2002'
})

// connect to the mysql database
connection.connect((error) => {
    if(error){
        console.error("Error connecting to mysql database server", error);
    }else{
        console.log("Connected to MySQL Dabatabse!");
    }
})

module.exports = connection;