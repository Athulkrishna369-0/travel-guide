console.log("booking.js loaded");

const params = new URLSearchParams(window.location.search);
const placeParam = params.get("place");
const packageParam = params.get("package");

const placeSelect = document.getElementById("place");
const packageSelect = document.getElementById("package");

// Auto-select values if coming from place page
if (placeSelect && placeParam) {
  placeSelect.value = placeParam;
}

if (packageSelect && packageParam) {
  packageSelect.value = packageParam;
}

function confirmBooking() {
  const bookingData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    place: placeSelect.value,
    package: packageSelect.value,
    days: document.getElementById("days").value
  };

  // Validation
  if (
    !bookingData.name ||
    !bookingData.email ||
    !bookingData.place ||
    !bookingData.package ||
    !bookingData.days
  ) {
    alert("Please fill all booking details");
    return false;
  }

  // Save booking
  fetch("https://travel-guide-61x3.onrender.com/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData)
  })
    .then(res => res.json())
    .then(() => {
      // Fetch all bookings to get index of this booking
      fetch("https://travel-guide-61x3.onrender.com/bookings")
        .then(res => res.json())
        .then(data => {
          const bookingIndex = data.length - 1;

          // Redirect to payment with index
          window.location.href =
            `payment.html?index=${bookingIndex}&name=${encodeURIComponent(
              bookingData.name
            )}&place=${encodeURIComponent(
              bookingData.place
            )}&package=${encodeURIComponent(
              bookingData.package
            )}&days=${bookingData.days}`;
        });
    })
    .catch(() => {
      alert("Booking failed");
    });

  return false; // prevent page reload
}
