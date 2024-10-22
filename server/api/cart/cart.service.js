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
    const email = req.decoded.payload.email; // Get user email from decoded JWT token
    const { name, size, price, color, quantity } = req.body; // Assume `quantity` is passed in the request body

    try {
      // 1. Fetch the user
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      // 2. Fetch the item and its stock (SizesAndPrices)
      const item = await prisma.item.findFirst({
        where: { name },
        include: { SizesAndPrices: true },
      });

      if (!item) return res.status(400).json({ message: "Item not found" });

      const stock = await prisma.sizesAndPrices.findFirst({
        where: {
          size,
          price: parseFloat(price),
          color,
          itemId: item.id,
        },
      });

      if (!stock)
        return res.status(400).json({ message: "Item variant not found" });

      // 3. Check if enough stock is available
      let itemStock = Number(stock.stock);
      if (itemStock < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      // 4. Check if the item already exists in the user's cart
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          item: item.name,
          size,
          color,
          owner: { id: user.id },
        },
      });

      if (existingCartItem) {
        // If the item exists, update the quantity and total price
        const newQuantity = existingCartItem.quantity + quantity;
        const newTotalPrice = existingCartItem.totalPrice + price * quantity;

        await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: newQuantity,
            totalPrice: newTotalPrice,
          },
        });
      } else {
        // If the item doesn't exist, add a new cart item
        await prisma.cartItem.create({
          data: {
            item: item.name,
            images: item.images,
            size,
            price: parseFloat(price),
            color,
            quantity,
            totalPrice: price * quantity,
            owner: { connect: { id: user.id } },
            created: new Date(Date.now()),
          },
        });
      }

      // 5. Deduct stock from the item
      const newStock = itemStock - quantity;

      await prisma.sizesAndPrices.update({
        where: { id: stock.id },
        data: { stock: newStock },
      });

      return res
        .status(201)
        .json({ message: "Item added to cart successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred",
        data: error,
      });
    }
  },
  reduceCartItem: async (req, res) => {
    const email = req.decoded.payload.email; // Get user email from decoded JWT token
    const { name, size, price, color } = req.body; // Assume item details are passed in the request body

    try {
      // 1. Fetch the user
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      // 2. Fetch the cart item for the user
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          item: name,
          size,
          color,
          owner: { id: user.id },
        },
      });

      if (!cartItem)
        return res.status(400).json({ message: "Cart item not found" });

      // 3. Fetch the stock for the item in SizesAndPrices
      const stock = await prisma.sizesAndPrices.findFirst({
        where: {
          size,
          price: parseFloat(price),
          color,
          itemId: cartItem.itemId, // Assuming itemId exists in cartItem
        },
      });

      if (!stock)
        return res.status(400).json({ message: "Item variant not found" });

      // 4. Reduce cart item quantity
      const newQuantity = cartItem.quantity - 1;
      const updatedTotalPrice = cartItem.totalPrice - parseFloat(price);

      if (newQuantity <= 0) {
        // 5. If the quantity is 0 or less, remove the cart item
        await prisma.cartItem.delete({
          where: { id: cartItem.id },
        });
      } else {
        // 6. Update the cart item with the new quantity and total price
        await prisma.cartItem.update({
          where: { id: cartItem.id },
          data: {
            quantity: newQuantity,
            totalPrice: updatedTotalPrice,
          },
        });
      }

      // 7. Restore the stock in SizesAndPrices by increasing it
      const newStock = stock.stock + 1;

      await prisma.sizesAndPrices.update({
        where: { id: stock.id },
        data: { stock: newStock },
      });

      return res
        .status(200)
        .json({ message: "Cart item quantity updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred",
        data: error,
      });
    }
  },
  removeCartItem: async (req, res) => {
    const email = req.decoded.payload.email; // Get user email from decoded JWT token
    const { name, size, price, color } = req.body; // Assume item details are passed in the request body

    try {
      // 1. Fetch the user
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      // 2. Fetch the cart item for the user
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          item: name,
          size,
          color,
          owner: { id: user.id },
        },
      });

      if (!cartItem)
        return res.status(400).json({ message: "Cart item not found" });

      // 3. Fetch the stock for the item in SizesAndPrices
      const stock = await prisma.sizesAndPrices.findFirst({
        where: {
          size,
          price: parseFloat(price),
          color,
          itemId: cartItem.itemId, // Assuming itemId exists in cartItem
        },
      });

      if (!stock)
        return res.status(400).json({ message: "Item variant not found" });

      // 4. Restore the stock by adding the cart item's quantity back to SizesAndPrices
      const restoredStock = stock.stock + cartItem.quantity;

      await prisma.sizesAndPrices.update({
        where: { id: stock.id },
        data: { stock: restoredStock },
      });

      // 5. Remove the cart item from the cart
      await prisma.cartItem.delete({
        where: { id: cartItem.id },
      });

      return res
        .status(200)
        .json({ message: "Cart item removed and stock restored" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred",
        data: error,
      });
    }
  },
  purchaseCartItems: async (req, res) => {
    const email = req.decoded.payload.email;

    try {
      // 1. Fetch the user
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) return res.status(400).json({ message: "User not found" });

      // 2. Fetch the user's cart items
      const cartItems = await prisma.cartItem.findMany({
        where: { userId: user.id },
      });

      if (cartItems.length === 0)
        return res.status(400).json({ message: "No items in cart" });

      let totalQuantity = 0;
      let totalPrice = 0;

      // 3. Calculate totals, but do NOT deduct stock
      const purchaseItems = cartItems.map((cartItem) => {
        const { size, color, price, quantity, item } = cartItem;

        // Update total cost and quantity
        totalQuantity += quantity;
        totalPrice += price * quantity;

        return {
          itemName: item,
          size,
          color,
          price,
          quantity,
          totalCost: price * quantity,
        };
      });

      // 4. Create a new purchase entry
      const purchase = await prisma.purchase.create({
        data: {
          userId: user.id,
          totalQuantity,
          totalPrice,
          items: {
            create: purchaseItems, // Create related PurchaseItem entries
          },
          paymentMethod: req.body.paymentMethod || "card", // Assuming payment method is passed in the body
        },
      });

      // 5. Clear the cart
      await prisma.cartItem.deleteMany({
        where: { userId: user.id },
      });

      return res.status(201).json({
        message: "Purchase completed successfully",
        purchase,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred during the purchase process",
        data: error.message,
      });
    }
  },
};
