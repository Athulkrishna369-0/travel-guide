const params = new URLSearchParams(window.location.search);

document.getElementById("sName").innerText =
  params.get("name") || "Guest";

document.getElementById("sPlace").innerText =
  params.get("place") || "-";

document.getElementById("sPackage").innerText =
  params.get("package") || "-";
