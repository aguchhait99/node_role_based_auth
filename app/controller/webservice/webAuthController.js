const { comparePassword } = require("../../helper/commonHelper");
const UserModel = require("../../model/user");
const jwt = require("jsonwebtoken");
const BlogModel = require('../../model/blog')
const cookieParser = require("cookie-parser");

const SECRET_KEY = process.env.SECRET_KEY;

class WebAuthController {
  // Login Page
  async loginPage(req, res) {
    try {
      return res.render("signin");
    } catch (err) {
      console.log(err);
    }
  }
  // Blog Page
  async blogpage(req, res) {
    try {
      const blogs = await BlogModel.find();
      res.render("blog", {
        data: blogs,
      });
    } catch (err) {
      console.log(err);
    }
  }
  // Add Blog Page
  async addBlog(req, res) {
    try {
      res.render("addblog");
    } catch (err) {
      console.log(err);
    }
  }

  // Home Page
  async home(req, res) {
    try {
      res.render("home");
    } catch (err) {
      console.log(err);
    }
  }

  // Login
  async adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.redirect("/signin");
      }
      const user = await UserModel.findOne({ email });
      const isMatchPassword = await comparePassword(password, user.password);
      if (!isMatchPassword) {
        return res.redirect("/signin");
      }
      if(user.role==='author' && isMatchPassword){
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        //    set token in cookies
        res.cookie("adminToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        });

      }
      if (user.role === "author") {
        return res.redirect("/blog");
      } else if (user.role === "admin") {
        return res.redirect("/");
      }

      res.redirect("/signin");
    } catch (err) {
      console.log(err);
    }
  }

  // Logout
  async logout(req, res){
    res.clearCookies('adminToken')
    return res.redirect('/signin')
  }
}

module.exports = new WebAuthController();
