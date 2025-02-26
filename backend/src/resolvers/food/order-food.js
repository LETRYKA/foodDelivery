import Order from "../../models/order-schema.js";
import Food from "../../models/food-schema.js";

export const orderFood = async (req, res, next) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order request" });
    }

    let totalPrice = 0;

    // Validate food items and calculate total price
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const food = await Food.findById(item.foodId);
        if (!food) {
          throw new Error(`Food item not found: ${item.foodId}`);
        }
        totalPrice += food.price * item.quantity;
        return {
          food: food._id,
          quantity: item.quantity,
        };
      })
    );

    // Create order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.food", "name price imageUrl")
      .lean();

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("user", "name email")
      .populate("items.food", "name price imageUrl")
      .lean();

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Preparing", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.food", "name price imageUrl")
      .lean();

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated", data: order });
  } catch (err) {
    next(err);
  }
};
