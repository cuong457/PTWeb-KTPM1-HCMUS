const catchAsync = require("../../utils/catchAsync");
const UserModel = require("../models/User");
const ProductModel = require("../models/Product");
const OrderModel = require("../models/Order");

const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../../utils/AppError");

const ELEMENT_PER_PAGE = 6;

// multer(upload file) setup
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // only support image files
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "only image files are supported"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  { name: "foodThumbnail", maxCount: 1 },
  { name: "photo", maxCount: 3 },
]);

exports.resizeUploadImages = catchAsync(async (req, res, next) => {
  if (!req.files["foodThumbnail"] && !req.files["photo"]) {
    return next();
  }

  if (req.files["foodThumbnail"]) {
    const foodThumbnailName = `food-${Math.ceil(
      Math.random() * 1000
    )}-${Date.now()}-cover.png`;
    req.body.foodThumbnail = `/images/foodThumnail/${foodThumbnailName}`;

    await sharp(req.files["foodThumbnail"][0].buffer)
      .resize(610, 610)
      .toFormat("png")
      // start at root folder
      .toFile(`./src/public${req.body.foodThumbnail}`);
  }

  if (req.files["photo"]) {
    let images = [];

    const resizeImagePromises = req.files["photo"].map(async (file, index) => {
      const imgIntroFileName = `food-${Math.ceil(
        Math.random() * 1000
      )}-${Date.now()}-${index + 1}.png`;
      images.push(`/images/foods/${imgIntroFileName}`);

      return sharp(file.buffer)
        .resize(610, 610)
        .toFormat("png")
        .toFile(`./src/public/images/foods/${imgIntroFileName}`);
    });

    Promise.all(resizeImagePromises);
    req.body.photo = images;
  }

  next();
});

exports.renderDashBoard = (req, res, next) => {
  res.render("./admin/dashboard", {
    layout: "adminMain.hbs",
  });
};

// note: remember to remove profile.hbs
exports.renderOrders = (req, res, next) => {
  res.render("./admin/orders", { layout: "adminMain.hbs" });
};

exports.renderSignIn = (req, res, next) => {
  res.render("./admin/sign-in", { layout: false });
};

exports.renderSignUp = (req, res, next) => {
  res.render("./admin/sign-up", { layout: false });
};

exports.getProductsData = catchAsync(async (req, res, next) => {
  // Get params
  let page = req.query.page;
  let sortQ = req.query.sort;
  let key_search = req.query.search;
  let type_search = req.query.type.toLowerCase();
  // Handle Page Number
  if (page) {
    // Get specific page
    page = parseInt(page);
    if (page <= 0) page = 1;
  } else {
    page = 1;
  }
  let prev = page > 1 ? page - 1 : page;
  let skipNumElement = (page - 1) * ELEMENT_PER_PAGE;
  // Handle Sort Option
  let sort_option = {};
  let option_list = sortQ.split("-");
  let is_descending = false;
  for (let i = 0; i < option_list.length; i++) {
    if (option_list[i] === "name") {
      sort_option["name"] = 1;
    } else if (option_list[i] === "time") {
      sort_option["createdAt"] = 1;
    } else if (option_list[i] === "price") {
      sort_option["price"] = 1;
    } else if (option_list[i] === "tp") {
      sort_option["total_purchase"] = 1;
    } else if (option_list[i] === "desorder") {
      is_descending = true;
    }
  }

  if (is_descending) {
    Object.keys(sort_option).forEach((key) => {
      sort_option[key] = -1;
    });
  }

  // Handle search
  let search_option = {};
  if (type_search != "none" && key_search != "") {
    search_option[type_search] = { $regex: key_search, $options: "i" };
  }

  // Find all in database
  const total = await ProductModel.find(search_option).count();

  let products = await ProductModel.find(search_option)
    .sort(sort_option)
    .skip(skipNumElement)
    .limit(ELEMENT_PER_PAGE);

  let pageNumber =
    total % ELEMENT_PER_PAGE === 0
      ? total / ELEMENT_PER_PAGE
      : Math.floor(total / ELEMENT_PER_PAGE) + 1;

  let nextNum = page < pageNumber ? page + 1 : page;
  let pageIndex = { prev, nextNum, maxpage: pageNumber };
  let pageList = [];

  if (pageNumber <= 3 || page === 1) {
    let count = 0;
    for (let i = page; i <= pageNumber && count < 3; i++, count++) {
      pageList.push({ num: i, is_cur: false });
    }
  } else {
    let count = 0;
    if (page <= pageNumber) {
      pageList.push({ num: page, is_cur: false });
      count++;
    }
    if (page + 1 <= pageNumber) {
      pageList.push({ num: page + 1, is_cur: false });
      count++;
    }
    for (let i = page - 1; i >= 1 && count < 3; i--, count++) {
      pageList.unshift({ num: i, is_cur: false });
    }
  }
  for (let i = 0; i < pageList.length; i++) {
    if (pageList[i].num === page) {
      pageList[i].is_cur = true;
    }
  }
  res.status(200).json({
    status: "success",
    data: {
      products,
      pageList,
      pageIndex,
    },
  });
});

