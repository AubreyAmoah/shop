const {
  getCategory,
  getCatgories,
  addCategory,
  updateCategory,
  updateCategoryImage,
  deleteCategory,
} = require("./category.service");
const {
  inputValidation,
  checkTokenAndVerifyPermission,
  uploadImage,
  updateValidation,
} = require("./middleware/categoriesMiddleware");

const router = require("express").Router();

router.get("/single", getCategory);
router.get("/all", getCatgories);
router.post("/", checkTokenAndVerifyPermission, inputValidation, addCategory);
router.patch(
  "/",
  checkTokenAndVerifyPermission,
  updateValidation,
  updateCategory
);
router.patch(
  "/addimage/:name",
  checkTokenAndVerifyPermission,
  uploadImage,
  updateCategoryImage
);
router.delete("/delete", checkTokenAndVerifyPermission, deleteCategory);

module.exports = router;
