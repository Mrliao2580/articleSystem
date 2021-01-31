var mysql = require('mysql'); 
let dbConfig = require("../config/db.json");
var connection = mysql.createConnection({
   ...dbConfig
});

connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});

function dbquery(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,data)=>{
            if(err){ reject(err); }
            resolve(data)
        })
    })
}
module.exports = dbquery;