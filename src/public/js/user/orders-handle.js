let option = "";
let status = "";
let key_srch = "";
let type_srch = "none";
let cur_page = 1;

// handle update order status

function reGetOrdersData(e) {
  let target = e.target;
  if (target.id) {
    cur_page = target.id;
    renderOC(cur_page, option);
  } else {
    cur_page = target.parentElement.id;
    renderOC(cur_page, option);
  }
}

export async function updateOrderStatus(e) {
  const value = e.target.value;
  const orderId = e.target.dataset.orderId;

  try {
    const response = await fetch(`/api/v1/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return;
    }

    await response.json();
  } catch (err) {
    alert(err.message);
  }
}

export function renderOC(page = 1, sortQ = "none", status = "") {
  fetch(
    "/admin/orders/get-orders-data?page=" +
      page +
      "&sort=" +
      sortQ +
      "&status=" +
      status
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const orders = data.data.orders;
      const pageList = data.data.pageList;
      const pageIndex = data.data.pageIndex;

      const source = $("#orders-list-template").html();
      const template = Handlebars.compile(source);
      const html = template({ orders, pageIndex });
      $(".orders-list").html(html);

      const psource = $("#products-pagination-template").html();
      const ptemplate = Handlebars.compile(psource);
      const phtml = ptemplate({ pageList, pageIndex });
      $(".admin-products-pagination-wrapper").html(phtml);

      // add update order event
      $(".orders-status-select").change(updateOrderStatus);

      const numpage_btn = document.querySelectorAll(
        ".products-page-number-btn"
      );
      if (numpage_btn) {
        numpage_btn.forEach((btn) => {
          btn.addEventListener("click", reGetOrdersData);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// export function handleClearSearchboxProducts(e) {
//   const searchbox = document.getElementById("products-search-box");
//   if (searchbox.value.trim() !== "") {
//     searchbox.value = "";
//   }
// }

// export function handleSelectTypeProducts(e) {
//   const target_key = e.target.innerText;
//   $("#products-typesearch-btn").html(target_key);
//   document.getElementById("products-typesearch-btn").dataset.type = target_key;
// }

// export function handleSearchProducts(e) {
//   key_srch = document.getElementById("products-search-box").value.trim();
//   type_srch = document.getElementById("products-typesearch-btn").dataset.type;
//   if (key_srch !== "" && type_srch != "none") {
//     renderPC(1, option, key_srch, type_srch);
//   }
// }

export function handleFilterOrders(e) {
  option = ""; //refresh
  let cur_target = e.target;

  // handle select element
  const isSelectElement = cur_target.classList.contains("orders-status-filter");
  if (isSelectElement) {
    if (cur_target.value === "all") {
      status = "";
    } else {
      status = cur_target.value;
    }
  }

  if (!$(cur_target).hasClass("filter-btn-active")) {
    switch (cur_target.value) {
      case "orders-name-filter":
        option += "name";
        break;
      case "orders-time-filter":
        option += "time";
        break;
      case "orders-subTotal-filter":
        option += "subTotal";
        break;
      case "orders-desorder-filter":
        option += "desorder";
        break;
      default:
        break;
    }
    let filterBtnList = document.querySelectorAll(".orders-filter-btn");
    if (filterBtnList) {
      filterBtnList.forEach((btn) => {
        if ($("#" + btn.id).hasClass("filter-btn-active")) {
          option += "-" + btn.id.split("-")[1];
        }
      });
    }

    if (!isSelectElement) {
      $(cur_target).addClass("filter-btn-active");
    }
    renderOC(1, option, status);
  } else {
    // Handle active button
    if (!isSelectElement) {
      $(cur_target).removeClass("filter-btn-active");
    }
    // Get option
    let filterBtnList = document.querySelectorAll(".orders-filter-btn");
    if (filterBtnList) {
      filterBtnList.forEach((btn) => {
        if ($("#" + btn.id).hasClass("filter-btn-active")) {
          option += "-" + btn.id.split("-")[1];
        }
      });
    }
    option = option.slice(1, option.length);
    renderOC(1, option, status);
  }
}
