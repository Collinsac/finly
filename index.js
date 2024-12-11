import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";
// ==========================================================
import userRouter from "./lib/routes/userRoute.js";
import dashboardRouter from "./lib/routes/dashboard.js";
// ==========================================================
const app = express();
dotenv.config();
const PORT = 5000;
const DB_URL = process.env.DB_URL;
// ==========================================================
// ==========================================================
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);
app.use(flash());
// ==========================================================
mongoose
  .connect(DB_URL)
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error.message));

app.listen(PORT, () =>
  console.log(`App started on port http://localhost:${PORT}`)
);
// ==========================================================
app.use("/users", userRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => res.send("welcome"));
