const { checkToken } = require("../../middleware/validateToken.js");
const {
  addCartItem,
  getCartByUser,
  reduceCartItem,
  removeCartItem,
  purchaseCartItems,
} = require("./cart.service");

const router = require("express").Router();

router.get("/", checkToken, getCartByUser);
router.post("/", checkToken, addCartItem);
router.patch("/removeone", checkToken, reduceCartItem);
router.patch("/removeall", checkToken, removeCartItem);
router.post("/purchase", checkToken, purchaseCartItems);

module.exports = router;
