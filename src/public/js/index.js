// import "@babel/polyfill";
import { signOut } from "./auth/sign-out.js";
import {
  handleClearSearchboxUser,
  handleSearch,
  handleFilter,
  renderUC,
  handleSelectType,
} from "./user/uc-handle.js";
import {
  handleClearSearchboxProducts,
  handleSearchProducts,
  handleFilterProducts,
  renderPC,
  handleSelectTypeProducts,
} from "./user/products-handle.js";
import {
  handleFilterOrders,
  renderOC,
  updateOrderStatus,
} from "./user/orders-handle.js";
import {
  handleAddItemToCart,
  handleCartToOrder,
  handleSetItemQuantity,
  handleDeleteItemFromCart,
} from "./payment/cart.js";
import {
  handleSearchAndFilter,
  loadFilterFromSearchParams,
  handlePagination,
  createUrl,
  loadProductPage,
} from "./product/filter.js";
import { clickOrderButton } from "./payment/order.js";

Handlebars.registerHelper("toPrice", (rawPrice) =>
  rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
);
Handlebars.registerHelper("if_cond", (v1, op, v2, options) => {
  switch (op) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
Handlebars.registerHelper("toStandardDate", (raw_date) => {
  return new Date(raw_date).toLocaleDateString();
});
Handlebars.registerHelper("getNameFromEmail", (email) => {
  return email.slice(0, email.indexOf("@"));
});
Handlebars.registerHelper("countTotal", (arr) => {
  let result = 0;
  for (let i in arr) ++result;
  return result;
});
Handlebars.registerHelper("countTotal", (arr) => {
  let result = 0;
  for (let i in arr) ++result;
  return result;
});

// Admin handling
const clearSearchboxUser = document.getElementById("user-clearsearch-btn");
if (clearSearchboxUser) {
  clearSearchboxUser.addEventListener("click", handleClearSearchboxUser);
}
const userSearchBtn = document.getElementById("usercenter-search-button");
if (userSearchBtn) {
  userSearchBtn.addEventListener("click", handleSearch);
}
const userFilterBtn = document.querySelectorAll(".filter-btn");
if (userFilterBtn) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", handleFilter);
  });
}
const first_ren_UC = document.querySelector(".user-list");
if (first_ren_UC) {
  renderUC();
}
const userTypeBtn = document.querySelectorAll(".type-btn");
if (userTypeBtn) {
  userTypeBtn.forEach((btn) => {
    btn.addEventListener("click", handleSelectType);
  });
}
// Product handling
const clearSearchboxProducts = document.getElementById(
  "products-clearsearch-btn"
);
if (clearSearchboxProducts) {
  clearSearchboxProducts.addEventListener(
    "click",
    handleClearSearchboxProducts
  );
}
const productsSearchBtn = document.getElementById("products-search-button");
if (productsSearchBtn) {
  productsSearchBtn.addEventListener("click", handleSearchProducts);
}
const productsFilterBtn = document.querySelectorAll(".products-filter-btn");
if (productsFilterBtn) {
  document.querySelectorAll(".products-filter-btn").forEach((btn) => {
    btn.addEventListener("click", handleFilterProducts);
  });
}
const first_ren_PC = document.querySelector(".products-list");
if (first_ren_PC) {
  renderPC();
}
const productsTypeBtn = document.querySelectorAll(".products-type-btn");
if (productsTypeBtn) {
  productsTypeBtn.forEach((btn) => {
    btn.addEventListener("click", handleSelectTypeProducts);
  });
}

// remove: handleClearSearchboxProducts, handleSearchProducts
// Order handling
const productsFilterOrderBtn = document.querySelectorAll(".orders-filter-btn");
if (productsFilterOrderBtn.length > 0) {
  productsFilterOrderBtn.forEach((btn) => {
    btn.addEventListener("click", handleFilterOrders);
  });

  const productsFilterOrderSelect = document.querySelector(
    ".orders-status-filter"
  );
  productsFilterOrderSelect.addEventListener("change", handleFilterOrders);
}

const first_ren_OC = document.querySelector(".orders-list");
if (first_ren_OC) {
  renderOC();
}

