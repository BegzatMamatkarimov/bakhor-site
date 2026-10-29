// EgyptWay — логика сайта

let lang = localStorage.getItem("lang") || "ru";          // язык по умолчанию — русский
let route = JSON.parse(localStorage.getItem("route") || "[]"); // id мест в маршруте
let filter = "all";

const findPlace = (id) => PLACES.find((p) => p.id === id);

// Текст интерфейса на текущем языке
function t(key) {
  return TEXTS[lang][key] || TEXTS.ru[key] || key;
}

// ---------- Язык ----------
function translatePage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem("lang", lang);
  showAll();
}

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

// ---------- Тема ----------
const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

themeBtn.addEventListener("click", () => {
  setTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

// ---------- Меню на телефоне ----------
const nav = document.getElementById("nav");
document.getElementById("burger").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

// ---------- Кнопка «Наверх» появляется после прокрутки ----------
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
});

// ---------- Карточки мест ----------
function showFilters() {
  const buttons = [`<button data-filter="all">${t("places.all")}</button>`];
  for (const key in CATEGORIES) {
    buttons.push(`<button data-filter="${key}">${CATEGORIES[key][lang]}</button>`);
  }
  const box = document.getElementById("filters");
  box.innerHTML = buttons.join("");
  box.querySelectorAll("button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      showFilters();
      showCards();
    });
  });
}

function showCards() {
  const search = document.getElementById("search").value.trim().toLowerCase();
  const list = PLACES.filter((p) => {
    const matchFilter = filter === "all" || p.cat === filter;
    const matchSearch = (p.name[lang] + " " + p.city[lang]).toLowerCase().includes(search);
    return matchFilter && matchSearch;
  });

  const box = document.getElementById("cards");
  box.innerHTML = "";
  document.getElementById("empty").hidden = list.length > 0;

  list.forEach((p) => {
    const inRoute = route.includes(p.id);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-photo">
        <img src="images/${p.id}.jpg" alt="${p.name[lang]}" onerror="this.classList.add('no-photo')">
      </div>
      <div class="card-body">
        <span class="card-cat">${CATEGORIES[p.cat][lang]} · ${p.city[lang]}</span>
        <h3>${p.name[lang]}</h3>
        <p>${p.short[lang]}</p>
        <div class="card-buttons">
          <button class="btn btn-small" data-action="more">${t("btn.more")}</button>
          <button class="btn btn-small ${inRoute ? "btn-added" : "btn-gold"}" data-action="route">
            ${inRoute ? t("btn.added") : t("btn.add")}
          </button>
        </div>
      </div>`;
    card.querySelector('[data-action="more"]').addEventListener("click", () => openModal(p.id));
    card.querySelector('[data-action="route"]').addEventListener("click", () => toggleRoute(p.id));
    card.querySelector(".card-photo").addEventListener("click", () => openModal(p.id));
    box.append(card);
  });
}

document.getElementById("search").addEventListener("input", showCards);

// ---------- Окно с описанием ----------
const modal = document.getElementById("modal");
let modalPlace = null;

function openModal(id) {
  modalPlace = findPlace(id);
  fillModal();
  modal.showModal();
}

function fillModal() {
  if (!modalPlace) return;
  const p = modalPlace;
  const img = document.getElementById("modalImg");
  img.classList.remove("no-photo");
  img.onerror = () => img.classList.add("no-photo");
  img.src = `images/${p.id}.jpg`;
  img.alt = p.name[lang];
  document.getElementById("modalTitle").textContent = p.name[lang];
  document.getElementById("modalCity").textContent = `${CATEGORIES[p.cat][lang]} · ${p.city[lang]}`;
  document.getElementById("modalDesc").textContent = p.desc[lang];
  document.getElementById("modalTime").textContent = `${p.hours} ${t("unit.h")}`;
  document.getElementById("modalMap").href = `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
  document.getElementById("modalRoute").textContent = route.includes(p.id) ? t("btn.remove") : t("btn.add");
}

document.getElementById("modalRoute").addEventListener("click", () => {
  toggleRoute(modalPlace.id);
  fillModal();
});
document.getElementById("modalClose").addEventListener("click", () => modal.close());
// Клик по тёмному фону вокруг окна тоже закрывает его
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

// ---------- Маршрут ----------
function saveRoute() {
  localStorage.setItem("route", JSON.stringify(route));
  showCards();
  showRoute();
}

function toggleRoute(id) {
  if (route.includes(id)) {
    route = route.filter((x) => x !== id);
  } else {
    route.push(id);
  }
  saveRoute();
}

function moveStop(index, step) {
  const newIndex = index + step;
  if (newIndex < 0 || newIndex >= route.length) return;
  [route[index], route[newIndex]] = [route[newIndex], route[index]];
  saveRoute();
}

// Расстояние между двумя точками в км (формула гаверсинусов).
// Умножаем на 1.3, потому что дорога длиннее прямой линии.
function distanceKm(a, b) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h)) * 1.3;
}

