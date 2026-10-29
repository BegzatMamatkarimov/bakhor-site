// =====================================================
//  EgyptWay — логика сайта
//  Разделы: язык, навигация, тема, карточки, модальное окно,
//  карта, конструктор маршрута, туры, советы, контакты.
// =====================================================

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const byId = (id) => SIGHTS.find((s) => s.id === id);

// Безопасная работа с localStorage (может быть недоступен в приватном режиме)
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ничего */ }
  }
};

// Состояние приложения
const state = {
  lang: store.get("lang", "ru"),         // язык по умолчанию — русский
  filter: "all",
  query: "",
  route: store.get("route", []),        // массив id мест
  favs: store.get("favs", []),
  hiddenCats: [],
  modalId: null,
  images: {}                             // id -> url фото
};
if (!I18N[state.lang]) state.lang = "ru";

// =====================================================
//  ЯЗЫК
// =====================================================

// t("ключ", {name: ...}) — перевод строки интерфейса с подстановкой значений
function t(key, params = {}) {
  const text = I18N[state.lang][key] ?? I18N.ru[key] ?? key;
  if (typeof text !== "string") return text;
  return text.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? "");
}

// Переведённые поля места / тура / категории (для ru — берутся из data.js)
function sightText(s, field) {
  return DATA_I18N[state.lang]?.sights[s.id]?.[field] ?? s[field];
}
function tourText(tour, field) {
  return DATA_I18N[state.lang]?.tours[tour.id]?.[field] ?? tour[field];
}
function catName(cat) {
  return DATA_I18N[state.lang]?.cats[cat] ?? CATEGORIES[cat].name;
}
const locale = () => ({ ru: "ru-RU", kk: "kk-KZ", en: "en-GB" }[state.lang]);

// Перевод статичных текстов из HTML по атрибутам data-i18n*
function translatePage() {
  document.documentElement.lang = state.lang;
  document.title = t("meta.title");
  $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  $$("[data-i18n-title]").forEach((el) => { el.title = t(el.dataset.i18nTitle); });
  $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  $$("[data-lang]").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === state.lang));
}

// Смена языка: переводим страницу и перерисовываем всё, что создаёт JS
function setLang(lang) {
  state.lang = lang;
  store.set("lang", lang);
  translatePage();
  renderFilters();
  renderGrid();
  renderAddSelect();
  renderLegend();
  renderTours();
  renderTips();
  renderRoute();
  if (state.modalId) fillModal(state.modalId);
  if (map) SIGHTS.forEach((s) => markers[s.id].setPopupContent(popupHtml(s)));
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-lang]");
  if (b && b.dataset.lang !== state.lang) setLang(b.dataset.lang);
});

// ---------- Уведомления ----------
function toast(text) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = text;
  $("#toasts").append(el);
  setTimeout(() => {
    el.classList.add("is-leaving");
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

// =====================================================
//  НАВИГАЦИЯ: кнопки с data-go плавно прокручивают к разделу
// =====================================================
function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth" });
  $("#nav").classList.remove("is-open");
  if (id === "map") setTimeout(() => map && map.invalidateSize(), 400);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn) goTo(btn.dataset.go);
});

$("#burger").addEventListener("click", () => $("#nav").classList.toggle("is-open"));

