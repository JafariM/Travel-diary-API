const Travel = require("../models/Travel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTravels = async (req, res) => {
  const travels = await Travel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ travels, count: travels.length });
};

const getTravel = async (req, res) => {
  const {
    user: { userId },
    params: { id: travelId },
  } = req;
  const travel = await Travel.findOne({
    _id: travelId,
    createdBy: userId,
  });

  if (!travel) {
    throw new NotFoundError(`No travel with id ${travelId}`);
  }
  res.status(StatusCodes.OK).json({ travel });
};

const createTravel = async (req, res) => {
  req.body.createdBy = req.user.userId; //add user id when create a travel
  const travel = await Travel.create(req.body);
  res.status(StatusCodes.CREATED).json({ travel });
};

const updateTravel = async (req, res) => {
  const {
    body: { placeName, location },
    user: { userId },
    params: { id: travelId },
  } = req;

  if (placeName === "" || location === "") {
    throw new BadRequestError("place name of location can not be empty");
  }

  const travel = await Travel.findOneAndUpdate(
    {
      _id: travelId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!travel) {
    throw new NotFoundError(`No travel with id ${travelId}`);
  }
  res.status(StatusCodes.OK).json({ travel });
};

const deleteTravel = async (req, res) => {
  const {
    user: { userId },
    params: { id: travelId },
  } = req;
  const travel = await Travel.findOneAndDelete({
    _id: travelId,
    createdBy: userId,
  });

  if (!travel) {
    throw new NotFoundError(`No travel with id ${travelId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllTravels,
  getTravel,
  createTravel,
  updateTravel,
  deleteTravel,
};
