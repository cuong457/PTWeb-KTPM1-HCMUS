let option = "";
let key_srch = "";
let type_srch = "none";
let cur_page = 1;

function reGetProductsData(e) {
  let target = e.target;
  if (target.id) {
    cur_page = target.id;
    renderPC(cur_page, option, key_srch, type_srch);
  } else {
    cur_page = target.parentElement.id;
    renderPC(cur_page, option, key_srch, type_srch);
  }
}

export function renderPC(
  page = 1,
  sortQ = "none",
  searchK = "",
  typeS = "none"
) {
  fetch(
    "/admin/products/get-products-data?page=" +
      page +
      "&sort=" +
      sortQ +
      "&search=" +
      searchK +
      "&type=" +
      typeS
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const products = data.data.products;
      const pageList = data.data.pageList;
      const pageIndex = data.data.pageIndex;

      const source = $("#products-list-template").html();
      const template = Handlebars.compile(source);
      const html = template({ products, pageIndex });
      $(".products-list").html(html);

      const psource = $("#products-pagination-template").html();
      const ptemplate = Handlebars.compile(psource);
      const phtml = ptemplate({ pageList, pageIndex });
      $(".admin-products-pagination-wrapper").html(phtml);

      const numpage_btn = document.querySelectorAll(
        ".products-page-number-btn"
      );
      if (numpage_btn) {
        numpage_btn.forEach((btn) => {
          btn.addEventListener("click", reGetProductsData);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function handleClearSearchboxProducts(e) {
  const searchbox = document.getElementById("products-search-box");
  if (searchbox.value.trim() !== "") {
    searchbox.value = "";
  }
}

export function handleSelectTypeProducts(e) {
  const target_key = e.target.innerText;
  $("#products-typesearch-btn").html(target_key);
  document.getElementById("products-typesearch-btn").dataset.type = target_key;
}

export function handleSearchProducts(e) {
  key_srch = document.getElementById("products-search-box").value.trim();
  type_srch = document.getElementById("products-typesearch-btn").dataset.type;
  if (key_srch !== "" && type_srch != "none") {
    renderPC(1, option, key_srch, type_srch);
  }
}

export function handleFilterProducts(e) {
    option = ''; //refresh
    let cur_target = e.target;
    if(!$(cur_target).hasClass('filter-btn-active')) {
        switch(cur_target.id) {
            case 'products-name-filter': 
                option += 'name';
                break;
            case 'products-time-filter': 
                option += 'time';
                break;
            case 'products-price-filter': 
                option += 'price';
                break;
            case 'products-desorder-filter': 
                option += 'desorder';
                break;
            case 'products-tp-filter': 
                option += 'tp';
                break;
            default: 
                break;
        }
        let filterBtnList = document.querySelectorAll('.products-filter-btn');
        if(filterBtnList) {
            filterBtnList.forEach((btn) => {
                if($('#' + btn.id).hasClass('filter-btn-active')) {
                  option += ('-' + btn.id.split('-')[1]);
                }
            })
        }

    $(cur_target).addClass("filter-btn-active");
    renderPC(1, option);
  } else {
    // Handle active button
    $(cur_target).removeClass("filter-btn-active");
    // Get option
    let filterBtnList = document.querySelectorAll(".products-filter-btn");
    if (filterBtnList) {
      filterBtnList.forEach((btn) => {
        if ($("#" + btn.id).hasClass("filter-btn-active")) {
          option += "-" + btn.id.split("-")[1];
        }
      });
    }
    option = option.slice(1, option.length);
    renderPC(1, option);
  }
}
