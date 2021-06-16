const db = require('./../../db/db.js');
// const mysql = require("mysql2");//??

const createNewRole = (req, res) => {

	const { role } = req.body;

	const command = `INSERT INTO roles(role) VALUES(?)`;
	const arr = [role];

	console.log("...arr...:",arr)

	db.query(command, arr, (err,result)=>{
		if (err){
			console.log("createNewRole......err:",err);
		}
		res.json(result);
	})





	// newRole
	// 	.save()
	// 	.then((result) => {
	// 		res.status(201).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

module.exports = {
	createNewRole,
};