// Подсветка активного раздела в меню и точках
const sectionIds = ["home", "sights", "map", "route", "tours", "tips", "contacts"];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    $$(".nav__link, .dots button").forEach((b) => b.classList.toggle("is-active", b.dataset.go === id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sectionIds.forEach((id) => spy.observe(document.getElementById(id)));

// Шапка, прогресс-бар и кнопка «наверх» при прокрутке
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  $("#header").classList.toggle("is-scrolled", y > 40);
  $("#toTop").classList.toggle("is-visible", y > innerHeight * 0.8);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Плавное появление блоков
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => revealer.observe(el));

// Счётчики на главной
function animateCounters() {
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
setTimeout(animateCounters, 500);

// =====================================================
//  ТЕМА (светлая / тёмная)
// =====================================================
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("#themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
  store.set("theme", theme);
  if (map) setTiles();
}
$("#themeToggle").addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

// =====================================================
//  ФОТО: берём картинки из Википедии по названию статьи
// =====================================================
// Сначала ищем фото в папке images/ (скачанные скриптом), иначе — берём из Википедии онлайн
const localImage = (id) => (typeof LOCAL_IMAGES !== "undefined" ? LOCAL_IMAGES[id] : null);

async function loadImage(sight) {
  if (state.images[sight.id] !== undefined) return state.images[sight.id];
  if (localImage(sight.id)) return (state.images[sight.id] = localImage(sight.id).file);
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(sight.wiki)}`);
    const data = await res.json();
    const src = data.thumbnail ? data.thumbnail.source.replace(/\/\d+px-/, "/800px-") : null;
    state.images[sight.id] = src;
  } catch {
    state.images[sight.id] = null;
  }
  return state.images[sight.id];
}

function paintImage(el, sight) {
  loadImage(sight).then((src) => {
    if (src) {
      // Если увеличенная версия не загрузится — останется запасной фон
      const img = new Image();
      img.onload = () => { el.style.backgroundImage = `url("${src}")`; el.classList.remove("img-fallback"); el.textContent = ""; };
      img.src = src;
    }
  });
}

function fallbackBox(el, sight) {
  el.classList.add("img-fallback");
  el.textContent = CATEGORIES[sight.cat].icon;
}

// =====================================================
//  КАРТОЧКИ ДОСТОПРИМЕЧАТЕЛЬНОСТЕЙ
// =====================================================
function renderFilters() {
  const chips = [["all", t("filter.all")]]
    .concat(Object.keys(CATEGORIES).map((key) => [key, `${CATEGORIES[key].icon} ${catName(key)}`]))
    .concat([["fav", t("filter.fav")]]);
  $("#filters").innerHTML = chips.map(([key, label]) =>
    `<button class="chip ${state.filter === key ? "is-active" : ""}" data-filter="${key}">${label}</button>`).join("");
}

function visibleSights() {
  const q = state.query.trim().toLowerCase();
  return SIGHTS.filter((s) => {
    if (state.filter === "fav" && !state.favs.includes(s.id)) return false;
    if (state.filter !== "all" && state.filter !== "fav" && s.cat !== state.filter) return false;
    if (!q) return true;
    // Ищем сразу на всех языках, чтобы «Luxor» находился и на русской версии
    const texts = [s.name, s.city, s.short, s.desc];
    ["kk", "en"].forEach((l) => {
      const tr = DATA_I18N[l].sights[s.id];
      texts.push(tr.name, tr.city, tr.short, tr.desc);
    });
    return texts.join(" ").toLowerCase().includes(q);
  });
}

function renderGrid() {
  const list = visibleSights();
  const grid = $("#grid");
  grid.innerHTML = "";
  $("#empty").hidden = list.length > 0;

  list.forEach((s, i) => {
    const inRoute = state.route.includes(s.id);
    const fav = state.favs.includes(s.id);
    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${Math.min(i * 40, 320)}ms`;
    card.innerHTML = `
      <div class="card__media">
        <div class="card__img"></div>
        <span class="card__badge">${CATEGORIES[s.cat].icon} ${catName(s.cat)}</span>
        <button class="card__fav" data-act="fav" aria-label="${t("aria.fav")}">${fav ? "♥" : "♡"}</button>
      </div>
      <div class="card__body">
        <p class="card__city">📍 ${sightText(s, "city")}</p>
        <h3 class="card__title">${sightText(s, "name")}</h3>
        <p class="card__text">${sightText(s, "short")}</p>
        <div class="card__actions">
          <button class="btn btn--small ${inRoute ? "in-route" : ""}" data-act="route">${inRoute ? t("btn.inRoute") : t("btn.add")}</button>
          <button class="btn btn--small" data-act="map">${t("btn.cardMap")}</button>
        </div>
      </div>`;
    const imgEl = $(".card__img", card);
    fallbackBox(imgEl, s);
    paintImage(imgEl, s);

    card.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "fav") toggleFav(s.id);
      else if (act === "route") toggleRoute(s.id);
      else if (act === "map") showOnMap(s.id);
      else openModal(s.id);
    });
    grid.append(card);
  });
}

