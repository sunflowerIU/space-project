const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();

const DefaultFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);
saveLaunch(launch);
async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) throw new Error("No matching planet found.");

  await launchesDB.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DefaultFlightNumber;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunchesArray() {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

async function existsLaunchWithId(launchId) {
  return await launchesDB.findOne({ flightNumber: launchId });
}

async function abortLaunchById(launchId) {
  // const aborted = launches.get(launchId);
  try {
    const aborted = await launchesDB.updateOne(
      { flightNumber: launchId },
      {
        upcoming: false,
        success: false,
      }
    );
    console.log(aborted);
    return aborted.matchedCount === 1 && aborted.modifiedCount === 1;
  } catch (error) {
    console.error(error);
  }
}

async function addNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = {
    flightNumber: newFlightNumber,
    success: true,
    upcoming: true,
    customer: ["ZTM", "NASA"],
    ...launch,
  };

  await saveLaunch(newLaunch);
}

module.exports = {
  getAllLaunchesArray,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
