// Переводы интерфейса: ru — русский, kk — казахский, en — английский.
// В HTML у элемента пишем data-i18n="ключ", и скрипт подставит текст на выбранном языке.

const TEXTS = {
  ru: {
    "nav.home": "Главная", "nav.places": "Места", "nav.route": "Маршрут",
    "nav.tours": "Туры", "nav.tips": "Советы", "nav.contacts": "Контакты",

    "hero.small": "Путеводитель по Египту",
    "hero.title": "Египет — путешествие во времени",
    "hero.text": "Пирамиды, храмы на Ниле и Красное море. Выберите места, прочитайте о них и соберите свой маршрут.",
    "hero.btn1": "Смотреть места", "hero.btn2": "Мой маршрут",

    "places.title": "Достопримечательности",
    "places.text": "Нажмите на карточку, чтобы прочитать подробнее.",
    "places.all": "Все", "places.search": "Поиск…", "places.empty": "Ничего не найдено.",

    "btn.more": "Подробнее", "btn.add": "+ В маршрут", "btn.added": "✓ В маршруте",
    "btn.remove": "Убрать из маршрута", "btn.gmaps": "Открыть в Google Maps", "btn.close": "Закрыть",
    "modal.time": "Время на посещение", "unit.h": "ч", "unit.km": "км",

    "route.title": "Мой маршрут",
    "route.text": "Добавляйте места кнопкой «+ В маршрут» и меняйте порядок стрелками.",
    "route.empty": "Маршрут пока пуст. Добавьте места или выберите готовый тур.",
    "route.places": "Мест", "route.km": "Расстояние", "route.hours": "Время на осмотр",
    "route.gmaps": "Маршрут в Google Maps", "route.clear": "Очистить",
    "route.note": "Расстояние примерное — по прямой с поправкой на дороги.",

    "tours.title": "Готовые туры", "tours.btn": "Выбрать тур",

    "tips.title": "Советы туристу",
    "tips.visa": "Виза",
    "tips.visaText": "<li>Туристы из Казахстана могут оформить визу по прилёте или заранее электронную визу на сайте <a href=\"https://www.visa2egypt.gov.eg\" target=\"_blank\">visa2egypt.gov.eg</a>.</li><li>Паспорт должен действовать ещё минимум 6 месяцев.</li><li>Правила меняются — проверьте их перед поездкой.</li>",
    "tips.money": "Деньги",
    "tips.moneyText": "<li>Валюта — египетский фунт (EGP).</li><li>Карты принимают в отелях и музеях, на рынке нужны наличные.</li><li>Чаевые (бакшиш) — обычное дело, держите мелкие купюры.</li>",
    "tips.rules": "Правила",
    "tips.rulesText": "<li>Пейте только бутилированную воду и берегитесь солнца.</li><li>В мечети — закрытые плечи и колени.</li><li>Нельзя трогать кораллы и вывозить древности.</li>",

    "contacts.title": "Контакты", "contacts.phone": "Наш телефон",
    "contacts.whatsapp": "Нажмите на номер, чтобы написать нам в WhatsApp.",
    "whatsapp.text": "Здравствуйте! Я с сайта EgyptWay. Хочу узнать подробнее о туре в Египет.",
    "contacts.emergency": "Экстренные номера в Египте",
    "contacts.tourist": "Туристическая полиция", "contacts.police": "Полиция",
    "contacts.ambulance": "Скорая помощь", "contacts.fire": "Пожарная служба",
    "contacts.links": "Полезные сайты",
    "links.egypt": "Официальный туристический сайт Египта", "links.visa": "Электронная виза",
    "links.monuments": "Музеи и памятники, билеты", "links.booking": "Бронирование отелей",

    "footer": "EgyptWay — учебный проект. Фото: Wikimedia Commons.",
    "top": "Наверх"
  },

  kk: {
    "nav.home": "Басты бет", "nav.places": "Орындар", "nav.route": "Маршрут",
    "nav.tours": "Турлар", "nav.tips": "Кеңестер", "nav.contacts": "Байланыс",

    "hero.small": "Египет бойынша жолсілтеме",
    "hero.title": "Египет — уақыт бойымен саяхат",
    "hero.text": "Пирамидалар, Ніл бойындағы храмдар және Қызыл теңіз. Орындарды таңдап, олар туралы оқып, өз маршрутыңызды құрыңыз.",
    "hero.btn1": "Орындарды көру", "hero.btn2": "Менің маршрутым",

    "places.title": "Көрікті жерлер",
    "places.text": "Толығырақ оқу үшін карточканы басыңыз.",
    "places.all": "Барлығы", "places.search": "Іздеу…", "places.empty": "Ештеңе табылмады.",

    "btn.more": "Толығырақ", "btn.add": "+ Маршрутқа", "btn.added": "✓ Маршрутта",
    "btn.remove": "Маршруттан алып тастау", "btn.gmaps": "Google Maps-та ашу", "btn.close": "Жабу",
    "modal.time": "Көруге кететін уақыт", "unit.h": "сағ", "unit.km": "км",

    "route.title": "Менің маршрутым",
    "route.text": "Орындарды «+ Маршрутқа» батырмасымен қосып, ретін бағыттауыштармен өзгертіңіз.",
    "route.empty": "Маршрут әзірге бос. Орын қосыңыз немесе дайын турды таңдаңыз.",
    "route.places": "Орын", "route.km": "Қашықтық", "route.hours": "Көруге кететін уақыт",
    "route.gmaps": "Google Maps-тағы маршрут", "route.clear": "Тазалау",
    "route.note": "Қашықтық шамамен алынған — түзу сызықпен, жолға түзету қосылған.",

    "tours.title": "Дайын турлар", "tours.btn": "Турды таңдау",

    "tips.title": "Туристке кеңестер",
    "tips.visa": "Виза",
    "tips.visaText": "<li>Қазақстаннан келген туристер визаны әуежайда немесе алдын ала <a href=\"https://www.visa2egypt.gov.eg\" target=\"_blank\">visa2egypt.gov.eg</a> сайтында электронды түрде ала алады.</li><li>Төлқұжат кемінде тағы 6 ай жарамды болуы керек.</li><li>Ережелер өзгеріп тұрады — сапар алдында тексеріңіз.</li>",
    "tips.money": "Ақша",
    "tips.moneyText": "<li>Валюта — Египет фунты (EGP).</li><li>Карталарды қонақүйлер мен мұражайларда қабылдайды, базарда қолма-қол ақша керек.</li><li>Шайпұл (бакшиш) беру — қалыпты жағдай, ұсақ ақша алып жүріңіз.</li>",
    "tips.rules": "Ережелер",
    "tips.rulesText": "<li>Тек бөтелкедегі су ішіңіз және күннен сақтаныңыз.</li><li>Мешітте иық пен тізе жабық болуы керек.</li><li>Маржандарды ұстауға және көне жәдігерлерді шығаруға болмайды.</li>",

    "contacts.title": "Байланыс", "contacts.phone": "Біздің телефон",
    "contacts.whatsapp": "WhatsApp-қа жазу үшін нөмірді басыңыз.",
    "whatsapp.text": "Сәлеметсіз бе! Мен EgyptWay сайтынанмын. Египетке тур туралы толығырақ білгім келеді.",
    "contacts.emergency": "Египеттегі шұғыл нөмірлер",
    "contacts.tourist": "Туристік полиция", "contacts.police": "Полиция",
    "contacts.ambulance": "Жедел жәрдем", "contacts.fire": "Өрт сөндіру қызметі",
    "contacts.links": "Пайдалы сайттар",
    "links.egypt": "Египеттің ресми туристік сайты", "links.visa": "Электронды виза",
    "links.monuments": "Мұражайлар мен ескерткіштер, билеттер", "links.booking": "Қонақүй брондау",

    "footer": "EgyptWay — оқу жобасы. Фото: Wikimedia Commons.",
    "top": "Жоғары"
  },

  en: {
    "nav.home": "Home", "nav.places": "Places", "nav.route": "Route",
    "nav.tours": "Tours", "nav.tips": "Tips", "nav.contacts": "Contacts",

    "hero.small": "A guide to Egypt",
    "hero.title": "Egypt — a journey through time",
    "hero.text": "Pyramids, temples on the Nile and the Red Sea. Pick places, read about them and build your own route.",
    "hero.btn1": "See places", "hero.btn2": "My route",

    "places.title": "Sights",
    "places.text": "Click a card to read more.",
    "places.all": "All", "places.search": "Search…", "places.empty": "Nothing found.",

    "btn.more": "Details", "btn.add": "+ Add to route", "btn.added": "✓ In route",
    "btn.remove": "Remove from route", "btn.gmaps": "Open in Google Maps", "btn.close": "Close",
    "modal.time": "Time to visit", "unit.h": "h", "unit.km": "km",

    "route.title": "My route",
    "route.text": "Add places with the “+ Add to route” button and change the order with the arrows.",
    "route.empty": "Your route is empty. Add places or choose a ready-made tour.",
    "route.places": "Places", "route.km": "Distance", "route.hours": "Sightseeing time",
    "route.gmaps": "Route in Google Maps", "route.clear": "Clear",
    "route.note": "The distance is approximate — a straight line adjusted for roads.",

    "tours.title": "Ready-made tours", "tours.btn": "Choose tour",

    "tips.title": "Travel tips",
    "tips.visa": "Visa",
    "tips.visaText": "<li>Travellers from Kazakhstan can get a visa on arrival or an e-visa in advance at <a href=\"https://www.visa2egypt.gov.eg\" target=\"_blank\">visa2egypt.gov.eg</a>.</li><li>Your passport must be valid for at least 6 more months.</li><li>Rules change — check them before you travel.</li>",
    "tips.money": "Money",
    "tips.moneyText": "<li>The currency is the Egyptian pound (EGP).</li><li>Cards are accepted in hotels and museums; markets need cash.</li><li>Tipping (baksheesh) is normal, so keep small notes.</li>",
    "tips.rules": "Rules",
    "tips.rulesText": "<li>Drink only bottled water and protect yourself from the sun.</li><li>In mosques, cover your shoulders and knees.</li><li>Don't touch corals or take antiquities out of the country.</li>",

    "contacts.title": "Contacts", "contacts.phone": "Our phone",
    "contacts.whatsapp": "Tap the number to message us on WhatsApp.",
    "whatsapp.text": "Hello! I found you on EgyptWay. I would like to know more about a tour to Egypt.",
    "contacts.emergency": "Emergency numbers in Egypt",
    "contacts.tourist": "Tourist police", "contacts.police": "Police",
    "contacts.ambulance": "Ambulance", "contacts.fire": "Fire service",
    "contacts.links": "Useful websites",
    "links.egypt": "Egypt's official tourism website", "links.visa": "E-visa",
    "links.monuments": "Museums and monuments, tickets", "links.booking": "Hotel booking",

    "footer": "EgyptWay — a student project. Photos: Wikimedia Commons.",
    "top": "Top"
  }
};
