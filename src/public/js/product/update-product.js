const createProductForm = document.querySelector(".form-create-product");
const updateProductForm = document.querySelector(".form-update-product");
const containerUpdateProduct = document.querySelector(
  ".container-update-product"
);
const errorMessageElement = document.querySelector(
  ".create-product-error-message"
);

const productSettings = async function (data, type) {
  const url = type === "create" ? "/api/v1/products" : "/admin/api/v1/products";

  try {
    let fetchOptions = {
      method: "POST",
      body: data,
    };

    if (type === "update") {
      fetchOptions = {
        method: "PUT",
        body: data,
      };
    }

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return false;
    }

    const resData = await response.json();
    alert(`Product ${type} successfully`);
    return true;
  } catch (err) {
    alert("error", err.message);
    return false;
  }
};

const deleteProductsPhoto = async (paths) => {
  const url = "/api/v1/products/delete";

  var object = {};
  paths.forEach((value, key) => (object[key] = value));
  var json = JSON.stringify(object);

  try {
    const fetchOptions = {
      method: "DELETE",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errRes = await response.json();
      return false;
    }

    const resData = await response.json();
    return true;
  } catch (err) {
    alert("error", err.message);
    return false;
  }
};

const previewFoodThumnail = (e, output) => {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const files = e.target.files;

    if (files.length === 0) {
      errorMessageElement.innerText = "vui lòng chọn ảnh đại diện cho món ăn";
      return;
    }

    output.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue;
      const imgReader = new FileReader();

      imgReader.addEventListener("load", function (event) {
        const imgFile = event.target;
        const wraper = document.createElement("div");
        const img = document.createElement("img");
        const btn_inside = document.createElement("div");

        $("#recom-load-thumnail").addClass("undisplay");
        wraper.className = "create-food-admin-img-wraper";
        img.className = "create-food-admin-img";
        img.src = imgFile.result;
        btn_inside.className = "btn-change-img-hide";
        btn_inside.innerHTML = "CHANGE IMAGE?";

        wraper.appendChild(img);
        wraper.appendChild(btn_inside);
        output.appendChild(wraper);
      });

      imgReader.readAsDataURL(files[i]);
    }
  } else {
    errorMessageElement.innerText = "Your browser does not support File API";
  }
};

const previewFoodDetail = (e, output) => {
  const files = e.target.files;

  // Check files count
  if (files.length > 3) {
    errorMessageElement.innerText = `Only 3 files are allowed to upload.`;
    return;
  } else if (
    window.File &&
    window.FileReader &&
    window.FileList &&
    window.Blob
  ) {
    const files = e.target.files;
    output.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue;
      const imgReader = new FileReader();

      imgReader.addEventListener("load", function (event) {
        const imgFile = event.target;
        const wraper = document.createElement("div");
        const img = document.createElement("img");

        $("#recom-load-detail").addClass("undisplay");
        $(".preview-btn").removeClass("undisplay");
        wraper.className = i == 0 ? "carousel-item active" : "carousel-item";
        img.className = "img-fluid";
        img.src = imgFile.result;

        wraper.appendChild(img);
        output.appendChild(wraper);
      });

      imgReader.readAsDataURL(files[i]);
    }
  } else {
    alert("Your browser does not support File API");
  }
};

const imagesThumbnailInput = document.querySelector(
  "#food-photo-input-thumbnail"
);
const imagesDetailInput = document.querySelector("#food-photo-input-detail");

const outputThumbnail = document.querySelector("#output-imgs-thumbnail");
const outputDetail = document.querySelector("#output-imgs-detail");

if (createProductForm) {
  const handleCreateProduct = async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const nameInput = this.elements[(name = "name")];
    const priceInput = this.elements[(name = "price")];
    const categoryInput = this.elements[(name = "category")];
    const manufacturerInput = this.elements[(name = "manufacturer")];
    const descriptionInput = this.elements[(name = "description")];

    if (
      !nameInput.value ||
      !priceInput.value ||
      !manufacturerInput.value ||
      !categoryInput ||
      !descriptionInput.value
    ) {
      // alert("Missing input field(s)!");
      errorMessageElement.innerText = "Missing input field(s)!";
      return;
    }

    const foodThumbnailInput =
      this.elements[(name = "food-photo-input-thumbnail")];
    const photoInput = this.elements[(name = "food-photo-input-detail")];

    formData.append("name", nameInput.value);
    formData.append("price", priceInput.value);
    formData.append("category", categoryInput.value);
    formData.append("manufacturer", manufacturerInput.value);
    formData.append("stock", 100);
    formData.append("suspended", false);
    formData.append("description", descriptionInput.value);

    if (
      foodThumbnailInput.files.length === 0 ||
      photoInput.files.length === 0
    ) {
      // alert("Missing Image!");
      errorMessageElement.innerText = "Missing Image!";
      return;
    }

    formData.append("foodThumbnail", foodThumbnailInput.files[0]);
    for (let i = 0; i < photoInput.files.length; i++) {
      formData.append("photo", photoInput.files[i]);
    }

    productSettings(formData, "create");
  };

  createProductForm.addEventListener("submit", handleCreateProduct);
  createProductForm.addEventListener("change", function (e) {
    errorMessageElement.innerText = "";
  });

  imagesThumbnailInput.addEventListener("change", (e) =>
    previewFoodThumnail(e, outputThumbnail)
  );
  imagesDetailInput.addEventListener("change", (e) =>
    previewFoodDetail(e, outputDetail)
  );
}

