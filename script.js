const wishes = [
  {
    title: "Sekiro",
    emoji: "🗡️",
    tag: "Spel",
    category: "game",
    description: "Sekiro: Shadows Die Twice — ett tufft actionspel med otrolig combat och japansk atmosfär.",
    link: "https://www.allkeyshop.com/blog/buy-sekiro-shadows-die-twice-cd-key-compare-prices/"
  },
  {
    title: "Glacier Le Noir",
    emoji: "🧊",
    tag: "Parfym",
    category: "perfume",
    description: "Maison Alhambra Glacier Le Noir — kall, mörk och premiumkänsla.",
    link: "https://www.fragrantica.com/perfume/Maison-Alhambra/Glacier-Le-Noir-93646.html"
  },
  {
    title: "Riffs Momento",
    emoji: "🖤",
    tag: "Parfym",
    category: "perfume",
    description: "Riiffs Momento Extrait de Parfum, 100 ml.",
    link: "https://www.deloox.se/produkt/1350480/riiffs-momento-extrait-de-parfum-100-ml.html"
  },
  {
    title: "Cleanser",
    emoji: "🧼",
    tag: "Skincare",
    category: "skincare",
    description: "Apolosophy Cleansing Foam, oparfymerad, 150 ml.",
    link: "https://www.apotekhjartat.se/varumarken/apolosophy/apolosophy-cleansing-foam-oparfymerad-150-ml"
  },
  {
    title: "Moisturizer",
    emoji: "🧴",
    tag: "Skincare",
    category: "skincare",
    description: "Apolosophy Moisture Day Cream, oparfymerad, 50 ml.",
    link: "https://www.apotekhjartat.se/varumarken/apolosophy/apolosophy-moisture-day-cream-oparfymerad-50-ml"
  },
  {
    title: "Läderplånbok",
    emoji: "👛",
    tag: "Annat",
    category: "other",
    description: "En snygg och kvalitativ läderplånbok.",
    link: ""
  }
];

const grid = document.getElementById("wishlist");
const saved = JSON.parse(localStorage.getItem("julOnskelista") || "[]");

function createCards(filter = "all") {
  grid.innerHTML = "";

  wishes.forEach((wish, i) => {
    if (filter !== "all" && wish.category !== filter) {
      return;
    }

    const card = document.createElement("article");
    card.className = "card";

    if (saved.includes(wish.title)) {
      card.classList.add("checked");
    }

    card.innerHTML = `
      <span class="card-number">${String(i + 1).padStart(2, "0")}</span>
      <div class="emoji">${wish.emoji}</div>
      <span class="tag">${wish.tag}</span>
      <h2>${wish.title}</h2>
      <p>${wish.description}</p>
      ${
        wish.link
          ? `<a class="link" href="${wish.link}" target="_blank" rel="noopener">Se mer →</a>`
          : ""
      }
      <button class="check" title="Markera som önskad">✓</button>
    `;

    card.addEventListener("click", event => {
      if (event.target.closest(".link")) {
        return;
      }

      card.classList.toggle("checked");

      if (card.classList.contains("checked")) {
        if (!saved.includes(wish.title)) {
          saved.push(wish.title);
        }
      } else {
        const index = saved.indexOf(wish.title);

        if (index > -1) {
          saved.splice(index, 1);
        }
      }

      localStorage.setItem("julOnskelista", JSON.stringify(saved));
    });

    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;

      card.style.transform = `
        perspective(900px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateY(-6px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
    });

    grid.appendChild(card);
  });
}

document.querySelectorAll(".btn[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".btn[data-filter]").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    createCards(button.dataset.filter);
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  localStorage.removeItem("julOnskelista");
  saved.length = 0;

  const activeFilter = document.querySelector(".btn.active").dataset.filter;
  createCards(activeFilter);
});

createCards();

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let snowflakes = [];

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function createSnow() {
  snowflakes = [];
  const snowCount = Math.min(180, Math.floor(innerWidth / 8));

  for (let i = 0; i < snowCount; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 1.2 + .4,
      wind: Math.random() * 1.2 - .6,
      opacity: Math.random() * .7 + .3,
      sway: Math.random() * Math.PI * 2
    });
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
    ctx.fill();

    flake.sway += .01;
    flake.x += Math.sin(flake.sway) * .7 + flake.wind;
    flake.y += flake.speed;

    if (flake.y > canvas.height + 10) {
      flake.y = -10;
      flake.x = Math.random() * canvas.width;
    }

    if (flake.x > canvas.width + 10) {
      flake.x = -10;
    }

    if (flake.x < -10) {
      flake.x = canvas.width + 10;
    }
  });

  requestAnimationFrame(drawSnow);
}

resizeCanvas();
createSnow();
drawSnow();

addEventListener("resize", () => {
  resizeCanvas();
  createSnow();
});