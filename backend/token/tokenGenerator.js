const jwt = require("jsonwebtoken");

const generate_Access_token = (ID, username) => {
  return jwt.sign({ ID, username }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "30d",
  });
};

module.exports = { generate_Access_token };
