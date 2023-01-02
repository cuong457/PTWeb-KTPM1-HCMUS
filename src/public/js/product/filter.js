// Handlebars.registerHelper("toPrice", (rawPrice) =>
//   rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
// );
// loadProductPage("?page=1");
export function createUrl(field, value) {
  const allowFields = [
    "_sort",
    "column",
    "type",
    "priceRange",
    "manufacturer",
    "category",
    "page",
    "_search",
  ];
  const params = new URLSearchParams(location.search);
  if (allowFields.includes(field)) {
    params.set(field, value);
  }

  let isFirstQuery = true;
  const url = allowFields.reduce((accum, field, index) => {
    if (params.has(field)) {
      if (!isFirstQuery) {
        accum += "&";
      }

      if (isFirstQuery) {
        isFirstQuery = false;
      }
      return (accum += `${field}=${params.get(field)}`);
    }
    return accum;
  }, "?");
  return url;
}

export function loadProductPage(query) {
  fetch(`/api/v1/products${query}`)
    .then((response) => response.json())
    .then((data) => {
      const pagination_info = data.data.pagination_info;
      const foods = data.data.foods;

      if (foods.length === 0) {
        $("#food-list")
          .html(`<div class="py-5 my-5 d-flex flex-column justify-content-center align-items-center">
        <h4 class="text-danger">Không tìm thấy món ăn</h4>
        <div class="" style="width: 200px; height: 160px;">
            <img class="w-100" src="/images/cart/empty.png" alt="empty cart image">
        </div>
    </div>`);
        $("#pagination-list").html("");
        return;
      }

      const source = $("#products-template").html();
      const template = Handlebars.compile(source);
      const html = template({ foods });
      $("#food-list").html(html);

      // handle pagination
      const links = Array.from(
        Array(pagination_info.last_page - pagination_info.first_page + 1)
      ).map((_, idx) => ({
        pageNumber: idx + pagination_info.first_page,
        selected:
          idx + pagination_info.first_page === pagination_info.current_page,
      }));

      $("#pagination-list").html(
        Handlebars.compile($("#pagination-template").html())({
          links,
          prev: pagination_info.previous_page,
          next: pagination_info.has_next_page
            ? pagination_info.next_page
            : pagination_info.current_page,
          start: 1,
          end: pagination_info.total_pages,
        })
      );
      $(".pagination-item .page-item").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        const newQuery = createUrl("page", this.getAttribute("value"));
        loadProductPage(newQuery);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export const handleSearchAndFilter = function (e) {
  // I) variable identification
  // 0.search
  const boxSearch = document.getElementById("search-box");

  // 1.price search
  const fromInput = document.querySelector('input[name="price-from"]').value;
  const toInput = document.querySelector('input[name="price-to"]').value;
  // 2. sort order (thứ tự sắp xếp)
  const sortOptions = $('input[name="flexRadioDefault"]:checked');
  let oldSearchParams = new URLSearchParams(location.search);

  // 3.manufacturer
  const checkedManufacturerInputs = [
    ...document.querySelectorAll("input[name='manufacturer']:checked"),
  ];

  // 4.category
  const categoryInput = document.querySelector("select[name='category']");

  // II) assign query string
  // 0) search
  let searchQuery =
    boxSearch.value !== "" ? `?_search=${boxSearch.value}` : "?";
  // 1) price search
  if (fromInput.trim().length === 0 && toInput.trim().length === 0) {
    searchQuery += `&priceRange=0,1000000000`;
  } else if (
    fromInput.trim().length === 0 ||
    toInput.trim().length === 0 ||
    +fromInput > +toInput
  ) {
    alert("Khoảng giá không hợp lệ vui lòng nhập lại");
    return;
  } else {
    searchQuery += `&priceRange=${fromInput},${toInput}`;
  }

  // 2) sort order

  switch (sortOptions.val()) {
    case "low-to-high":
      searchQuery += `&_sort&column=price&type=asc`;
      break;
    case "high-to-low":
      searchQuery += `&_sort&column=price&type=desc`;
      break;
    case "created-at":
      searchQuery += `&_sort&column=_createdAt&type=asc`;
      break;
    case "default":
      searchQuery += "";
      break;
    default:
      searchQuery += "";
      break;
  }

  // 3) manufacturer
  // ["Sunrise_Foods", "Friggitoria", ...]
  if (checkedManufacturerInputs.length !== 0) {
    const manufacturers = checkedManufacturerInputs.map(
      (checkedManu) => checkedManu.dataset.search
    );
    searchQuery += `&manufacturer=${manufacturers.join(",")}`;
  }

  // 4) category
  searchQuery += `&category=${categoryInput.value}`;
  // location.assign(searchQuery);
  window.history.pushState("/", "Final project", `/products${searchQuery}`); // không bị reload
  loadProductPage(searchQuery);
};

export const handlePagination = function (e) {
  const allowFields = [
    "_sort",
    "column",
    "type",
    "priceRange",
    "manufacturer",
    "category",
    "page",
    "_search",
  ];
  const query = e.target.dataset.query;
  if (!query) {
    alert("khong tim thay query");
    return;
  }

  const pageValue = query.split("=")[1];
  const params = new URLSearchParams(location.search);
  params.set("page", pageValue);

  let isFirstQuery = true;
  const url = allowFields.reduce((accum, field, index) => {
    if (params.has(field)) {
      if (!isFirstQuery) {
        accum += "&";
      }

      if (isFirstQuery) {
        isFirstQuery = false;
      }
      return (accum += `${field}=${params.get(field)}`);
    }
    return accum;
  }, "?");

  // console.log(url);
  // location.assign(url);
  window.history.pushState("/", "Final project", `/products${url}`); // không bị reload
  loadProductPage(url);
};

// dùng khi không xài ajax
// dùng để load _search(khi từ / -> /products)
export const loadFilterFromSearchParams = function () {
  const params = new URLSearchParams(location.search);

  // 0) search
  if (params.has("_search")) {
    const boxSearch = document.getElementById("search-box");
    boxSearch.value = params.get("_search");
  }

  // 1) price range
  if (params.has("priceRange")) {
    const fromInput = document.querySelector('input[name="price-from"]');
    const toInput = document.querySelector('input[name="price-to"]');
    const priceString = params.get("priceRange");
    const [fromPrice, toPrice] = priceString.split(",");

    if (+fromPrice !== 0 && +toPrice !== 1000000000) {
      fromInput.value = fromPrice;
      toInput.value = toPrice;
    }
  }

  // 2) sort order
  if (params.has("column") && params.has("type")) {
    const column = params.get("column");
    const type = params.get("type");
    let sortValue = "";

    if (column === "price") {
      sortValue = type === "asc" ? "low-to-high" : "high-to-low";
    } else {
      sortValue = "created-at";
    }

    const sortOptions = document.querySelector(`input[value=${sortValue}]`);
    sortOptions.checked = true;
  }

  // 3) manufacturer
  if (params.has("manufacturer")) {
    const manufacturers = params.get("manufacturer").split(",");
    manufacturers.forEach((manu) => {
      document.querySelector(`input[value=${manu}]`).checked = true;
    });
  }

  // 4) category
  if (params.has("category")) {
    const categoryInput = document.querySelector("select[name='category']");
    categoryInput.value = params.get("category");
  }

  // 5) pagination
  if (params.has("page")) {
    const page = document.querySelector(
      `.page-item[value="${params.get("page")}"]`
    );

    page.classList.add("selected");
  }
};
