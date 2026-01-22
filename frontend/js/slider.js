const images = [
  "images/kerala.jpg",
  "images/goa.jpg",
  "images/manali.jpg"
];

let index = 0;
const slide = document.getElementById("slideImage");

setInterval(() => {
  index = (index + 1) % images.length;
  slide.src = images[index];
}, 3000);
