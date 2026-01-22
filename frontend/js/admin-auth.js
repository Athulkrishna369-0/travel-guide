function adminLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // demo credentials
  if (user === "admin" && pass === "admin123") {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin credentials ❌");
  }

  return false;
}
