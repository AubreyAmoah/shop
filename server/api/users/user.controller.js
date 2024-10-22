const { checkToken } = require("../../middleware/validateToken");
const { me, updateDetails, changePassword } = require("./user.service");
const router = require("express").Router();

router.get("/me", checkToken, me);
router.patch("/update", checkToken, updateDetails);
router.patch("/changepassword", checkToken, changePassword);

module.exports = router;
