// Данные сайта: места и туры.
// У каждого текста три перевода: ru — русский, kk — казахский, en — английский.
// Фото места лежит в папке images/ и называется так же, как id (например images/giza.jpg).
// wiki — статья Википедии, откуда берётся фото; photo — если нужно другое фото с Wikimedia Commons.
// hours — сколько часов нужно на осмотр; price — примерная цена билета для иностранца в тенге (0 — бесплатно).

const CATEGORIES = {
  ancient: { ru: "Древности", kk: "Көне мұралар", en: "Antiquities" },
  museum:  { ru: "Музеи",     kk: "Мұражайлар",   en: "Museums" },
  city:    { ru: "Города",    kk: "Қалалар",      en: "Cities" },
  sea:     { ru: "Море",      kk: "Теңіз",        en: "Sea" }
};

const PLACES = [
  {
    id: "giza", wiki: "Giza_pyramid_complex", cat: "ancient", lat: 29.9792, lng: 31.1342, hours: 4, price: 7400,
    name: { ru: "Пирамиды Гизы", kk: "Гиза пирамидалары", en: "Pyramids of Giza" },
    city: { ru: "Гиза (Каир)", kk: "Гиза (Каир)", en: "Giza (Cairo)" },
    short: {
      ru: "Единственное сохранившееся чудо света из семи.",
      kk: "Әлемнің жеті кереметінің ішінде сақталған жалғызы.",
      en: "The only surviving wonder of the Seven Wonders of the World."
    },
    desc: {
      ru: "Пирамиды Хеопса, Хефрена и Микерина построены около 4500 лет назад. Пирамида Хеопса почти 4 тысячи лет была самым высоким сооружением на Земле — 146 метров. Внутрь можно зайти по отдельному билету.",
      kk: "Хеопс, Хефрен және Микерин пирамидалары шамамен 4500 жыл бұрын салынған. Хеопс пирамидасы 4 мың жылға жуық Жердегі ең биік ғимарат болды — 146 метр. Ішіне бөлек билетпен кіруге болады.",
      en: "The pyramids of Khufu, Khafre and Menkaure were built about 4,500 years ago. At 146 metres, the Great Pyramid of Khufu was the tallest structure on Earth for almost 4,000 years. You can go inside with a separate ticket."
    }
  },
  {
    id: "sphinx", wiki: "Great_Sphinx_of_Giza", cat: "ancient", lat: 29.9753, lng: 31.1376, hours: 1, price: 0,
    name: { ru: "Большой Сфинкс", kk: "Ұлы Сфинкс", en: "Great Sphinx" },
    ticketText: { ru: "входит в билет к пирамидам", kk: "пирамидалар билетіне кіреді", en: "included in the pyramids ticket" },
    city: { ru: "Гиза (Каир)", kk: "Гиза (Каир)", en: "Giza (Cairo)" },
    short: {
      ru: "Лев с лицом фараона, вырезанный из цельной скалы.",
      kk: "Біртұтас жартастан қашалған, перғауын бетті арыстан.",
      en: "A lion with a pharaoh's face, carved from a single rock."
    },
    desc: {
      ru: "Длина Сфинкса — 73 метра, высота — 20 метров. Его высекли из известняковой скалы при фараоне Хефрене. Вечером здесь проходит световое шоу «Звук и свет».",
      kk: "Сфинкстің ұзындығы — 73 метр, биіктігі — 20 метр. Ол Хефрен перғауын тұсында әктас жартастан қашалған. Кешке мұнда «Дыбыс пен жарық» шоуы өтеді.",
      en: "The Sphinx is 73 metres long and 20 metres high. It was carved out of limestone bedrock in the reign of Pharaoh Khafre. In the evening there is a Sound and Light show here."
    }
  },
  {
    id: "gem", wiki: "Grand_Egyptian_Museum", photo: "Entrance Grand Egyptian museum.jpg", cat: "museum", lat: 29.9946, lng: 31.1196, hours: 4, price: 12600,
    name: { ru: "Большой Египетский музей", kk: "Ұлы Египет мұражайы", en: "Grand Egyptian Museum" },
    city: { ru: "Гиза (Каир)", kk: "Гиза (Каир)", en: "Giza (Cairo)" },
    short: {
      ru: "Крупнейший в мире музей одной цивилизации.",
      kk: "Бір өркениетке арналған әлемдегі ең ірі мұражай.",
      en: "The world's largest museum devoted to a single civilisation."
    },
    desc: {
      ru: "Новый музей у пирамид, где собраны тысячи экспонатов, в том числе полная коллекция гробницы Тутанхамона. На входе встречает 11-метровая статуя Рамсеса II.",
      kk: "Пирамидалардың жанындағы жаңа мұражайда мыңдаған жәдігер, соның ішінде Тутанхамон қабірінің толық коллекциясы жиналған. Кіре берісте Рамзес II-нің 11 метрлік мүсіні қарсы алады.",
      en: "A new museum next to the pyramids with thousands of artefacts, including the complete collection from Tutankhamun's tomb. An 11-metre statue of Ramesses II greets you at the entrance."
    }
  },
  {
    id: "khan", wiki: "Khan_el-Khalili", cat: "city", lat: 30.0477, lng: 31.2623, hours: 2, price: 0,
    name: { ru: "Базар Хан эль-Халили", kk: "Хан әл-Халили базары", en: "Khan el-Khalili Bazaar" },
    city: { ru: "Каир", kk: "Каир", en: "Cairo" },
    short: {
      ru: "Старинный рынок, где торгуют с XIV века.",
      kk: "XIV ғасырдан бері сауда жүріп келе жатқан көне базар.",
      en: "An old market that has been trading since the 14th century."
    },
    desc: {
      ru: "Лабиринт узких улочек со специями, лампами, украшениями и сувенирами. Здесь же находится кафе «Эль-Фишави», которому больше 200 лет. На рынке принято торговаться.",
      kk: "Дәмдеуіштер, шамдар, әшекейлер мен кәдесыйларға толы тар көшелер лабиринті. Мұнда 200 жылдан асқан «Эль-Фишави» кафесі де бар. Базарда саудаласу қалыпты жағдай.",
      en: "A maze of narrow lanes full of spices, lamps, jewellery and souvenirs. It is also home to El Fishawy café, which is over 200 years old. Haggling is expected here."
    }
  },
  {
    id: "karnak", wiki: "Karnak", cat: "ancient", lat: 25.7188, lng: 32.6573, hours: 3, price: 6300,
    name: { ru: "Карнакский храм", kk: "Карнак храмы", en: "Karnak Temple" },
    city: { ru: "Луксор", kk: "Луксор", en: "Luxor" },
    short: {
      ru: "Крупнейший храмовый комплекс Древнего мира.",
      kk: "Ежелгі әлемдегі ең ірі храм кешені.",
      en: "The largest temple complex of the ancient world."
    },
    desc: {
      ru: "Храм строили почти 2000 лет. Главное чудо — Гипостильный зал со 134 колоннами высотой до 21 метра. Здесь поклонялись богу Амону-Ра.",
      kk: "Храмды 2000 жылға жуық салған. Басты ғажабы — биіктігі 21 метрге дейін жететін 134 бағаналы Гипостиль залы. Мұнда Амон-Ра құдайына табынған.",
      en: "The temple was built over almost 2,000 years. Its highlight is the Hypostyle Hall with 134 columns up to 21 metres tall. The god Amun-Ra was worshipped here."
    }
  },
  {
    id: "kings", wiki: "Valley_of_the_Kings", cat: "ancient", lat: 25.7402, lng: 32.6014, hours: 4, price: 7900,
    name: { ru: "Долина царей", kk: "Патшалар алқабы", en: "Valley of the Kings" },
    city: { ru: "Луксор", kk: "Луксор", en: "Luxor" },
    short: {
      ru: "Гробницы фараонов, в том числе Тутанхамона.",
      kk: "Перғауындардың, соның ішінде Тутанхамонның қабірлері.",
      en: "Tombs of the pharaohs, including Tutankhamun."
    },
    desc: {
      ru: "Здесь найдено больше 60 гробниц. Стены многих покрыты яркими росписями, которые сохранились за 3000 лет. Самая известная — гробница Тутанхамона, найденная в 1922 году.",
      kk: "Мұнда 60-тан астам қабір табылған. Көбінің қабырғалары 3000 жыл бойы сақталған жарқын суреттермен безендірілген. Ең әйгілісі — 1922 жылы табылған Тутанхамон қабірі.",
      en: "More than 60 tombs have been found here. The walls of many are covered in bright paintings that have survived for 3,000 years. The most famous is Tutankhamun's tomb, discovered in 1922."
    }
  },
  {
    id: "abusimbel", wiki: "Abu_Simbel_temples", cat: "ancient", lat: 22.3372, lng: 31.6258, hours: 3, price: 7900,
    name: { ru: "Абу-Симбел", kk: "Әбу-Симбел", en: "Abu Simbel" },
    city: { ru: "Юг Асуана", kk: "Асуанның оңтүстігі", en: "South of Aswan" },
    short: {
      ru: "Четыре статуи Рамсеса II, высеченные в скале.",
      kk: "Жартасқа қашалған Рамзес II-нің төрт мүсіні.",
      en: "Four statues of Ramesses II carved into the rock."
    },
    desc: {
      ru: "Храм высотой 30 метров. Два раза в год — около 22 февраля и 22 октября — солнце проникает в глубину храма и освещает статуи богов. В 1960-х храм целиком перенесли выше, спасая от вод озера Насер.",
      kk: "Храмның биіктігі — 30 метр. Жылына екі рет — шамамен 22 ақпан мен 22 қазанда — күн сәулесі храмның түкпіріне түсіп, құдайлардың мүсіндерін жарықтандырады. 1960-жылдары храмды Насер көлінің суынан құтқару үшін тұтастай жоғарыға көшірген.",
      en: "The temple is 30 metres high. Twice a year — around 22 February and 22 October — sunlight reaches deep inside and lights up the statues of the gods. In the 1960s the whole temple was moved higher up to save it from the waters of Lake Nasser."
    }
  },
  {
    id: "hurghada", wiki: "Hurghada", photo: "Hurghada beach 02.JPG", cat: "sea", lat: 27.2579, lng: 33.8116, hours: 6, price: 0,
    name: { ru: "Хургада", kk: "Хургада", en: "Hurghada" },
    city: { ru: "Красное море", kk: "Қызыл теңіз", en: "Red Sea" },
    short: {
      ru: "Курорт с пляжами, островами и морскими прогулками.",
      kk: "Жағажайлары, аралдары және теңіз серуендері бар курорт.",
      en: "A resort with beaches, islands and boat trips."
    },
    desc: {
      ru: "Популярный курорт на Красном море. Отсюда ходят лодки на острова Гифтун, на снорклинг и рыбалку. Из Хургады удобно съездить в Луксор на один день — около 4 часов на машине.",
      kk: "Қызыл теңіздегі танымал курорт. Мұнан Гифтун аралдарына, снорклинг пен балық аулауға қайықтар шығады. Хургададан Луксорға бір күнге барып қайтуға ыңғайлы — көлікпен шамамен 4 сағат.",
      en: "A popular Red Sea resort. Boats leave from here for the Giftun Islands, snorkelling and fishing. Hurghada is a handy base for a day trip to Luxor — about 4 hours by car."
    }
  }
];

