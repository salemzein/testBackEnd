const userModel = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    //get user information by id
    const user = await userModel.findOne({
      _id: req.user.id,
    });
    if (user.role === 0) {
      return res.status(401).json({ msg: `admin is not authorized` });
    }
    next();
  } catch (err) {
    return res.status(501).json({ msg: err.message });
  }
};
module.exports = authAdmin;
