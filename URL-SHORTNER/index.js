const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 8001;
const app = express();
const Url = require("./models/url");
const urlRoute = require("./routes/url");
const { connectMongodb } = require("./connection");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");
const { handleall } = require("./controller/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
connectMongodb("mongodb://localhost:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);
app.get("/:shortID", handleall);

app.listen(port, () => console.log(`server started at port ${port}`));