// auth handling
const signOutBtnAdmin = document.getElementById("signout-admin");
const signOutBtnUser = document.getElementById("signout-user");

// filter, sort, pagination handling
const filterSortBtn = document.querySelector(".btn-filter");
const paginationItems = document.querySelectorAll(".page-item");

// search
const buttonSearch = $(".btn.btn-primary");
const inputBoxSearch = $("#search-box");

// cart handling
const addItemBtn = document.querySelector(".btn-addtocart");
const checkoutBtn = document.getElementById("checkout-btn-rtab");
const orderBtn = document.getElementById("buy-btn");
const quantityCartBtn = [
  ...document.querySelectorAll("input[name='quantity']"),
];
const deleteItemBtn = [
  ...document.querySelectorAll("button[name='delete-item-btn']"),
];

if (signOutBtnAdmin) {
  signOutBtnAdmin.addEventListener("click", signOut);
}

if (signOutBtnUser) {
  // alert("logout successfully");
  signOutBtnUser.addEventListener("click", signOut);
}

// add item to cart

if (addItemBtn) {
  addItemBtn.addEventListener("click", handleAddItemToCart);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", handleCartToOrder);
}

// order
if (orderBtn) {
  orderBtn.addEventListener("click", clickOrderButton);
}

if (quantityCartBtn.length > 0) {
  quantityCartBtn.forEach((btn) => {
    btn.addEventListener("change", handleSetItemQuantity);
  });
}

if (deleteItemBtn.length > 0) {
  deleteItemBtn.forEach((btn) => {
    btn.addEventListener("click", handleDeleteItemFromCart);
  });
}

// filter, sort, pagination
if (filterSortBtn) {
  // check manufacturer
  const checkedManufacturerWrappers = [
    ...document.querySelectorAll("a[name='manufacturer']"),
  ];
  checkedManufacturerWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function (e) {
      const childInput = wrapper.querySelector("input");
      childInput.checked = !childInput.checked;
    });
  });

  loadFilterFromSearchParams();
  filterSortBtn.addEventListener("click", handleSearchAndFilter);
}

if (paginationItems.length > 0) {
  paginationItems.forEach((item) => {
    item.addEventListener("click", handlePagination);
  });
}

if (location.pathname === "/products") {
  const url = createUrl("page", 1);
  loadProductPage(url);
}

if (inputBoxSearch) {
  inputBoxSearch.on("keypress", function (e) {
    if (e.which == 13) {
      if (inputBoxSearch.val()) {
        const url = createUrl("_search", inputBoxSearch.val());
        if (location.pathname !== "/products") {
          location.href = `/products?_search=${inputBoxSearch.val()}`;
        } else {
          loadProductPage(url);
        }
      }
    }
  });
}

if (buttonSearch) {
  buttonSearch.click(function () {
    if (inputBoxSearch.val()) {
      const url = createUrl("_search", inputBoxSearch.val());
      if (location.pathname !== "/products") {
        location.href = `/products?_search=${inputBoxSearch.val()}`;
      } else {
        loadProductPage(url);
      }
    }
  });
}

// review
const reviewForm = document.querySelector("#review-form");

if (reviewForm) {
  async function handleCreateReview(e) {
    e.preventDefault();
    const review = this.elements[(name = "review")].value;
    const rating = this.elements[(name = "rating")].value;
    const product = reviewForm.dataset.productId;

    if (
      !review ||
      !rating ||
      review.trim().length === 0 ||
      rating.trim().length === 0
    ) {
      alert("vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (isNaN(+rating) || +rating > 5 || +rating < 1) {
      alert("Đánh giá phải là số từ 1 - 5");
      return;
    }

    try {
      let fetchOptions = {
        method: "POST",
        body: JSON.stringify({
          product,
          review,
          rating: +rating,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/v1/reviews", fetchOptions);
      if (!response.ok) {
        const errRes = await response.json();
        alert(errRes.message);
        return false;
      }

      const resData = await response.json();
      alert(`Thêm đánh giá thành công`);
      return true;
    } catch (err) {
      alert("error", err.message);
      return false;
    }
  }

  reviewForm.addEventListener("submit", handleCreateReview);
}
