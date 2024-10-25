const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

dotenv.config({ path: "./.env" });
module.exports = {
  addImages: async (req, res) => {
    const { name } = req.params;
    let fileURLs = [];
    for (let i = 0; i < req.files.length; i++) {
      let url = `${req.protocol}://${req.get("host")}/${req.files[i].filename}`;
      fileURLs.push(url);
    }

    const existingItem = await prisma.item.findFirst({
      where: {
        name,
      },
    });

    if (!existingItem) return res.status(401).json({ data: "Item not found" });

    try {
      await prisma.item.update({
        where: {
          id: existingItem.id,
        },
        data: {
          images: fileURLs,
        },
      });

      return res.status(200).json({ data: "Images added" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ data: "An error ocurred" });
    }
  },
  appendImages: async (req, res) => {
    const { id } = req.params;
    const url = `${req.protocol}://${req.get("host")}/${req.file.filename}`;

    try {
      // Validate ID as an integer for Prisma
      const itemId = parseInt(id);
      if (isNaN(itemId)) {
        return res.status(400).json({ data: "Invalid item ID format" });
      }

      // Fetch the existing item
      const existingItem = await prisma.item.findUnique({
        where: { id: itemId },
      });

      if (!existingItem) {
        return res.status(404).json({ data: "Item not found" });
      }

      // Append new URL to existing images array
      const updatedImages = [...(existingItem.images || []), url];

      // Update the item
      await prisma.item.update({
        where: { id: itemId },
        data: { images: updatedImages },
      });

      return res.status(200).json({ data: "New image appended successfully" });
    } catch (error) {
      console.error("Error appending image:", error);
      return res.status(500).json({ data: "An error occurred" });
    }
  },
  removeImage: async (req, res) => {
    const { name, imagesToRemove } = req.body;

    try {
      // Validate that imagesToRemove is an array
      if (!Array.isArray(imagesToRemove) || imagesToRemove.length === 0) {
        return res.status(400).json({ error: "Invalid image(s) to remove" });
      }

      // Find the item by name
      const existingItem = await prisma.item.findUnique({
        where: { name },
      });

      if (!existingItem) {
        return res.status(404).json({ data: "Item not found" });
      }

      // Filter out images to be removed
      const updatedImages = existingItem.images.filter(
        (image) => !imagesToRemove.includes(image)
      );

      if (updatedImages.length === existingItem.images.length) {
        return res.status(400).json({ error: "None of the images matched" });
      }

      // Update item with the remaining images
      await prisma.item.update({
        where: { id: existingItem.id },
        data: { images: updatedImages, updated: new Date() },
      });

      return res.status(200).json({ data: "Images removed successfully" });
    } catch (error) {
      console.error("Error removing image:", error);
      return res.status(500).json({ data: "An error occurred" });
    }
  },
  addItem: async (req, res) => {
    try {
      const { name, sizeprice, category } = req.body;

      const item = await prisma.item.findUnique({
        where: {
          name,
        },
      });

      if (item) return res.status(401).json({ message: "Item already exists" });

      const findCategory = await prisma.category.findUnique({
        where: {
          name: category,
        },
      });

      if (!findCategory)
        return res.status(401).json({ message: "Category does not exist" });

      const newItem = await prisma.item.create({
        data: {
          name: name.toLowerCase(),
          category: { connect: { id: findCategory.id } },
          created: new Date(Date.now()),
        },
      });

      const sizesAndPricesPromises = sizeprice.map(
        ({ size, price, stock, color }) => {
          return prisma.sizesAndPrices.create({
            data: {
              size: size.toLowerCase(),
              price: parseFloat(price),
              stock: Number(stock),
              color: color.toLowerCase(),
              created: new Date(Date.now()),
              item: { connect: { id: newItem.id } },
            },
          });
        }
      );

      await Promise.all(sizesAndPricesPromises);

      return res.status(201).json({ message: "Item created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  getItem: async (req, res) => {
    try {
      const { name } = req.params;
      const item = await prisma.item.findFirst({
        where: {
          name,
        },
        include: {
          category: true,
          SizesAndPrices: true,
        },
      });

      return res.status(200).json(item);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  getItems: async (req, res) => {
    try {
      const items = await prisma.item.findMany({
        include: { SizesAndPrices: true },
      });

      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  getItemsByCategory: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const items = await prisma.item.findMany({
        where: {
          categoryId,
        },
        include: { SizesAndPrices: true },
      });

      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  updateItem: async (req, res) => {
    const { id } = req.params;
    try {
      const { name, sizeprice, category } = req.body;

      // Find the item to update
      const existingItem = await prisma.item.findUnique({
        where: { id },
      });

      if (!existingItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      // Find the category
      const findCategory = await prisma.category.findFirst({
        where: { name: category },
      });

      if (!findCategory) {
        return res.status(404).json({ message: "Category does not exist" });
      }

      const data = {
        name: name ?? existingItem.name,
        updated: new Date(Date.now()),
        ...(category && {
          categoryId: (
            await prisma.category.findFirst({ where: { name: category } })
          ).id,
        }),
      };

      // Update the item details
      const updatedItem = await prisma.item.update({
        where: { id },
        data,
      });

      // If sizes and prices are provided, update them
      if (sizeprice && sizeprice.length > 0) {
        // Delete existing SizesAndPrices for this item
        await prisma.sizesAndPrices.deleteMany({
          where: { itemId: id },
        });

        // Re-create the SizesAndPrices
        const sizesAndPricesPromises = sizeprice.map(
          ({ size, price, color, stock }) => {
            return prisma.sizesAndPrices.create({
              data: {
                size: size.toLowerCase(),
                color: color.toLowerCase(),
                price: parseFloat(price),
                stock: Number(stock),
                itemId: updatedItem.id,
                updated: new Date(Date.now()),
              },
            });
          }
        );

        // Wait for all sizes and prices to be updated
        await Promise.all(sizesAndPricesPromises);
      }

      return res
        .status(200)
        .json({ message: "Item updated successfully", updatedItem });
    } catch (error) {
      console.error("Error updating item:", error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred while updating the item",
        data: error.message,
      });
    }
  },

  deleteItem: async (req, res) => {
    const { name } = req.params;
    try {
      // Check if the item exists
      const existingItem = await prisma.item.findFirst({
        where: { name },
      });

      if (!existingItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      // Delete associated SizesAndPrices records for the item
      await prisma.sizesAndPrices.deleteMany({
        where: { itemId: existingItem.id },
      });

      // Delete the item itself
      await prisma.item.delete({
        where: { id: existingItem.id },
      });

      return res
        .status(200)
        .json({ message: "Item and its associated data deleted successfully" });
    } catch (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred while deleting the item",
        data: error.message,
      });
    }
  },
};
