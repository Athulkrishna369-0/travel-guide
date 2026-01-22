let allBookings = [];

// Protect admin page
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}

function loadBookings() {
  fetch("https://travel-guide-61x3.onrender.com/bookings")
    .then(res => res.json())
    .then(data => {
      allBookings = data;
      renderTable();
    });
}

function renderTable() {
  const table = document.getElementById("bookingData");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const place = document.getElementById("placeFilter").value;

  table.innerHTML = "";

  const filtered = allBookings
    .map((b, index) => ({ ...b, index })) // ✅ preserve original index
    .filter(b => {
      const matchesSearch =
        b.name.toLowerCase().includes(search) ||
        b.email.toLowerCase().includes(search);

      const matchesPlace = place === "" || b.place === place;
      return matchesSearch && matchesPlace;
    });

  if (filtered.length === 0) {
    table.innerHTML = "<tr><td colspan='6'>No bookings found</td></tr>";
    return;
  }

  filtered.forEach(b => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.name}</td>
      <td>${b.email}</td>
      <td>${b.place}</td>
      <td>${b.package}</td>
      <td>${b.days}</td>
      <td>₹${b.amount || "-"}</td>
      <td>${b.paymentStatus || "Pending"}</td>

      <td>
        <button class="delete-btn" onclick="deleteBooking(${b.index})">
          Delete
        </button>
      </td>
    `;
    table.appendChild(row);
  });
}

function deleteBooking(index) {
  if (!confirm("Delete this booking?")) return;

  fetch(`https://travel-guide-61x3.onrender.com/book/${index}`, {
    method: "DELETE"
  })
    .then(() => loadBookings());
}

function exportCSV() {
  let csv = "Name,Email,Place,Package,Days\n";

  allBookings.forEach(b => {
    csv += `${b.name},${b.email},${b.place},${b.package},${b.days}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bookings.csv";
  a.click();
}

function logoutAdmin() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

loadBookings();
