const { verify } = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

dotenv.config({ path: "./.env" });

const rootDir = path.resolve(process.cwd());
const filePath = path.join(rootDir, "uploads");

// Check if the uploads directory exists, if not, create it
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

module.exports = {
  uploadImage: (req, res, next) => {
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/webp"
        ) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type"));
        }
      },
    }).single("file");
    try {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res
            .status(500)
            .json({ message: "Multer Error: " + err.message });
        } else if (err) {
          return res.status(500).json({ message: "Error: " + err.message });
        }
        next();
      });
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  },
  uploadImages: (req, res, next) => {
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/webp"
        ) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type"));
        }
      },
    }).array("files", 5);
    try {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res
            .status(500)
            .json({ message: "Multer Error: " + err.message });
        } else if (err) {
          return res.status(500).json({ message: "Error: " + err.message });
        }
        next();
      });
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  },
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
          role: "admin",
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
    const { name, sizeprice, category } = req.body;

    if (!name) {
      return res.status(401).json({
        data: "Field must not be empty",
      });
    }

    if (!sizeprice) {
      return res.status(401).json({
        data: "Field must not be empty",
      });
    }

    if (!category) {
      return res.status(401).json({
        data: "Field must not be empty",
      });
    }

    next();
  },
};
