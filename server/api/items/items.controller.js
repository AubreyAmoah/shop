const {
  getItem,
  getItems,
  addItem,
  updateItem,
  appendImages,
  removeImage,
  addImages,
  deleteItem,
  getItemsByCategory,
} = require("./items.service");
const {
  uploadImages,
  checkTokenAndVerifyPermission,
  inputValidation,
  uploadImage,
} = require("./middleware/itemsMiddleware");

const router = require("express").Router();

router.get("/all", getItems);
router.post("/", inputValidation, checkTokenAndVerifyPermission, addItem);
router.put("/:id", checkTokenAndVerifyPermission, updateItem);
router.post(
  "/addimages/:id",
  checkTokenAndVerifyPermission,
  uploadImages,
  addImages
);
router.patch(
  "/appendimages/:id",
  checkTokenAndVerifyPermission,
  uploadImage,
  appendImages
);
router.patch("/", checkTokenAndVerifyPermission, updateItem);
router.get("/category/item/:categoryId", getItemsByCategory);
router.patch("/deleteimage/", checkTokenAndVerifyPermission, removeImage);
router.delete("/delete/:name", checkTokenAndVerifyPermission, deleteItem);
router.get("/item/:name", getItem);
module.exports = router;
