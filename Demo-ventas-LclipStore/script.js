/**
 * LClipStore - Luxury iPhone E-Commerce Script
 * Standalone Static Module
 */
let USD_TO_ARS = 1200;
const WHATSAPP_PHONE = "5491159305875";
const IPHONE_IMAGES = {
  "iphone-18-pro-max": {
    "burgundy": { name: "Burgundy Titanium", hex: "#4A1525", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-burgundy-frontback.png" },
    "black": { name: "Space Black Titanium", hex: "#1F2022", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-black-frontback.png" },
    "glacier": { name: "Glacier Titanium", hex: "#E3E4E6", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-glacier-frontback.png" },
    "silver": { name: "Natural Silver Titanium", hex: "#C4C5C7", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-glacier-frontback.png" }
  },
  "iphone-18-pro": {
    "burgundy": { name: "Burgundy Titanium", hex: "#4A1525", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-burgundy-frontback.png" },
    "black": { name: "Space Black Titanium", hex: "#1F2022", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-black-frontback.png" },
    "glacier": { name: "Glacier Titanium", hex: "#E3E4E6", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-glacier-frontback.png" },
    "silver": { name: "Natural Silver Titanium", hex: "#C4C5C7", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-glacier-frontback.png" }
  },
  "iphone-17-pro-max": {
    "orange": { name: "Desert Orange Titanium", hex: "#C59A7C", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-orange-frontback.png" },
    "blue": { name: "Cosmic Blue Titanium", hex: "#2E3B4E", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-black-frontback.png" }
  },
  "iphone-17-pro": {
    "orange": { name: "Desert Orange Titanium", hex: "#C59A7C", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-orange-frontback.png" }
  },
  "iphone-17": {
    "black": { name: "Obsidian Black", hex: "#22252A", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-black-frontback.png" },
    "blue": { name: "Sky Blue", hex: "#7FA3BA", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-blue-frontback.png" },
    "sage": { name: "Sage Pastel Green", hex: "#8FA382", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-sage-frontback.png" },
    "lavender": { name: "Soft Lavender", hex: "#AFA5D9", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-pink-frontback.png" }
  },
  "iphone-16": {
    "ultra": { name: "Ultramarine Blue", hex: "#3455EB", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-ultramarine-frontback.png" },
    "black": { name: "Midnight Black", hex: "#1E2024", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-black-frontback.png" },
    "pink": { name: "Vibrant Pink", hex: "#E897B0", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-pink-frontback.png" }
  },
  "iphone-15": {
    "blue": { name: "Pastel Sky Blue", hex: "#87A4B8", front: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=png-alpha", back: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=png-alpha", render: "./images/iphone-blue-frontback.png" }
  }
};
let cart = [];
function formatUSD(amount) {
  return "USD " + Number(amount).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function formatARS(amountUSD) {
  const arsValue = Math.round(amountUSD * USD_TO_ARS);
  return "≈ ARS " + arsValue.toLocaleString("es-AR");
}
function updateAllPrices() {
  document.querySelectorAll("[data-usd-price]").forEach(el => {
    const usd = parseFloat(el.getAttribute("data-usd-price"));
    if (!isNaN(usd)) {
      const arsTarget = el.querySelector(".price-ars") || el;
      if (arsTarget.classList.contains("price-ars")) {
        arsTarget.textContent = formatARS(usd);
      }
    }
  });
  const rateHeaderEl = document.getElementById("headerRateDisplay");
  if (rateHeaderEl) {
    rateHeaderEl.textContent = `1 USD = $${USD_TO_ARS.toLocaleString("es-AR")} ARS`;
  }
}
function initCountdownTimers() {
  let secondsRemaining = 3600;
  function pad(num) { return num.toString().padStart(2, "0"); }
  function updateClockDisplay() {
    const hours = Math.floor(secondsRemaining / 3600);
    const mins = Math.floor((secondsRemaining % 3600) / 60);
    const secs = secondsRemaining % 60;
    const timeStr = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    document.querySelectorAll(".live-clock").forEach(clockEl => { clockEl.textContent = timeStr; });
    if (secondsRemaining > 0) secondsRemaining--;
    else secondsRemaining = 3600;
  }
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);
}
function initFomoEyeCounter() {
  function updateCounters() {
    document.querySelectorAll(".contador-visitas").forEach(el => {
      const randomCount = Math.floor(Math.random() * (200 - 2 + 1)) + 2;
      el.textContent = randomCount;
    });
  }
  updateCounters();
  setInterval(updateCounters, 4000);
}
function initColorSwitchers() {
  document.querySelectorAll(".product-card").forEach(card => {
    const modelKey = card.getAttribute("data-model-key");
    const swatches = card.querySelectorAll(".color-swatch-btn");
    const mainImg = card.querySelector(".render-img-main");
    const colorLabel = card.querySelector(".selected-color-name");
    const stockWarning = card.querySelector(".stock-warning-label");
    swatches.forEach(swatch => {
      swatch.addEventListener("click", () => {
        const colorKey = swatch.getAttribute("data-color");
        const isOutOfStock = swatch.classList.contains("out-of-stock");
        if (isOutOfStock) {
          if (stockWarning) {
            stockWarning.classList.add("show");
            stockWarning.textContent = "⚠️ Variante sin stock temporal disponible";
            setTimeout(() => { stockWarning.classList.remove("show"); }, 3000);
          }
          return;
        }
        swatches.forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");
        if (stockWarning) stockWarning.classList.remove("show");
        if (IPHONE_IMAGES[modelKey] && IPHONE_IMAGES[modelKey][colorKey]) {
          const colorData = IPHONE_IMAGES[modelKey][colorKey];
          if (colorLabel) colorLabel.textContent = colorData.name;
          if (mainImg) {
            mainImg.classList.add("fade-out");
            setTimeout(() => {
              mainImg.src = colorData.render || colorData.front;
              mainImg.alt = `${modelKey} - ${colorData.name}`;
              mainImg.classList.remove("fade-out");
            }, 300);
          }
        }
      });
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initCountdownTimers();
  initFomoEyeCounter();
  initColorSwitchers();
  updateAllPrices();
});
