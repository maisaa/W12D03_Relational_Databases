const db = require('./../../db/db.js');

const getAllArticles = (req, res) => {
    const command = `SELECT * FROM articles;`

	db.query(command , (err , result)=>{
		if(err){
			res.status(403).json("forbidden");
		} else {
			res.status(200).json(result);
		}
	})


	// articlesModel
	// 	.find({})
	// 	.then((result) => {
	// 		res.status(200).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

const getArticlesByAuthor = (req, res) => {
	const author = req.query.author;

	if (!author) return res.status(404).json('not found');

	articlesModel
		.find({ author })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const getAnArticleById = (req, res) => {
	const _id = req.params.id;

	const command = `SELECT * FROM articles WHERE id=?;`;

	const data = [_id];

	db.query(command, data, (err, result)=>{
		if(err){
			res.status(404).json("not found");
		} else {
			res.status(200).json(result);
		}
	})

};

const createNewArticle = (req, res) => {
	const { title, description, author_id } = req.body;
	const command = `INSERT INTO articles (title, description, author_id) VALUES (?,?,?);`

	const data = [title, description, author_id];

	db.query(command, data, (err, result)=>{
		if(err){
			console.log("newArticle ....Err:", err);
			res.status(403).json("NewArticle not inserted");

		} else {
			res.status(201).json(result);
		}

	})
};

const updateAnArticleById = (req, res) => {
	const id = req.params.id;

	articlesModel
		.findByIdAndUpdate(id, req.body, { new: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const deleteArticleById = (req, res) => {
	const id = req.params.id;

	articlesModel
		.findByIdAndDelete(id)
		.then((result) => {
			res.status(200).json({
				success: true,
				message: `Success Delete atricle with id => ${id}`,
			});
		})
		.catch((err) => {
			res.send(err);
		});
};

const deleteArticlesByAuthor = (req, res) => {
	const author = req.body.author;

	articlesModel
		.deleteMany({ author })
		.then((result) => {
			res.status(200).json({
				success: true,
				message: `Success Delete atricle with id => ${author}`,
			});
		})
		.catch((err) => {
			res.send(err);
		});
};

module.exports = {
	getAllArticles,
	getArticlesByAuthor,
	getAnArticleById,
	createNewArticle,
	updateAnArticleById,
	deleteArticleById,
	deleteArticlesByAuthor,
};
