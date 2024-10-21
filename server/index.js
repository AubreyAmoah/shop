const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
const credentials = require("./config/cors/middleware/credentials");
const corsOptions = require("./config/cors/corsOptions");
const app = express();

const authRouter = require("./api/auth/auth.controller.js");
const adminRouter = require("./api/admin/admin.controller.js");
const userRouter = require("./api/users/user.controller.js");
const itemRouter = require("./api/items/items.controller.js");
const categoryRouter = require("./api/categories/category.controller.js");

dotenv.config({ path: "./.env" });

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const uploadDir = path.join(process.cwd(), "uploads");
const categoryDir = path.join(process.cwd(), "uploads", "categoryImages");
app.use(express.static(uploadDir));
app.use(express.static(categoryDir));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/categories", categoryRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running on port: ${process.env.APP_PORT}`);
});