exports.getOrdersData = catchAsync(async (req, res, next) => {
  // Get params
  let page = req.query.page;
  let sortQ = req.query.sort;
  let status = req.query.status;
  // Handle Page Number
  if (page) {
    // Get specific page
    page = parseInt(page);
    if (page <= 0) page = 1;
  } else {
    page = 1;
  }
  let prev = page > 1 ? page - 1 : page;
  let skipNumElement = (page - 1) * ELEMENT_PER_PAGE;
  // Handle Sort Option
  let sort_option = {};
  let option_list = sortQ.split("-");
  let is_descending = false;
  for (let i = 0; i < option_list.length; i++) {
    if (option_list[i] === "name") {
      sort_option["name"] = 1;
    } else if (option_list[i] === "time") {
      sort_option["createdAt"] = 1;
    } else if (option_list[i] === "subTotal") {
      sort_option["subTotal"] = 1;
    } else if (option_list[i] === "desorder") {
      is_descending = true;
    }
  }

  if (is_descending) {
    Object.keys(sort_option).forEach((key) => {
      sort_option[key] = -1;
    });
  }

  // Handle search
  let search_option = {};
  if (status) {
    search_option["status"] = status;
  }

  // Find all in database
  const total = await OrderModel.find(search_option).count();

  let orders = await OrderModel.find(search_option)
    .sort(sort_option)
    .skip(skipNumElement)
    .limit(ELEMENT_PER_PAGE)
    .populate("userId");

  let pageNumber =
    total % ELEMENT_PER_PAGE === 0
      ? total / ELEMENT_PER_PAGE
      : Math.floor(total / ELEMENT_PER_PAGE) + 1;

  let nextNum = page < pageNumber ? page + 1 : page;
  let pageIndex = { prev, nextNum, maxpage: pageNumber };
  let pageList = [];

  if (pageNumber <= 3 || page === 1) {
    let count = 0;
    for (let i = page; i <= pageNumber && count < 3; i++, count++) {
      pageList.push({ num: i, is_cur: false });
    }
  } else {
    let count = 0;
    if (page <= pageNumber) {
      pageList.push({ num: page, is_cur: false });
      count++;
    }
    if (page + 1 <= pageNumber) {
      pageList.push({ num: page + 1, is_cur: false });
      count++;
    }
    for (let i = page - 1; i >= 1 && count < 3; i--, count++) {
      pageList.unshift({ num: i, is_cur: false });
    }
  }
  for (let i = 0; i < pageList.length; i++) {
    if (pageList[i].num === page) {
      pageList[i].is_cur = true;
    }
  }
  res.status(200).json({
    status: "success",
    data: {
      orders,
      pageList,
      pageIndex,
    },
  });
});

// exports.getOrdersData = catchAsync(async (req, res, next) => {
//   // Get params
//   let page = req.query.page;
//   let sortQ = req.query.sort;
//   let type_search = req.query.type.toLowerCase();
//   // Handle Page Number
//   if (page) {
//     // Get specific page
//     page = parseInt(page);
//     if (page <= 0) page = 1;
//   } else {
//     page = 1;
//   }
//   let prev = page > 1 ? page - 1 : page;
//   let skipNumElement = (page - 1) * ELEMENT_PER_PAGE;
//   // Handle Sort Option
//   let sort_option = {};
//   let option_list = sortQ.split("-");
//   let is_descending = false;
//   for (let i = 0; i < option_list.length; i++) {
//     if (option_list[i] === "name") {
//       sort_option["name"] = 1;
//     } else if (option_list[i] === "time") {
//       sort_option["createdAt"] = 1;
//     } else if (option_list[i] === "price") {
//       sort_option["price"] = 1;
//     } else if (option_list[i] === "desorder") {
//       is_descending = true;
//     }
//   }

