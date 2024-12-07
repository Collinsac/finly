import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

const validateSignup = [
  body("email", "Email must not be empty").notEmpty(),
  body("password", "Password must not be empty").notEmpty(),
  body("password", "Password must be 6+ characters long").isLength({ min: 6 }),
  body("repeatPassword", "Repeat Password must not be empty").notEmpty(),
  body("repeatPassword", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
];

const signup = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array();
    req.flash("errors", errors);
    req.flash("data", req.body);
    return res.redirect("/users/signup"); // Use return to exit early
  }

  const { email, password } = req.body;
  const query = { email };

  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      req.flash("data", req.body);
      req.flash("info", {
        message: "Email is already registered. Try to login instead",
        type: "error",
      });
      return res.redirect("/users/signup"); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: hashedPassword,
    };

    const result = await User.create(user);
    req.session.userId = result._id;
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error during signup:", error);
    req.flash("info", {
      message: "An error occurred during signup. Please try again.",
      type: "error",
    });
    return res.redirect("/users/signup");
  }
};

export { signup, validateSignup };