$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  state.filter = chip.dataset.filter;
  $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
  renderGrid();
});

$("#search").addEventListener("input", (e) => {
  state.query = e.target.value;
  renderGrid();
});

function toggleFav(id) {
  const has = state.favs.includes(id);
  state.favs = has ? state.favs.filter((x) => x !== id) : [...state.favs, id];
  store.set("favs", state.favs);
  toast(has ? t("toast.favRemove") : t("toast.favAdd"));
  renderGrid();
  if (state.modalId === id) fillModal(id);
}

// =====================================================
//  МОДАЛЬНОЕ ОКНО С ПОДРОБНОСТЯМИ
// =====================================================
function wikiUrl(s) {
  if (state.lang === "en") return `https://en.wikipedia.org/wiki/${encodeURIComponent(s.wiki)}`;
  return `https://${state.lang}.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(sightText(s, "name"))}`;
}

function fillModal(id) {
  const s = byId(id);
  const changed = state.modalId !== id;
  state.modalId = id;
  if (changed || !$("#modalImg").style.backgroundImage) {
    const img = $("#modalImg");
    img.style.backgroundImage = "";
    fallbackBox(img, s);
    paintImage(img, s);
  }

  $("#modalCat").textContent = `${CATEGORIES[s.cat].icon} ${catName(s.cat)}`;
  $("#modalTitle").textContent = sightText(s, "name");
  $("#modalCity").textContent = `📍 ${sightText(s, "city")}`;
  $("#modalDesc").textContent = sightText(s, "desc");
  $("#modalFacts").innerHTML = `
    <div><small>${t("modal.visit")}</small>≈ ${s.hours} ${t("unit.h")}</div>
    <div><small>${t("modal.best")}</small>${sightText(s, "best")}</div>`;
  $("#modalTip").textContent = `💡 ${sightText(s, "tip")}`;
  const photo = localImage(id);
  $("#modalCredit").hidden = !photo;
  if (photo) {
    $("#modalCredit").innerHTML = `📷 ${t("photo")}: ${photo.author || "Wikimedia Commons"}` +
      `${photo.license ? ` · ${photo.license}` : ""} · <a href="${photo.source}" target="_blank" rel="noopener">Wikimedia Commons</a>`;
  }
  $("#modalAdd").textContent = state.route.includes(id) ? t("btn.removeRoute") : t("btn.add");
  $("#modalFav").textContent = state.favs.includes(id) ? t("btn.faved") : t("btn.fav");
  $("#modalWiki").href = wikiUrl(s);
}

