const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();

dotenv.config({ path: "./.env" });
module.exports = {
  getCartByUser: async (req, res) => {
    const email = req.decoded.payload.email;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      const cartItems = await prisma.cartItem.findMany({
        where: {
          userId: user.id,
        },
      });

      res.status(200).json(cartItems);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  addCartItem: async (req, res) => {
    const email = req.decoded.payload.email;
    const { name, size, price, color } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      const item = await prisma.item.findFirst({
        where: {
          name,
        },
        include: {
          SizesAndPrices: true,
        },
      });

      if (!item) return res.status(400).json({ message: "Item not found" });

      const stock = await prisma.sizesAndPrices.findMany({
        where: {
          size,
          price: parseFloat(price),
          color,
          itemId: item.id,
        },
      });

      console.log(stock);

      if (!stock)
        return res.status(400).json({ message: "Item type not found" });

      let itemStock = Number(stock.stock);
      if (itemStock < 1)
        return res.status(400).json({ message: "Out of stock" });
      await prisma.cartItem.create({
        data: {
          item: item.name,
          images: item.images,
          size,
          price: parseFloat(price),
          color,
          owner: { connect: { id: user.id } },
          created: new Date(Date.now()),
        },
      });

      const newStock = itemStock - 1;
      await prisma.sizesAndPrices.update({
        where: {
          id: stock.id,
        },
        data: {
          stock: Number(newStock),
        },
      });

      return res.status(201).json({ message: "Added to cart" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  removeOneCartItem: async (req, res) => {
    const email = req.decoded.payload.email;
    const { item, size, color } = req.params;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      const stock = await prisma.sizesAndPrices.findFirst({
        where: {
          itemId: item.id,
          color,
          price,
          size,
        },
      });

      if (!stock)
        return res.status(400).json({ message: "Item type not found" });

      let itemStock = Number(stock.stock);

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          item,
        },
      });

      if (!cartItem)
        return res.status(400).json({ message: "No items to remove" });

      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });

      const newStock = itemStock + 1;
      await prisma.sizesAndPrices.update({
        where: {
          id: stock.id,
        },
        data: {
          stock: newStock,
        },
      });

      res.status(200).json({ message: "Removed item" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  removeCartItem: async (req, res) => {
    const email = req.decoded.payload.email;
    const { item } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          item,
        },
      });

      if (!cartItem)
        return res.status(400).json({ message: "No items to remove" });

      await prisma.cartItem.delete({
        where: {
          item: cartItem.item,
        },
      });

      res.status(200).json({ message: "Removed item" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  removeOneCartItem: async (req, res) => {
    const email = req.decoded.payload.email;
    const { item } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          item,
        },
      });

      if (!cartItem)
        return res.status(400).json({ message: "No items to remove" });

      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });

      res.status(200).json({ message: "Removed item" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
  removeAllCartItems: async (req, res) => {
    const email = req.decoded.payload.email;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!cartItem)
        return res.status(400).json({ message: "No items to remove" });

      await prisma.cartItem.deleteMany({
        where: {
          userId: user.id,
        },
      });

      res.status(200).json({ message: "All items removed" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error ocurred",
        data: error,
      });
    }
  },
};
