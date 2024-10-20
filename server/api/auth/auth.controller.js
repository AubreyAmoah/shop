const { checkToken } = require("../../middleware/validateToken.js");
const {
  logout,
  me,
  adminSignIn,
  adminSignUp,
  userSignUp,
  userSignIn,
} = require("./auth.service.js");
const validateCredentials = require("./middleware/validateCredentials.js");

const router = require("express").Router();

router.get("/verify", checkToken, me);
router.post("/admin/signup", validateCredentials, adminSignUp);
router.post("/admin/signin", validateCredentials, adminSignIn);
router.post("/user/signup", validateCredentials, userSignUp);
router.post("/user/signin", validateCredentials, userSignIn);
router.get("/logout", logout);

module.exports = router;
