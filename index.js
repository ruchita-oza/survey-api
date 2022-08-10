const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
let app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const sequelize = require("./database");
const authRoute = require("./src/routers/AuthRoute");
const surveyRoute = require("./src/routers/SurveyRoute");
const thumbRoute = require("./src/routers/ThumbRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => console.log("db is ready"));

const router = express.Router();
app.use(router);

app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/survey", surveyRoute);
app.use("/thumbnail", thumbRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server is Listening on : http://localhost:${PORT}`);
});
