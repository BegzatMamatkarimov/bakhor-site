// =====================================================
//  ПЕРЕВОДЫ: русский (ru), казахский (kk), английский (en)
//  I18N      — тексты интерфейса
//  DATA_I18N — переводы мест, туров и фраз на kk и en
//              (русские тексты лежат в data.js)
//  {name}, {n} — места, куда подставляются значения
// =====================================================

const I18N = {
  ru: {
    "meta.title": "Египет — путеводитель и конструктор маршрута",
    "nav.home": "Главная", "nav.sights": "Места", "nav.map": "Карта", "nav.route": "Маршрут",
    "nav.tours": "Туры", "nav.tips": "Советы", "nav.contacts": "Контакты",
    "aria.myRoute": "Мой маршрут", "aria.theme": "Светлая / тёмная тема", "aria.menu": "Меню", "aria.close": "Закрыть",

    "hero.eyebrow": "Путеводитель · 5000 лет истории",
    "hero.title1": "Египет:", "hero.title2": "путешествие во времени",
    "hero.lead": "Пирамиды, храмы на Ниле, Красное море и пустыня. Выбирайте места, смотрите их на карте и собирайте свой маршрут по дням.",
    "hero.cta1": "Смотреть места ↓", "hero.cta2": "Построить маршрут",
    "stat.places": "мест в гиде", "stat.tours": "готовых тура", "stat.nile": "км по Нилу",

    "sights.eyebrow": "Что посмотреть", "sights.title": "Достопримечательности",
    "sights.lead": "Нажмите на карточку, чтобы прочитать подробнее. Кнопка «+» добавляет место в ваш маршрут.",
    "filter.all": "Все", "filter.fav": "♥ Избранное",
    "search.ph": "Поиск: Луксор, храм, море…",
    "sights.empty": "Ничего не найдено. Попробуйте другой запрос или фильтр.",

    "map.eyebrow": "Где это находится", "map.title": "Интерактивная карта",
    "map.lead": "Нажмите на точку, чтобы увидеть место. Золотая линия — ваш маршрут.",
    "map.fallback": "Карта не загрузилась — проверьте подключение к интернету: подложка карты грузится из сети.",
    "photo": "Фото",
    "map.show": "Показать на карте", "map.all": "Вся страна", "map.myRoute": "Мой маршрут",
    "map.hint": "Совет: в окне точки есть кнопка «В маршрут».",

    "route.eyebrow": "Своё путешествие", "route.title": "Конструктор маршрута",
    "route.lead": "Добавляйте места, меняйте порядок перетаскиванием или стрелками — план по дням посчитается сам.",
    "route.choose": "Выберите место…", "route.add": "+ Добавить",
    "route.emptyTitle": "🐪 Маршрут пока пуст",
    "route.emptyText": "Добавьте места из списка выше, из карточек или загрузите готовый тур.",
    "route.toTours": "Готовые туры",
    "route.optimize": "⚡ Оптимизировать", "route.optimizeTitle": "Упорядочить точки по кратчайшему пути",
    "route.onMap": "🗺 На карте", "route.gmaps": "📍 Google Maps", "route.share": "🔗 Ссылка",
    "route.print": "🖨 Печать", "route.clear": "Очистить",
    "route.date": "Дата начала поездки", "route.pace": "Темп поездки",
    "pace.7": "Спокойный (≈7 ч в день)", "pace.9": "Обычный (≈9 ч в день)", "pace.12": "Активный (≈12 ч в день)",
    "sum.stops": "мест", "sum.km": "км в пути", "sum.days": "дней",
    "plan.title": "План по дням", "plan.empty": "Здесь появится расписание.",
    "plan.day": "День {n}", "plan.drive": "🚐 Дорога ≈ {h} ч",
    "unit.h": "ч", "unit.km": "км", "aria.up": "Выше", "aria.down": "Ниже", "aria.remove": "Удалить",

    "tours.eyebrow": "Не знаете, с чего начать?", "tours.title": "Готовые туры",
    "tours.lead": "Загрузите тур в конструктор одним нажатием, а потом измените под себя.",
    "tours.load": "Загрузить в маршрут", "tours.places": "{n} мест",

    "tips.eyebrow": "Полезно знать", "tips.title": "Советы туристу",
    "tab.weather": "☀️ Погода", "tab.visa": "🛂 Виза", "tab.money": "💵 Деньги", "tab.safety": "🛡 Правила", "tab.phrases": "🗣 Фразы",
    "weather.intro": "Выберите месяц — покажем среднюю дневную температуру (примерные данные).",
    "weather.hot": "🔥 Очень жарко на юге — экскурсии только рано утром. Хорошее время для моря.",
    "weather.warm": "☀️ Тепло и солнечно — берите шляпу и воду.",
    "weather.good": "👍 Комфортный сезон для экскурсий по храмам и пирамидам.",
    "w.cairo": "Каир", "w.luxor": "Луксор", "w.hurghada": "Хургада", "w.sea": "Море у Хургады",
    "months": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    "visa.list": `<li>Многие туристы (в том числе из Казахстана) могут оформить визу <b>по прилёте</b> в аэропорту или заранее <b>электронную визу</b>.</li>
      <li>Электронная виза оформляется только на официальном сайте <a href="https://www.visa2egypt.gov.eg" target="_blank" rel="noopener">visa2egypt.gov.eg</a>.</li>
      <li>Паспорт должен быть действителен ещё минимум 6 месяцев.</li>
      <li>Правила меняются — перед поездкой проверьте их у посольства или туроператора.</li>`,
    "money.list": `<li>Валюта — <b>египетский фунт (EGP)</b>. Удобно иметь доллары и менять в банках или официальных обменниках.</li>
      <li>Карты принимают в отелях, торговых центрах и музеях; на рынках нужны наличные.</li>
      <li><b>Бакшиш</b> (чаевые) — часть культуры: держите при себе мелкие купюры.</li>
      <li>На рынке торгуйтесь — первая цена обычно завышена в 2–3 раза.</li>`,
    "safety.list": `<li>Пейте только бутилированную воду, берегитесь солнца: шляпа, крем, вода.</li>
      <li>В мечети — закрытые плечи и колени, женщинам — платок.</li>
      <li>Не фотографируйте военные объекты и полицию.</li>
      <li>Не трогайте кораллы и не кормите рыб — это запрещено в заповедниках.</li>
      <li>Вывозить древности и кораллы запрещено законом.</li>`,
    "phrases.intro": "Нажмите на фразу — браузер её произнесёт (если поддерживает арабский голос), а текст скопируется.",

    "contacts.eyebrow": "Связь и ссылки", "contacts.title": "Контакты",
    "contacts.phone": "📞 Наш телефон", "contacts.phoneHint": "Учебный проект. Ответим на вопросы по маршруту.",
    "form.name": "Ваше имя", "form.contact": "Телефон или e-mail", "form.msg": "Вопрос или пожелание к туру",
    "form.attach": "Прикрепить мой маршрут", "form.send": "Отправить",
    "emergency.title": "🚨 Экстренные номера в Египте",
    "emergency.tourist": "Туристическая полиция", "emergency.police": "Полиция",
    "emergency.ambulance": "Скорая помощь", "emergency.fire": "Пожарная служба",
    "links.title": "🌐 Полезные сайты",
    "links.egypt": "Официальный туристический портал", "links.visa": "Официальная электронная виза",
    "links.monuments": "Музеи и памятники, часы работы, билеты",
    "links.gemName": "Большой Египетский музей", "links.gem": "Билеты в GEM",
    "links.trip": "Отзывы, экскурсии, рестораны", "links.booking": "Отели по всему Египту",
    "footer.text": "© EgyptWay — учебный проект. Фото: Wikipedia / Wikimedia Commons. Карта: © OpenStreetMap, © CARTO.",
    "footer.top": "Наверх ↑", "aria.toTop": "Наверх",

    "modal.visit": "Время на посещение", "modal.best": "Когда лучше ехать",
    "btn.add": "+ В маршрут", "btn.inRoute": "✓ В маршруте", "btn.removeRoute": "✓ Убрать из маршрута",
    "btn.cardMap": "🗺 Карта", "btn.onMap": "🗺 На карте",
    "btn.fav": "♡ В избранное", "btn.faved": "♥ В избранном", "btn.wiki": "📖 Википедия",
    "btn.prev": "← Предыдущее", "btn.next": "Следующее →",
    "popup.remove": "Убрать", "popup.more": "Подробнее", "aria.fav": "В избранное",

    "toast.favAdd": "♥ Добавлено в избранное", "toast.favRemove": "Убрано из избранного",
    "toast.routeAdd": "🧭 В маршруте: {name}", "toast.routeRemove": "Убрано: {name}",
    "toast.needRoute": "Сначала добавьте места в маршрут", "toast.choose": "Выберите место из списка",
    "toast.already": "Это место уже в маршруте", "toast.need3": "Нужно хотя бы 3 места",
    "toast.optimized": "⚡ Порядок оптимизирован", "toast.empty": "Маршрут пуст",
    "toast.need2": "Добавьте хотя бы 2 места", "toast.copied": "🔗 Ссылка на маршрут скопирована",
    "prompt.copy": "Скопируйте ссылку:", "confirm.clear": "Очистить весь маршрут?",
    "toast.cleared": "Маршрут очищен", "toast.fromUrl": "Маршрут загружен из ссылки",
    "confirm.tour": "Заменить текущий маршрут этим туром?", "toast.tour": "{emoji} Тур «{name}» загружен",
    "toast.form": "Спасибо, {name}! Заявка принята (демо).",
    "toast.formRoute": "Спасибо, {name}! Заявка с маршрутом из {n} мест принята (демо)."
  },

  kk: {
    "meta.title": "Египет — жолсілтеме және маршрут құрастырғыш",
    "nav.home": "Басты бет", "nav.sights": "Орындар", "nav.map": "Карта", "nav.route": "Маршрут",
    "nav.tours": "Турлар", "nav.tips": "Кеңестер", "nav.contacts": "Байланыс",
    "aria.myRoute": "Менің маршрутым", "aria.theme": "Ашық / күңгірт тақырып", "aria.menu": "Мәзір", "aria.close": "Жабу",

    "hero.eyebrow": "Жолсілтеме · 5000 жылдық тарих",
    "hero.title1": "Египет:", "hero.title2": "уақыт бойымен саяхат",
    "hero.lead": "Пирамидалар, Ніл бойындағы храмдар, Қызыл теңіз бен шөл. Орындарды таңдап, картадан қараңыз және күндер бойынша өз маршрутыңызды құрыңыз.",
    "hero.cta1": "Орындарды көру ↓", "hero.cta2": "Маршрут құру",
    "stat.places": "жолсілтемедегі орын", "stat.tours": "дайын тур", "stat.nile": "Ніл бойымен км",

    "sights.eyebrow": "Не көруге болады", "sights.title": "Көрікті жерлер",
    "sights.lead": "Толығырақ оқу үшін карточканы басыңыз. «+» батырмасы орынды маршрутыңызға қосады.",
    "filter.all": "Барлығы", "filter.fav": "♥ Таңдаулылар",
    "search.ph": "Іздеу: Луксор, храм, теңіз…",
    "sights.empty": "Ештеңе табылмады. Басқа сұрауды немесе сүзгіні байқап көріңіз.",

    "map.eyebrow": "Бұл қай жерде", "map.title": "Интерактивті карта",
    "map.lead": "Орынды көру үшін нүктені басыңыз. Алтын сызық — сіздің маршрутыңыз.",
    "map.fallback": "Карта жүктелмеді — интернетке қосылуды тексеріңіз: карта қабаты желіден жүктеледі.",
    "photo": "Фото",
    "map.show": "Картада көрсету", "map.all": "Бүкіл ел", "map.myRoute": "Менің маршрутым",
    "map.hint": "Кеңес: нүкте терезесінде «Маршрутқа» батырмасы бар.",

    "route.eyebrow": "Өз саяхатыңыз", "route.title": "Маршрут құрастырғыш",
    "route.lead": "Орындарды қосып, ретін сүйреп немесе бағыттауыштармен өзгертіңіз — күндік жоспар өздігінен есептеледі.",
    "route.choose": "Орынды таңдаңыз…", "route.add": "+ Қосу",
    "route.emptyTitle": "🐪 Маршрут әзірге бос",
    "route.emptyText": "Жоғарыдағы тізімнен, карточкалардан орын қосыңыз немесе дайын турды жүктеңіз.",
    "route.toTours": "Дайын турлар",
    "route.optimize": "⚡ Оңтайландыру", "route.optimizeTitle": "Нүктелерді ең қысқа жол бойынша реттеу",
    "route.onMap": "🗺 Картада", "route.gmaps": "📍 Google Maps", "route.share": "🔗 Сілтеме",
    "route.print": "🖨 Басып шығару", "route.clear": "Тазалау",
    "route.date": "Сапардың басталу күні", "route.pace": "Сапар қарқыны",
    "pace.7": "Баяу (күніне ≈7 сағ)", "pace.9": "Қалыпты (күніне ≈9 сағ)", "pace.12": "Белсенді (күніне ≈12 сағ)",
    "sum.stops": "орын", "sum.km": "жолдағы км", "sum.days": "күн",
    "plan.title": "Күндік жоспар", "plan.empty": "Мұнда кесте пайда болады.",
    "plan.day": "{n}-күн", "plan.drive": "🚐 Жол ≈ {h} сағ",
    "unit.h": "сағ", "unit.km": "км", "aria.up": "Жоғары", "aria.down": "Төмен", "aria.remove": "Жою",

    "tours.eyebrow": "Неден бастарыңызды білмейсіз бе?", "tours.title": "Дайын турлар",
    "tours.lead": "Турды құрастырғышқа бір басумен жүктеп, кейін өзіңізге қарай өзгертіңіз.",
    "tours.load": "Маршрутқа жүктеу", "tours.places": "{n} орын",

    "tips.eyebrow": "Білген жөн", "tips.title": "Туристке кеңестер",
    "tab.weather": "☀️ Ауа райы", "tab.visa": "🛂 Виза", "tab.money": "💵 Ақша", "tab.safety": "🛡 Ережелер", "tab.phrases": "🗣 Тіркестер",
    "weather.intro": "Айды таңдаңыз — орташа күндізгі температураны көрсетеміз (шамамен алынған деректер).",
    "weather.hot": "🔥 Оңтүстікте өте ыстық — экскурсиялар тек ерте таңертең. Теңізге жақсы уақыт.",
    "weather.warm": "☀️ Жылы әрі шуақты — бас киім мен су алыңыз.",
    "weather.good": "👍 Храмдар мен пирамидаларды аралауға қолайлы маусым.",
    "w.cairo": "Каир", "w.luxor": "Луксор", "w.hurghada": "Хургада", "w.sea": "Хургададағы теңіз",
    "months": ["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"],
    "visa.list": `<li>Көптеген туристер (соның ішінде Қазақстаннан) визаны әуежайға <b>келгенде</b> немесе алдын ала <b>электронды виза</b> ретінде ресімдей алады.</li>
      <li>Электронды виза тек ресми <a href="https://www.visa2egypt.gov.eg" target="_blank" rel="noopener">visa2egypt.gov.eg</a> сайтында ресімделеді.</li>
      <li>Төлқұжат кемінде тағы 6 ай жарамды болуы керек.</li>
      <li>Ережелер өзгеріп тұрады — сапар алдында елшіліктен немесе туроператордан тексеріңіз.</li>`,
    "money.list": `<li>Валюта — <b>Египет фунты (EGP)</b>. Доллар алып жүріп, банктерде немесе ресми айырбастау пункттерінде ауыстырған ыңғайлы.</li>
      <li>Карталарды қонақүйлерде, сауда орталықтарында және мұражайларда қабылдайды; базарда қолма-қол ақша керек.</li>
      <li><b>Бакшиш</b> (шайпұл) — мәдениеттің бір бөлігі: ұсақ ақша алып жүріңіз.</li>
      <li>Базарда саудаласыңыз — алғашқы баға әдетте 2–3 есе қымбат.</li>`,
    "safety.list": `<li>Тек бөтелкедегі су ішіңіз, күннен сақтаныңыз: бас киім, крем, су.</li>
      <li>Мешітте иық пен тізе жабық болуы керек, әйелдерге — орамал.</li>
      <li>Әскери нысандар мен полицияны суретке түсірмеңіз.</li>
      <li>Маржандарды ұстамаңыз және балықтарды қоректендірмеңіз — қорықтарда бұған тыйым салынған.</li>
      <li>Көне жәдігерлер мен маржандарды елден шығаруға заң бойынша тыйым салынған.</li>`,
    "phrases.intro": "Тіркесті басыңыз — браузер оны айтып береді (егер араб дауысы болса), ал мәтін көшіріледі.",

    "contacts.eyebrow": "Байланыс және сілтемелер", "contacts.title": "Байланыс",
    "contacts.phone": "📞 Біздің телефон", "contacts.phoneHint": "Оқу жобасы. Маршрут бойынша сұрақтарға жауап береміз.",
    "form.name": "Атыңыз", "form.contact": "Телефон немесе e-mail", "form.msg": "Тур бойынша сұрақ немесе тілек",
    "form.attach": "Менің маршрутымды тіркеу", "form.send": "Жіберу",
    "emergency.title": "🚨 Египеттегі шұғыл нөмірлер",
    "emergency.tourist": "Туристік полиция", "emergency.police": "Полиция",
    "emergency.ambulance": "Жедел жәрдем", "emergency.fire": "Өрт сөндіру қызметі",
    "links.title": "🌐 Пайдалы сайттар",
    "links.egypt": "Ресми туристік портал", "links.visa": "Ресми электронды виза",
    "links.monuments": "Мұражайлар мен ескерткіштер, жұмыс уақыты, билеттер",
    "links.gemName": "Ұлы Египет мұражайы", "links.gem": "GEM билеттері",
    "links.trip": "Пікірлер, экскурсиялар, мейрамханалар", "links.booking": "Бүкіл Египет бойынша қонақүйлер",
    "footer.text": "© EgyptWay — оқу жобасы. Фото: Wikipedia / Wikimedia Commons. Карта: © OpenStreetMap, © CARTO.",
    "footer.top": "Жоғары ↑", "aria.toTop": "Жоғары",

    "modal.visit": "Көруге кететін уақыт", "modal.best": "Баруға қолайлы уақыт",
    "btn.add": "+ Маршрутқа", "btn.inRoute": "✓ Маршрутта", "btn.removeRoute": "✓ Маршруттан алып тастау",
    "btn.cardMap": "🗺 Карта", "btn.onMap": "🗺 Картада",
    "btn.fav": "♡ Таңдаулыға", "btn.faved": "♥ Таңдаулыда", "btn.wiki": "📖 Уикипедия",
    "btn.prev": "← Алдыңғы", "btn.next": "Келесі →",
    "popup.remove": "Алып тастау", "popup.more": "Толығырақ", "aria.fav": "Таңдаулыға",

    "toast.favAdd": "♥ Таңдаулыға қосылды", "toast.favRemove": "Таңдаулылардан алынды",
    "toast.routeAdd": "🧭 Маршрутқа қосылды: {name}", "toast.routeRemove": "Алынып тасталды: {name}",
    "toast.needRoute": "Алдымен маршрутқа орын қосыңыз", "toast.choose": "Тізімнен орын таңдаңыз",
    "toast.already": "Бұл орын маршрутта бар", "toast.need3": "Кемінде 3 орын қажет",
    "toast.optimized": "⚡ Рет оңтайландырылды", "toast.empty": "Маршрут бос",
    "toast.need2": "Кемінде 2 орын қосыңыз", "toast.copied": "🔗 Маршрут сілтемесі көшірілді",
    "prompt.copy": "Сілтемені көшіріңіз:", "confirm.clear": "Бүкіл маршрутты тазалау керек пе?",
    "toast.cleared": "Маршрут тазаланды", "toast.fromUrl": "Маршрут сілтемеден жүктелді",
    "confirm.tour": "Ағымдағы маршрутты осы турмен ауыстыру керек пе?", "toast.tour": "{emoji} «{name}» туры жүктелді",
    "toast.form": "Рақмет, {name}! Өтінім қабылданды (демо).",
    "toast.formRoute": "Рақмет, {name}! {n} орыннан тұратын маршрутпен өтінім қабылданды (демо)."
  },

  en: {
    "meta.title": "Egypt — travel guide and route planner",
    "nav.home": "Home", "nav.sights": "Places", "nav.map": "Map", "nav.route": "Route",
    "nav.tours": "Tours", "nav.tips": "Tips", "nav.contacts": "Contacts",
    "aria.myRoute": "My route", "aria.theme": "Light / dark theme", "aria.menu": "Menu", "aria.close": "Close",

    "hero.eyebrow": "Travel guide · 5000 years of history",
    "hero.title1": "Egypt:", "hero.title2": "a journey through time",
    "hero.lead": "Pyramids, temples on the Nile, the Red Sea and the desert. Pick places, see them on the map and plan your own day-by-day route.",
    "hero.cta1": "Explore places ↓", "hero.cta2": "Plan a route",
    "stat.places": "places in the guide", "stat.tours": "ready-made tours", "stat.nile": "km along the Nile",

    "sights.eyebrow": "What to see", "sights.title": "Sights",
    "sights.lead": "Tap a card to read more. The “+” button adds the place to your route.",
    "filter.all": "All", "filter.fav": "♥ Favourites",
    "search.ph": "Search: Luxor, temple, sea…",
    "sights.empty": "Nothing found. Try another search or filter.",

    "map.eyebrow": "Where it is", "map.title": "Interactive map",
    "map.lead": "Tap a pin to see the place. The golden line is your route.",
    "map.fallback": "The map didn't load — check your internet connection: the map tiles load from the web.",
    "photo": "Photo",
    "map.show": "Show on map", "map.all": "Whole country", "map.myRoute": "My route",
    "map.hint": "Tip: a pin's popup has an “Add to route” button.",

    "route.eyebrow": "Your own trip", "route.title": "Route planner",
    "route.lead": "Add places and reorder them by dragging or with the arrows — the day-by-day plan is calculated automatically.",
    "route.choose": "Choose a place…", "route.add": "+ Add",
    "route.emptyTitle": "🐪 Your route is empty",
    "route.emptyText": "Add places from the list above or from the cards, or load a ready-made tour.",
    "route.toTours": "Ready-made tours",
    "route.optimize": "⚡ Optimize", "route.optimizeTitle": "Order the stops along the shortest path",
    "route.onMap": "🗺 On map", "route.gmaps": "📍 Google Maps", "route.share": "🔗 Link",
    "route.print": "🖨 Print", "route.clear": "Clear",
    "route.date": "Trip start date", "route.pace": "Travel pace",
    "pace.7": "Relaxed (≈7 h a day)", "pace.9": "Normal (≈9 h a day)", "pace.12": "Active (≈12 h a day)",
    "sum.stops": "places", "sum.km": "km on the road", "sum.days": "days",
    "plan.title": "Day-by-day plan", "plan.empty": "Your schedule will appear here.",
    "plan.day": "Day {n}", "plan.drive": "🚐 Drive ≈ {h} h",
    "unit.h": "h", "unit.km": "km", "aria.up": "Up", "aria.down": "Down", "aria.remove": "Remove",

    "tours.eyebrow": "Not sure where to start?", "tours.title": "Ready-made tours",
    "tours.lead": "Load a tour into the planner with one tap, then adjust it to suit you.",
    "tours.load": "Load into route", "tours.places": "{n} places",

    "tips.eyebrow": "Good to know", "tips.title": "Travel tips",
    "tab.weather": "☀️ Weather", "tab.visa": "🛂 Visa", "tab.money": "💵 Money", "tab.safety": "🛡 Rules", "tab.phrases": "🗣 Phrases",
    "weather.intro": "Pick a month to see the average daytime temperature (approximate data).",
    "weather.hot": "🔥 Very hot in the south — sightseeing only early in the morning. A good time for the sea.",
    "weather.warm": "☀️ Warm and sunny — bring a hat and water.",
    "weather.good": "👍 A comfortable season for temples and pyramids.",
    "w.cairo": "Cairo", "w.luxor": "Luxor", "w.hurghada": "Hurghada", "w.sea": "Sea at Hurghada",
    "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "visa.list": `<li>Many travellers (including from Kazakhstan) can get a visa <b>on arrival</b> at the airport or an <b>e-visa</b> in advance.</li>
      <li>The e-visa is issued only on the official website <a href="https://www.visa2egypt.gov.eg" target="_blank" rel="noopener">visa2egypt.gov.eg</a>.</li>
      <li>Your passport must be valid for at least 6 more months.</li>
      <li>Rules change — check with the embassy or your tour operator before you travel.</li>`,
    "money.list": `<li>The currency is the <b>Egyptian pound (EGP)</b>. It's handy to carry US dollars and exchange them at banks or official exchange offices.</li>
      <li>Cards are accepted in hotels, malls and museums; markets need cash.</li>
      <li><b>Baksheesh</b> (tipping) is part of the culture: keep small notes on you.</li>
      <li>Haggle at markets — the first price is usually 2–3 times too high.</li>`,
    "safety.list": `<li>Drink only bottled water and protect yourself from the sun: hat, sunscreen, water.</li>
      <li>In mosques, cover shoulders and knees; women should wear a headscarf.</li>
      <li>Don't photograph military sites or the police.</li>
      <li>Don't touch corals or feed the fish — it's forbidden in the reserves.</li>
      <li>Taking antiquities or corals out of the country is against the law.</li>`,
    "phrases.intro": "Tap a phrase — the browser will say it (if it has an Arabic voice) and the text will be copied.",

    "contacts.eyebrow": "Contact & links", "contacts.title": "Contacts",
    "contacts.phone": "📞 Our phone", "contacts.phoneHint": "A student project. We'll answer questions about your route.",
    "form.name": "Your name", "form.contact": "Phone or e-mail", "form.msg": "Question or wish for the tour",
    "form.attach": "Attach my route", "form.send": "Send",
    "emergency.title": "🚨 Emergency numbers in Egypt",
    "emergency.tourist": "Tourist police", "emergency.police": "Police",
    "emergency.ambulance": "Ambulance", "emergency.fire": "Fire service",
    "links.title": "🌐 Useful websites",
    "links.egypt": "Official tourism portal", "links.visa": "Official e-visa",
    "links.monuments": "Museums & monuments, opening hours, tickets",
    "links.gemName": "Grand Egyptian Museum", "links.gem": "GEM tickets",
    "links.trip": "Reviews, tours, restaurants", "links.booking": "Hotels all over Egypt",
    "footer.text": "© EgyptWay — a student project. Photos: Wikipedia / Wikimedia Commons. Map: © OpenStreetMap, © CARTO.",
    "footer.top": "Back to top ↑", "aria.toTop": "Back to top",

    "modal.visit": "Time to visit", "modal.best": "Best time to go",
    "btn.add": "+ Add to route", "btn.inRoute": "✓ In route", "btn.removeRoute": "✓ Remove from route",
    "btn.cardMap": "🗺 Map", "btn.onMap": "🗺 On map",
    "btn.fav": "♡ Favourite", "btn.faved": "♥ Favourited", "btn.wiki": "📖 Wikipedia",
    "btn.prev": "← Previous", "btn.next": "Next →",
    "popup.remove": "Remove", "popup.more": "Details", "aria.fav": "Add to favourites",

    "toast.favAdd": "♥ Added to favourites", "toast.favRemove": "Removed from favourites",
    "toast.routeAdd": "🧭 Added to route: {name}", "toast.routeRemove": "Removed: {name}",
    "toast.needRoute": "Add places to your route first", "toast.choose": "Choose a place from the list",
    "toast.already": "This place is already in your route", "toast.need3": "You need at least 3 places",
    "toast.optimized": "⚡ Order optimized", "toast.empty": "Your route is empty",
    "toast.need2": "Add at least 2 places", "toast.copied": "🔗 Route link copied",
    "prompt.copy": "Copy the link:", "confirm.clear": "Clear the whole route?",
    "toast.cleared": "Route cleared", "toast.fromUrl": "Route loaded from the link",
    "confirm.tour": "Replace your current route with this tour?", "toast.tour": "{emoji} Tour “{name}” loaded",
    "toast.form": "Thank you, {name}! Request received (demo).",
    "toast.formRoute": "Thank you, {name}! Request with a {n}-place route received (demo)."
  }
};

const DATA_I18N = {
  kk: {
    cats: { ancient: "Көне мұралар", museum: "Мұражайлар", city: "Қалалар", sea: "Теңіз", nature: "Табиғат" },
    sights: {
      giza: { name: "Гиза пирамидалары", city: "Гиза (Каир)", short: "Әлемнің жеті кереметінің ішінде сақталған жалғызы.",
        desc: "Хеопс, Хефрен және Микерин пирамидалары шамамен 4500 жыл бұрын салынған. Хеопс пирамидасы 4 мың жылға жуық Жердегі ең биік ғимарат болды — 146 метр. Ішіне бөлек билетпен кіруге болады.",
        best: "Таңертең, ашылу кезінде (8:00)", tip: "Барлық пирамидалардың ең әдемі көрінісі — Panorama Point алаңынан." },
      sphinx: { name: "Ұлы Сфинкс", city: "Гиза (Каир)", short: "Біртұтас жартастан қашалған, перғауын бетті арыстан.",
        desc: "Сфинкстің ұзындығы — 73 метр, биіктігі — 20 метр. Ол Хефрен перғауын тұсында әктас жартастан қашалған. Кешке мұнда «Дыбыс пен жарық» шоуы өтеді.",
        best: "Кешке, «Дыбыс пен жарық» шоуында", tip: "Пирамидалармен бірге барған жөн — бұл бір аумақ." },
      gem: { name: "Ұлы Египет мұражайы", city: "Гиза (Каир)", short: "Бір өркениетке арналған әлемдегі ең ірі археологиялық мұражай.",
        desc: "Пирамидалардың жанындағы жаңа мұражайда мыңдаған жәдігер, соның ішінде Тутанхамон қабірінің толық коллекциясы жиналған. Кіре берісте Рамзес II-нің 11 метрлік мүсіні қарсы алады.",
        best: "Жұмыс күні, таңертең", tip: "Билетті алдын ала онлайн сатып алған дұрыс." },
      citadel: { name: "Цитадель және Мұхаммед Әли мешіті", city: "Каир", short: "Бүкіл Каирдің үстінде тұрған Салах ад-Диннің ортағасырлық қамалы.",
        desc: "Цитадель XII ғасырда крестшілерден қорғану үшін салынған. Ішінде үлкен күмбезді Мұхаммед Әлидің Алебастр мешіті бар. Қамал қабырғаларынан бүкіл қала көрінеді.",
        best: "Күндіз, ашық күні", tip: "Мешітке иық пен тізе жабық киіммен кіреді, аяқ киімді шешеді." },
      khan: { name: "Хан әл-Халили базары", city: "Каир", short: "XIV ғасырдан бері сауда жүріп келе жатқан көне базар.",
        desc: "Дәмдеуіштер, шамдар, әшекейлер мен кәдесыйларға толы тар көшелер лабиринті. Мұнда 200 жылдан асқан «Эль-Фишави» кафесі де орналасқан.",
        best: "Кешке — шамдар жанғанда", tip: "Саудаласыңыз! Айтылған бағаның үштен бірінен бастаңыз." },
      alex: { name: "Александрия кітапханасы", city: "Александрия", short: "Аңызға айналған антикалық кітапхананың орнындағы заманауи кітапхана.",
        desc: "Көлбеу күн дискі пішініндегі ғимарат 2002 жылы ашылған. Ішінде мұражайлар, планетарий және 2000 орындық оқу залы бар. Жанында — Корниш жағалауы мен Кайт-Бей қамалы.",
        best: "Көктем мен күз", tip: "Каирден Александрияға пойызбен шамамен 3 сағат." },
      karnak: { name: "Карнак храмы", city: "Луксор", short: "Ежелгі әлемдегі ең ірі храм кешені.",
        desc: "Храмды 2000 жылға жуық салған. Басты ғажабы — биіктігі 21 метрге дейін жететін 134 бағаналы Гипостиль залы. Мұнда Амон-Ра құдайына табынған.",
        best: "Ерте таңертең — ыстыққа дейін", tip: "Гид алыңыз: түсіндірмесіз қирандылар арасында адасу оңай." },
      luxor: { name: "Луксор храмы", city: "Луксор", short: "Ніл жағасындағы, Карнакпен Сфинкстер аллеясы арқылы байланысқан храм.",
        desc: "Храм Аменхотеп III және Рамзес II тұсында салынған. Одан Карнакқа қарай ұзындығы 3 шақырымға жуық Сфинкстер аллеясы созылады. Кешке храм әдемі жарықтандырылады.",
        best: "Кешке, жарықтандыру кезінде", tip: "Күн батқанда Сфинкстер аллеясымен серуендеңіз." },
      kings: { name: "Патшалар алқабы", city: "Луксор, батыс жағалау", short: "Жаңа патшалық перғауындарының, соның ішінде Тутанхамонның қабірлері.",
        desc: "Мұнда 60-тан астам қабір табылған. Көбінің қабырғалары 3000 жыл бойы сақталған жарқын суреттермен безендірілген. Ең әйгілісі — 1922 жылы табылған Тутанхамон қабірі.",
        best: "Ашылу кезінде, шамамен 6:00", tip: "Қабір ішінде суретке түсіру — бөлек билетпен. Таңды әуе шарымен қарсы алуға болады." },
      philae: { name: "Филе храмы", city: "Асуан", short: "Ніл ортасындағы аралда тұрған Исида құдайының храмы.",
        desc: "Асуан бөгетін салу кезінде храмды су басудан құтқарған: оны бөлшектеп, тасын тасқа қалап, көрші аралға көшірген. Оған тек қайықпен жетуге болады.",
        best: "Таңертең немесе кешке", tip: "Қайық бағасын отырмай тұрып келісіп алыңыз." },
      abusimbel: { name: "Әбу-Симбел", city: "Асуанның оңтүстігі", short: "Жартасқа қашалған Рамзес II-нің төрт алып мүсіні.",
        desc: "Храмның биіктігі — 30 метр. Жылына екі рет — шамамен 22 ақпан мен 22 қазанда — күн сәулесі храмның түкпіріне түсіп, құдайлардың мүсіндерін жарықтандырады. 1960-жылдары храмды Насер көлінің суынан құтқару үшін тұтастай жоғарыға көшірген.",
        best: "22 ақпан немесе 22 қазан", tip: "Асуаннан көлікпен шамамен 3,5 сағат, түнде шығады." },
      rasmohammed: { name: "Рас-Мұхаммед", city: "Шарм-эш-Шейх", short: "Әлемдегі ең жақсы рифтердің бірі бар ұлттық саябақ.",
        desc: "Синайдың оңтүстік шетіндегі қорық. Маржан қабырғалары, тасбақалар, скаттар және жүздеген балық түрі. Мұнда снорклинг пен дайвингке келеді.",
        best: "Сәуір–маусым, қыркүйек–қараша", tip: "Маска мен маржанға арналған аяқ киім алыңыз." },
      sinai: { name: "Мұса тауы және Әулие Екатерина монастыры", city: "Синай", short: "2285 м тау шыңындағы таң және ең көне жұмыс істеп тұрған монастырь.",
        desc: "Шыңда таң қарсы алу үшін өрлеуді түнде бастайды. Тау етегінде VI ғасырдағы монастырь тұр — әлемдегі ең көне христиан монастырьларының бірі.",
        best: "Көктем мен күз (қыста түнде суық)", tip: "Жылы киім мен қалта шам міндетті." },
      hurghada: { name: "Хургада", city: "Қызыл теңіз", short: "Жағажайлары, аралдары және теңіз серуендері бар курорт.",
        desc: "Қызыл теңіздегі танымал курорт. Мұнан Гифтун аралдарына, снорклинг пен балық аулауға қайықтар шығады, сондай-ақ шөлге квадроцикл сафариі бар.",
        best: "Жыл бойы, ең жақсысы — күз", tip: "Мұнан Луксорға 1 күнге барып қайтуға ыңғайлы (шамамен 4 сағат)." },
      whitedesert: { name: "Ақ шөл", city: "Фарафра оазисі", short: "Құм арасындағы бор жартастар-«саңырауқұлақтар».",
        desc: "Жел бор жартастарды саңырауқұлаққа, тауыққа және сфинкске ұқсас мүсіндерге айналдырған. Мұнда жұлдызды аспан астында шатырда түнейді.",
        best: "Қазан–сәуір", tip: "Тек жолсерікпен, джиппен — шөлге өз бетіңізше бармаңыз." },
      siwa: { name: "Сива оазисі", city: "Батыс шөл", short: "Тұзды көлдері мен саз қамалы бар жасыл оазис.",
        desc: "Ливия шекарасына жақын шалғай оазис. Батып кету мүмкін емес тұзды көлдер, ыстық бұлақтар, құрма тоғайлары және Шали қамалының қирандылары.",
        best: "Қазан–наурыз", tip: "Каирден жол ұзақ (8–9 сағат), 2–3 күн жоспарлаңыз." }
    },
    tours: {
      classic: { name: "Классикалық Египет", days: "7–8 күн", text: "Каир, пирамидалар, Луксор және Асуан — бір сапарда ең бастысы." },
      sea: { name: "Теңіз және шөл", days: "6–7 күн", text: "Қызыл теңіз жағажайлары, рифтер, Мұса тауындағы таң және Луксорға сапар." },
      wild: { name: "Беймәлім Египет", days: "8–9 күн", text: "Шытырман оқиға сүйетіндерге: Александрия, Сива оазисі және Ақ шөл." }
    },
    phrases: [
      { mean: "Сәлеметсіз бе", say: "ас-саля́му але́йкум" },
      { mean: "Сәлем", say: "а́хлан" },
      { mean: "Рақмет", say: "шу́кран" },
      { mean: "Өтінемін", say: "мин фа́длак" },
      { mean: "Қанша тұрады?", say: "би-ка́м?" },
      { mean: "Жоқ, рақмет", say: "ля, шу́кран" },
      { mean: "Қайда…?", say: "фейн…?" },
      { mean: "Су", say: "ме́йя" },
      { mean: "Кеттік!", say: "я́лла" }
    ]
  },

  en: {
    cats: { ancient: "Antiquities", museum: "Museums", city: "Cities", sea: "Sea", nature: "Nature" },
    sights: {
      giza: { name: "Pyramids of Giza", city: "Giza (Cairo)", short: "The only surviving wonder of the Seven Wonders of the World.",
        desc: "The pyramids of Khufu, Khafre and Menkaure were built about 4,500 years ago. At 146 metres, the Great Pyramid of Khufu was the tallest structure on Earth for almost 4,000 years. You can go inside with a separate ticket.",
        best: "Morning, at opening time (8:00)", tip: "The best view of all the pyramids is from the Panorama Point viewing area." },
      sphinx: { name: "Great Sphinx", city: "Giza (Cairo)", short: "A lion with a pharaoh's face, carved from a single rock.",
        desc: "The Sphinx is 73 metres long and 20 metres high. It was carved out of limestone bedrock in the reign of Pharaoh Khafre. In the evening there is a Sound and Light show here.",
        best: "Evening, for the Sound and Light show", tip: "Visit it together with the pyramids — it's the same site." },
      gem: { name: "Grand Egyptian Museum", city: "Giza (Cairo)", short: "The world's largest archaeological museum devoted to a single civilisation.",
        desc: "A new museum next to the pyramids with thousands of artefacts, including the complete collection from Tutankhamun's tomb. An 11-metre statue of Ramesses II greets you at the entrance.",
        best: "A weekday, in the morning", tip: "It's best to buy tickets online in advance." },
      citadel: { name: "Citadel & Mosque of Muhammad Ali", city: "Cairo", short: "Saladin's medieval fortress high above Cairo.",
        desc: "The Citadel was built in the 12th century to defend the city against the Crusaders. Inside is the Alabaster Mosque of Muhammad Ali with its huge dome. The walls offer a view over the whole city.",
        best: "Daytime, in clear weather", tip: "Cover shoulders and knees in the mosque; shoes come off." },
      khan: { name: "Khan el-Khalili Bazaar", city: "Cairo", short: "An old market that has been trading since the 14th century.",
        desc: "A maze of narrow lanes full of spices, lamps, jewellery and souvenirs. It is also home to El Fishawy café, which is over 200 years old.",
        best: "Evening — when the lanterns come on", tip: "Haggle! Start at a third of the asking price." },
      alex: { name: "Bibliotheca Alexandrina", city: "Alexandria", short: "A modern library on the site of the legendary ancient one.",
        desc: "The building, shaped like a tilted sun disc, opened in 2002. Inside are museums, a planetarium and a reading room for 2,000 people. Nearby are the Corniche and the Citadel of Qaitbay.",
        best: "Spring and autumn", tip: "Alexandria is about 3 hours from Cairo by train." },
      karnak: { name: "Karnak Temple", city: "Luxor", short: "The largest temple complex of the ancient world.",
        desc: "The temple was built over almost 2,000 years. Its highlight is the Hypostyle Hall with 134 columns up to 21 metres tall. The god Amun-Ra was worshipped here.",
        best: "Early morning — before the heat", tip: "Take a guide: without explanations it's easy to get lost among the ruins." },
      luxor: { name: "Luxor Temple", city: "Luxor", short: "A temple on the Nile, linked to Karnak by the Avenue of Sphinxes.",
        desc: "The temple was built under Amenhotep III and Ramesses II. The almost 3-kilometre Avenue of Sphinxes leads from here to Karnak. In the evening the temple is beautifully lit.",
        best: "Evening, when it's lit up", tip: "Walk the Avenue of Sphinxes at sunset." },
      kings: { name: "Valley of the Kings", city: "Luxor, West Bank", short: "Tombs of the New Kingdom pharaohs, including Tutankhamun.",
        desc: "More than 60 tombs have been found here. The walls of many are covered in bright paintings that have survived for 3,000 years. The most famous is Tutankhamun's tomb, discovered in 1922.",
        best: "At opening, around 6:00", tip: "Photos inside the tombs need a separate ticket. You can watch the sunrise from a hot-air balloon." },
      philae: { name: "Philae Temple", city: "Aswan", short: "The temple of the goddess Isis on an island in the Nile.",
        desc: "The temple was saved from flooding when the Aswan Dam was built: it was taken apart and moved stone by stone to a neighbouring island. You can only get there by boat.",
        best: "Morning or evening", tip: "Agree on the boat price before you get in." },
      abusimbel: { name: "Abu Simbel", city: "South of Aswan", short: "Four colossal statues of Ramesses II carved into the rock.",
        desc: "The temple is 30 metres high. Twice a year — around 22 February and 22 October — sunlight reaches deep inside and lights up the statues of the gods. In the 1960s the whole temple was moved higher up to save it from the waters of Lake Nasser.",
        best: "22 February or 22 October", tip: "About 3.5 hours by car from Aswan, leaving at night." },
      rasmohammed: { name: "Ras Muhammad", city: "Sharm El Sheikh", short: "A national park with one of the best reefs in the world.",
        desc: "A reserve at the southern tip of Sinai. Coral walls, turtles, rays and hundreds of species of fish. People come here for snorkelling and diving.",
        best: "April–June, September–November", tip: "Bring a mask and reef shoes." },
      sinai: { name: "Mount Sinai & St Catherine's Monastery", city: "Sinai", short: "Sunrise from a 2,285 m summit and the oldest working monastery.",
        desc: "The climb starts at night so you can watch the sunrise from the top. At the foot of the mountain stands a 6th-century monastery — one of the oldest Christian monasteries in the world.",
        best: "Spring and autumn (winter nights are cold)", tip: "Warm clothes and a torch are a must." },
      hurghada: { name: "Hurghada", city: "Red Sea", short: "A resort with beaches, islands and boat trips.",
        desc: "A popular Red Sea resort. Boats leave from here for the Giftun Islands, snorkelling and fishing, and there are quad-bike safaris into the desert.",
        best: "All year round, best in autumn", tip: "A handy base for a day trip to Luxor (about 4 hours)." },
      whitedesert: { name: "White Desert", city: "Farafra Oasis", short: "Chalk rock “mushrooms” in the middle of the sand.",
        desc: "The wind has carved the chalk rocks into shapes like mushrooms, a chicken and a sphinx. Visitors camp here in tents under the stars.",
        best: "October–April", tip: "Only with a guide by jeep — never go into the desert on your own." },
      siwa: { name: "Siwa Oasis", city: "Western Desert", short: "A green oasis with salt lakes and a mud-brick fortress.",
        desc: "A remote oasis near the Libyan border. Salt lakes where you can't sink, hot springs, date palm groves and the ruins of the Shali fortress.",
        best: "October–March", tip: "It's a long drive from Cairo (8–9 hours), so plan 2–3 days." }
    },
    tours: {
      classic: { name: "Classic Egypt", days: "7–8 days", text: "Cairo, the pyramids, Luxor and Aswan — all the highlights in one trip." },
      sea: { name: "Sea & Desert", days: "6–7 days", text: "Red Sea beaches, reefs, sunrise on Mount Sinai and a trip to Luxor." },
      wild: { name: "Undiscovered Egypt", days: "8–9 days", text: "For adventurers: Alexandria, Siwa Oasis and the White Desert." }
    },
    phrases: [
      { mean: "Hello (formal)", say: "as-salaamu alaykum" },
      { mean: "Hi", say: "ahlan" },
      { mean: "Thank you", say: "shukran" },
      { mean: "Please", say: "min fadlak" },
      { mean: "How much?", say: "bikam?" },
      { mean: "No, thank you", say: "la, shukran" },
      { mean: "Where…?", say: "fein…?" },
      { mean: "Water", say: "mayya" },
      { mean: "Let's go!", say: "yalla" }
    ]
  }
};
