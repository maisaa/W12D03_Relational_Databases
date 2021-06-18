const db = require('../../db/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
	try {
		const { email, password } = req.body;
		const command = `SELECT * FROM users WHERE email = ?;`;
		const arr = [email, password];

		db.query(command, arr, async (err, result) => {
			if (err) {
				console.log("Err Login.....:", err);
				// res.status(403).json("Err Login")
			} else if (result.length == 0) {
				res.status(404).json("This email doesn't exist")
			} else {
				const valid = await bcrypt.compare(password, result[0].password);
				if (valid) {
					const payload = {
						userId: result[0]._id,
						country: result[0].country,
						role: result[0].role,
					};
					const options = {
						expiresIn: '60m',
					};

					let token = jwt.sign(payload, process.env.SECRET, options);
					console.log("token..... ",token);
					res.status(200).json(token);
				} else {
					res.status(403).json('The password you’ve entered is incorrect') ;
				}
			}
		})
	} catch (error) {
		
        throw new Error (error.message);
	}
};

module.exports = {
	login,
};