//   if (is_descending) {
//     Object.keys(sort_option).forEach((key) => {
//       sort_option[key] = -1;
//     });
//   }

//   // Handle search
//   let search_option = {};

//   // Find all in database
//   const total = await OrderModel.find(search_option).count();

//   let orders = await OrderModel.find(search_option)
//     .sort(sort_option)
//     .skip(skipNumElement)
//     .limit(ELEMENT_PER_PAGE);

//   let pageNumber =
//     total % ELEMENT_PER_PAGE === 0
//       ? total / ELEMENT_PER_PAGE
//       : Math.floor(total / ELEMENT_PER_PAGE) + 1;

//   let nextNum = page < pageNumber ? page + 1 : page;
//   let pageIndex = { prev, nextNum, maxpage: pageNumber };
//   let pageList = [];

//   if (pageNumber <= 3 || page === 1) {
//     let count = 0;
//     for (let i = page; i <= pageNumber && count < 3; i++, count++) {
//       pageList.push({ num: i, is_cur: false });
//     }
//   } else {
//     let count = 0;
//     if (page <= pageNumber) {
//       pageList.push({ num: page, is_cur: false });
//       count++;
//     }
//     if (page + 1 <= pageNumber) {
//       pageList.push({ num: page + 1, is_cur: false });
//       count++;
//     }
//     for (let i = page - 1; i >= 1 && count < 3; i--, count++) {
//       pageList.unshift({ num: i, is_cur: false });
//     }
//   }
//   for (let i = 0; i < pageList.length; i++) {
//     if (pageList[i].num === page) {
//       pageList[i].is_cur = true;
//     }
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       orders,
//       pageList,
//       pageIndex,
//     },
//   });
// });

exports.renderProducts = (req, res, next) => {
  res.render("./admin/products", { layout: "adminMain.hbs" });
};

