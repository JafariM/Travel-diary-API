const Travel = require("../models/Travel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTravels = async (req, res) => {
  res.send("All travels");
};

const getTravel = async (req, res) => {
  res.send("get travel");
};

const createTravel = async (req, res) => {
  req.body.createdBy = req.user.userId; //add user id when create a travel
  const travel = await Travel.create(req.body);
  res.status(StatusCodes.CREATED).json({ travel });
};

const updateTravel = async (req, res) => {
  res.send("Update one travel");
};

const deleteTravel = async (req, res) => {
  res.send("Delete one travel");
};

module.exports = {
  getAllTravels,
  getTravel,
  createTravel,
  updateTravel,
  deleteTravel,
};
