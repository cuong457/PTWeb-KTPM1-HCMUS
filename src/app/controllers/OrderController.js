const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");
const UserModel = require("../models/User");
const ProductModel = require("../models/Product");

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

  // products
  // [
  //   {
  //     productId: new ObjectId("63a923f331d665cc66bd16f4"),
  //     quantity: 1,
  //     total: 49000,
  //     selected: true,
  //     _id: new ObjectId("63b025ecd8fe1245e489edae"),
  //     createdAt: 2022-12-31T12:07:08.017Z,
  //     updatedAt: 2022-12-31T12:07:11.197Z
  //   }
  // ]
  const products = [...cart.products].filter((prod) => {
    return prod.selected;
  });

  // dang lam
  const productSelectedPromises = products.map((prod) => {
    return ProductModel.findById(prod.productId);
  });

  const productsUpdatedSpent = await Promise.all(productSelectedPromises);
  const productsUpdatedSpentPromises = products.map((prod, index) => {
    productsUpdatedSpent[index]["total_purchase"] += prod.total;
    return productsUpdatedSpent[index].save();
  });
  await Promise.all(productsUpdatedSpentPromises);
  // dang lam

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

exports.updateOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await OrderModel.findByIdAndUpdate(orderId, req.body, {
    validateBeforeSave: true,
    new: true,
  });

  if (!order) {
    return next(new AppError(400, "cannot find order with that id"));
  }

  return res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});
