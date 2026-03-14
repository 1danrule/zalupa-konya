import { useState, useEffect, useRef, useCallback } from "react";

// ─── Feather Icons (inline SVG) ───────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 2 }) => {
  const icons = {
    arrowLeft: <polyline points="15 18 9 12 15 6" />,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    barChart: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    check: <polyline points="20 6 9 13 4 10" />,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    volume: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></>,
    rotateRight: <><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></>,
    save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const DECKS = {
  chinese: {
    id: "chinese", name: "HSK 3", subtitle: "中文", language: "Chinese",
    color: "#E8443A", bgColor: "#2A1A1A",
    cards: [
      // Greetings & Basic
      {id:"zh1",front:"你好",back:"Hello / Hi",pinyin:"nǐ hǎo",romaji:""},
      {id:"zh2",front:"谢谢",back:"Thank you",pinyin:"xiè xiè",romaji:""},
      {id:"zh3",front:"再见",back:"Goodbye",pinyin:"zài jiàn",romaji:""},
      {id:"zh4",front:"对不起",back:"Sorry / Excuse me",pinyin:"duì bù qǐ",romaji:""},
      {id:"zh5",front:"没关系",back:"It's okay / No problem",pinyin:"méi guān xi",romaji:""},
      {id:"zh6",front:"请",back:"Please",pinyin:"qǐng",romaji:""},
      {id:"zh7",front:"是",back:"Yes / To be",pinyin:"shì",romaji:""},
      {id:"zh8",front:"不",back:"No / Not",pinyin:"bù",romaji:""},
      {id:"zh9",front:"我",back:"I / Me",pinyin:"wǒ",romaji:""},
      {id:"zh10",front:"你",back:"You",pinyin:"nǐ",romaji:""},
      // Numbers
      {id:"zh11",front:"一",back:"One",pinyin:"yī",romaji:""},
      {id:"zh12",front:"二",back:"Two",pinyin:"èr",romaji:""},
      {id:"zh13",front:"三",back:"Three",pinyin:"sān",romaji:""},
      {id:"zh14",front:"四",back:"Four",pinyin:"sì",romaji:""},
      {id:"zh15",front:"五",back:"Five",pinyin:"wǔ",romaji:""},
      {id:"zh16",front:"六",back:"Six",pinyin:"liù",romaji:""},
      {id:"zh17",front:"七",back:"Seven",pinyin:"qī",romaji:""},
      {id:"zh18",front:"八",back:"Eight",pinyin:"bā",romaji:""},
      {id:"zh19",front:"九",back:"Nine",pinyin:"jiǔ",romaji:""},
      {id:"zh20",front:"十",back:"Ten",pinyin:"shí",romaji:""},
      // Food
      {id:"zh21",front:"吃饭",back:"Eat / Have a meal",pinyin:"chī fàn",romaji:""},
      {id:"zh22",front:"喝水",back:"Drink water",pinyin:"hē shuǐ",romaji:""},
      {id:"zh23",front:"好吃",back:"Delicious",pinyin:"hǎo chī",romaji:""},
      {id:"zh24",front:"米饭",back:"Rice",pinyin:"mǐ fàn",romaji:""},
      {id:"zh25",front:"面条",back:"Noodles",pinyin:"miàn tiáo",romaji:""},
      {id:"zh26",front:"饺子",back:"Dumplings",pinyin:"jiǎo zi",romaji:""},
      {id:"zh27",front:"茶",back:"Tea",pinyin:"chá",romaji:""},
      {id:"zh28",front:"咖啡",back:"Coffee",pinyin:"kā fēi",romaji:""},
      {id:"zh29",front:"水果",back:"Fruit",pinyin:"shuǐ guǒ",romaji:""},
      {id:"zh30",front:"蔬菜",back:"Vegetables",pinyin:"shū cài",romaji:""},
      // Time
      {id:"zh31",front:"今天",back:"Today",pinyin:"jīn tiān",romaji:""},
      {id:"zh32",front:"明天",back:"Tomorrow",pinyin:"míng tiān",romaji:""},
      {id:"zh33",front:"昨天",back:"Yesterday",pinyin:"zuó tiān",romaji:""},
      {id:"zh34",front:"现在",back:"Now",pinyin:"xiàn zài",romaji:""},
      {id:"zh35",front:"时间",back:"Time",pinyin:"shí jiān",romaji:""},
      {id:"zh36",front:"星期一",back:"Monday",pinyin:"xīng qī yī",romaji:""},
      {id:"zh37",front:"星期五",back:"Friday",pinyin:"xīng qī wǔ",romaji:""},
      {id:"zh38",front:"早上",back:"Morning",pinyin:"zǎo shàng",romaji:""},
      {id:"zh39",front:"晚上",back:"Evening / Night",pinyin:"wǎn shàng",romaji:""},
      {id:"zh40",front:"年",back:"Year",pinyin:"nián",romaji:""},
      // Places
      {id:"zh41",front:"学校",back:"School",pinyin:"xué xiào",romaji:""},
      {id:"zh42",front:"医院",back:"Hospital",pinyin:"yī yuàn",romaji:""},
      {id:"zh43",front:"图书馆",back:"Library",pinyin:"tú shū guǎn",romaji:""},
      {id:"zh44",front:"超市",back:"Supermarket",pinyin:"chāo shì",romaji:""},
      {id:"zh45",front:"餐厅",back:"Restaurant",pinyin:"cān tīng",romaji:""},
      {id:"zh46",front:"公园",back:"Park",pinyin:"gōng yuán",romaji:""},
      {id:"zh47",front:"机场",back:"Airport",pinyin:"jī chǎng",romaji:""},
      {id:"zh48",front:"火车站",back:"Train station",pinyin:"huǒ chē zhàn",romaji:""},
      {id:"zh49",front:"酒店",back:"Hotel",pinyin:"jiǔ diàn",romaji:""},
      {id:"zh50",front:"银行",back:"Bank",pinyin:"yín háng",romaji:""},
      // Family
      {id:"zh51",front:"爸爸",back:"Father / Dad",pinyin:"bà ba",romaji:""},
      {id:"zh52",front:"妈妈",back:"Mother / Mom",pinyin:"mā ma",romaji:""},
      {id:"zh53",front:"哥哥",back:"Older brother",pinyin:"gē ge",romaji:""},
      {id:"zh54",front:"姐姐",back:"Older sister",pinyin:"jiě jie",romaji:""},
      {id:"zh55",front:"弟弟",back:"Younger brother",pinyin:"dì di",romaji:""},
      {id:"zh56",front:"妹妹",back:"Younger sister",pinyin:"mèi mèi",romaji:""},
      {id:"zh57",front:"朋友",back:"Friend",pinyin:"péng yǒu",romaji:""},
      {id:"zh58",front:"老师",back:"Teacher",pinyin:"lǎo shī",romaji:""},
      {id:"zh59",front:"学生",back:"Student",pinyin:"xué shēng",romaji:""},
      {id:"zh60",front:"医生",back:"Doctor",pinyin:"yī shēng",romaji:""},
      // Verbs
      {id:"zh61",front:"学习",back:"Study / Learn",pinyin:"xué xí",romaji:""},
      {id:"zh62",front:"工作",back:"Work",pinyin:"gōng zuò",romaji:""},
      {id:"zh63",front:"休息",back:"Rest",pinyin:"xiū xi",romaji:""},
      {id:"zh64",front:"睡觉",back:"Sleep",pinyin:"shuì jiào",romaji:""},
      {id:"zh65",front:"起床",back:"Get up",pinyin:"qǐ chuáng",romaji:""},
      {id:"zh66",front:"看书",back:"Read a book",pinyin:"kàn shū",romaji:""},
      {id:"zh67",front:"写字",back:"Write characters",pinyin:"xiě zì",romaji:""},
      {id:"zh68",front:"听音乐",back:"Listen to music",pinyin:"tīng yīn yuè",romaji:""},
      {id:"zh69",front:"看电影",back:"Watch a movie",pinyin:"kàn diàn yǐng",romaji:""},
      {id:"zh70",front:"运动",back:"Exercise / Sport",pinyin:"yùn dòng",romaji:""},
      // Adjectives
      {id:"zh71",front:"大",back:"Big / Large",pinyin:"dà",romaji:""},
      {id:"zh72",front:"小",back:"Small / Little",pinyin:"xiǎo",romaji:""},
      {id:"zh73",front:"多",back:"Many / Much",pinyin:"duō",romaji:""},
      {id:"zh74",front:"少",back:"Few / Little",pinyin:"shǎo",romaji:""},
      {id:"zh75",front:"快",back:"Fast / Quick",pinyin:"kuài",romaji:""},
      {id:"zh76",front:"慢",back:"Slow",pinyin:"màn",romaji:""},
      {id:"zh77",front:"热",back:"Hot",pinyin:"rè",romaji:""},
      {id:"zh78",front:"冷",back:"Cold",pinyin:"lěng",romaji:""},
      {id:"zh79",front:"贵",back:"Expensive",pinyin:"guì",romaji:""},
      {id:"zh80",front:"便宜",back:"Cheap",pinyin:"pián yí",romaji:""},
      // Phrases
      {id:"zh81",front:"我不明白",back:"I don't understand",pinyin:"wǒ bù míng bái",romaji:""},
      {id:"zh82",front:"请再说一遍",back:"Please say it again",pinyin:"qǐng zài shuō yī biàn",romaji:""},
      {id:"zh83",front:"多少钱",back:"How much does it cost?",pinyin:"duō shǎo qián",romaji:""},
      {id:"zh84",front:"在哪里",back:"Where is it?",pinyin:"zài nǎ lǐ",romaji:""},
      {id:"zh85",front:"几点了",back:"What time is it?",pinyin:"jǐ diǎn le",romaji:""},
      {id:"zh86",front:"我饿了",back:"I'm hungry",pinyin:"wǒ è le",romaji:""},
      {id:"zh87",front:"我渴了",back:"I'm thirsty",pinyin:"wǒ kě le",romaji:""},
      {id:"zh88",front:"我累了",back:"I'm tired",pinyin:"wǒ lèi le",romaji:""},
      {id:"zh89",front:"没问题",back:"No problem",pinyin:"méi wèn tí",romaji:""},
      {id:"zh90",front:"加油",back:"Come on! / Keep it up!",pinyin:"jiā yóu",romaji:""},
      // HSK 3 words
      {id:"zh91",front:"比较",back:"Compare / Relatively",pinyin:"bǐ jiào",romaji:""},
      {id:"zh92",front:"必须",back:"Must / Have to",pinyin:"bì xū",romaji:""},
      {id:"zh93",front:"变化",back:"Change",pinyin:"biàn huà",romaji:""},
      {id:"zh94",front:"方便",back:"Convenient",pinyin:"fāng biàn",romaji:""},
      {id:"zh95",front:"感谢",back:"Grateful / Thank",pinyin:"gǎn xiè",romaji:""},
      {id:"zh96",front:"关心",back:"Care / Concern",pinyin:"guān xīn",romaji:""},
      {id:"zh97",front:"环境",back:"Environment",pinyin:"huán jìng",romaji:""},
      {id:"zh98",front:"计划",back:"Plan",pinyin:"jì huà",romaji:""},
      {id:"zh99",front:"经验",back:"Experience",pinyin:"jīng yàn",romaji:""},
      {id:"zh100",front:"努力",back:"Hard-working / Effort",pinyin:"nǔ lì",romaji:""},
    ]
  },
  russian: {
    id: "russian", name: "Russian A2", subtitle: "Русский", language: "Russian",
    color: "#3B82F6", bgColor: "#1A1A2A",
    cards: [
      {id:"ru1",front:"Привет",back:"Hello / Hi",pinyin:"",romaji:"Privet"},
      {id:"ru2",front:"Спасибо",back:"Thank you",pinyin:"",romaji:"Spasibo"},
      {id:"ru3",front:"До свидания",back:"Goodbye",pinyin:"",romaji:"Do svidaniya"},
      {id:"ru4",front:"Извините",back:"Sorry / Excuse me",pinyin:"",romaji:"Izvinite"},
      {id:"ru5",front:"Пожалуйста",back:"Please / You're welcome",pinyin:"",romaji:"Pozhaluysta"},
      {id:"ru6",front:"Да",back:"Yes",pinyin:"",romaji:"Da"},
      {id:"ru7",front:"Нет",back:"No",pinyin:"",romaji:"Nyet"},
      {id:"ru8",front:"Я",back:"I / Me",pinyin:"",romaji:"Ya"},
      {id:"ru9",front:"Ты",back:"You (informal)",pinyin:"",romaji:"Ty"},
      {id:"ru10",front:"Вы",back:"You (formal) / You (plural)",pinyin:"",romaji:"Vy"},
      {id:"ru11",front:"Один",back:"One",pinyin:"",romaji:"Odin"},
      {id:"ru12",front:"Два",back:"Two",pinyin:"",romaji:"Dva"},
      {id:"ru13",front:"Три",back:"Three",pinyin:"",romaji:"Tri"},
      {id:"ru14",front:"Четыре",back:"Four",pinyin:"",romaji:"Chetyre"},
      {id:"ru15",front:"Пять",back:"Five",pinyin:"",romaji:"Pyat"},
      {id:"ru16",front:"Десять",back:"Ten",pinyin:"",romaji:"Desyat"},
      {id:"ru17",front:"Сто",back:"One hundred",pinyin:"",romaji:"Sto"},
      {id:"ru18",front:"Тысяча",back:"One thousand",pinyin:"",romaji:"Tysyacha"},
      {id:"ru19",front:"Хлеб",back:"Bread",pinyin:"",romaji:"Khleb"},
      {id:"ru20",front:"Вода",back:"Water",pinyin:"",romaji:"Voda"},
      {id:"ru21",front:"Молоко",back:"Milk",pinyin:"",romaji:"Moloko"},
      {id:"ru22",front:"Кофе",back:"Coffee",pinyin:"",romaji:"Kofe"},
      {id:"ru23",front:"Чай",back:"Tea",pinyin:"",romaji:"Chay"},
      {id:"ru24",front:"Мясо",back:"Meat",pinyin:"",romaji:"Myaso"},
      {id:"ru25",front:"Рыба",back:"Fish",pinyin:"",romaji:"Ryba"},
      {id:"ru26",front:"Суп",back:"Soup",pinyin:"",romaji:"Sup"},
      {id:"ru27",front:"Салат",back:"Salad",pinyin:"",romaji:"Salat"},
      {id:"ru28",front:"Пить",back:"To drink",pinyin:"",romaji:"Pit"},
      {id:"ru29",front:"Есть",back:"To eat / To be",pinyin:"",romaji:"Yest"},
      {id:"ru30",front:"Идти",back:"To go (on foot)",pinyin:"",romaji:"Idti"},
      {id:"ru31",front:"Ехать",back:"To go (by vehicle)",pinyin:"",romaji:"Yekhat"},
      {id:"ru32",front:"Работать",back:"To work",pinyin:"",romaji:"Rabotat"},
      {id:"ru33",front:"Учиться",back:"To study / learn",pinyin:"",romaji:"Uchitsya"},
      {id:"ru34",front:"Говорить",back:"To speak / say",pinyin:"",romaji:"Govorit"},
      {id:"ru35",front:"Понимать",back:"To understand",pinyin:"",romaji:"Ponimat"},
      {id:"ru36",front:"Знать",back:"To know",pinyin:"",romaji:"Znat"},
      {id:"ru37",front:"Любить",back:"To love / like",pinyin:"",romaji:"Lyubit"},
      {id:"ru38",front:"Жить",back:"To live",pinyin:"",romaji:"Zhit"},
      {id:"ru39",front:"Думать",back:"To think",pinyin:"",romaji:"Dumat"},
      {id:"ru40",front:"Читать",back:"To read",pinyin:"",romaji:"Chitat"},
      {id:"ru41",front:"Писать",back:"To write",pinyin:"",romaji:"Pisat"},
      {id:"ru42",front:"Смотреть",back:"To watch / look",pinyin:"",romaji:"Smotret"},
      {id:"ru43",front:"Слушать",back:"To listen",pinyin:"",romaji:"Slushat"},
      {id:"ru44",front:"Помогать",back:"To help",pinyin:"",romaji:"Pomogat"},
      {id:"ru45",front:"Купить",back:"To buy",pinyin:"",romaji:"Kupit"},
      {id:"ru46",front:"Продавать",back:"To sell",pinyin:"",romaji:"Prodavat"},
      {id:"ru47",front:"Открыть",back:"To open",pinyin:"",romaji:"Otkryt"},
      {id:"ru48",front:"Закрыть",back:"To close",pinyin:"",romaji:"Zakryt"},
      {id:"ru49",front:"Дом",back:"House / Home",pinyin:"",romaji:"Dom"},
      {id:"ru50",front:"Школа",back:"School",pinyin:"",romaji:"Shkola"},
      {id:"ru51",front:"Больница",back:"Hospital",pinyin:"",romaji:"Bolnitsa"},
      {id:"ru52",front:"Магазин",back:"Shop / Store",pinyin:"",romaji:"Magazin"},
      {id:"ru53",front:"Ресторан",back:"Restaurant",pinyin:"",romaji:"Restoran"},
      {id:"ru54",front:"Аэропорт",back:"Airport",pinyin:"",romaji:"Aeroport"},
      {id:"ru55",front:"Вокзал",back:"Train station",pinyin:"",romaji:"Vokzal"},
      {id:"ru56",front:"Город",back:"City / Town",pinyin:"",romaji:"Gorod"},
      {id:"ru57",front:"Улица",back:"Street",pinyin:"",romaji:"Ulitsa"},
      {id:"ru58",front:"Парк",back:"Park",pinyin:"",romaji:"Park"},
      {id:"ru59",front:"Большой",back:"Big / Large",pinyin:"",romaji:"Bolshoy"},
      {id:"ru60",front:"Маленький",back:"Small / Little",pinyin:"",romaji:"Malenkiy"},
      {id:"ru61",front:"Хороший",back:"Good",pinyin:"",romaji:"Khoroshiy"},
      {id:"ru62",front:"Плохой",back:"Bad",pinyin:"",romaji:"Plokhoy"},
      {id:"ru63",front:"Новый",back:"New",pinyin:"",romaji:"Novyy"},
      {id:"ru64",front:"Старый",back:"Old",pinyin:"",romaji:"Staryy"},
      {id:"ru65",front:"Красивый",back:"Beautiful",pinyin:"",romaji:"Krasivyy"},
      {id:"ru66",front:"Холодный",back:"Cold",pinyin:"",romaji:"Kholodnyy"},
      {id:"ru67",front:"Горячий",back:"Hot",pinyin:"",romaji:"Goryachiy"},
      {id:"ru68",front:"Быстрый",back:"Fast",pinyin:"",romaji:"Bystryy"},
      {id:"ru69",front:"Медленный",back:"Slow",pinyin:"",romaji:"Medlennyy"},
      {id:"ru70",front:"Сегодня",back:"Today",pinyin:"",romaji:"Segodnya"},
      {id:"ru71",front:"Завтра",back:"Tomorrow",pinyin:"",romaji:"Zavtra"},
      {id:"ru72",front:"Вчера",back:"Yesterday",pinyin:"",romaji:"Vchera"},
      {id:"ru73",front:"Сейчас",back:"Now",pinyin:"",romaji:"Seychas"},
      {id:"ru74",front:"Потом",back:"Later / Then",pinyin:"",romaji:"Potom"},
      {id:"ru75",front:"Утро",back:"Morning",pinyin:"",romaji:"Utro"},
      {id:"ru76",front:"Вечер",back:"Evening",pinyin:"",romaji:"Vecher"},
      {id:"ru77",front:"Ночь",back:"Night",pinyin:"",romaji:"Noch"},
      {id:"ru78",front:"Год",back:"Year",pinyin:"",romaji:"God"},
      {id:"ru79",front:"Месяц",back:"Month",pinyin:"",romaji:"Mesyats"},
      {id:"ru80",front:"Неделя",back:"Week",pinyin:"",romaji:"Nedelya"},
      {id:"ru81",front:"Папа",back:"Dad / Father",pinyin:"",romaji:"Papa"},
      {id:"ru82",front:"Мама",back:"Mom / Mother",pinyin:"",romaji:"Mama"},
      {id:"ru83",front:"Брат",back:"Brother",pinyin:"",romaji:"Brat"},
      {id:"ru84",front:"Сестра",back:"Sister",pinyin:"",romaji:"Sestra"},
      {id:"ru85",front:"Друг",back:"Friend (male)",pinyin:"",romaji:"Drug"},
      {id:"ru86",front:"Подруга",back:"Friend (female)",pinyin:"",romaji:"Podruga"},
      {id:"ru87",front:"Учитель",back:"Teacher",pinyin:"",romaji:"Uchitel"},
      {id:"ru88",front:"Доктор",back:"Doctor",pinyin:"",romaji:"Doktor"},
      {id:"ru89",front:"Как дела?",back:"How are you?",pinyin:"",romaji:"Kak dela?"},
      {id:"ru90",front:"Всё хорошо",back:"Everything is good",pinyin:"",romaji:"Vsyo khorosho"},
      {id:"ru91",front:"Не понимаю",back:"I don't understand",pinyin:"",romaji:"Ne ponimayu"},
      {id:"ru92",front:"Повторите",back:"Please repeat",pinyin:"",romaji:"Povtorite"},
      {id:"ru93",front:"Сколько стоит?",back:"How much does it cost?",pinyin:"",romaji:"Skolko stoit?"},
      {id:"ru94",front:"Где находится?",back:"Where is it?",pinyin:"",romaji:"Gde nakhoditsya?"},
      {id:"ru95",front:"Который час?",back:"What time is it?",pinyin:"",romaji:"Kotoryy chas?"},
      {id:"ru96",front:"Я голоден",back:"I'm hungry",pinyin:"",romaji:"Ya goloden"},
      {id:"ru97",front:"Я устал",back:"I'm tired",pinyin:"",romaji:"Ya ustal"},
      {id:"ru98",front:"Удачи",back:"Good luck",pinyin:"",romaji:"Udachi"},
      {id:"ru99",front:"Молодец",back:"Well done / Good job",pinyin:"",romaji:"Molodets"},
      {id:"ru100",front:"Конечно",back:"Of course",pinyin:"",romaji:"Konechno"},
    ]
  },
  japanese: {
    id: "japanese", name: "JLPT N4", subtitle: "日本語", language: "Japanese",
    color: "#10B981", bgColor: "#1A2A1E",
    cards: [
      {id:"ja1",front:"こんにちは",back:"Hello / Good afternoon",pinyin:"",romaji:"Konnichiwa"},
      {id:"ja2",front:"ありがとう",back:"Thank you",pinyin:"",romaji:"Arigatou"},
      {id:"ja3",front:"さようなら",back:"Goodbye",pinyin:"",romaji:"Sayounara"},
      {id:"ja4",front:"すみません",back:"Excuse me / Sorry",pinyin:"",romaji:"Sumimasen"},
      {id:"ja5",front:"はい",back:"Yes",pinyin:"",romaji:"Hai"},
      {id:"ja6",front:"いいえ",back:"No",pinyin:"",romaji:"Iie"},
      {id:"ja7",front:"おはよう",back:"Good morning",pinyin:"",romaji:"Ohayou"},
      {id:"ja8",front:"おやすみ",back:"Good night",pinyin:"",romaji:"Oyasumi"},
      {id:"ja9",front:"私",back:"I / Me",pinyin:"",romaji:"Watashi"},
      {id:"ja10",front:"あなた",back:"You",pinyin:"",romaji:"Anata"},
      {id:"ja11",front:"一",back:"One",pinyin:"",romaji:"Ichi"},
      {id:"ja12",front:"二",back:"Two",pinyin:"",romaji:"Ni"},
      {id:"ja13",front:"三",back:"Three",pinyin:"",romaji:"San"},
      {id:"ja14",front:"四",back:"Four",pinyin:"",romaji:"Shi / Yon"},
      {id:"ja15",front:"五",back:"Five",pinyin:"",romaji:"Go"},
      {id:"ja16",front:"六",back:"Six",pinyin:"",romaji:"Roku"},
      {id:"ja17",front:"七",back:"Seven",pinyin:"",romaji:"Nana / Shichi"},
      {id:"ja18",front:"八",back:"Eight",pinyin:"",romaji:"Hachi"},
      {id:"ja19",front:"九",back:"Nine",pinyin:"",romaji:"Kyuu / Ku"},
      {id:"ja20",front:"十",back:"Ten",pinyin:"",romaji:"Juu"},
      {id:"ja21",front:"食べる",back:"To eat",pinyin:"",romaji:"Taberu"},
      {id:"ja22",front:"飲む",back:"To drink",pinyin:"",romaji:"Nomu"},
      {id:"ja23",front:"行く",back:"To go",pinyin:"",romaji:"Iku"},
      {id:"ja24",front:"来る",back:"To come",pinyin:"",romaji:"Kuru"},
      {id:"ja25",front:"する",back:"To do",pinyin:"",romaji:"Suru"},
      {id:"ja26",front:"見る",back:"To see / watch",pinyin:"",romaji:"Miru"},
      {id:"ja27",front:"聞く",back:"To listen / ask",pinyin:"",romaji:"Kiku"},
      {id:"ja28",front:"話す",back:"To speak",pinyin:"",romaji:"Hanasu"},
      {id:"ja29",front:"読む",back:"To read",pinyin:"",romaji:"Yomu"},
      {id:"ja30",front:"書く",back:"To write",pinyin:"",romaji:"Kaku"},
      {id:"ja31",front:"買う",back:"To buy",pinyin:"",romaji:"Kau"},
      {id:"ja32",front:"売る",back:"To sell",pinyin:"",romaji:"Uru"},
      {id:"ja33",front:"働く",back:"To work",pinyin:"",romaji:"Hataraku"},
      {id:"ja34",front:"勉強する",back:"To study",pinyin:"",romaji:"Benkyou suru"},
      {id:"ja35",front:"休む",back:"To rest / be absent",pinyin:"",romaji:"Yasumu"},
      {id:"ja36",front:"寝る",back:"To sleep",pinyin:"",romaji:"Neru"},
      {id:"ja37",front:"起きる",back:"To wake up",pinyin:"",romaji:"Okiru"},
      {id:"ja38",front:"大きい",back:"Big / Large",pinyin:"",romaji:"Ookii"},
      {id:"ja39",front:"小さい",back:"Small / Little",pinyin:"",romaji:"Chiisai"},
      {id:"ja40",front:"良い",back:"Good",pinyin:"",romaji:"Yoi / Ii"},
      {id:"ja41",front:"悪い",back:"Bad",pinyin:"",romaji:"Warui"},
      {id:"ja42",front:"新しい",back:"New",pinyin:"",romaji:"Atarashii"},
      {id:"ja43",front:"古い",back:"Old",pinyin:"",romaji:"Furui"},
      {id:"ja44",front:"高い",back:"Expensive / High",pinyin:"",romaji:"Takai"},
      {id:"ja45",front:"安い",back:"Cheap / Inexpensive",pinyin:"",romaji:"Yasui"},
      {id:"ja46",front:"速い",back:"Fast",pinyin:"",romaji:"Hayai"},
      {id:"ja47",front:"遅い",back:"Slow / Late",pinyin:"",romaji:"Osoi"},
      {id:"ja48",front:"熱い",back:"Hot (touch)",pinyin:"",romaji:"Atsui"},
      {id:"ja49",front:"冷たい",back:"Cold (touch)",pinyin:"",romaji:"Tsumetai"},
      {id:"ja50",front:"難しい",back:"Difficult",pinyin:"",romaji:"Muzukashii"},
      {id:"ja51",front:"易しい",back:"Easy",pinyin:"",romaji:"Yasashii"},
      {id:"ja52",front:"楽しい",back:"Fun / Enjoyable",pinyin:"",romaji:"Tanoshii"},
      {id:"ja53",front:"悲しい",back:"Sad",pinyin:"",romaji:"Kanashii"},
      {id:"ja54",front:"今日",back:"Today",pinyin:"",romaji:"Kyou"},
      {id:"ja55",front:"明日",back:"Tomorrow",pinyin:"",romaji:"Ashita"},
      {id:"ja56",front:"昨日",back:"Yesterday",pinyin:"",romaji:"Kinou"},
      {id:"ja57",front:"今",back:"Now",pinyin:"",romaji:"Ima"},
      {id:"ja58",front:"朝",back:"Morning",pinyin:"",romaji:"Asa"},
      {id:"ja59",front:"夜",back:"Night",pinyin:"",romaji:"Yoru"},
      {id:"ja60",front:"年",back:"Year",pinyin:"",romaji:"Nen / Toshi"},
      {id:"ja61",front:"月",back:"Month / Moon",pinyin:"",romaji:"Tsuki / Gatsu"},
      {id:"ja62",front:"週",back:"Week",pinyin:"",romaji:"Shuu"},
      {id:"ja63",front:"学校",back:"School",pinyin:"",romaji:"Gakkou"},
      {id:"ja64",front:"病院",back:"Hospital",pinyin:"",romaji:"Byouin"},
      {id:"ja65",front:"図書館",back:"Library",pinyin:"",romaji:"Toshokan"},
      {id:"ja66",front:"駅",back:"Train station",pinyin:"",romaji:"Eki"},
      {id:"ja67",front:"空港",back:"Airport",pinyin:"",romaji:"Kuukou"},
      {id:"ja68",front:"レストラン",back:"Restaurant",pinyin:"",romaji:"Resutoran"},
      {id:"ja69",front:"ホテル",back:"Hotel",pinyin:"",romaji:"Hoteru"},
      {id:"ja70",front:"銀行",back:"Bank",pinyin:"",romaji:"Ginkou"},
      {id:"ja71",front:"お父さん",back:"Father",pinyin:"",romaji:"Otousan"},
      {id:"ja72",front:"お母さん",back:"Mother",pinyin:"",romaji:"Okaasan"},
      {id:"ja73",front:"兄",back:"Older brother",pinyin:"",romaji:"Ani"},
      {id:"ja74",front:"姉",back:"Older sister",pinyin:"",romaji:"Ane"},
      {id:"ja75",front:"友達",back:"Friend",pinyin:"",romaji:"Tomodachi"},
      {id:"ja76",front:"先生",back:"Teacher",pinyin:"",romaji:"Sensei"},
      {id:"ja77",front:"学生",back:"Student",pinyin:"",romaji:"Gakusei"},
      {id:"ja78",front:"医者",back:"Doctor",pinyin:"",romaji:"Isha"},
      {id:"ja79",front:"水",back:"Water",pinyin:"",romaji:"Mizu"},
      {id:"ja80",front:"ご飯",back:"Rice / Meal",pinyin:"",romaji:"Gohan"},
      {id:"ja81",front:"お茶",back:"Tea",pinyin:"",romaji:"Ocha"},
      {id:"ja82",front:"コーヒー",back:"Coffee",pinyin:"",romaji:"Koohii"},
      {id:"ja83",front:"パン",back:"Bread",pinyin:"",romaji:"Pan"},
      {id:"ja84",front:"肉",back:"Meat",pinyin:"",romaji:"Niku"},
      {id:"ja85",front:"魚",back:"Fish",pinyin:"",romaji:"Sakana"},
      {id:"ja86",front:"野菜",back:"Vegetables",pinyin:"",romaji:"Yasai"},
      {id:"ja87",front:"果物",back:"Fruit",pinyin:"",romaji:"Kudamono"},
      {id:"ja88",front:"わかりません",back:"I don't understand",pinyin:"",romaji:"Wakarimasen"},
      {id:"ja89",front:"もう一度",back:"One more time / Again",pinyin:"",romaji:"Mou ichido"},
      {id:"ja90",front:"いくらですか",back:"How much is it?",pinyin:"",romaji:"Ikura desu ka?"},
      {id:"ja91",front:"どこですか",back:"Where is it?",pinyin:"",romaji:"Doko desu ka?"},
      {id:"ja92",front:"何時ですか",back:"What time is it?",pinyin:"",romaji:"Nanji desu ka?"},
      {id:"ja93",front:"お腹が空いた",back:"I'm hungry",pinyin:"",romaji:"Onaka ga suita"},
      {id:"ja94",front:"疲れた",back:"I'm tired",pinyin:"",romaji:"Tsukareta"},
      {id:"ja95",front:"頑張って",back:"Do your best! / Good luck!",pinyin:"",romaji:"Ganbatte"},
      {id:"ja96",front:"大丈夫",back:"It's okay / Are you alright?",pinyin:"",romaji:"Daijoubu"},
      {id:"ja97",front:"本当に",back:"Really / Truly",pinyin:"",romaji:"Hontou ni"},
      {id:"ja98",front:"もちろん",back:"Of course",pinyin:"",romaji:"Mochiron"},
      {id:"ja99",front:"少し",back:"A little / Slightly",pinyin:"",romaji:"Sukoshi"},
      {id:"ja100",front:"たくさん",back:"A lot / Many",pinyin:"",romaji:"Takusan"},
    ]
  }
};

// Generate study history for past 35 days
const generateStudyHistory = () => {
  const history = {};
  const today = new Date();
  for (let i = 0; i < 35; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const rand = Math.random();
    if (rand > 0.25) {
      history[key] = { studied: true, correct: Math.floor(Math.random() * 15) + 5, total: Math.floor(Math.random() * 10) + 15 };
    } else {
      history[key] = { studied: false, correct: 0, total: 0 };
    }
  }
  // Today partial
  history[today.toISOString().split("T")[0]] = { studied: true, correct: 8, total: 13 };
  return history;
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [prevScreen, setPrevScreen] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [studyMode, setStudyMode] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [studyHistory] = useState(generateStudyHistory);
  const [goals, setGoals] = useState({ daily: 20, weekly: 100, streak: 7 });
  const [user] = useState({ name: "Joseph", level: 12, xp: 2450, avatar: null });

  const nav = useCallback((to, from) => {
    setPrevScreen(from || screen);
    setScreen(to);
  }, [screen]);

  const goBack = () => {
    if (prevScreen) { setScreen(prevScreen); setPrevScreen(null); }
    else setScreen("home");
  };

  const screenProps = { nav, goBack, selectedDeck, setSelectedDeck, studyMode, setStudyMode, userCards, setUserCards, studyHistory, goals, setGoals, user };

  return (
    <div style={{ background: "#141414", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ width: 390, height: 844, background: "#1A1A1A", borderRadius: 44, overflow: "hidden", position: "relative", boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}>
        {screen === "home" && <HomeScreen {...screenProps} />}
        {screen === "stats" && <StatsScreen {...screenProps} />}
        {screen === "decks" && <DecksScreen {...screenProps} />}
        {screen === "study" && <StudyScreen {...screenProps} />}
        {screen === "profile" && <ProfileScreen {...screenProps} />}
        {screen === "goals" && <GoalsScreen {...screenProps} />}
        {screen === "createCard" && <CreateCardScreen {...screenProps} />}
        {screen === "deckDetail" && <DeckDetailScreen {...screenProps} />}
      </div>
    </div>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
const TopBar = ({ title, onBack, onProfile, user, showProfile = true }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 24px 12px", position: "relative" }}>
    {onBack ? (
      <button onClick={onBack} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 12, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
        <Icon name="arrowLeft" size={18} />
      </button>
    ) : <div style={{ width: 38 }} />}
    <span style={{ color: "#fff", fontWeight: 600, fontSize: 16, letterSpacing: "-0.3px" }}>{title}</span>
    {showProfile && onProfile ? (
      <button onClick={onProfile} style={{ background: "linear-gradient(135deg, #E8443A, #FF6B35)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 15 }}>
        {user?.name?.[0] || "J"}
      </button>
    ) : <div style={{ width: 38 }} />}
  </div>
);

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
const BottomNav = ({ current, nav }) => {
  const items = [
    { id: "home", icon: "home", label: "Home" },
    { id: "decks", icon: "layers", label: "Decks" },
    { id: "stats", icon: "barChart", label: "Stats" },
    { id: "profile", icon: "user", label: "Profile" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#222", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", padding: "12px 0 28px" }}>
      {items.map(it => (
        <button key={it.id} onClick={() => nav(it.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: current === it.id ? "#E8443A" : "rgba(255,255,255,0.35)", transition: "color 0.2s" }}>
          <Icon name={it.icon} size={20} />
          <span style={{ fontSize: 10, fontWeight: 500 }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ nav, user, studyHistory, goals, setSelectedDeck }) {
  const [activeTab, setActiveTab] = useState("today");
  const today = new Date().toISOString().split("T")[0];
  const todayData = studyHistory[today] || { correct: 0, total: 0 };
  const progress = todayData.total > 0 ? Math.round((todayData.correct / todayData.total) * 100) : 0;

  const deckList = Object.values(DECKS);
  const currentDeck = deckList[0];

  // Calendar for current month
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const monthName = now.toLocaleString("default", { month: "long" });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Header */}
      <div style={{ padding: "52px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>Good morning,</p>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "2px 0 0", letterSpacing: "-0.5px" }}>Hi {user.name}!</h1>
        </div>
        <button onClick={() => nav("profile")} style={{ background: "linear-gradient(135deg, #E8443A, #FF6B35)", border: "none", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 16, boxShadow: "0 4px 20px rgba(232,68,58,0.4)" }}>
          {user.name[0]}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, padding: "16px 24px 0" }}>
        {["today", "week"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: activeTab === t ? "#E8443A" : "rgba(255,255,255,0.08)", color: activeTab === t ? "#fff" : "rgba(255,255,255,0.45)", transition: "all 0.2s" }}>
            {t === "today" ? "Today" : "Last week"}
          </button>
        ))}
      </div>

      {/* Streak bar */}
      <div style={{ margin: "16px 24px 0", background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <Icon name="zap" size={16} color="#FFB800" />
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>7-day streak — keep going!</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < 5 ? "#FFB800" : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      </div>

      {/* Current Deck Card */}
      <div style={{ margin: "16px 24px 0", background: "rgba(232,68,58,0.12)", border: "1px solid rgba(232,68,58,0.2)", borderRadius: 20, padding: 20 }}>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: 0, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px" }}>Current deck</p>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, margin: "6px 0 2px", letterSpacing: "-1px" }}>{currentDeck.name}</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, margin: "0 0 20px" }}>{currentDeck.subtitle}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 16 }}>
          {[
            { val: todayData.correct, label: "correct" },
            { val: todayData.total, label: "total" },
            { val: todayData.total - todayData.correct, label: "wrong" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: i > 0 ? 12 : 0 }}>
              {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>|</span>}
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 600 }}>{item.val}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => { setSelectedDeck(currentDeck); nav("study"); }} style={{ flex: 1, background: "#fff", color: "#1A1A1A", border: "none", borderRadius: 14, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: "-0.3px" }}>
            Start the deck
          </button>
          <button onClick={() => { setSelectedDeck(currentDeck); nav("deckDetail"); }} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: 14, width: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ margin: "16px 24px 0", display: "flex", gap: 10 }}>
        {/* Calendar Widget */}
        <button onClick={() => nav("stats")} style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "14px", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}>{monthName}</span>
            <Icon name="calendar" size={12} color="rgba(255,255,255,0.3)" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
            {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const d = new Date(now.getFullYear(), now.getMonth(), i + 1);
              const key = d.toISOString().split("T")[0];
              const info = studyHistory[key];
              const isToday = i + 1 === now.getDate();
              return (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: isToday ? "#E8443A" : info?.studied ? "rgba(232,68,58,0.6)" : "rgba(255,255,255,0.1)" }} />
              );
            })}
          </div>
        </button>

        {/* Progress Widget */}
        <button onClick={() => nav("stats")} style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "14px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 32, fontWeight: 700, letterSpacing: "-1px" }}>{progress}%</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>complete</span>
          <div style={{ width: "80%", height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: 8 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "#E8443A", borderRadius: 2, transition: "width 0.5s" }} />
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{ margin: "16px 24px 0", display: "flex", gap: 10 }}>
        <button onClick={() => nav("createCard")} style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 12px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.7)" }}>
          <Icon name="plus" size={16} color="#E8443A" />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Create card</span>
        </button>
        <button onClick={() => nav("goals")} style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 12px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.7)" }}>
          <Icon name="target" size={16} color="#3B82F6" />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Set goals</span>
        </button>
      </div>

      <div style={{ height: 100 }} />
      <BottomNav current="home" nav={nav} />
    </div>
  );
}

