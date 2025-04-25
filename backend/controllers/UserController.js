const { Users_tbl } = require("../models");
const bcrypt = require("bcryptjs");
const { generate_Access_token } = require("../token/tokenGenerator");

const create_user = async (req, res) => {
  const userData = req.body;

  try {
    const userExist = await Users_tbl.findOne({
      where: { username: userData.username },
    });

    if (userExist) {
      return res.status(409).json({ message: "user already exist" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(userData.password, salt);

    const result = await Users_tbl.create({
      username: userData.username,
      password: hashedPassword,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login_user = async (req, res) => {
  const userData = req.body;

  try {
    const user = await Users_tbl.findOne({
      where: { username: userData.username },
    });

    if (!user) {
      return res.status(404).json({ message: "User didn't exist" });
    }

    const passwordCorrect = await bcrypt.compareSync(
      userData.password,
      user.password
    );

    if (!passwordCorrect) {
      return res.status(403).json({ message: "Credentials invalid" });
    }

    const accessToken = generate_Access_token(user.ID, user.username);

    return res.status(200).json(accessToken);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { create_user, login_user };