if (containerUpdateProduct) {
  const imagesThumbnailUpdate = document.querySelector(
    "#food-photo-update-thumbnail"
  );
  const imagesDetailUpdate = document.querySelector(
    "#food-photo-update-detail"
  );

  const outputThumbnailUpdate = document.querySelector(
    "#output-imgs-thumbnail-update"
  );
  const outputDetailUpdate = document.querySelector(
    "#output-imgs-detail-update"
  );

  let foodThumbnailPath = "";
  let foodPhotoPaths = [];
  let foodId = "";

  document.addEventListener("DOMContentLoaded", async () => {
    const url = "/api/v1/products";

    const startIndex = window.location.href.lastIndexOf("/");
    foodId = window.location.href.substring(startIndex + 1);

    const response = await fetch(`${url}/${foodId}`, { method: "GET" });
    const response_package = await response.json();

    const foodToUpdate = response_package.data.food;

    const thumbnail = document.createElement("img");
    thumbnail.className = "create-food-admin-img";
    thumbnail.src = foodToUpdate.foodThumbnail;
    outputThumbnailUpdate.appendChild(thumbnail);

    const imgs = foodToUpdate.photo;
    for (let i = 0; i < imgs.length; i++) {
      const wraper = document.createElement("div");
      const img = document.createElement("img");

      wraper.className = i == 0 ? "carousel-item active" : "carousel-item";
      img.className = "img-fluid";
      img.src = imgs[i];

      wraper.appendChild(img);
      outputDetailUpdate.appendChild(wraper);
    }

    foodThumbnailPath = foodToUpdate.foodThumbnail;
    foodPhotoPaths = foodToUpdate.photo;

    let categorySelect = document.getElementById("category-update");
    let manufacturerSelect = document.getElementById("manufacturer-update");

    for (let i, j = 0; (i = categorySelect.options[j]); j++) {
      if (i.value == foodToUpdate.category[0]) {
        categorySelect.selectedIndex = j;
        break;
      }
    }

    for (let i, j = 0; (i = manufacturerSelect.options[j]); j++) {
      if (i.value == foodToUpdate.manufacturer) {
        manufacturerSelect.selectedIndex = j;
        break;
      }
    }
  });

  imagesThumbnailUpdate.addEventListener("change", (e) =>
    previewFoodThumnail(e, outputThumbnailUpdate)
  );
  imagesDetailUpdate.addEventListener("change", (e) =>
    previewFoodDetail(e, outputDetailUpdate)
  );

  const handleUpdateProduct = async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const nameInput = this.elements[(name = "name-update")];
    const priceInput = this.elements[(name = "price-update")];
    const categoryInpur = this.elements[(name = "category-update")];
    const manufacturerInput = this.elements[(name = "manufacturer-update")];
    const stockInput = this.elements[(name = "stock-update")];
    const suspendedInput = this.elements[(name = "suspended-update")];
    const descriptionInput = this.elements[(name = "description-update")];

    const foodThumbnailInput =
      this.elements[(name = "food-photo-update-thumbnail")];
    const photoInput = this.elements[(name = "food-photo-update-detail")];

    if (
      nameInput.value.trim().length === 0 ||
      priceInput.value.trim().length === 0 ||
      categoryInpur.value.trim().length === 0 ||
      manufacturerInput.value.trim().length === 0 ||
      stockInput.value.trim().length === 0 ||
      suspendedInput.value.trim().length === 0 ||
      descriptionInput.value.trim().length === 0
    ) {
      errorMessageElement.innerText = "Missing input field(s)";
      return;
    }

    formData.append("_id", foodId);
    formData.append("name", nameInput.value);
    formData.append("price", priceInput.value);
    formData.append("category", categoryInpur.value);
    formData.append("manufacturer", manufacturerInput.value);
    formData.append("stock", stockInput.value);
    formData.append("suspended", suspendedInput.value);
    formData.append("description", descriptionInput.value);

    const imageThumbnail = document.querySelector(
      "#output-imgs-thumbnail-update .create-food-admin-img"
    );
    const isLoaded =
      imageThumbnail.complete && imageThumbnail.naturalHeight !== 0;
    if (foodThumbnailInput.files.length !== 0) {
      const myDeleteImgData = new FormData();
      myDeleteImgData.append("paths", foodThumbnailPath);

      deleteProductsPhoto(myDeleteImgData);

      formData.append("foodThumbnail", foodThumbnailInput.files[0]);
    } else {
      if (!isLoaded) {
        errorMessageElement.innerText = "Missing food image thumbnail";
        return;
      }
    }

    const images = document.querySelector(".carousel-item img");
    const isLoadedImages = images.complete && images.naturalHeight !== 0;
    if (photoInput.files.length !== 0) {
      const myDeleteImgData = new FormData();
      myDeleteImgData.append("paths", foodPhotoPaths);

      deleteProductsPhoto(myDeleteImgData);

      for (let i = 0; i < photoInput.files.length; i++) {
        formData.append("photo", photoInput.files[i]);
      }
    } else {
      if (!isLoadedImages) {
        errorMessageElement.innerText = "Missing food images";
        return;
      }
    }
    productSettings(formData, "update");
  };

  updateProductForm.addEventListener("submit", handleUpdateProduct);
  updateProductForm.addEventListener("change", function (e) {
    errorMessageElement.innerText = "";
  });
}
