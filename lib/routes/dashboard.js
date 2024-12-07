import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.render("pages/dashboard", { title: "Dashboard" });
});

export default router;
