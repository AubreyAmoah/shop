const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

dotenv.config({ path: "./.env" });
module.exports = {
  me: async (req, res) => {
    const decoded = req.decoded;
    const email = decoded.payload.email;

    try {
      const user = await prisma.admin.findUnique({
        where: {
          email,
        },
      });

      delete user.password;

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        success: 0,
        data: error,
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },

  updateDetails: async (req, res) => {
    try {
      const decoded = req.decoded;
      const email = decoded.payload.email;

      const { name } = req.body;

      if (!name) return res.status(401).json({ message: "please give a name" });

      await prisma.admin.update({
        where: {
          email,
        },
        data: {
          name,
          updated: new Date(Date.now()),
        },
      });

      return res.status(201).json({ message: "update successful" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