// Где обедать: короткие названия используются в плане туров (поле lunch)
const MEALS = {
  pyramids: { ru: "9 Pyramids Lounge — ресторан с видом на пирамиды", kk: "9 Pyramids Lounge — пирамидаларға қарайтын мейрамхана", en: "9 Pyramids Lounge — a restaurant with a view of the pyramids" },
  museum: { ru: "кафе в Большом Египетском музее", kk: "Ұлы Египет мұражайындағы кафе", en: "a café at the Grand Egyptian Museum" },
  koshary: { ru: "Abou Tarek — кошари, главное блюдо Каира", kk: "Abou Tarek — кошари, Каирдің басты тағамы", en: "Abou Tarek — koshary, Cairo's signature dish" },
  sofra: { ru: "Sofra — египетская кухня в старом доме, Луксор", kk: "Sofra — ескі үйдегі египет асханасы, Луксор", en: "Sofra — Egyptian food in an old house, Luxor" },
  westbank: { ru: "кафе на западном берегу Луксора", kk: "Луксордың батыс жағалауындағы кафе", en: "a café on Luxor's West Bank" },
  abusimbel: { ru: "местное кафе в Абу-Симбеле", kk: "Әбу-Симбелдегі жергілікті кафе", en: "a local café in Abu Simbel" },
  hotel: { ru: "в отеле (всё включено)", kk: "қонақүйде (бәрі қосылған)", en: "at the hotel (all inclusive)" },
  boat: { ru: "на лодке — входит в стоимость прогулки", kk: "қайықта — серуен бағасына кіреді", en: "on the boat — included in the trip" }
};

