const places = {
  kerala: {
    name: "Kerala 🌴",
    tagline: "God’s Own Country",
    description:
      "Kerala is known for its backwaters, beaches, hill stations, and rich culture.",
    images: [
      "images/kerala.jpg",
      "images/kerala2.jpg",
      "images/kerala3.jpg"
    ],
    packages: [
      { name: "Budget", days: "3 Days", price: "₹8,000" },
      { name: "Standard", days: "5 Days", price: "₹15,000" },
      { name: "Premium", days: "7 Days", price: "₹25,000" }
    ]
  },

  goa: {
    name: "Goa 🏖️",
    tagline: "Beaches & Nightlife",
    description:
      "Goa is famous for beaches, nightlife, and water sports.",
    images: [
      "images/goa.jpg",
      "images/goa2.jpg"
    ],
    packages: [
      { name: "Budget", days: "3 Days", price: "₹10,000" },
      { name: "Standard", days: "5 Days", price: "₹18,000" },
      { name: "Premium", days: "7 Days", price: "₹30,000" }
    ]
  },

  manali: {
    name: "Manali ❄️",
    tagline: "Mountains & Adventure",
    description:
      "Manali offers snow-covered mountains and adventure sports.",
    images: [
      "images/manali.jpg"
    ],
    packages: [
      { name: "Budget", days: "3 Days", price: "₹9,000" },
      { name: "Standard", days: "5 Days", price: "₹16,000" },
      { name: "Premium", days: "7 Days", price: "₹28,000" }
    ]
  },

  rajasthan: {
    name: "Rajasthan 🏰",
    tagline: "Royal Heritage",
    description:
      "Rajasthan is known for forts, palaces, deserts, and culture.",
    images: [
      "images/rajasthan.jpg"
    ],
    packages: [
      { name: "Budget", days: "4 Days", price: "₹12,000" },
      { name: "Standard", days: "6 Days", price: "₹20,000" },
      { name: "Premium", days: "8 Days", price: "₹35,000" }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const placeKey = params.get("place");
const place = places[placeKey];

if (place) {
  document.getElementById("placeName").innerText = place.name;
  document.getElementById("tagline").innerText = place.tagline;
  document.getElementById("placeDescription").innerText = place.description;

  // Hero background
  document.getElementById("hero").style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${place.images[0]})`;

  // Gallery
  const gallery = document.getElementById("gallery");
  place.images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    gallery.appendChild(image);
  });

  // Packages
  const pricing = document.getElementById("pricing");
  place.packages.forEach(p => {
    const card = document.createElement("div");
    card.className = "price-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p class="days">${p.days}</p>
      <p class="price">${p.price}</p>
      <a href="booking.html?place=${placeKey}&package=${p.name}" class="btn primary">
        Book Now
      </a>
    `;
    pricing.appendChild(card);
  });
}
