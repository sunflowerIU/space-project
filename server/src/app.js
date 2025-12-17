const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const path = require("path");
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//logs everything about requests
app.use(morgan("combined"));

//convert req.body files into json
app.use(express.json());

// const publicPath = path.join(__dirname, "..", "public");
// console.log(publicPath);
// app.use(express.static(publicPath));

//use planets routes
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
// console.log(
//   "Index exists:",
//   require("fs").existsSync(path.join(publicPath, "index.html"))
// );

// app.get("/", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

module.exports = app;
