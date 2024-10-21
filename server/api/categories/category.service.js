const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { json } = require("express");

const prisma = new PrismaClient();

dotenv.config({ path: "./.env" });
module.exports = {
  updateCategoryImage: async (req, res) => {
    let { name } = req.params;
    let url = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
    try {
      const existingCategory = await prisma.category.findFirst({
        where: {
          name,
        },
      });

      if (!existingCategory)
        return res.status(401).json({ data: "Category does not exist" });

      await prisma.category.update({
        where: {
          id: existingCategory.id,
        },
        data: {
          image: url,
          updated: new Date(Date.now()),
        },
      });

      return res.status(200).json({ data: "Category updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ data: "An error ocurred" });
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const category = await prisma.category.findUnique({
        where: {
          name,
        },
      });

      if (category)
        return res.status(401).json({ message: "category already exists" });

      await prisma.category.create({
        data: {
          name,
          created: new Date(Date.now()),
        },
      });

      return res.status(201).json({ message: "Category created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  getCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await prisma.category.findFirst({
        where: {
          name,
        },
      });

      return res.status(200).json(category);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  getCatgories: async (req, res) => {
    try {
      const categories = await prisma.category.findMany();

      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },

  updateCategory: async (req, res) => {
    const { name, newName } = req.body;

    try {
      const existingCategory = await prisma.category.findUnique({
        where: { name: newName },
      });

      if (existingCategory)
        return res
          .status(400)
          .json({ message: "Name already exists find a new one!!!" });

      const updatedCategory = await prisma.category.update({
        where: { name },
        data: { name: newName, updated: new Date(Date.now()) },
      });
      return res.status(200).json({
        message: "Category updated successfully",
        updatedCategory,
      });
    } catch (error) {
      console.error("Error updating category:", error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred while updating the category",
        data: error.message,
      });
    }
  },

  deleteCategory: async (req, res) => {
    const { name } = req.body;

    try {
      // Find the category
      const existingCategory = await prisma.category.findFirst({
        where: { name },
      });

      // If the category doesn't exist, return a 404 error
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Check if there are items associated with the category
      const associatedItems = await prisma.item.findMany({
        where: { categoryId: existingCategory.id },
      });

      if (associatedItems.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete category with associated items. Delete items first.",
        });
      }

      // If there are no associated items, delete the category
      await prisma.category.delete({
        where: { name },
      });

      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred while deleting the category",
        data: error.message,
      });
    }
  },
};
