const { MongoClient } = require("mongodb");
const url =
	"mongodb+srv://admin:hisyCn%24AhkX5Ggz@lab-cluster-1.ihxrn.mongodb.net/test?authSource=admin&replicaSet=atlas-nmhvza-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(url);

const dbName = "e-com";

exports.signup = async (req, res, next) => {
	let user = {
		fullName: req.body.fullName,
		address: req.body.address,
		mobileNo: req.body.mobileNo,
		photoUrl: req.body.photoUrl,
		email: req.body.email,
		password: req.body.password,
		userType: req.body.userType,
		_id: req.body.id,
	};
	console.log(req.body);
	await client.connect();
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	const collection = db.collection("users");
	collection
		.insertOne(user)
		.then((r) => {
			if (r.acknowledged) {
				res.status(200).send({ id: r.insertedId });
			} else {
				res.status(401).send({ error: "unable to save to db" });
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};
