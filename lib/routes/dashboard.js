import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.render("pages/dashboard", {
    title: "Dashboard",
    info: req.flash("info")[0],
  });
});

export default router;
