import { Router } from "express";
import { signup, validateSignup } from "../controllers/userController.js";
const router = Router();

router.post("/signup", validateSignup, signup);

router.get("/", (req, res) => {
  res.render("pages/index", { title: "Finly" });
});
router.get("/login", (req, res) => {
  res.render("pages/login", {
    title: "Sign in",
  });
});

router.get("/signup", (req, res) => {
  res.render("pages/signup", {
    title: "Sign up",
    user: req.flash("data")[0],
    info: req.flash('info')[0],
    errors: req.flash("errors"),
  });
});
export default router;