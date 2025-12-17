const {
  getAllPlanets: getAllPlanetsFromDB,
} = require("../../models/planets.model");

async function getAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanetsFromDB());
}

module.exports = { getAllPlanets };
