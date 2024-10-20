const { PrismaClient } = require("@prisma/client");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

dotenv.config({ path: "./.env" });
module.exports = {
  me: async (req, res) => {
    const decoded = req.decoded;
    console.log(decoded);
    const user = decoded.payload.email;
    if (user) {
      res.status(200).json({ user: user });
    } else {
      console.log("error");
      res.status(401).json({ message: "user not found" });
    }
  },
  userSignUp: async (req, res) => {
    const { email, password } = req.body;
    const hash = await argon.hash(password);

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      try {
        await prisma.user.create({
          data: {
            email,
            password: hash,
            created: new Date(Date.now()),
          },
        });

        return res.status(201).json({
          success: 1,
          data: "Sign Up success!!",
        });
      } catch (error) {
        return res.status(500).json({
          success: 0,
          data: "An Error Occurred",
          error,
        });
      }
    }

    return res.status(401).json({
      success: 0,
      data: "User already Exists",
    });
  },
  userSignIn: async (req, res) => {
    const { email, password } = req.body;
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      const comparePassword = await argon.verify(
        emailExists.password,
        password
      );

      if (comparePassword) {
        emailExists.password = undefined;
        const payload = {
          email,
        };

        const secret = process.env.SECRET;

        const token = jwt.sign({ payload }, secret, {
          expiresIn: "1h",
        });

        const saveCookie = res.cookie("jwt", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        if (saveCookie) {
          return res.status(200).json({
            success: 1,
            data: "login success",
            token,
          });
        }

        return res.status(401).json({
          success: 0,
          data: "cookie error",
          token,
        });
      }

      return res.status(401).json({
        success: 0,
        data: "Invalid Credentials",
      });
    }

    return res.status(401).json({
      success: 0,
      data: "Invalid Credentials",
    });
  },

  adminSignUp: async (req, res) => {
    const { email, password } = req.body;
    const hash = await argon.hash(password);

    const adminExists = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!adminExists) {
      try {
        await prisma.admin.create({
          data: {
            email,
            password: hash,
            created: new Date(Date.now()),
          },
        });

        return res.status(201).json({
          success: 1,
          data: "Sign Up success!!",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: 0,
          data: "An Error Occurred",
          error,
        });
      }
    }

    return res.status(401).json({
      success: 0,
      data: "user already Exists",
    });
  },
  adminSignIn: async (req, res) => {
    const { email, password } = req.body;
    const emailExists = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      const comparePassword = await argon.verify(
        emailExists.password,
        password
      );

      if (comparePassword) {
        emailExists.password = undefined;
        const payload = {
          email,
        };

        const secret = process.env.SECRET;

        const token = jwt.sign({ payload }, secret, {
          expiresIn: "1h",
        });

        const saveCookie = res.cookie("jwt", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        if (saveCookie) {
          return res.status(200).json({
            success: 1,
            data: "login success",
            token,
          });
        }

        return res.status(401).json({
          success: 0,
          data: "cookie error",
          token,
        });
      }

      return res.status(401).json({
        success: 0,
        data: "Invalid Credentials",
      });
    }

    return res.status(401).json({
      success: 0,
      data: "Invalid Credentials",
    });
  },

  logout: (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const clearCookie = res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    if (!clearCookie) {
      res.sendStatus(500);
    }

    return res.status(200).json({
      success: 1,
      data: "logout success",
    });
  },
};