// ─── Stats Screen ─────────────────────────────────────────────────────────────
function StatsScreen({ nav, goBack, studyHistory, goals }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  // Weekly bar data
  const weekData = [...Array(7)].map((_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    return { day: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()], ...studyHistory[key] || { correct: 0, total: 0, studied: false } };
  });

  const totalStudied = Object.values(studyHistory).filter(d => d.studied).length;
  const totalCards = Object.values(studyHistory).reduce((s, d) => s + d.total, 0);
  const avgAccuracy = totalCards > 0 ? Math.round(Object.values(studyHistory).reduce((s, d) => s + d.correct, 0) / totalCards * 100) : 0;
  const streak = (() => {
    let s = 0;
    const d = new Date(now);
    while (true) {
      const k = d.toISOString().split("T")[0];
      if (studyHistory[k]?.studied) { s++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return s;
  })();

  const maxTotal = Math.max(...weekData.map(d => d.total || 1));

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <TopBar title="Statistics" onBack={goBack} showProfile={false} />

      {/* Summary cards */}
      <div style={{ padding: "16px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Day streak", value: streak, icon: "zap", color: "#FFB800" },
          { label: "Days studied", value: totalStudied, icon: "calendar", color: "#E8443A" },
          { label: "Avg accuracy", value: `${avgAccuracy}%`, icon: "trendingUp", color: "#10B981" },
          { label: "Cards reviewed", value: totalCards, icon: "layers", color: "#3B82F6" },
        ].map(item => (
          <div key={item.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px" }}>
            <Icon name={item.icon} size={18} color={item.color} />
            <div style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: "8px 0 2px", letterSpacing: "-0.5px" }}>{item.value}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div style={{ margin: "16px 24px 0", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "16px" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 16px" }}>This Week</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
          {weekData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", position: "relative", height: 60, display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", background: d.studied ? "rgba(232,68,58,0.25)" : "rgba(255,255,255,0.06)", borderRadius: 6, height: `${d.studied ? Math.max((d.total / maxTotal) * 100, 15) : 15}%`, position: "relative", overflow: "hidden" }}>
                  {d.studied && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#E8443A", height: `${(d.correct / d.total) * 100}%`, borderRadius: 6, transition: "height 0.5s" }} />}
                </div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: "#E8443A" }} /><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Correct</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(232,68,58,0.25)" }} /><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Total</span></div>
        </div>
      </div>

      {/* Monthly Calendar */}
      <div style={{ margin: "16px 24px 0", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "16px" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px" }}>{monthName}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 8 }}>
          {weekDays.map(d => <div key={d} style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: 10, fontWeight: 600 }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
          {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const d = new Date(now.getFullYear(), now.getMonth(), day);
            const key = d.toISOString().split("T")[0];
            const info = studyHistory[key];
            const isToday = day === now.getDate();
            const isFuture = day > now.getDate();
            const isSelected = selectedDay === key;
            return (
              <button key={i} onClick={() => !isFuture && setSelectedDay(isSelected ? null : key)} style={{ aspectRatio: "1", borderRadius: 8, border: isToday ? "2px solid #E8443A" : isSelected ? "2px solid rgba(232,68,58,0.5)" : "none", background: info?.studied ? `rgba(232,68,58,${0.15 + (info.correct / info.total) * 0.4})` : isFuture ? "transparent" : "rgba(255,255,255,0.04)", cursor: isFuture ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: isToday ? "#E8443A" : "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: isToday ? 700 : 400 }}>
                {day}
              </button>
            );
          })}
        </div>
        {selectedDay && studyHistory[selectedDay]?.studied && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(232,68,58,0.1)", borderRadius: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
              {new Date(selectedDay).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}: <strong style={{ color: "#fff" }}>{studyHistory[selectedDay].correct}/{studyHistory[selectedDay].total}</strong> cards correct
            </span>
          </div>
        )}
      </div>

      {/* Goals progress */}
      <div style={{ margin: "16px 24px 0", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "16px" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px" }}>Goals Progress</p>
        {[
          { label: "Daily cards", current: studyHistory[now.toISOString().split("T")[0]]?.total || 0, goal: goals.daily, color: "#E8443A" },
          { label: "Weekly cards", current: weekData.reduce((s, d) => s + d.total, 0), goal: goals.weekly, color: "#3B82F6" },
          { label: "Day streak", current: streak, goal: goals.streak, color: "#FFB800" },
        ].map(g => (
          <div key={g.label} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{g.label}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{Math.min(g.current, g.goal)}/{g.goal}</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${Math.min((g.current / g.goal) * 100, 100)}%`, background: g.color, borderRadius: 3, transition: "width 0.5s" }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 100 }} />
      <BottomNav current="stats" nav={nav} />
    </div>
  );
}

// ─── Decks Screen ─────────────────────────────────────────────────────────────
function DecksScreen({ nav, setSelectedDeck, userCards }) {
  const allDecks = [...Object.values(DECKS)];
  if (userCards.length > 0) {
    allDecks.push({ id: "custom", name: "My Cards", subtitle: "Custom", language: "Custom", color: "#A855F7", bgColor: "#1E1A2E", cards: userCards });
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <TopBar title="Decks" showProfile={false} />
      <div style={{ padding: "8px 24px 0" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 16px" }}>{allDecks.length} decks available</p>

        {allDecks.map(deck => (
          <button key={deck.id} onClick={() => { setSelectedDeck(deck); nav("deckDetail"); }} style={{ width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "18px", border: "none", cursor: "pointer", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: `${deck.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="book" size={20} color={deck.color} />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>{deck.name}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 2 }}>{deck.subtitle} · {deck.cards.length} cards</div>
              </div>
            </div>
            <Icon name="chevronRight" size={18} color="rgba(255,255,255,0.25)" />
          </button>
        ))}

        <button onClick={() => nav("createCard")} style={{ width: "100%", background: "rgba(232,68,58,0.08)", borderRadius: 18, padding: "18px", border: "2px dashed rgba(232,68,58,0.25)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "#E8443A", fontWeight: 600, fontSize: 14 }}>
          <Icon name="plus" size={18} color="#E8443A" />
          Create new deck
        </button>
      </div>
      <div style={{ height: 100 }} />
      <BottomNav current="decks" nav={nav} />
    </div>
  );
}

// ─── Deck Detail ──────────────────────────────────────────────────────────────
function DeckDetailScreen({ nav, goBack, selectedDeck }) {
  if (!selectedDeck) { goBack(); return null; }
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <TopBar title={selectedDeck.name} onBack={goBack} showProfile={false} />
      <div style={{ padding: "16px 24px 0" }}>
        <div style={{ background: `${selectedDeck.color}15`, border: `1px solid ${selectedDeck.color}25`, borderRadius: 18, padding: "20px", marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>{selectedDeck.language}</p>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.5px" }}>{selectedDeck.name}</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, margin: 0 }}>{selectedDeck.subtitle}</p>
          <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
            <div><div style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>{selectedDeck.cards.length}</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Cards</div></div>
            <div><div style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>0</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Mastered</div></div>
          </div>
        </div>

        <button onClick={() => nav("study")} style={{ width: "100%", background: selectedDeck.color, color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", marginBottom: 16, letterSpacing: "-0.3px" }}>
          Start Studying
        </button>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px" }}>Preview cards</p>
        {selectedDeck.cards.slice(0, 10).map(card => (
          <div key={card.id} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>{card.front}</div>
              {(card.pinyin || card.romaji) && <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 2 }}>{card.pinyin || card.romaji}</div>}
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{card.back}</div>
          </div>
        ))}
        {selectedDeck.cards.length > 10 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "center" }}>...and {selectedDeck.cards.length - 10} more</p>
        )}
      </div>
      <div style={{ height: 40 }} />
    </div>
  );
}

// ─── Study Screen ─────────────────────────────────────────────────────────────
function StudyScreen({ nav, goBack, selectedDeck }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const deck = selectedDeck || Object.values(DECKS)[0];
  const cards = deck.cards.slice(0, 20);
  const card = cards[cardIndex];

  const speak = () => {
    if (!window.speechSynthesis || speaking) return;
    const u = new SpeechSynthesisUtterance(card.front);
    const langMap = { Chinese: "zh-CN", Russian: "ru-RU", Japanese: "ja-JP", Custom: "en-US" };
    u.lang = langMap[deck.language] || "en-US";
    u.rate = 0.85;
    setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const answer = (correct) => {
    setResults(r => [...r, { card, correct }]);
    if (cardIndex + 1 >= cards.length) setDone(true);
    else { setCardIndex(i => i + 1); setFlipped(false); }
  };

  if (done) {
    const correct = results.filter(r => r.correct).length;
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title="Session Complete" onBack={goBack} showProfile={false} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <Icon name="award" size={36} color="#10B981" />
          </div>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "0 0 8px", textAlign: "center" }}>Well done!</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, margin: "0 0 32px", textAlign: "center" }}>You completed the session</p>
          <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#10B981", fontSize: 36, fontWeight: 700 }}>{correct}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Correct</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#E8443A", fontSize: 36, fontWeight: 700 }}>{results.length - correct}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Wrong</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontSize: 36, fontWeight: 700 }}>{Math.round(correct / results.length * 100)}%</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Score</div>
            </div>
          </div>
          <button onClick={() => { setCardIndex(0); setFlipped(false); setResults([]); setDone(false); }} style={{ width: "100%", background: "#E8443A", color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", marginBottom: 12 }}>
            Study Again
          </button>
          <button onClick={goBack} style={{ width: "100%", background: "rgba(255,255,255,0.08)", color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const progress = cardIndex / cards.length;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={deck.name} onBack={goBack} showProfile={false} />

      {/* Progress */}
      <div style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{cardIndex + 1} / {cards.length}</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{results.filter(r => r.correct).length} correct</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: deck.color, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <div onClick={() => setFlipped(f => !f)} style={{ width: "100%", minHeight: 240, background: flipped ? `${deck.color}18` : "rgba(255,255,255,0.06)", borderRadius: 24, padding: "32px 28px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", transition: "background 0.3s", border: flipped ? `1px solid ${deck.color}30` : "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
          {!flipped && (
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, fontWeight: 500, position: "absolute", top: 16, left: 0, right: 0, textAlign: "center", textTransform: "uppercase", letterSpacing: "1px" }}>Tap to reveal</p>
          )}
          <div style={{ fontSize: flipped ? 22 : 48, fontWeight: 700, color: "#fff", lineHeight: 1.2, letterSpacing: flipped ? "-0.3px" : "-1px", marginBottom: 8 }}>
            {flipped ? card.back : card.front}
          </div>
          {!flipped && (card.pinyin || card.romaji) && (
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, marginTop: 4 }}>{card.pinyin || card.romaji}</div>
          )}
          {flipped && (
            <div style={{ marginTop: 8 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, fontWeight: 600 }}>{card.front}</div>
              {(card.pinyin || card.romaji) && <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, marginTop: 4 }}>{card.pinyin || card.romaji}</div>}
            </div>
          )}
        </div>

        {/* Audio button */}
        <button onClick={speak} style={{ marginTop: 12, background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 12, padding: "10px 20px", color: speaking ? deck.color : "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500 }}>
          <Icon name="volume" size={16} />
          {speaking ? "Playing..." : "Play audio"}
        </button>

        {/* Flip hint */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
          <Icon name="rotateRight" size={13} />
          Tap card to flip
        </div>
      </div>

      {/* Answer buttons */}
      {flipped && (
        <div style={{ padding: "0 24px 40px", display: "flex", gap: 12 }}>
          <button onClick={() => answer(false)} style={{ flex: 1, background: "rgba(232,68,58,0.12)", border: "1px solid rgba(232,68,58,0.25)", borderRadius: 16, padding: "16px", color: "#E8443A", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Icon name="x" size={18} color="#E8443A" />
            Again
          </button>
          <button onClick={() => answer(true)} style={{ flex: 1, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 16, padding: "16px", color: "#10B981", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Icon name="check" size={18} color="#10B981" />
            Got it!
          </button>
        </div>
      )}
      {!flipped && (
        <div style={{ padding: "0 24px 40px" }}>
          <button onClick={() => setFlipped(true)} style={{ width: "100%", background: deck.color, color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", letterSpacing: "-0.3px" }}>
            Show Answer
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ nav, goBack, user, goals }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <TopBar title="Profile" onBack={goBack} showProfile={false} />
      <div style={{ padding: "16px 24px 0" }}>
        {/* Avatar + info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #E8443A, #FF6B35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#fff", boxShadow: "0 8px 30px rgba(232,68,58,0.4)" }}>
            {user.name[0]}
          </div>
          <div>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>{user.name}</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "4px 0 0" }}>Level {user.level} learner</p>
          </div>
        </div>

        {/* XP bar */}
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>Level {user.level}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{user.xp} / 3000 XP</span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
            <div style={{ height: "100%", width: `${(user.xp / 3000) * 100}%`, background: "linear-gradient(90deg, #E8443A, #FF6B35)", borderRadius: 4 }} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: "8px 0 0" }}>550 XP to Level {user.level + 1}</p>
        </div>

        {/* Badges */}
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px" }}>Achievements</p>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { icon: "zap", label: "7-day", color: "#FFB800" },
              { icon: "book", label: "100 cards", color: "#3B82F6" },
              { icon: "star", label: "First deck", color: "#E8443A" },
              { icon: "award", label: "90% score", color: "#10B981" },
            ].map(b => (
              <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${b.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={b.icon} size={18} color={b.color} />
                </div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textAlign: "center" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu items */}
        {[
          { icon: "target", label: "Learning Goals", action: () => nav("goals"), color: "#3B82F6" },
          { icon: "bell", label: "Notifications", action: () => {}, color: "#FFB800" },
          { icon: "globe", label: "Languages", action: () => nav("decks"), color: "#10B981" },
          { icon: "settings", label: "Settings", action: () => {}, color: "rgba(255,255,255,0.4)" },
        ].map(item => (
          <button key={item.label} onClick={item.action} style={{ width: "100%", background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <Icon name={item.icon} size={18} color={item.color} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: 500 }}>{item.label}</span>
            <Icon name="chevronRight" size={16} color="rgba(255,255,255,0.2)" style={{ marginLeft: "auto" }} />
          </button>
        ))}

        <button style={{ width: "100%", background: "rgba(232,68,58,0.08)", borderRadius: 14, padding: "14px 16px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, marginTop: 8, color: "#E8443A" }}>
          <Icon name="logout" size={18} color="#E8443A" />
          <span style={{ fontSize: 15, fontWeight: 500 }}>Sign out</span>
        </button>
      </div>
      <div style={{ height: 100 }} />
      <BottomNav current="profile" nav={nav} />
    </div>
  );
}

// ─── Goals Screen ─────────────────────────────────────────────────────────────
function GoalsScreen({ nav, goBack, goals, setGoals }) {
  const [local, setLocal] = useState({ ...goals });
  const save = () => { setGoals(local); goBack(); };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title="Learning Goals" onBack={goBack} showProfile={false} />
      <div style={{ flex: 1, padding: "16px 24px 0", overflowY: "auto" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 24px" }}>Set your daily and weekly targets to stay on track.</p>

        {[
          { key: "daily", label: "Daily cards goal", subtitle: "Cards to review per day", min: 5, max: 100, step: 5, color: "#E8443A" },
          { key: "weekly", label: "Weekly cards goal", subtitle: "Cards to review per week", min: 20, max: 500, step: 10, color: "#3B82F6" },
          { key: "streak", label: "Streak goal (days)", subtitle: "Target streak to maintain", min: 3, max: 365, step: 1, color: "#FFB800" },
        ].map(g => (
          <div key={g.key} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "18px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: 15, margin: 0 }}>{g.label}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: "4px 0 0" }}>{g.subtitle}</p>
              </div>
              <div style={{ background: `${g.color}20`, borderRadius: 10, padding: "6px 12px" }}>
                <span style={{ color: g.color, fontWeight: 700, fontSize: 18 }}>{local[g.key]}</span>
              </div>
            </div>
            <input type="range" min={g.min} max={g.max} step={g.step} value={local[g.key]}
              onChange={e => setLocal(l => ({ ...l, [g.key]: +e.target.value }))}
              style={{ width: "100%", accentColor: g.color }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>{g.min}</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>{g.max}</span>
            </div>
          </div>
        ))}

        <button onClick={save} style={{ width: "100%", background: "#E8443A", color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Icon name="save" size={18} />
          Save Goals
        </button>
      </div>
    </div>
  );
}

// ─── Create Card Screen ───────────────────────────────────────────────────────
function CreateCardScreen({ nav, goBack, userCards, setUserCards }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [romaji, setRomaji] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!front.trim() || !back.trim()) return;
    const card = { id: `custom_${Date.now()}`, front: front.trim(), back: back.trim(), pinyin: "", romaji: romaji.trim() };
    setUserCards(c => [...c, card]);
    setSaved(true);
    setTimeout(() => { setFront(""); setBack(""); setRomaji(""); setSaved(false); }, 1500);
  };

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px", color: "#fff", fontSize: 16, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title="Create Card" onBack={goBack} showProfile={false} />
      <div style={{ flex: 1, padding: "16px 24px 0" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 24px" }}>Cards will be added to your personal deck.</p>

        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: 20, marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px" }}>Front (Question)</p>
          <textarea value={front} onChange={e => setFront(e.target.value)} placeholder="Word or phrase..." rows={3} style={{ ...inputStyle, resize: "none" }} />
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: 20, marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px" }}>Back (Answer)</p>
          <textarea value={back} onChange={e => setBack(e.target.value)} placeholder="Translation or definition..." rows={3} style={{ ...inputStyle, resize: "none" }} />
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px" }}>Romanization (Optional)</p>
          <input value={romaji} onChange={e => setRomaji(e.target.value)} placeholder="Pronunciation guide..." style={inputStyle} />
        </div>

        <button onClick={save} style={{ width: "100%", background: saved ? "rgba(16,185,129,0.15)" : "#E8443A", border: saved ? "1px solid rgba(16,185,129,0.3)" : "none", color: saved ? "#10B981" : "#fff", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.3s" }}>
          {saved ? <><Icon name="check" size={18} color="#10B981" />Saved!</> : <><Icon name="plus" size={18} />Add Card</>}
        </button>

        {userCards.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px" }}>Your cards ({userCards.length})</p>
            {userCards.slice(-5).reverse().map(c => (
              <div key={c.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#fff", fontWeight: 600 }}>{c.front}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{c.back}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
