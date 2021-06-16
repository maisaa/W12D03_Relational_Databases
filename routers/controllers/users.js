// const usersModel = require('./../../db/models/users');
const db = require('../../db/db.js');
const bcrypt = require('bcrypt');
const salt = 5;

const createNewAuthor = async (req, res) => {

	const { firstName, lastName, age, country, email, password, role } = req.body;

	const command = `INSERT INTO users( firstName, lastName, age, country, email, password, role_id ) 
	                        VALUES    (    ?    ,     ?  ,     ? ,  ?    ,   ?    ,  ?  ,   ?)`;

	// console.log("Author command........", command);
	let hashedPassword =await bcrypt.hash(password, salt);
	console.log("password hashed........", hashedPassword);

	const arr = [firstName, lastName, age, country, email, hashedPassword, role];
	console.log("arr....", arr);

	db.query(command, arr, (err, result) => {
		if (err) {
			console.log("newAuthor ....Err:", err);
		}
		res.json(result);
	})
};

module.exports = {
	createNewAuthor,
};
