const { checkToken } = require("../../middleware/validateToken.js");
const {
  addCartItem,
  getCartByUser,
  removeOneCartItem,
  removeAllCartItems,
} = require("./cart.service");

const router = require("express").Router();

router.get("/", checkToken, getCartByUser);
router.post("/", checkToken, addCartItem);
router.patch("/removeone", checkToken, removeOneCartItem);
router.delete("/", checkToken, removeAllCartItems);

module.exports = router;
