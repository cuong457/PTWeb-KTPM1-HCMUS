const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");
const UserModel = require("../models/User");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { phone, address, note, payment } = req.query;

  if (!phone || !address || !note || !payment) return next();

  const cart = await CartModel.findOne({ userId: req.user._id });
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { phone, address },
    { new: true, runValidators: true }
  );

  if (!cart) {
    return next(new AppError(404, "cannot find your cart"));
  }

  if (!user) {
    return next(new AppError(404, "cannot find your account"));
  }

  const products = [...cart.products].filter((product) => {
    return product.selected;
  });

  const totalPrice = products.reduce((accumulator, prod) => {
    return accumulator + prod.total;
  }, 0);

  // update total spent for user
  if (user.total_spent) {
    user.total_spent += totalPrice + 20000;
  }
  user.total_spent = totalPrice + 20000;
  await user.save();
  // create order
  const order = await OrderModel.create({
    userId: cart.userId,
    products,
    subTotal: totalPrice + 20000,
    note,
    payment,
  });

  // remove all ordered products
  const remainProducts = cart.products.filter((product) => {
    return product.selected === false;
  });
  cart.products = remainProducts;
  const newCart = await cart.save();

  res.redirect(`/`);
});
