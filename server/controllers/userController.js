const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const path = require("path");
const { validationResult } = require("express-validator");

const User = require("../models/User");

const generateAccessToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { name, email, password, birthdate, gender } = req.body;
      const { img } = req.files;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "images", fileName));
      const user = new User({
        name,
        email,
        password: hashPassword,
        birthdate,
        gender,
        image: fileName,
      });
      const newUser = await user.save();
      const token = generateAccessToken(newUser._id, newUser.email);
      return res.json({ token, id: newUser._id });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${email} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.email);
      return res.json({ token, id: user._id });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find(
        {},
        { name: 1, birthdate: 1, image: 1, email: 1 }
      );
      return res.json({ users });
    } catch (e) {
      return res.status(400).json({ message: "Get user error" });
    }
  }

  async updateProfie(req, res) {
    try {
      const filter = { _id: req.user.id };

      const update = req.body;
      const file = req.files;
      if (req.body.password) {
        update.password = bcrypt.hashSync(req.body.password, 7);
      }

      if (file) {
        const user = await User.findOne(filter);
        let fileName = user.image;
        file.image.mv(path.resolve(__dirname, "..", "images", fileName));
        // return res.json({ user });
      }

      await User.findOneAndUpdate(filter, update);
      return res.json({ mesage: "updated" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Update error" });
    }
  }
  //async check(req, res) {
  //  const token = generateJwt(req.user.id, req.user.email, req.user.role);
  //  return res.json({ token });
  //}
}

module.exports = new UserController();
