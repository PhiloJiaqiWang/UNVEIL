const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.get("/v1", (req, res) => {
	console.log("yes")
	const $name = req.query.name;
	const $x = req.query.x;
	const $y = req.query.y;
	const $time = req.query.time;
	const $events= req.query.events
	const $detail= req.query.detail
	const $index= req.query.index
	const $level= req.query.level
	const $ifNew= req.query.ifNew


	var sql = "INSERT INTO log(player, position_x, position_y, events, details, clue_idx, level, ifNew, unix_time) VALUES (?,?,?,?,?,?,?,?,?);";
	pool.query(sql,[$name,$x,$y,$events,$detail,$index,$level,$ifNew,$time],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
})

module.exports = router;