// Готовые туры.
// stops — места тура (по ним считается стоимость билетов),
// plan — план по дням (lunch — где обедать, hotel — где ночевать), costs — примерные расходы на одного человека в тенге.
// Цены средние и примерные: они меняются в зависимости от сезона и курса.
const TOURS = [
  {
    id: "classic", stops: ["gem", "giza", "sphinx", "khan", "karnak", "kings", "abusimbel"],
    name: { ru: "Классический Египет", kk: "Классикалық Египет", en: "Classic Egypt" },
    days: { ru: "7 дней", kk: "7 күн", en: "7 days" },
    text: {
      ru: "Каир, пирамиды, Луксор и Абу-Симбел — всё главное за одну поездку.",
      kk: "Каир, пирамидалар, Луксор және Әбу-Симбел — бір сапарда ең бастысы.",
      en: "Cairo, the pyramids, Luxor and Abu Simbel — all the highlights in one trip."
    },
    plan: [
      { day: "1", hotel: "Pyramids View Inn, Giza", ru: "Перелёт Алматы → Каир (≈ 9 ч с пересадкой), заселение в отель.",
        kk: "Алматы → Каир ұшуы (ауысып отырғанда ≈ 9 сағ), қонақүйге орналасу.",
        en: "Flight Almaty → Cairo (≈ 9 h with a connection), hotel check-in." },
      { day: "2", lunch: "pyramids", hotel: "Pyramids View Inn, Giza", ru: "Пирамиды Гизы и Сфинкс (≈ 5 ч). Вечером — базар Хан эль-Халили (≈ 2 ч).",
        kk: "Гиза пирамидалары мен Сфинкс (≈ 5 сағ). Кешке — Хан әл-Халили базары (≈ 2 сағ).",
        en: "Pyramids of Giza and the Sphinx (≈ 5 h). In the evening — Khan el-Khalili Bazaar (≈ 2 h)." },
      { day: "3", lunch: "museum", hotel: "Iberotel Luxor", ru: "Большой Египетский музей (≈ 4 ч). Вечером перелёт Каир → Луксор (≈ 1 ч).",
        kk: "Ұлы Египет мұражайы (≈ 4 сағ). Кешке Каир → Луксор ұшуы (≈ 1 сағ).",
        en: "Grand Egyptian Museum (≈ 4 h). Evening flight Cairo → Luxor (≈ 1 h)." },
      { day: "4", lunch: "sofra", hotel: "Iberotel Luxor", ru: "Луксор: Карнакский храм (≈ 3 ч), прогулка по набережной Нила.",
        kk: "Луксор: Карнак храмы (≈ 3 сағ), Ніл жағалауымен серуен.",
        en: "Luxor: Karnak Temple (≈ 3 h), a walk along the Nile." },
      { day: "5", lunch: "westbank", hotel: "Basma Hotel, Aswan", ru: "Долина царей (≈ 4 ч), затем переезд в Асуан (≈ 3,5 ч на машине).",
        kk: "Патшалар алқабы (≈ 4 сағ), содан кейін Асуанға көшу (көлікпен ≈ 3,5 сағ).",
        en: "Valley of the Kings (≈ 4 h), then transfer to Aswan (≈ 3.5 h by car)." },
      { day: "6", lunch: "abusimbel", hotel: "Pyramids View Inn, Giza", ru: "Абу-Симбел: выезд в 4:00, дорога ≈ 3,5 ч в одну сторону, осмотр ≈ 3 ч. Вечером перелёт Асуан → Каир (≈ 1,5 ч).",
        kk: "Әбу-Симбел: 4:00-де шығу, бір жаққа жол ≈ 3,5 сағ, көру ≈ 3 сағ. Кешке Асуан → Каир ұшуы (≈ 1,5 сағ).",
        en: "Abu Simbel: leave at 4:00, ≈ 3.5 h each way, ≈ 3 h on site. Evening flight Aswan → Cairo (≈ 1.5 h)." },
      { day: "7", ru: "Перелёт Каир → Алматы.", kk: "Каир → Алматы ұшуы.", en: "Flight Cairo → Almaty." }
    ],
    nights: 6, hotelPerNight: 26000,
    costs: { flight: 300000, transport: 60000, food: 70000, visa: 13000 }
  },
  {
    id: "cairo", stops: ["giza", "sphinx", "gem", "khan"],
    name: { ru: "Выходные в Каире", kk: "Каирдегі демалыс", en: "A weekend in Cairo" },
    days: { ru: "4 дня", kk: "4 күн", en: "4 days" },
    text: {
      ru: "Пирамиды, Сфинкс, новый музей и вечер на старом базаре.",
      kk: "Пирамидалар, Сфинкс, жаңа мұражай және көне базардағы кеш.",
      en: "The pyramids, the Sphinx, the new museum and an evening at the old bazaar."
    },
    plan: [
      { day: "1", hotel: "Pyramids View Inn, Giza", ru: "Перелёт Алматы → Каир (≈ 9 ч с пересадкой), заселение в отель.",
        kk: "Алматы → Каир ұшуы (ауысып отырғанда ≈ 9 сағ), қонақүйге орналасу.",
        en: "Flight Almaty → Cairo (≈ 9 h with a connection), hotel check-in." },
      { day: "2", lunch: "pyramids", hotel: "Pyramids View Inn, Giza", ru: "Пирамиды Гизы и Сфинкс (≈ 5 ч), дорога от центра Каира ≈ 1 ч.",
        kk: "Гиза пирамидалары мен Сфинкс (≈ 5 сағ), Каир орталығынан жол ≈ 1 сағ.",
        en: "Pyramids of Giza and the Sphinx (≈ 5 h), ≈ 1 h drive from central Cairo." },
      { day: "3", lunch: "koshary", hotel: "Pyramids View Inn, Giza", ru: "Большой Египетский музей (≈ 4 ч), вечером — базар Хан эль-Халили (≈ 2 ч).",
        kk: "Ұлы Египет мұражайы (≈ 4 сағ), кешке — Хан әл-Халили базары (≈ 2 сағ).",
        en: "Grand Egyptian Museum (≈ 4 h), Khan el-Khalili Bazaar in the evening (≈ 2 h)." },
      { day: "4", ru: "Перелёт Каир → Алматы.", kk: "Каир → Алматы ұшуы.", en: "Flight Cairo → Almaty." }
    ],
    nights: 3, hotelPerNight: 26000,
    costs: { flight: 300000, transport: 15000, food: 40000, visa: 13000 }
  },
  {
    id: "sea", stops: ["hurghada", "karnak", "kings"],
    name: { ru: "Море и храмы", kk: "Теңіз және храмдар", en: "Sea and temples" },
    days: { ru: "7 дней", kk: "7 күн", en: "7 days" },
    text: {
      ru: "Отдых на Красном море и поездка в Луксор к храмам и гробницам.",
      kk: "Қызыл теңіздегі демалыс және Луксордағы храмдар мен қабірлерге сапар.",
      en: "A Red Sea holiday with a trip to the temples and tombs of Luxor."
    },
    plan: [
      { day: "1", hotel: "Jaz Aquamarine Resort, Hurghada", ru: "Прямой перелёт Алматы → Хургада (≈ 6 ч), заселение в отель «всё включено».",
        kk: "Алматы → Хургада тікелей ұшуы (≈ 6 сағ), «бәрі қосылған» қонақүйге орналасу.",
        en: "Direct flight Almaty → Hurghada (≈ 6 h), check-in at an all-inclusive hotel." },
      { day: "2", lunch: "hotel", hotel: "Jaz Aquamarine Resort, Hurghada", ru: "Пляж и море.", kk: "Жағажай және теңіз.", en: "Beach and sea." },
      { day: "3", lunch: "boat", hotel: "Jaz Aquamarine Resort, Hurghada", ru: "Морская прогулка на острова Гифтун со снорклингом (≈ 7 ч).",
        kk: "Снорклингпен Гифтун аралдарына теңіз серуені (≈ 7 сағ).",
        en: "Boat trip to the Giftun Islands with snorkelling (≈ 7 h)." },
      { day: "4", lunch: "sofra", hotel: "Jaz Aquamarine Resort, Hurghada", ru: "Поездка в Луксор: выезд в 5:00, дорога ≈ 4 ч, Карнакский храм и Долина царей, вечером обратно.",
        kk: "Луксорға сапар: 5:00-де шығу, жол ≈ 4 сағ, Карнак храмы мен Патшалар алқабы, кешке қайту.",
        en: "Trip to Luxor: leave at 5:00, ≈ 4 h drive, Karnak Temple and the Valley of the Kings, back in the evening." },
      { day: "5–6", lunch: "hotel", hotel: "Jaz Aquamarine Resort, Hurghada", ru: "Пляж и море.", kk: "Жағажай және теңіз.", en: "Beach and sea." },
      { day: "7", ru: "Перелёт Хургада → Алматы.", kk: "Хургада → Алматы ұшуы.", en: "Flight Hurghada → Almaty." }
    ],
    nights: 6, hotelPerNight: 42000,
    costs: { flight: 250000, transport: 30000, excursions: 15000, food: 20000, visa: 13000 }
  }
];
