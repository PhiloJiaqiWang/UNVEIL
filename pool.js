
const mysql = require('mysql');
const pool = mysql.createPool({
	host: "localhost",
  
    user: "root",
  
    password: "918Mysql@",
  
    database: "unveilgame_action_log",
});

pool.on('error', (err) => {
    console.error('MySQL pool error: ' + err.message);
  });

module.exports=pool;
