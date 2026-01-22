// Read URL parameters
const params = new URLSearchParams(window.location.search);

const index = Number(params.get("index"));
const name = params.get("name");
const place = params.get("place");
const pkg = params.get("package");
const days = Number(params.get("days"));

// Populate payment summary
document.getElementById("pName").innerText = name || "-";
document.getElementById("pPlace").innerText = place || "-";
document.getElementById("pPackage").innerText = pkg || "-";
document.getElementById("pDays").innerText = days || "-";

// Price calculation logic
let pricePerDay = 2000;

if (pkg === "Standard") pricePerDay = 3500;
if (pkg === "Premium") pricePerDay = 5000;
if (pkg === "Customize") pricePerDay = 4000;

const total = pricePerDay * days;
document.getElementById("pAmount").innerText = total;

// Payment handler
function makePayment() {
  // Debug log (optional but useful)
  console.log("Updating payment for booking index:", index);

  fetch(`https://travel-guide-61x3.onrender.com/payment/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: total,
      status: "Paid"
    })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Payment update failed");
      }
      return res.json();
    })
    .then(() => {
      alert("Payment Successful ✅");

      // Redirect to success page
      window.location.href =
        `success.html?name=${encodeURIComponent(name)}&place=${encodeURIComponent(place)}&package=${encodeURIComponent(pkg)}`;
    })
    .catch(err => {
      console.error(err);
      alert("Payment update failed ❌");
    });
}