function percentCompareToLastMonth(type, list) {
  let length = list.length;
  if (length <= 1) return 100;
  if (type === 0) {
    return (
      ((list[length - 1].users - list[length - 2].users) /
        list[length - 1].users) *
      100
    ).toFixed(2);
  } else if (type === 1) {
    return (
      ((list[length - 1].sales - list[length - 2].sales) /
        list[length - 1].sales) *
      100
    ).toFixed(2);
  }
}
function createMonthDetailList(arr) {
  let result = [{ users: 0, sales: 0 }];
  let users = 0;
  let sales = 0;
  let this_month = new Date(arr[0].createdAt).getUTCMonth();
  for (let i = 0; i < arr.length; i++) {
    let cur_month = new Date(arr[i].createdAt).getUTCMonth();
    if (this_month != cur_month) {
      this_month = cur_month;
      result.push({ users, sales });
    }
    ++users;
    sales += arr[i].total_spent;
  }
  result.push({ users, sales });
  // console.log(result);
  return result;
}
exports.getUserData = catchAsync(async (req, res, next) => {
  // Get params
  let page = req.query.page;
  let sortQ = req.query.sort;
  let key_search = req.query.search;
  let type_search = req.query.type.toLowerCase();
  // Handle Page Number
  if (page) {
    // Get specific page
    page = parseInt(page);
    if (page <= 0) page = 1;
  } else {
    page = 1;
  }
  let prev = page > 1 ? page - 1 : page;
  let skipNumElement = (page - 1) * ELEMENT_PER_PAGE;
  // Handle Sort Option
  let sort_option = {};
  let option_list = sortQ.split("-");
  let is_descending = false;
  for (let i = 0; i < option_list.length; i++) {
    if (option_list[i] === "name") {
      sort_option["name"] = 1;
    } else if (option_list[i] === "email") {
      sort_option["email"] = 1;
    } else if (option_list[i] === "registime") {
      sort_option["createdAt"] = 1;
    } else if (option_list[i] === "spent") {
      sort_option["total_spent"] = 1;
    } else if (option_list[i] === "desorder") {
      is_descending = true;
    }
  }

  if (is_descending) {
    Object.keys(sort_option).forEach((key) => {
      sort_option[key] = -1;
    });
  }

  // Handle search
  let search_option = {};
  if (type_search != "none" && key_search != "") {
    search_option[type_search] = { $regex: key_search, $options: "i" };
  }

  //Find all in database and get detail
  const total = await UserModel.find(search_option).count();
  let total_sales = 0;
  const allData = await UserModel.find({}).sort({ createdAt: 1 });
  allData.forEach((user) => {
    total_sales += user.total_spent;
  });
  let month_list = createMonthDetailList(allData);
  const total_percent = percentCompareToLastMonth(0, month_list);
  const total_sales_percent = percentCompareToLastMonth(1, month_list);
  // Find all in database by search
  const total_s = await UserModel.find(search_option).count();

  let users = await UserModel.find(search_option)
    .sort(sort_option)
    .skip(skipNumElement)
    .limit(ELEMENT_PER_PAGE);

  let pageNumber =
    total_s % ELEMENT_PER_PAGE === 0
      ? total_s / ELEMENT_PER_PAGE
      : Math.floor(total_s / ELEMENT_PER_PAGE) + 1;

  let nextNum = page < pageNumber ? page + 1 : page;
  let pageIndex = { prev, nextNum, maxpage: pageNumber };
  let pageList = [];

  if (pageNumber <= 3 || page === 1) {
    let count = 0;
    for (let i = page; i <= pageNumber && count < 3; i++, count++) {
      pageList.push({ num: i, is_cur: false });
    }
  } else {
    let count = 0;
    if (page <= pageNumber) {
      pageList.push({ num: page, is_cur: false });
      count++;
    }
    if (page + 1 <= pageNumber) {
      pageList.push({ num: page + 1, is_cur: false });
      count++;
    }
    for (let i = page - 1; i >= 1 && count < 3; i--, count++) {
      pageList.unshift({ num: i, is_cur: false });
    }
  }
  for (let i = 0; i < pageList.length; i++) {
    if (pageList[i].num === page) {
      pageList[i].is_cur = true;
    }
  }
  res.status(200).json({
    status: "success",
    data: {
      users,
      pageList,
      pageIndex,
      total,
      total_percent,
      total_sales,
      total_sales_percent,
    },
  });
});

exports.banUser = catchAsync(async (req, res, next) => {
  let userid = req.query.id;
  let handle_type = req.query.type;
  if (userid !== "none") {
    const ban_user = await UserModel.findById(userid);
    if (handle_type === "ban") {
      ban_user.active = false;
    } else if (handle_type === "unban") {
      ban_user.active = true;
    }
    await ban_user.save();
  }
  res.status(200).json({
    status: "success",
  });
});

exports.renderUserCenter = (req, res, next) => {
  res.render("./admin/user-center", {
    layout: "adminMain.hbs",
  });
};

// sign in with google
exports.renderGoogleSignIn = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.renderGoogleCallback = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/admin/sign-in",
});

exports.renderCreateProduct = (req, res, next) => {
  res.render("./admin/create-product", { layout: "adminMain.hbs" });
};

exports.renderUpdateProduct = catchAsync(async (req, res, next) => {
  const food = await ProductModel.findById(req.params.id);

  res.render("./admin/update-product", {
    layout: "adminMain.hbs",
    food,
  });
});

exports.createNewProduct = catchAsync(async (req, res, next) => {
  const newFoodObj = {};

  const imgFields = [];
  Object.keys(req.body).forEach((element) => {
    if (!imgFields.includes(element)) {
      newFoodObj[element] = req.body[element];
    }
  });

  const new_product = await ProductModel.create(newFoodObj);

  if (!new_product) {
    return next(new AppError(400, "Create product failed."));
  }

  res.status(200).json({
    message: "success",
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const FoodObj = {};

  const filter = ["_id"];
  Object.keys(req.body).forEach((element) => {
    if (!filter.includes(element)) {
      FoodObj[element] = req.body[element];
    }
  });

  const newProd = await ProductModel.findByIdAndUpdate(req.body._id, FoodObj);

  if (!newProd) {
    return next(new AppError(404, "Product not found."));
  }

  res.status(200).json({
    message: "update success",
  });
});
