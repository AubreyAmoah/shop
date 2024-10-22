const {
  getItem,
  getItems,
  addItem,
  updateItem,
  appendImages,
  removeImage,
  addImages,
  deleteItem,
} = require("./items.service");
const {
  uploadImages,
  checkTokenAndVerifyPermission,
  inputValidation,
  uploadImage,
} = require("./middleware/itemsMiddleware");

const router = require("express").Router();

router.get("/getitem", getItem);
router.get("/getitems", getItems);
router.post("/", inputValidation, checkTokenAndVerifyPermission, addItem);
router.put("/:id", checkTokenAndVerifyPermission, updateItem);
router.patch(
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
router.patch("/deleteimage/", checkTokenAndVerifyPermission, removeImage);
router.delete("/delete/:name", checkTokenAndVerifyPermission, deleteItem)

module.exports = router;
