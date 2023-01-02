const signUpForm = document.getElementById("signup-form");
const emailInput = document.querySelector("input[type='email']");
const submitBtn = document.querySelector("button[type='submit']");
const errorMessageElement = document.querySelector(
  ".create-product-error-message"
);

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

if (signUpForm) {
  const signUserUp = async (e) => {
    e.preventDefault();
    console.log("submit");
    const nameValue = signUpForm.elements[(name = "name")].value;
    const emailValue = signUpForm.elements[(name = "email")].value;
    const passwordValue = signUpForm.elements[(name = "password")].value;

    if (
      !nameValue ||
      nameValue.trim().length === 0 ||
      !emailValue ||
      emailValue.trim().length === 0 ||
      !passwordValue ||
      passwordValue.trim().length === 0
    ) {
      errorMessageElement.innerText = "Vui lòng nhập tất cả thông tin";
      return;
    }

    if (passwordValue.length < 6) {
      errorMessageElement.innerText = "Độ dài mật khẩu nên nhiều hơn 6 kí tự";
      return;
    }

    if (!validateEmail(emailValue)) {
      errorMessageElement.innerText = "email không hợp lệ";
      return;
    }

    try {
      const response = await fetch("/api/v1/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errRes = await response.json();
        console.log(errRes.message);
        alert(errRes.message);
        return;
      }

      const data = await response.json();
      console.log("signup successfully");
      alert("signup successfully");
      window.location.replace("/admin/sign-in");
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  signUpForm.addEventListener("submit", signUserUp);
  emailInput.addEventListener("blur", async function (e) {
    try {
      const response = await fetch("/api/v1/auth/email-exist", {
        method: "POST",
        body: JSON.stringify({
          email: emailInput.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errRes = await response.json();
        errorMessageElement.innerText = errRes.message;
        submitBtn.setAttribute("disabled", "");
        return;
      }

      const data = await response.json();
      errorMessageElement.innerText = "";

      if (data.status === "success") {
        submitBtn.removeAttribute("disabled");
      }
    } catch (err) {
      alert(err.message);
    }
  });
}
