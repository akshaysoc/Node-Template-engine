const mysql = require('mysql2');

const connectionDetails = {
    host: 'localhost',
    user: 'root',
    password: 'Akshay@3100',
    database: 'fbms'
}

function getconnection(){
    return mysql.createConnection(connectionDetails);
}

function executequery(query, parameters, callback){
    let connection = getconnection();
    connection.connect();
    connection.query(query, parameters, callback);
    connection.commit();
    connection.end();
}
 module.exports.executequery = executequery;