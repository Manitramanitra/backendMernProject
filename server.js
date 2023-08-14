const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");
const morgan = require("morgan");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();

app.use(cors());

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//jwt
app.get("*", checkUser); //verifie le user
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/post",postRoutes);
// app.use("*", (req, res) => {
//   const message = "page not found";
//   res.status(404).json({ message });
// });

//serveur
app.listen(process.env.PORT, () => {
  console.log(`server running on port  http://localhost:${process.env.PORT}`);
});
