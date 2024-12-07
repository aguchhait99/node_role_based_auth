const { hashPassword, comparePassword } = require("../../helper/commonHelper");
const UserModel = require("../../model/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

class AuthController {
  // User Registrtaion
  async userRegistration(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          message: "Email already exists.",
        });
      }
      const hashedPassword = await hashPassword(password);
      const user = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
      if (req.file) {
        user.image = req.file.path;
      }
      const data = await user.save();
      if (data) {
        res.status(201).json({
          message: "User has been registered successfully.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // User Login
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "All fields required!",
        });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User not found!",
        });
      }
      // console.log("password--->", user.password);
      const isMatchPassword = await comparePassword(password, user.password);
      if (!isMatchPassword) {
        return res.status(400).json({
          message: "Invalid Credentials!",
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login Successfully!!!",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthController();
