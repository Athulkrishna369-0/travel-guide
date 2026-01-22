const params = new URLSearchParams(window.location.search);

const index = Number(params.get("index"));
const name = params.get("name");
const place = params.get("place");
const pkg = params.get("package");
const days = Number(params.get("days"));

document.getElementById("pName").innerText = name;
document.getElementById("pPlace").innerText = place;
document.getElementById("pPackage").innerText = pkg;
document.getElementById("pDays").innerText = days;

// Price calculation
let pricePerDay = 2000;
if (pkg === "Standard") pricePerDay = 3500;
if (pkg === "Premium") pricePerDay = 5000;
if (pkg === "Customize") pricePerDay = 4000;

const total = pricePerDay * days;
document.getElementById("pAmount").innerText = total;

function makePayment() {
  fetch(`https://travel-guide-61x3.onrender.com/payment/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: total,
      status: "Paid"
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Payment Successful ✅");
      window.location.href =
        `success.html?name=${encodeURIComponent(name)}&place=${encodeURIComponent(place)}&package=${encodeURIComponent(pkg)}`;
    })
    .catch(() => {
      alert("Payment update failed");
    });
}
