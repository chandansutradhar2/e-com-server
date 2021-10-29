const { MongoClient } = require("mongodb");
const url =
	"mongodb+srv://admin:hisyCn%24AhkX5Ggz@lab-cluster-1.ihxrn.mongodb.net/test?authSource=admin&replicaSet=atlas-nmhvza-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(url);

const dbName = "e-com";

exports.createProduct = async (req, res, next) => {
	let data = req.body;

	let product = {
		categoryId: data.categoryId,
		createdBy: data.createdBy,
		createdOn: data.createdOn,
		description: data.description,
		dimensions: data.dimensions,
		discountRate: data.discountRate,
		discountType: data.discountType,
		isDisabled: data.isDisabled,
		isDiscount: data.isDiscount,
		isTaxExclusive: data.isTaxExclusive,
		name: data.name,
		owner: data.owner,
		price: data.price,
		quantity: data.quantity,
		sizes: data.sizes,
		taxRate: data.taxRate,
		taxType: data.taxType,
		imageUrls: data.imageUrls,
		videoUrls: data.videoUrls,
		type: "product",
	};
	console.log(product);
	await client.connect();
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	const collection = db.collection("products");
	collection
		.insertOne(product)
		.then((r) => {
			if (r.acknowledged) {
				res.status(200).send({ status: true, _id: r.insertedId });
			} else {
				res.status(200).send({ status: false, error: "unable to save to db" });
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};

exports.createCategory = async (req, res, next) => {
	let category = {
		name: req.body.name,
		description: req.body.description,
		createdOn: Date.now(),
		createdBy: req.body.createdBy,
		imageUrl: req.body.imageUrl,
		type: "category",
	};
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection("products");
	collection
		.insertOne(category)
		.then((r) => {
			if (r.acknowledged) {
				res.status(200).send({ status: true, _id: r.insertedId });
			} else {
				res.status(200).send({ status: false, error: "unable to save to db" });
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};

exports.getAllProduct = async (req, res, next) => {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection("products");
	collection
		.find({ type: "product" })
		.toArray()
		.then((r) => {
			if (r) {
				res.status(200).send({ status: true, products: r });
			} else {
				res.status(200).send({ status: false, error: "no products found" });
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};

exports.getAllCategory = async (req, res, next) => {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection("products");
	collection
		.find({ type: "category" })
		.toArray()
		.then((r) => {
			if (r) {
				res.status(200).send({ status: true, categories: r });
			} else {
				res.status(200).send({ status: false, error: "no categories found" });
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};

exports.categoryExists = async (req, res, next) => {
	await client.connect();
	const db = client.db(dbName);
	const name = req.body.name;
	const collection = db.collection("products");
	collection
		.findOne({ type: "category", name: name })
		.then((r) => {
			if (r) {
				res.status(200).send({ status: true });
			} else {
				res.status(200).send({ status: false });
			}
		})
		.catch((err) => {
			res.status(401).send({ error: err });
		});
};

exports.updateProduct = async (req, res, next) => {
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
		.updateOne({ _id: user._id }, user)
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
