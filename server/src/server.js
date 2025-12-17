require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const PORT = 4000;
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

//because app uses express and express is just like middleware
const server = http.createServer(app);

//mongoose event emitters
mongoose.connection.once("open", () => {
  console.log("Database connected.");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

//load planets data before listening to server
async function startServer() {
  await mongoose.connect(process.env.MONGO_URL, {});
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });
}
startServer();

// console.log(process.env.PORT);
