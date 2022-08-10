const User = require("../models/UsersModel");
const createError = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authSchema } = require("../utils/validationSchema");

async function checkExists(userName) {
  const user = await User.findAll({
    where: { username: userName },
  });
  return user.length > 0 ? true : false;
}

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    // const req.body = await authSchema.validateAsync(req.body);
    const hash = bcrypt.hashSync(req.body.password, 10);
    const state = await checkExists(req.body.username);
    if (state) {
      return next(
        createError(401, `${req.body.username} is already been registered`)
      );
    }
    const newUser = await User.create({
      username: req.body.username,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({ data: "User created successfully", success: true });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return next(createError(404, "invalid credential"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "invalid credential"));
    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET
    );
    const { password, ...otherDetails } = user.dataValues;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails, success: true });
  } catch (err) {
    next(err);
  }
};
module.exports = { register, login };