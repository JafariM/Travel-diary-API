const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT(); //this function is declared in User model
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please enter the email and password");
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new UnauthenticatedError("invalid Credential");
  }
  const isPasswordCorrect = user.comparePassword(password); //this function is declared in User model
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid Credential");
  }
  const token = user.createJWT(); //this function is declared in User model
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
