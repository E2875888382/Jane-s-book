const mysql = require('mysql');
const config = require('./db.config');

const pool = mysql.createPool(config);

module.exports = function(sql,callback){
    pool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }else{
            connection.query(sql,(error,result) => {
                if (error){
                    throw error;
                }
                connection.release();
                callback(result);
            });
        }
    })
}


 