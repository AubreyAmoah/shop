const { checkToken } = require("../../middleware/validateToken");
const {
  me,
  getUsers,
  updateDetails,
  changePassword,
} = require("./admin.service");

const router = require("express").Router();

router.get("/me", checkToken, me);
router.get("/users", checkToken, getUsers);
router.patch("/update", checkToken, updateDetails);
router.patch("/changepassword", checkToken, changePassword);

module.exports = router;
