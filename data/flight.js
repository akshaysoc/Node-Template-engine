const db = require('./db');

function getAll(callback){
    const sql = "select * from flight";
    db.executequery(sql, [], callback);
}

function addOne(nam, des, cap, callback){
    const sql = "insert into flight(flight_name,flight_desc,capacity) values (?,?,?)";
    db.executequery(sql, [nam, des, cap], callback);
}

module.exports.getAll= getAll;
module.exports.addOne = addOne;