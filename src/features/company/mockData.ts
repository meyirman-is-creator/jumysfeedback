export interface ICompany {
  id: string;
  name: string;
  logoUrl: string;
  rating: number;
  location: string;
  industries: string[];
  size: string;
  description: string;
  overallInfo: {
    founded: string;
    revenue: string;
    mission: string;
    competitors: string[];
  };
  benefits: { title: string; description: string }[];
  interviews: {
    position: string;
    difficulty: number;
    experience: "Положительный" | "Нейтральный" | "Негативный";
    details: string;
  }[];
  reviews: {
    title: string;
    body: string;
    rating: number;
    author: string;
  }[];
  salaries: {
    position: string;
    amount: string;
  }[];
  recommended: { id: string; name: string; logoUrl: string; rating: number }[];
  topCompanies: { id: string; name: string; rating: number }[];
}

export const mockCompanies: ICompany[] = [
  {
    id: "1",
    name: "IBM",
    logoUrl: "https://blog.logomaster.ai/hs-fs/hubfs/ibm-logo-1947.jpg?width=1344&height=908&name=ibm-logo-1947.jpg",
    rating: 4.0,
    location: "Нью-Йорк, США",
    industries: ["Технологии", "Исследования"],
    size: "10000+",
    description: "IBM — одна из крупнейших в мире технологических корпораций.",
    overallInfo: {
      founded: "1911",
      revenue: ">$50 млрд",
      mission: "Создавать инновации для прогресса и развития бизнеса.",
      competitors: ["Microsoft", "Amazon", "Google"],
    },
    benefits: [
      {
        title: "Медицинская страховка",
        description: "Полный пакет для сотрудников.",
      },
      { title: "Гибкий график", description: "Возможность работать удалённо." },
    ],
    interviews: [
      {
        position: "Software Engineer",
        difficulty: 3.2,
        experience: "Положительный",
        details: "Три раунда: телефон, технический и HR.",
      },
    ],
    reviews: [
      {
        title: "Отличное место",
        body: "Большие возможности для карьерного роста.",
        rating: 5,
        author: "Инженер",
      },
    ],
    salaries: [
      { position: "Software Engineer", amount: "4000 USD/мес" },
      { position: "Data Scientist", amount: "4500 USD/мес" },
    ],
    recommended: [
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "2",
    name: "Google",
    logoUrl: "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg",
    rating: 4.3,
    location: "Маунтин-Вью, США",
    industries: ["Интернет", "Реклама", "ПО"],
    size: "10000+",
    description: "Google — мировой лидер в сфере интернет-технологий.",
    overallInfo: {
      founded: "1998",
      revenue: ">$200 млрд",
      mission: "Упорядочить мировую информацию и сделать её доступной.",
      competitors: ["Microsoft", "Amazon", "Meta"],
    },
    benefits: [
      {
        title: "Бесплатное питание",
        description: "Разнообразные кафе на кампусе.",
      },
      {
        title: "Спортзал",
        description: "Тренажёрные залы и бассейн на территории.",
      },
    ],
    interviews: [
      {
        position: "Product Manager",
        difficulty: 4.0,
        experience: "Положительный",
        details: "Сложные вопросы по продукту и стратегии.",
      },
    ],
    reviews: [
      {
        title: "Инновации и культура",
        body: "Отличный коллектив, быстро меняющаяся среда.",
        rating: 4,
        author: "Менеджер",
      },
    ],
    salaries: [{ position: "Software Engineer", amount: "5000 USD/мес" }],
    recommended: [
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "3",
    name: "Microsoft",
    logoUrl: "https://pub-f8c0307ce82b4885975558b04e13a858.r2.dev/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg",
    rating: 4.2,
    location: "Редмонд, США",
    industries: ["ПО", "Облачные решения"],
    size: "10000+",
    description:
      "Microsoft — глобальная корпорация, создающая ПО и облачные сервисы.",
    overallInfo: {
      founded: "1975",
      revenue: ">$150 млрд",
      mission: "Раскрыть потенциал каждого человека и каждой организации.",
      competitors: ["Google", "Amazon", "Apple"],
    },
    benefits: [
      {
        title: "Оплата обучения",
        description: "Компенсация курсов и сертификаций.",
      },
      {
        title: "ДМС",
        description: "Расширенная мед.страховка для сотрудника и семьи.",
      },
    ],
    interviews: [
      {
        position: "Data Analyst",
        difficulty: 3.5,
        experience: "Положительный",
        details: "Вопросы по SQL, Power BI и бизнес-логике.",
      },
    ],
    reviews: [
      {
        title: "Корпоративная культура",
        body: "Хорошие возможности обучения, но процесс может быть бюрократичным.",
        rating: 4,
        author: "Аналитик",
      },
    ],
    salaries: [{ position: "Data Analyst", amount: "4200 USD/мес" }],
    recommended: [
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "4",
    name: "Apple",
    logoUrl: "https://graphicsprings.com/wp-content/uploads/2023/07/image-58-1024x512.png.webp",
    rating: 4.1,
    location: "Купертино, США",
    industries: ["ПО", "Аппаратное обеспечение"],
    size: "10000+",
    description: "Apple — компания, меняющая подход к технологиям и дизайну.",
    overallInfo: {
      founded: "1976",
      revenue: ">$200 млрд",
      mission: "Создавать лучшие устройства и ПО для улучшения жизни людей.",
      competitors: ["Samsung", "Microsoft", "Google"],
    },
    benefits: [
      {
        title: "Скидки на продукцию",
        description: "Специальные цены для сотрудников.",
      },
      { title: "Пакет здоровья", description: "Страховка, спорт, отдых." },
    ],
    interviews: [
      {
        position: "UI/UX Designer",
        difficulty: 3.7,
        experience: "Положительный",
        details: "Тестовое задание и оценка портфолио.",
      },
    ],
    reviews: [
      {
        title: "Стремление к совершенству",
        body: "Высокие требования, но и большие награды.",
        rating: 5,
        author: "Дизайнер",
      },
    ],
    salaries: [{ position: "UI/UX Designer", amount: "4500 USD/мес" }],
    recommended: [
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
      {
        id: "5",
        name: "JPMorganChase",
        logoUrl: "/images/jpmc.png",
        rating: 4.0,
      },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "5",
    name: "JPMorganChase",
    logoUrl: "https://logos-world.net/wp-content/uploads/2024/10/JPMorgan-Chase-Symbol-500x281.png",
    rating: 4.0,
    location: "Нью-Йорк, США",
    industries: ["Финансы", "Банковское дело"],
    size: "10000+",
    description:
      "JPMorganChase — один из крупнейших финансовых конгломератов мира.",
    overallInfo: {
      founded: "1799",
      revenue: ">$100 млрд",
      mission:
        "Инновации в банковской сфере и обслуживание глобальных клиентов.",
      competitors: ["Bank of America", "Wells Fargo", "Goldman Sachs"],
    },
    benefits: [
      {
        title: "Пенсионные накопления",
        description: "Программа 401(k) и дополнительные бонусы.",
      },
    ],
    interviews: [
      {
        position: "Associate Consultant",
        difficulty: 3.0,
        experience: "Положительный",
        details: "Три раунда: резюме-скрининг, технический и HR.",
      },
    ],
    reviews: [
      {
        title: "Хороший банк",
        body: "Надёжная структура, но много бюрократии.",
        rating: 4,
        author: "Консультант",
      },
    ],
    salaries: [{ position: "Associate Consultant", amount: "3800 USD/мес" }],
    recommended: [
      { id: "6", name: "Cisco", logoUrl: "/images/cisco.png", rating: 4.1 },
      { id: "7", name: "Meta", logoUrl: "/images/meta.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "6",
    name: "Cisco",
    logoUrl: "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo-1024x540.png",
    rating: 4.1,
    location: "Сан-Хосе, США",
    industries: ["Сетевые технологии"],
    size: "10000+",
    description:
      "Cisco — мировой лидер в сфере сетевых и коммуникационных решений.",
    overallInfo: {
      founded: "1984",
      revenue: ">$40 млрд",
      mission: "Развитие интернета и коммуникаций для всех.",
      competitors: ["Juniper", "Huawei", "Arista"],
    },
    benefits: [
      {
        title: "Удалённая работа",
        description: "Возможность работать из любой точки мира.",
      },
    ],
    interviews: [
      {
        position: "Network Engineer",
        difficulty: 3.4,
        experience: "Положительный",
        details: "Вопросы по протоколам и настройке оборудования.",
      },
    ],
    reviews: [
      {
        title: "Отличная компания",
        body: "Внимание к развитию сотрудников, гибкие условия труда.",
        rating: 5,
        author: "Инженер",
      },
    ],
    salaries: [{ position: "Network Engineer", amount: "4000 USD/мес" }],
    recommended: [
      {
        id: "5",
        name: "JPMorganChase",
        logoUrl: "/images/jpmc.png",
        rating: 4.0,
      },
      { id: "7", name: "Meta", logoUrl: "/images/meta.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "7",
    name: "Meta",
    logoUrl: "https://static.dezeen.com/uploads/2021/11/meta-facebook-rebranding-name-news_dezeen_2364_col_hero2-1704x735.jpg",
    rating: 4.0,
    location: "Менло-Парк, США",
    industries: ["Социальные сети", "Реклама"],
    size: "10000+",
    description: "Meta — компания, стоящая за Facebook, Instagram и WhatsApp.",
    overallInfo: {
      founded: "2004",
      revenue: ">$100 млрд",
      mission: "Соединять людей и сообщества по всему миру.",
      competitors: ["Google", "Snap", "TikTok"],
    },
    benefits: [
      {
        title: "Оплата обедов",
        description: "Кофейни и рестораны с бесплатными блюдами.",
      },
      {
        title: "Поддержка семей",
        description: "Отпуск по уходу за ребёнком и бонусы.",
      },
    ],
    interviews: [
      {
        position: "Frontend Engineer",
        difficulty: 3.9,
        experience: "Положительный",
        details: "Алгоритмы, структуры данных и вопросы по React.",
      },
    ],
    reviews: [
      {
        title: "Динамично и интересно",
        body: "Очень быстро развивающаяся среда, стрессоустойчивость обязательна.",
        rating: 4,
        author: "Разработчик",
      },
    ],
    salaries: [{ position: "Frontend Engineer", amount: "4800 USD/мес" }],
    recommended: [
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "8",
    name: "Amazon",
    logoUrl: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png-1.webp",
    rating: 3.6,
    location: "Сиэтл, США",
    industries: ["Электронная коммерция", "Облачные сервисы"],
    size: "10000+",
    description: "Amazon — крупнейший онлайн-ритейлер и лидер в AWS-области.",
    overallInfo: {
      founded: "1994",
      revenue: ">$450 млрд",
      mission: "Быть самой клиентоориентированной компанией в мире.",
      competitors: ["Microsoft", "Google", "Alibaba"],
    },
    benefits: [
      {
        title: "Складские скидки",
        description: "Специальные цены для сотрудников.",
      },
    ],
    interviews: [
      {
        position: "Operations Manager",
        difficulty: 3.8,
        experience: "Нейтральный",
        details: "Поведенческие вопросы по Leadership Principles.",
      },
    ],
    reviews: [
      {
        title: "Высокие темпы работы",
        body: "Много задач, быстрый ритм, но хорошая оплата.",
        rating: 4,
        author: "Менеджер",
      },
    ],
    salaries: [{ position: "Operations Manager", amount: "4600 USD/мес" }],
    recommended: [
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "9",
    name: "Oracle",
    logoUrl: "https://1000logos.net/wp-content/uploads/2017/04/Oracle-Logo-1-1536x864.png",
    rating: 3.8,
    location: "Остин, США",
    industries: ["Базы данных", "Облачные решения"],
    size: "10000+",
    description: "Oracle — разработчик СУБД и поставщик корпоративного ПО.",
    overallInfo: {
      founded: "1977",
      revenue: ">$40 млрд",
      mission: "Создавать инновации в сфере управления данными и облаков.",
      competitors: ["SAP", "IBM", "Microsoft"],
    },
    benefits: [
      {
        title: "Стабильность",
        description: "Крупная компания с долгой историей.",
      },
    ],
    interviews: [
      {
        position: "Database Administrator",
        difficulty: 3.6,
        experience: "Положительный",
        details: "Вопросы по SQL, Oracle DB и оптимизации.",
      },
    ],
    reviews: [
      {
        title: "Хороший соцпакет",
        body: "Есть возможности для развития, но менее гибко, чем в стартапах.",
        rating: 4,
        author: "Администратор",
      },
    ],
    salaries: [{ position: "Database Administrator", amount: "4100 USD/мес" }],
    recommended: [
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "10",
    name: "HP Inc.",
    logoUrl: "https://1000logos.net/wp-content/uploads/2017/02/HP-Logo-1954.jpg",
    rating: 3.6,
    location: "Пало-Альто, США",
    industries: ["Аппаратное обеспечение", "ПО"],
    size: "10000+",
    description:
      "HP — производитель персональных компьютеров, принтеров и решений для бизнеса.",
    overallInfo: {
      founded: "1939",
      revenue: ">$50 млрд",
      mission: "Упрощать технологии и улучшать жизнь пользователей.",
      competitors: ["Dell", "Lenovo", "Canon"],
    },
    benefits: [
      {
        title: "Скидки на продукцию",
        description: "Принтеры и лэптопы по специальной цене.",
      },
    ],
    interviews: [
      {
        position: "Sales Specialist",
        difficulty: 3.2,
        experience: "Нейтральный",
        details: "Вопросы по продажам и пониманию рынка.",
      },
    ],
    reviews: [
      {
        title: "Дружелюбная атмосфера",
        body: "Коллеги всегда помогают, но карьерный рост может быть медленным.",
        rating: 3,
        author: "Специалист",
      },
    ],
    salaries: [{ position: "Sales Specialist", amount: "3500 USD/мес" }],
    recommended: [
      { id: "9", name: "Oracle", logoUrl: "/images/oracle.png", rating: 3.8 },
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "11",
    name: "Akvelon",
    logoUrl: "https://old.roi4cio.com/fileadmin/user_upload/Akvelon__logo_.png",
    rating: 3.7,
    location: "Сиэтл, США",
    industries: ["Консалтинг", "Разработка ПО"],
    size: "1001-5000",
    description:
      "Akvelon — IT-консалтинг, помогающий клиентам решать бизнес-задачи.",
    overallInfo: {
      founded: "2000",
      revenue: "$200 млн",
      mission: "Помогать предприятиям масштабировать разработки и инновации.",
      competitors: ["Avanade", "Accenture"],
    },
    benefits: [
      {
        title: "Гибкая система отпусков",
        description: "Обсуждается индивидуально.",
      },
    ],
    interviews: [
      {
        position: "Consultant",
        difficulty: 3.0,
        experience: "Нейтральный",
        details: "Стандартные вопросы о прошлом опыте и технологиях.",
      },
    ],
    reviews: [
      {
        title: "Разноплановые проекты",
        body: "Хорошо для стартовой позиции, но много аутсорса.",
        rating: 3,
        author: "Консультант",
      },
    ],
    salaries: [{ position: "Consultant", amount: "3000 USD/мес" }],
    recommended: [
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "12",
    name: "Robert Bosch",
    logoUrl: "https://1000logos.net/wp-content/uploads/2016/10/Bosch-Logo-1024x640.png",
    rating: 3.8,
    location: "Герлинген, Германия",
    industries: ["Инжиниринг", "Производство"],
    size: "10000+",
    description: "Bosch — международный поставщик технологий и услуг.",
    overallInfo: {
      founded: "1886",
      revenue: ">$80 млрд",
      mission: "Развитие инженерных решений, улучшающих качество жизни.",
      competitors: ["Siemens", "Honeywell"],
    },
    benefits: [
      {
        title: "Корпоративная культура",
        description: "Сильный акцент на R&D.",
      },
    ],
    interviews: [
      {
        position: "Mechanical Engineer",
        difficulty: 3.3,
        experience: "Положительный",
        details: "Технические вопросы по проектированию и механике.",
      },
    ],
    reviews: [
      {
        title: "Отличная инженерная школа",
        body: "Хорошие проекты, много обучающих программ.",
        rating: 4,
        author: "Инженер",
      },
    ],
    salaries: [{ position: "Mechanical Engineer", amount: "3800 USD/мес" }],
    recommended: [
      {
        id: "15",
        name: "Honeywell",
        logoUrl: "/images/honeywell.png",
        rating: 3.9,
      },
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "13",
    name: "Honeywell",
    logoUrl: "https://1000logos.net/wp-content/uploads/2017/12/Honeywell-Logo.png",
    rating: 3.9,
    location: "Шарлотт, США",
    industries: ["Инжиниринг", "Авионика", "Автоматизация"],
    size: "10000+",
    description:
      "Honeywell — глобальная компания с широким портфелем технологий и решений.",
    overallInfo: {
      founded: "1906",
      revenue: ">$30 млрд",
      mission: "Интеллектуальные решения в области авиации и автоматизации.",
      competitors: ["Siemens", "Bosch", "GE"],
    },
    benefits: [
      {
        title: "Страховка и бонусы",
        description: "Полный пакет медстраховки и бонусная система.",
      },
    ],
    interviews: [
      {
        position: "Automation Engineer",
        difficulty: 3.5,
        experience: "Положительный",
        details: "Вопросы по контроллерам, системам автоматизации и PLC.",
      },
    ],
    reviews: [
      {
        title: "Сильная техподдержка",
        body: "Хорошие возможности для инженеров, иногда много бюрократии.",
        rating: 4,
        author: "Автоматизатор",
      },
    ],
    salaries: [{ position: "Automation Engineer", amount: "4000 USD/мес" }],
    recommended: [
      {
        id: "12",
        name: "Robert Bosch",
        logoUrl: "/images/bosch.png",
        rating: 3.8,
      },
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
    ],
    topCompanies: [
      { id: "14", name: "Robert Bosch", rating: 3.8 },
      { id: "15", name: "Honeywell", rating: 3.9 },
    ],
  },
  {
    id: "14",
    name: "Robert Bosch",
    logoUrl: "https://1000logos.net/wp-content/uploads/2016/10/Bosch-Logo-1024x640.png",
    rating: 3.8,
    location: "Дублируется для демонстрации",
    industries: ["Инжиниринг"],
    size: "10000+",
    description: "Дублированная запись для примера в списке Top Companies.",
    overallInfo: {
      founded: "1886",
      revenue: ">$80 млрд",
      mission: "Продвинутые инженерные решения.",
      competitors: ["Siemens"],
    },
    benefits: [],
    interviews: [],
    reviews: [],
    salaries: [],
    recommended: [],
    topCompanies: [],
  },
  {
    id: "15",
    name: "Honeywell",
    logoUrl: "https://1000logos.net/wp-content/uploads/2017/12/Honeywell-Logo.png",
    rating: 3.9,
    location: "Дублируется для демонстрации",
    industries: ["Инжиниринг"],
    size: "10000+",
    description: "Дублированная запись для примера в списке Top Companies.",
    overallInfo: {
      founded: "1906",
      revenue: ">$30 млрд",
      mission: "Решения в области автоматизации.",
      competitors: ["Bosch"],
    },
    benefits: [],
    interviews: [],
    reviews: [],
    salaries: [],
    recommended: [],
    topCompanies: [],
  },
];