function showRoute() {
  const list = document.getElementById("routeList");
  list.innerHTML = "";
  document.getElementById("routeEmpty").hidden = route.length > 0;

  let km = 0;
  let hours = 0;

  route.forEach((id, i) => {
    const p = findPlace(id);
    hours += p.hours;
    if (i > 0) km += distanceKm(findPlace(route[i - 1]), p);

    const li = document.createElement("li");
    li.innerHTML = `
      <span class="stop-name"><b>${p.name[lang]}</b> <small>${p.city[lang]}</small></span>
      <span class="stop-buttons">
        <button data-step="-1" ${i === 0 ? "disabled" : ""}>↑</button>
        <button data-step="1" ${i === route.length - 1 ? "disabled" : ""}>↓</button>
        <button data-remove>✕</button>
      </span>`;
    li.querySelectorAll("[data-step]").forEach((btn) => {
      btn.addEventListener("click", () => moveStop(i, Number(btn.dataset.step)));
    });
    li.querySelector("[data-remove]").addEventListener("click", () => toggleRoute(id));
    list.append(li);
  });

  document.getElementById("totalPlaces").textContent = route.length;
  document.getElementById("totalKm").textContent = `${Math.round(km)} ${t("unit.km")}`;
  document.getElementById("totalHours").textContent = `${hours} ${t("unit.h")}`;
}

// Открываем весь маршрут в Google Maps: точки идут через «/»
document.getElementById("gmapsBtn").addEventListener("click", () => {
  if (route.length === 0) return;
  const points = route.map((id) => `${findPlace(id).lat},${findPlace(id).lng}`).join("/");
  window.open(`https://www.google.com/maps/dir/${points}`, "_blank");
});

document.getElementById("clearBtn").addEventListener("click", () => {
  route = [];
  saveRoute();
});

// ---------- Готовые туры ----------
function showTours() {
  const box = document.getElementById("toursList");
  box.innerHTML = "";
  TOURS.forEach((tour) => {
    const div = document.createElement("div");
    div.className = "tour";
    div.innerHTML = `
      <h3>${tour.name[lang]}</h3>
      <span class="tour-days">${tour.days[lang]}</span>
      <p>${tour.text[lang]}</p>
      <p class="tour-stops">${tour.stops.map((id) => findPlace(id).name[lang]).join(" → ")}</p>
      <button class="btn btn-gold">${t("tours.btn")}</button>`;
    div.querySelector("button").addEventListener("click", () => {
      route = [...tour.stops];
      saveRoute();
      document.getElementById("route").scrollIntoView();
    });
    box.append(div);
  });
}

// ---------- Запуск ----------
function showAll() {
  translatePage();
  showFilters();
  showCards();
  showRoute();
  showTours();
  fillModal();
}

setTheme(localStorage.getItem("theme") || "light");
showAll();
