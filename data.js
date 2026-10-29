// Данные сайта: места и туры.
// У каждого текста три перевода: ru — русский, kk — казахский, en — английский.
// Фото места лежит в папке images/ и называется так же, как id (например images/giza.jpg).

const CATEGORIES = {
  ancient: { ru: "Древности", kk: "Көне мұралар", en: "Antiquities" },
  museum:  { ru: "Музеи",     kk: "Мұражайлар",   en: "Museums" },
  city:    { ru: "Города",    kk: "Қалалар",      en: "Cities" },
  sea:     { ru: "Море",      kk: "Теңіз",        en: "Sea" }
};

const PLACES = [
  {
    id: "giza", wiki: "Giza_pyramid_complex", cat: "ancient", lat: 29.9792, lng: 31.1342, hours: 4,
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
    id: "sphinx", wiki: "Great_Sphinx_of_Giza", cat: "ancient", lat: 29.9753, lng: 31.1376, hours: 1,
    name: { ru: "Большой Сфинкс", kk: "Ұлы Сфинкс", en: "Great Sphinx" },
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
    id: "gem", wiki: "Grand_Egyptian_Museum", cat: "museum", lat: 29.9946, lng: 31.1196, hours: 4,
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
    id: "khan", wiki: "Khan_el-Khalili", cat: "city", lat: 30.0477, lng: 31.2623, hours: 2,
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
    id: "karnak", wiki: "Karnak", cat: "ancient", lat: 25.7188, lng: 32.6573, hours: 3,
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
    id: "kings", wiki: "Valley_of_the_Kings", cat: "ancient", lat: 25.7402, lng: 32.6014, hours: 4,
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
    id: "abusimbel", wiki: "Abu_Simbel_temples", cat: "ancient", lat: 22.3372, lng: 31.6258, hours: 3,
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
    id: "hurghada", wiki: "Hurghada", cat: "sea", lat: 27.2579, lng: 33.8116, hours: 6,
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

// Готовые туры — это просто списки id мест
const TOURS = [
  {
    id: "classic", stops: ["gem", "giza", "sphinx", "khan", "karnak", "kings", "abusimbel"],
    name: { ru: "Классический Египет", kk: "Классикалық Египет", en: "Classic Egypt" },
    days: { ru: "7 дней", kk: "7 күн", en: "7 days" },
    text: {
      ru: "Каир, пирамиды, Луксор и Абу-Симбел — всё главное за одну поездку.",
      kk: "Каир, пирамидалар, Луксор және Әбу-Симбел — бір сапарда ең бастысы.",
      en: "Cairo, the pyramids, Luxor and Abu Simbel — all the highlights in one trip."
    }
  },
  {
    id: "cairo", stops: ["giza", "sphinx", "gem", "khan"],
    name: { ru: "Каир за 2 дня", kk: "Каир 2 күнде", en: "Cairo in 2 days" },
    days: { ru: "2 дня", kk: "2 күн", en: "2 days" },
    text: {
      ru: "Пирамиды, Сфинкс, новый музей и вечер на старом базаре.",
      kk: "Пирамидалар, Сфинкс, жаңа мұражай және көне базардағы кеш.",
      en: "The pyramids, the Sphinx, the new museum and an evening at the old bazaar."
    }
  },
  {
    id: "sea", stops: ["hurghada", "karnak", "kings"],
    name: { ru: "Море и храмы", kk: "Теңіз және храмдар", en: "Sea and temples" },
    days: { ru: "5 дней", kk: "5 күн", en: "5 days" },
    text: {
      ru: "Отдых на Красном море и поездка в Луксор к храмам и гробницам.",
      kk: "Қызыл теңіздегі демалыс және Луксордағы храмдар мен қабірлерге сапар.",
      en: "A Red Sea holiday with a trip to the temples and tombs of Luxor."
    }
  }
];