function openModal(id) {
  state.modalId = null;
  fillModal(id);
  $("#modal").classList.add("is-open");
  $("#modal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $(".modal__close").focus({ preventScroll: true });
}

function closeModal() {
  $("#modal").classList.remove("is-open");
  $("#modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  state.modalId = null;
}

function stepModal(dir) {
  const i = SIGHTS.findIndex((s) => s.id === state.modalId);
  fillModal(SIGHTS[(i + dir + SIGHTS.length) % SIGHTS.length].id);
}

$("#modal").addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
$("#modalAdd").addEventListener("click", () => { toggleRoute(state.modalId); fillModal(state.modalId); });
$("#modalFav").addEventListener("click", () => toggleFav(state.modalId));
$("#modalMap").addEventListener("click", () => { const id = state.modalId; closeModal(); showOnMap(id); });
$("#modalPrev").addEventListener("click", () => stepModal(-1));
$("#modalNext").addEventListener("click", () => stepModal(1));

document.addEventListener("keydown", (e) => {
  if (!state.modalId) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") stepModal(1);
  if (e.key === "ArrowLeft") stepModal(-1);
});

// =====================================================
//  КАРТА (Leaflet + бесплатные тайлы CARTO, запасные — Esri и OpenStreetMap)
// =====================================================
let map = null;
let tileLayer = null;
let routeLine = null;
const markers = {};

// Источники подложки карты. Если первый не грузится (заблокирован сетью),
// автоматически переключаемся на следующий.
const OSM = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const TILE_PROVIDERS = [
  { url: (dark) => `https://{s}.basemaps.cartocdn.com/${dark ? "dark_all" : "rastertiles/voyager"}/{z}/{x}/{y}{r}.png`,
    attribution: `${OSM} &copy; <a href="https://carto.com/">CARTO</a>` },
  { url: () => "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri" },
  { url: () => "https://tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: OSM }
];
let providerIndex = 0;

function setTiles() {
  const dark = document.documentElement.dataset.theme === "dark";
  const provider = TILE_PROVIDERS[providerIndex];
  if (tileLayer) map.removeLayer(tileLayer);
  tileLayer = L.tileLayer(provider.url(dark), { maxZoom: 18, attribution: provider.attribution }).addTo(map);

  // Ни одного тайла не загрузилось, а ошибок уже несколько — пробуем другой источник
  let loaded = false;
  let errors = 0;
  tileLayer.on("tileload", () => { loaded = true; });
  tileLayer.on("tileerror", () => {
    if (loaded || ++errors < 4) return;
    if (providerIndex < TILE_PROVIDERS.length - 1) {
      providerIndex++;
      setTiles();
    } else {
      $("#mapFallback").hidden = false;
    }
  });
}

function pinIcon(s) {
  const n = state.route.indexOf(s.id);
  const label = n >= 0 ? n + 1 : CATEGORIES[s.cat].icon;
  return L.divIcon({
    className: "",
    html: `<div class="pin ${n >= 0 ? "is-route" : ""}" style="background:${CATEGORIES[s.cat].color}"><span>${label}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
}

function popupHtml(s) {
  const inRoute = state.route.includes(s.id);
  return `<div class="popup">
    <b>${sightText(s, "name")}</b>
    <p>${sightText(s, "city")} · ≈ ${s.hours} ${t("unit.h")}</p>
    <div class="popup__btns">
      <button data-pop="route" data-id="${s.id}">${inRoute ? t("popup.remove") : t("btn.add")}</button>
      <button data-pop="more" data-id="${s.id}">${t("popup.more")}</button>
    </div>
  </div>`;
}

function initMap() {
  if (typeof L === "undefined") {
    $("#mapFallback").hidden = false;
    return;
  }
  map = L.map("leafletMap", { scrollWheelZoom: false, zoomControl: true }).setView([26.8, 30.8], 6);
  setTiles();

  SIGHTS.forEach((s) => {
    markers[s.id] = L.marker([s.lat, s.lng], { icon: pinIcon(s) })
      .bindPopup(() => popupHtml(s))
      .addTo(map);
  });

  // Колёсико мыши включается только после клика по карте — чтобы не мешать прокрутке страницы
  map.on("click", () => map.scrollWheelZoom.enable());
  map.on("mouseout", () => map.scrollWheelZoom.disable());

  // Кнопки внутри всплывающих окон карты
  $("#leafletMap").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pop]");
    if (!b) return;
    if (b.dataset.pop === "route") { toggleRoute(b.dataset.id); markers[b.dataset.id].closePopup(); }
    else openModal(b.dataset.id);
  });

  fitAll();
}

function renderLegend() {
  $("#legend").innerHTML = Object.entries(CATEGORIES).map(([key, c]) => `
    <label><input type="checkbox" value="${key}" ${state.hiddenCats.includes(key) ? "" : "checked"}>
      <i style="background:${c.color}"></i> ${c.icon} ${catName(key)}</label>`).join("");
}
$("#legend").addEventListener("change", (e) => {
  const cat = e.target.value;
  state.hiddenCats = e.target.checked ? state.hiddenCats.filter((x) => x !== cat) : [...state.hiddenCats, cat];
  updateMarkers();
});

function updateMarkers() {
  if (!map) return;
  SIGHTS.forEach((s) => {
    const m = markers[s.id];
    m.setIcon(pinIcon(s));
    const hidden = state.hiddenCats.includes(s.cat) && !state.route.includes(s.id);
    if (hidden && map.hasLayer(m)) map.removeLayer(m);
    if (!hidden && !map.hasLayer(m)) m.addTo(map);
  });

  if (routeLine) map.removeLayer(routeLine);
  const pts = state.route.map((id) => [byId(id).lat, byId(id).lng]);
  routeLine = pts.length > 1
    ? L.polyline(pts, { color: "#e8b960", weight: 4, dashArray: "8 8", opacity: 0.95 }).addTo(map)
    : null;
}

function fitAll() {
  if (!map) return;
  map.fitBounds(L.latLngBounds(SIGHTS.map((s) => [s.lat, s.lng])), { padding: [30, 30] });
}

function fitRoute() {
  if (!map) return;
  if (!state.route.length) { toast(t("toast.needRoute")); return; }
  const pts = state.route.map((id) => [byId(id).lat, byId(id).lng]);
  if (pts.length === 1) map.setView(pts[0], 11);
  else map.fitBounds(pts, { padding: [40, 40] });
}

function showOnMap(id) {
  goTo("map");
  if (!map) return;
  const s = byId(id);
  setTimeout(() => {
    map.flyTo([s.lat, s.lng], 12, { duration: 1.2 });
    markers[id].addTo(map).openPopup();
  }, 600);
}

$("#fitAll").addEventListener("click", fitAll);
$("#fitRoute").addEventListener("click", fitRoute);

// =====================================================
//  КОНСТРУКТОР МАРШРУТА
// =====================================================

// Расстояние между двумя точками по прямой (формула гаверсинусов), км
function distance(a, b) {
  const R = 6371;
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// Дороги длиннее прямой линии — умножаем примерно на 1.3
const roadKm = (a, b) => Math.round(distance(a, b) * 1.3);

function saveRoute() {
  store.set("route", state.route);
  const badge = $("#routeCount");
  badge.textContent = state.route.length;
  badge.classList.remove("bump");
  void badge.offsetWidth; // перезапуск анимации
  badge.classList.add("bump");
  renderRoute();
  renderGrid();
  updateMarkers();
}

function toggleRoute(id) {
  const has = state.route.includes(id);
  state.route = has ? state.route.filter((x) => x !== id) : [...state.route, id];
  const name = sightText(byId(id), "name");
  toast(has ? t("toast.routeRemove", { name }) : t("toast.routeAdd", { name }));
  saveRoute();
}

function moveStop(from, to) {
  if (to < 0 || to >= state.route.length) return;
  const arr = [...state.route];
  const [item] = arr.splice(from, 1);
  arr.splice(to, 0, item);
  state.route = arr;
  saveRoute();
}

function renderAddSelect() {
  $("#addSelect").innerHTML = `<option value="">${t("route.choose")}</option>` +
    SIGHTS.map((s) => `<option value="${s.id}">${CATEGORIES[s.cat].icon} ${sightText(s, "name")}</option>`).join("");
}

function renderRoute() {
  const list = $("#stops");
  list.innerHTML = "";
  $("#stopsEmpty").hidden = state.route.length > 0;

  state.route.forEach((id, i) => {
    const s = byId(id);
    if (i > 0) {
      const leg = document.createElement("li");
      leg.className = "leg";
      leg.textContent = `↓ ≈ ${roadKm(byId(state.route[i - 1]), s)} ${t("unit.km")}`;
      list.append(leg);
    }
    const li = document.createElement("li");
    li.className = "stop";
    li.draggable = true;
    li.dataset.index = i;
    li.innerHTML = `
      <span class="stop__num">${i + 1}</span>
      <div class="stop__info"><b>${sightText(s, "name")}</b><span>${sightText(s, "city")} · ≈ ${s.hours} ${t("unit.h")}</span></div>
      <div class="stop__btns">
        <button data-move="-1" ${i === 0 ? "disabled" : ""} aria-label="${t("aria.up")}">↑</button>
        <button data-move="1" ${i === state.route.length - 1 ? "disabled" : ""} aria-label="${t("aria.down")}">↓</button>
        <button data-remove aria-label="${t("aria.remove")}">✕</button>
      </div>`;
    list.append(li);
  });

  renderSummary();
}

// Кнопки внутри списка остановок
$("#stops").addEventListener("click", (e) => {
  const li = e.target.closest(".stop");
  if (!li) return;
  const i = +li.dataset.index;
  if (e.target.closest("[data-remove]")) toggleRoute(state.route[i]);
  else if (e.target.closest("[data-move]")) moveStop(i, i + +e.target.closest("[data-move]").dataset.move);
  else openModal(state.route[i]);
});

// Перетаскивание мышью (drag & drop)
let dragFrom = null;
$("#stops").addEventListener("dragstart", (e) => {
  const li = e.target.closest(".stop");
  if (!li) return;
  dragFrom = +li.dataset.index;
  li.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
});
$("#stops").addEventListener("dragover", (e) => {
  e.preventDefault();
  $$(".stop.drag-over").forEach((x) => x.classList.remove("drag-over"));
  e.target.closest(".stop")?.classList.add("drag-over");
});
$("#stops").addEventListener("drop", (e) => {
  e.preventDefault();
  const li = e.target.closest(".stop");
  if (li && dragFrom !== null) moveStop(dragFrom, +li.dataset.index);
  dragFrom = null;
});
$("#stops").addEventListener("dragend", () => {
  dragFrom = null;
  $$(".stop").forEach((x) => x.classList.remove("dragging", "drag-over"));
});

// Расписание по дням: складываем часы осмотра и дороги (≈ 70 км/ч)
function buildPlan() {
  const limit = +$("#pace").value;
  const days = [];
  let day = { items: [], hours: 0 };
  state.route.forEach((id, i) => {
    const s = byId(id);
    const travel = i > 0 ? roadKm(byId(state.route[i - 1]), s) / 70 : 0;
    const need = travel + s.hours;
    if (day.items.length && day.hours + need > limit) {
      days.push(day);
      day = { items: [], hours: 0 };
    }
    if (travel > 0.5) day.items.push(t("plan.drive", { h: travel.toFixed(1) }));
    day.items.push(`${CATEGORIES[s.cat].icon} ${sightText(s, "name")}`);
    day.hours += need;
  });
  if (day.items.length) days.push(day);
  return days;
}

function renderSummary() {
  let km = 0;
  for (let i = 1; i < state.route.length; i++) km += roadKm(byId(state.route[i - 1]), byId(state.route[i]));
  const days = buildPlan();

  $("#sumStops").textContent = state.route.length;
  $("#sumKm").textContent = km.toLocaleString(locale());
  $("#sumDays").textContent = days.length;

  const start = $("#startDate").value ? new Date($("#startDate").value) : null;
  $("#plan").innerHTML = days.length
    ? days.map((d, i) => {
        let date = "";
        if (start) {
          const dt = new Date(start);
          dt.setDate(dt.getDate() + i);
          date = ` <small>· ${dt.toLocaleDateString(locale(), { day: "numeric", month: "long", weekday: "short" })}</small>`;
        }
        return `<div class="day" style="animation-delay:${i * 50}ms">
          <h4>${t("plan.day", { n: i + 1 })}${date}</h4>
          <ul>${d.items.map((x) => `<li>${x}</li>`).join("")}</ul>
        </div>`;
      }).join("")
    : `<p class="hint">${t("plan.empty")}</p>`;
}

$("#startDate").addEventListener("change", () => { store.set("startDate", $("#startDate").value); renderSummary(); });
$("#pace").addEventListener("change", renderSummary);

$("#addBtn").addEventListener("click", () => {
  const id = $("#addSelect").value;
  if (!id) { toast(t("toast.choose")); return; }
  if (state.route.includes(id)) { toast(t("toast.already")); return; }
  toggleRoute(id);
  $("#addSelect").value = "";
});

// «Оптимизировать»: метод ближайшего соседа — каждый раз едем в ближайшее непосещённое место
$("#optimizeBtn").addEventListener("click", () => {
  if (state.route.length < 3) { toast(t("toast.need3")); return; }
  const rest = state.route.slice(1);
  const result = [state.route[0]];
  while (rest.length) {
    const last = byId(result[result.length - 1]);
    let best = 0;
    rest.forEach((id, i) => { if (distance(last, byId(id)) < distance(last, byId(rest[best]))) best = i; });
    result.push(rest.splice(best, 1)[0]);
  }
  state.route = result;
  saveRoute();
  toast(t("toast.optimized"));
});

$("#showOnMapBtn").addEventListener("click", () => {
  if (!state.route.length) { toast(t("toast.empty")); return; }
  goTo("map");
  setTimeout(fitRoute, 600);
});

$("#gmapsBtn").addEventListener("click", () => {
  if (state.route.length < 2) { toast(t("toast.need2")); return; }
  const path = state.route.map((id) => `${byId(id).lat},${byId(id).lng}`).join("/");
  window.open(`https://www.google.com/maps/dir/${path}`, "_blank", "noopener");
});

$("#shareBtn").addEventListener("click", async () => {
  if (!state.route.length) { toast(t("toast.empty")); return; }
  const url = `${location.href.split("#")[0]}#route=${state.route.join(",")}`;
  try {
    await navigator.clipboard.writeText(url);
    toast(t("toast.copied"));
  } catch {
    prompt(t("prompt.copy"), url);
  }
});

$("#printBtn").addEventListener("click", () => {
  if (!state.route.length) { toast(t("toast.empty")); return; }
  print();
});

$("#clearBtn").addEventListener("click", () => {
  if (!state.route.length) return;
  if (!confirm(t("confirm.clear"))) return;
  state.route = [];
  saveRoute();
  toast(t("toast.cleared"));
});

// Маршрут из ссылки вида index.html#route=giza,sphinx
function readRouteFromUrl() {
  const m = location.hash.match(/route=([\w,]+)/);
  if (!m) return;
  const ids = m[1].split(",").filter(byId);
  if (ids.length) {
    state.route = ids;
    store.set("route", ids);
    setTimeout(() => { goTo("route"); toast(t("toast.fromUrl")); }, 300);
  }
}

// =====================================================
//  ГОТОВЫЕ ТУРЫ
// =====================================================
function renderTours() {
  $("#toursList").innerHTML = TOURS.map((tour) => `
    <article class="tour reveal is-visible">
      <div class="tour__emoji">${tour.emoji}</div>
      <h3>${tourText(tour, "name")}</h3>
      <span class="tour__days">${tourText(tour, "days")} · ${t("tours.places", { n: tour.stops.length })}</span>
      <p>${tourText(tour, "text")}</p>
      <div class="tour__stops">${tour.stops.map((id) => `<span>${sightText(byId(id), "name")}</span>`).join("")}</div>
      <button class="btn btn--primary" data-tour="${tour.id}">${t("tours.load")}</button>
    </article>`).join("");
}

$("#toursList").addEventListener("click", (e) => {
  const b = e.target.closest("[data-tour]");
  if (!b) return;
  const tour = TOURS.find((x) => x.id === b.dataset.tour);
  if (state.route.length && !confirm(t("confirm.tour"))) return;
  state.route = [...tour.stops];
  saveRoute();
  toast(t("toast.tour", { emoji: tour.emoji, name: tourText(tour, "name") }));
  goTo("route");
});

// =====================================================
//  СОВЕТЫ: вкладки, погода, фразы
// =====================================================
$(".tabs__list").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  $$(".tab").forEach((x) => x.classList.toggle("is-active", x === tab));
  $$(".tab-panel").forEach((p) => p.classList.toggle("is-active", p.dataset.panel === tab.dataset.tab));
});

let currentMonth = new Date().getMonth();

function renderWeather(month) {
  currentMonth = month;
  $$("#months button").forEach((b, i) => b.classList.toggle("is-active", i === month));
  const cards = Object.entries(WEATHER).map(([place, temps]) => {
    const temp = temps[month];
    const color = temp >= 38 ? "#b5543a" : temp >= 30 ? "#e8973f" : temp >= 24 ? "#e8b960" : "#1f8fb3";
    return `<div class="w-card"><span>${t("w." + place)}</span><b>${temp}°</b>
      <div class="w-bar"><i style="background:${color};transform:scaleX(${temp / 45})"></i></div></div>`;
  });
  const luxor = WEATHER.luxor[month];
  const note = luxor >= 38 ? t("weather.hot") : luxor >= 30 ? t("weather.warm") : t("weather.good");
  $("#weather").innerHTML = cards.join("") + `<p class="w-note">${note}</p>`;
}

function renderTips() {
  $("#months").innerHTML = t("months").map((m, i) => `<button data-month="${i}">${m}</button>`).join("");
  renderWeather(currentMonth);

  $("#phrases").innerHTML = PHRASES.map((p, i) => {
    const tr = DATA_I18N[state.lang]?.phrases[i];
    return `<button class="phrase" data-phrase="${i}"><small>${tr ? tr.mean : p.ru}</small><b>${tr ? tr.say : p.say}</b><span>${p.ar}</span></button>`;
  }).join("");
}

$("#months").addEventListener("click", (e) => {
  const b = e.target.closest("[data-month]");
  if (b) renderWeather(+b.dataset.month);
});

$("#phrases").addEventListener("click", (e) => {
  const b = e.target.closest("[data-phrase]");
  if (!b) return;
  const i = +b.dataset.phrase;
  const p = PHRASES[i];
  const tr = DATA_I18N[state.lang]?.phrases[i];
  const mean = tr ? tr.mean : p.ru;
  const say = tr ? tr.say : p.say;
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(p.ar);
    u.lang = "ar-EG";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }
  navigator.clipboard?.writeText(`${p.ar} — ${say}`).catch(() => {});
  toast(`🗣 ${say} — ${mean}`);
});

// =====================================================
//  ФОРМА В КОНТАКТАХ (демо — данные никуда не отправляются)
// =====================================================
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.elements.name.value.trim();
  const n = $("#attachRoute").checked ? state.route.length : 0;
  toast(n ? t("toast.formRoute", { name, n }) : t("toast.form", { name }));
  e.target.reset();
  $("#attachRoute").checked = true;
});

// =====================================================
//  ЗАПУСК
// =====================================================
setTheme(store.get("theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
readRouteFromUrl();
$("#startDate").value = store.get("startDate", "");
$("#routeCount").textContent = state.route.length;
translatePage();
renderFilters();
renderGrid();
renderAddSelect();
renderLegend();
renderTours();
renderTips();
initMap();
renderRoute();
updateMarkers();
