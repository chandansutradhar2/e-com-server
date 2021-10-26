const express = require("express");
const usersRoutes = require("./routes/user.route");
const sellerRoutes = require("./routes/seller.route");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE",
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,token",
	);
	next();
});
app.use("/user", usersRoutes);
app.use("/seller", sellerRoutes);
app.listen(3000, () => {
	console.log("server listeining on port 3000");
});
