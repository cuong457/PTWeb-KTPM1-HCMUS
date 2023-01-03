const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const CartModel = require("../models/Cart");
const ProductModel = require("../models/Product");
const Paginator = require("paginator");
const fileSystem = require("fs");

exports.getListProduct = catchAsync(async (req, res, next) => {
  const options = {};
  let page = 1;
  if (req.query.hasOwnProperty("_search")) {
    Object.assign(options, {
      name: { $regex: req.query._search, $options: "i" },
    });
  }

  if (req.query.hasOwnProperty("priceRange")) {
    const [from, to] = req.query.priceRange.split(",");
    options["price"] = { $gte: +from * 1000, $lte: +to * 1000 };
  }

  if (req.query.hasOwnProperty("manufacturer")) {
    const manufacturer = req.query.manufacturer;
    const manufacurerQuery = manufacturer.replaceAll("_", " ");
    const manufacturers = manufacurerQuery.split(",");
    options["manufacturer"] = {
      $in: manufacturers,
    };
  }

  if (req.query.hasOwnProperty("category")) {
    const category = req.query.category;
    const categoryQuery = category.replaceAll("_", " ");
    if (categoryQuery !== "All") {
      options["category"] = { $regex: categoryQuery, $options: "i" };
    }
  }

  if (req.query.hasOwnProperty("page")) {
    page = +req.query.page;

    if (isNaN(page) || page < 0) {
      page = 1;
    }
  }

  const skipNum = (page - 1) * 3;

  // for pagination
  const allProducts = await ProductModel.find(options);
  const productLength = Math.ceil(allProducts.length / 6);
  const productPage = [];
  for (let i = 0; i < productLength; ++i) {
    productPage[i] = {
      value: i + 1,
    };
  }
  const products = await ProductModel.find(options)
    .skip(skipNum)
    .limit(3)
    .sortable(req);

  // pagination
  // items per page, pages per section
  const paginator = new Paginator(3, 3);
  const all = await ProductModel.find(options);
  const totalLength = all.length;
  const pagination_info = paginator.build(totalLength, page);

  res.status(200).json({
    status: "success",
    data: {
      foods: products,
      productPage,
      pagination_info,
    },
  });
});

exports.updateItemQuantity = catchAsync(async (req, res, next) => {
  // for logged-in user
  const cart = await CartModel.findOne({ userId: req.user._id });
  const productId = req.params.id;
  const quantity = req.body.quantity || 0;
  const price = req.body.price || 0;
  const type = req.body.type || "add";
  let newCart = null;

  if (!cart) {
    return next(new AppError(400, "cannot find cart with that userId"));
  }

  if (quantity === "" || isNaN(quantity) || quantity <= 0) {
    return next(new AppError(400, "invalid quantity value"));
  }

  if (type === "add") {
    newCart = await cart.addItemToCart(productId, quantity, price);
  } else {
    newCart = await cart.setItemCart(productId, quantity, price);
  }

  res.status(200).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.updateSelectFieldToItem = catchAsync(async (req, res, next) => {
  const productIds = req.body.productIds;
  const cart = await CartModel.findOne({ userId: req.user._id });

  if (!productIds || productIds.length === 0) {
    return next(new AppError(400, "vui lòng chọn món ăn"));
  }

  cart.products.forEach((product, index) => {
    cart.products[index].selected = false;

    if (productIds.includes(String(product.productId))) {
      cart.products[index].selected = true;
    }
  });

  const newCart = await cart.save();
  res.status(200).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const cart = await CartModel.findOne({ userId: req.user._id });
  const productId = req.params.id;

  if (!cart) {
    return next(new AppError(400, "cannot find cart, cannot delete item"));
  }

  const deleteIndex = cart.products.findIndex(
    (product) => String(product.productId) === productId
  );

  if (deleteIndex === -1) {
    return next(new AppError(400, "cannot find item to delete"));
  }

  // update subtotal
  cart.subTotal -= cart.products[deleteIndex].total;
  // delete and save
  cart.products.splice(deleteIndex, 1);
  const newCart = await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.getProductInfo = catchAsync(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new AppError(400, "Product's id not exists."));
  }

  res.status(200).json({
    status: "success",
    data: {
      food: product,
    },
  });
});

exports.deleteProductsImg = catchAsync(async (req, res, next) => {
  const paths = `${req.body.paths}`.split(",");

  paths.forEach((path) => {
    const serverPath = `src/public${path}`;
    try {
      fileSystem.unlinkSync(serverPath);
    } catch (error) {
      return next(new AppError(400, "File remove failed."));
    }
  });

  res.status(200).json({ status: "success" });
});
