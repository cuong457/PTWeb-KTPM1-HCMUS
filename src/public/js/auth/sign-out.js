export const signOut = async (e) => {
  try {
    const response = await fetch("/api/v1/auth/sign-out");

    if (!response.ok) {
      const errRes = await response.json();
      alert(errRes.message);
      return;
    }

    const data = await response.json();
    setTimeout(() => {
      // window.location.reload(true);
      alert("logout successfully");
      window.location.replace("/admin/sign-in");
    }, 500);
  } catch (err) {
    alert(err.message);
  }
};
