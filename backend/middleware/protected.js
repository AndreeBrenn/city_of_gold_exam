const jwt = require("jsonwebtoken");
const { Users_tbl } = require("../models");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token
      token = req.headers.authorization.split(" ")[1];

      //Verify
      const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

      //Get user using Token
      req.user = await Users_tbl.findOne({ where: { ID: decoded.ID } });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not Authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = { protect };
