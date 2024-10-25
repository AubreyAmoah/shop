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

router.get("/all/categories", getCatgories);
router.post("/", checkTokenAndVerifyPermission, inputValidation, addCategory);
router.patch(
  "/",
  checkTokenAndVerifyPermission,
  updateValidation,
  updateCategory
);
router.get("/:name", getCategory);
router.patch(
  "/addimage/:name",
  checkTokenAndVerifyPermission,
  uploadImage,
  updateCategoryImage
);
router.delete("/delete/:name", checkTokenAndVerifyPermission, deleteCategory);

module.exports = router;
