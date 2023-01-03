const updateInfoForm = document.querySelector(".form-user-data");
const updatePasswordForm = document.querySelector(".form-user-settings");
const avatarInput = document.getElementById("avatar-input");
const errorMessageElement = document.querySelector(
  ".create-product-error-message"
);

const updateSettings = async function (data, type) {
  const url =
    type === "password"
      ? "/api/v1/auth/update-password"
      : "/api/v1/auth/update-me";
  try {
    if (type !== "password") {
      const name = data.get("name");
      const email = data.get("email");
      const photo = data.get("photo");

      const userPhoto = document.querySelector(".form__user-photo");
      const isLoaded = userPhoto.complete && userPhoto.naturalHeight !== 0;
      if (
        !name ||
        name.trim().value === 0 ||
        !email ||
        email.trim().value === 0
      ) {
        errorMessageElement.innerText =
          "vui lòng nhập tên, địa chỉ email và chọn ảnh đại diện";
        return;
      }

      if (!photo && !isLoaded) {
        errorMessageElement.innerText = "vui lòng chọn ảnh đại diện";
        return;
      }
    }

    let fetchOptions = {
      method: "PATCH",
      // gửi form data thì không cần JSON.stringify với lại "Content-Type"
      body: data,
    };

    if (type === "password") {
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
      // showAlert('error', errRes.message);
      alert(errRes.message);
      return false;
    }

    const resData = await response.json();
    alert(`update ${type} successfully`);
    return true;
  } catch (err) {
    alert("error", err.message);
    return false;
  }
};

if (avatarInput) {
  const avatarDisplay = document.getElementById("avatar-display");
  const displayInputAvatar = (e) => {
    // console.log(URL.createObjectURL(e.target.files[0]));
    avatarDisplay.src = URL.createObjectURL(e.target.files[0]);
  };

  avatarInput.addEventListener("change", displayInputAvatar);
}

if (updateInfoForm) {
  const updateUserData = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    const nameInput = this.elements[(name = "name")];
    const emailInput = this.elements[(name = "email")];
    const photoInput = this.elements[(name = "photo")];

    formData.append("name", nameInput.value);
    formData.append("email", emailInput.value);
    formData.append("photo", photoInput.files[0]);

    updateSettings(formData, "user info");
  };

  updateInfoForm.addEventListener("submit", updateUserData);
  updateInfoForm.addEventListener("change", function (e) {
    errorMessageElement.innerText = "";
  });
}

if (updatePasswordForm) {
  const updatePassword = async function (e) {
    e.preventDefault();
    const currentPasswordInput = this.elements[(name = "current-password")];
    const passwordInput = this.elements[(name = "password")];
    const confirmPasswordInput = this.elements[(name = "confirm-password")];
    const data = {
      currentPassword: currentPasswordInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    };
    if ((await updateSettings(data, "password")) === true) {
      currentPasswordInput.value = "";
      passwordInput.value = "";
      confirmPasswordInput.value = "";
    }
  };
  updatePasswordForm.addEventListener("submit", updatePassword);
  // updatePasswordForm.addEventListener("change", function (e) {
  //   errorMessageElement.innerText = "";
  // });
}
