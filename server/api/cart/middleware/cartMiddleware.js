const { verify } = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

dotenv.config({ path: "./.env" });

module.exports = {
  checkTokenAndVerifyPermission: async (req, res, next) => {
    const secret = process.env.SECRET;
    const token = req.cookies["jwt"];

    try {
      const decoded = verify(token, secret);
      req.decoded = decoded;
      const email = req.decoded.payload.email;

      const userRole = await prisma.admin.findFirst({
        where: {
          email,
          role: "user",
        },
      });
      if (!userRole)
        return res.status(401).json({ data: "User not permitted" });
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  },
  inputValidation: (req, res, next) => {
    const { name, size, price, category } = req.body;

    if (!name) {
      return res.status(401).json({
        data: "Field must not be empty",
      });
    }

    next();
  },
};
