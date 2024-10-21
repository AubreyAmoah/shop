const { checkToken } = require("../../middleware/validateToken");
const { me, getUsers, updateDetails } = require("./admin.service");

const router = require("express").Router();

router.get("/me", checkToken, me);
router.get("/users", checkToken, getUsers);
router.patch("/update", checkToken, updateDetails);

module.exports = router;
