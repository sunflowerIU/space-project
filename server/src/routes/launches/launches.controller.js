const {
  getAllLaunchesArray,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function getAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunchesArray());
}

function createNewLaunches(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

async function abortLaunch(req, res) {
  const launchId = +req.params.id;

  //if launch doesnot exists throw 404
  if (!(await existsLaunchWithId(launchId))) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const result = await abortLaunchById(launchId);
  if (!result) {
    return res.status(400).json({ error: "Launch not aborted" });
  }
  return res.status(200).json({ ok: true });
}

module.exports = { getAllLaunches, createNewLaunches, abortLaunch };
