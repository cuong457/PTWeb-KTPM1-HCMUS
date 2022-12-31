const loginForm = document.getElementById("login-form");

if (loginForm) {
  const logUserIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.elements[(name = "email")].value,
          password: loginForm.elements[(name = "password")].value,
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
      console.log("login successfully");
      alert("login successfully");

      window.location.href = "/";
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  loginForm.addEventListener("submit", logUserIn);
}
