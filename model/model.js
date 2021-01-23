var mysql = require('mysql'); 

// 导入数据库的配置参数
let dbConfig = require("../verifySQL/db.json");

//连接数据库参数配置
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