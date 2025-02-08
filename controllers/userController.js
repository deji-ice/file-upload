import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new User(req.body);

    const emailExist = await User.findOne({
      email: req.body.email,
    });
    if (emailExist) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const hashedPassword = passwordHasher(req.body.password);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ password: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser, getUsers };
