const submitBtn = document.querySelector(".btn-submit-create-prod");

const createProductForm = document.querySelector(".form-create-product");

const productSettings = async function (data, type) {
  const url = "/api/v1/products";

  try {
    let fetchOptions = {
      method: "POST",
      body: data,
    };

    if (type === "update") {
      fetchOptions = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
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

if (createProductForm) {
  const handleCreateProduct = async function (e) {
    e.preventDefault();
    console.log("submit");
    const formData = new FormData();
    const nameInput = this.elements[(name = "name")];
    const priceInput = this.elements[(name = "price")];
    const manufacturerInput = this.elements[(name = "manufacturer")];
    // const stockInput = this.elements[(name = "stock")];
    // const suspendedInput = this.elements[(name = "suspended")];
    const descriptionInput = this.elements[(name = "description")];

    const foodThumbnailInput =
      this.elements[(name = "food-photo-input-thumbnail")];
    const photoInput = this.elements[(name = "food-photo-input-detail")];

    if (
      nameInput.value.trim().length === 0 ||
      isNaN(+priceInput.value) ||
      manufacturerInput.value.trim().length === 0 ||
      descriptionInput.value.trim().length === 0
    ) {
      errorMessageElement.innerText = "Thông tin nhập vào không hợp lệ!";
      return;
    }

    formData.append("name", nameInput.value);
    formData.append("price", priceInput.value);
    formData.append("category", []);
    formData.append("manufacturer", manufacturerInput.value);
    // formData.append("stock", stockInput.value);
    // formData.append("suspended", suspendedInput.value);
    formData.append("description", descriptionInput.value);

    formData.append("foodThumbnail", foodThumbnailInput.files[0]);
    for (let i = 0; i < photoInput.files.length; i++) {
      formData.append("photo", photoInput.files[i]);
    }

    productSettings(formData, "create");
  };

  createProductForm.addEventListener("submit", handleCreateProduct);
  createProductForm.addEventListener("click", (e) => {
    console.log("focus");
    errorMessageElement.innerText = "";
  });
}

const imagesThumbnailInput = document.querySelector(
  "#food-photo-input-thumbnail"
);
const imagesDetailInput = document.querySelector("#food-photo-input-detail");

const outputThumbnail = document.querySelector("#output-imgs-thumbnail");
const outputDetail = document.querySelector("#output-imgs-detail");
const errorMessageElement = document.querySelector(
  ".create-product-error-message"
);

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

  if (files.length === 0) {
    errorMessageElement.innerText = "vui lòng chọn ảnh cho món ăn";
    return;
  }

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

imagesThumbnailInput.addEventListener("change", (e) => {
  errorMessageElement.innerText = "";
  previewFoodThumnail(e, outputThumbnail);
});
imagesDetailInput.addEventListener("change", (e) => {
  errorMessageElement.innerText = "";
  previewFoodDetail(e, outputDetail);
});
