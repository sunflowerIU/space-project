const express = require("express");
const {
  getAllLaunches,
  createNewLaunches,
  abortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", createNewLaunches);
launchesRouter.delete("/:id", abortLaunch);

module.exports = launchesRouter;
