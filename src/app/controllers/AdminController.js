
const catchAsync = require("../../utils/catchAsync");
const UserModel = require("../models/User");
const ELEMENT_PER_PAGE = 6;

exports.renderDashBoard = (req, res, next) => {
  res.render("./admin/dashboard", {
    layout: "adminMain.hbs",
  });
};

exports.renderBilling = (req, res, next) => {
  res.render("./admin/billing", { layout: "adminMain.hbs" });
};

exports.renderProfile = (req, res, next) => {
  res.render("./admin/profile", { layout: "adminMain.hbs" });
};

exports.renderSignIn = (req, res, next) => {
  res.render("./admin/sign-in", { layout: false });
};

exports.renderSignUp = (req, res, next) => {
  res.render("./admin/sign-up", { layout: false });
};

exports.renderUserDetail = (req, res, next) => {
  res.render("./admin/user-detail", { 
    layout: "adminMain.hbs"
  });
};

exports.getUserData = catchAsync( async (req, res, next) => {
  let page = req.query.page;
  let filter = req.query.filter;
  if(page) {
    // Get specific page
    page = parseInt(page);
    if(page <= 0) page = 1;
  }
  else {
    page = 1;
  }
  let prev = (page > 1) ? page - 1 : page;
  let skipNumElement = (page - 1) * ELEMENT_PER_PAGE;

  // Find all in database
  const total = await UserModel.count();

  const users = await UserModel.find({})
    .skip(skipNumElement)
    .limit(ELEMENT_PER_PAGE)
  
  let pageNumber = (total % ELEMENT_PER_PAGE === 0) ? total / ELEMENT_PER_PAGE : Math.floor(total / ELEMENT_PER_PAGE) + 1;
  
  let nextNum = (page < pageNumber) ? page + 1 : page;
  let pageIndex = {prev, nextNum, maxpage: pageNumber}
  let pageList = [];

  if(pageNumber <= 3 || page === 1) {
    let count = 0;
    for(let i = page; i <= pageNumber && count < 3; i++, count++) {
      pageList.push({num: i, is_cur: false});
    }
  }
  else {
      let count = 0;
      if(page <= pageNumber) {
        pageList.push({num: page, is_cur: false});
        count++;
      }
      if(page + 1 <= pageNumber) {
        pageList.push({num: page + 1, is_cur: false});
        count++;
      }
      for(let i = page - 1; i >= 1 && count < 3; i--, count++) {
        pageList.unshift({num: i, is_cur: false});
      }
  }
  for(let i = 0; i < pageList.length; i++) {
    if(pageList[i].num === page) {
      pageList[i].is_cur = true;
    }
  }
  res.status(200).json({
    status: "success",
    data: {
      users,
      pageList,
      pageIndex
    },
  });
});

exports.renderTables = (req, res, next) => {
  res.render("./admin/user-center", { 
    layout: "adminMain.hbs"
  });
};

exports.renderCreateProduct = (req, res, next) => {
  res.render("./admin/create-product", { 
  
  });
}

exports.createNewProduct = catchAsync(async (req, res, next) => {
  console.log("ko nhận được", req.body);
  res.status(200).json({
    message: "success"
  })
});