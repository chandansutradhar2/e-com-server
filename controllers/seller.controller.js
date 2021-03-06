const { MongoClient } = require("mongodb");
const url =
	"mongodb+srv://admin:hisyCn%24AhkX5Ggz@lab-cluster-1.ihxrn.mongodb.net/test?authSource=admin&replicaSet=atlas-nmhvza-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(url);

const dbName = "e-com";

exports.createSeller = async (req, res, next) => {
	let user = {
		fullName: req.body.fullName,
		address: req.body.address,
		mobileNo: req.body.mobileNo,
		photoUrl: req.body.photoUrl,
		email: req.body.email,
		password: req.body.password,
		userType: req.body.userType,
		_id: req.body.id,
		businessName: req.body.businessName,
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

exports.getAllSeller = async (req, res, next) => {
	await client.connect();
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	const collection = db.collection("users");
	collection
		.find({ userType: "seller" })
		.toArray()
		.then((r) => {
			if (r) {
				res.status(200).send({ sellers: r });
			} else {
				res.status(401).send("no seller found");
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};

exports.updateSeller = async (req, res, next) => {
	let seller = {
		fullName: req.body.fullName,
		address: req.body.address,
		mobileNo: req.body.mobileNo,
		photoUrl: req.body.photoUrl,
		password: req.body.password,
		userType: req.body.userType,
		_id: req.body.id,
		businessName: req.body.businessName,
	};
	console.log(req.body);
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection("users");
	collection
		.updateOne({ _id: seller._id }, seller)
		.then((r) => {
			if (r.acknowledged) {
				res.status(200).send({ _id: r.matchedCount });
			} else {
				res.status(401).send({ error: "unable to update seller into db" });
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};
