const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ mag: "invalid Authentication" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ mag: "invalid Authentication" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(501).json({ msg: err.message });
  }
};

module.exports = auth;
