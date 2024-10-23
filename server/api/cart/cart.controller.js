const { checkToken } = require("../../middleware/validateToken.js");
const {
  addCartItem,
  getCartByUser,
  reduceCartItem,
  removeCartItem,
  purchaseCartItems,
  getPurchaseHistory,
} = require("./cart.service");

const router = require("express").Router();

router.get("/", checkToken, getCartByUser);
router.post("/", checkToken, addCartItem);
router.patch("/removeone", checkToken, reduceCartItem);
router.patch("/removeall", checkToken, removeCartItem);
router.post("/purchase", checkToken, purchaseCartItems);
router.get("/purchasehistory", checkToken, getPurchaseHistory);

module.exports = router;
