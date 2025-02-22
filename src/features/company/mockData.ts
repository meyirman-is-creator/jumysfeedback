export interface ICompany {
  id: string;
  name: string;
  logoUrl: string;
  bannerImg: string;
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
    logoUrl:
      "https://blog.logomaster.ai/hs-fs/hubfs/ibm-logo-1947.jpg?width=1344&height=908&name=ibm-logo-1947.jpg",
    bannerImg:
      "https://libg.s3.us-east-2.amazonaws.com/download/IBM-Headquarters.jpg",
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
      {
        title: "Оплачиваемый отпуск",
        description: "Стандартный отпуск 28 дней + больничные.",
      },
    ],
    interviews: [
      {
        position: "Software Engineer",
        difficulty: 3.2,
        experience: "Положительный",
        details: "Три раунда: телефон, технический и HR.",
      },
      {
        position: "Advisory Engineer",
        difficulty: 3.5,
        experience: "Положительный",
        details:
          "Вопросы о предыдущем опыте, взаимодействии с менеджментом и гибкость графика.",
      },
    ],
    reviews: [
      {
        title: "Отличное место",
        body: "Большие возможности для карьерного роста.",
        rating: 5,
        author: "Инженер",
      },
      {
        title: "Старая школа",
        body: "Много бюрократии, но в целом стабильная компания.",
        rating: 4,
        author: "Сотрудник",
      },
      {
        title: "Высокая конкуренция",
        body: "Система оценок сотрудников строгая, многие попадают в “средние”.",
        rating: 3,
        author: "DevOps",
      },
    ],
    salaries: [
      { position: "Software Engineer", amount: "4000 USD/мес" },
      { position: "Data Scientist", amount: "4500 USD/мес" },
      { position: "Senior Consultant", amount: "5000 USD/мес" },
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "2",
    name: "Google",
    logoUrl: "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg",
    bannerImg:
      "https://tweenui.com/blog/wp-content/uploads/2019/02/google-1024x523@2x.jpg",
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
      {
        title: "Стажировки",
        description: "Программы для студентов и выпускников.",
      },
    ],
    interviews: [
      {
        position: "Product Manager",
        difficulty: 4.0,
        experience: "Положительный",
        details: "Сложные вопросы по продукту и стратегии.",
      },
      {
        position: "Software Engineer",
        difficulty: 4.2,
        experience: "Положительный",
        details: "Алгоритмы, структуры данных, вопросы о масштабируемости.",
      },
    ],
    reviews: [
      {
        title: "Инновации и культура",
        body: "Отличный коллектив, быстро меняющаяся среда.",
        rating: 4,
        author: "Менеджер",
      },
      {
        title: "Высокие ожидания",
        body: "Давление велико, но условия и компенсации отличные.",
        rating: 5,
        author: "Разработчик",
      },
    ],
    salaries: [
      { position: "Software Engineer", amount: "5000 USD/мес" },
      { position: "Data Analyst", amount: "4200 USD/мес" },
      { position: "UX Designer", amount: "4800 USD/мес" },
    ],
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "3",
    name: "Microsoft",
    logoUrl:
      "https://pub-f8c0307ce82b4885975558b04e13a858.r2.dev/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg",
    bannerImg:
      "https://www.keysys.com/wp-content/uploads/2015/12/Microsoft-Banner.png",
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
      {
        title: "Акции компании",
        description: "ESPP и RSU программы для сотрудников.",
      },
    ],
    interviews: [
      {
        position: "Data Analyst",
        difficulty: 3.5,
        experience: "Положительный",
        details: "Вопросы по SQL, Power BI и бизнес-логике.",
      },
      {
        position: "Software Developer",
        difficulty: 3.8,
        experience: "Положительный",
        details: "Технические задачи на алгоритмы, вопросы по C# и Azure.",
      },
    ],
    reviews: [
      {
        title: "Корпоративная культура",
        body: "Хорошие возможности обучения, но процесс может быть бюрократичным.",
        rating: 4,
        author: "Аналитик",
      },
      {
        title: "Отличная команда",
        body: "Работать интересно, продукты мирового уровня.",
        rating: 5,
        author: "Разработчик",
      },
    ],
    salaries: [
      { position: "Data Analyst", amount: "4200 USD/мес" },
      { position: "Backend Developer", amount: "4500 USD/мес" },
      { position: "Solution Architect", amount: "6000 USD/мес" },
    ],
    recommended: [
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
    ],
    topCompanies: [
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "4",
    name: "Apple",
    logoUrl:
      "https://graphicsprings.com/wp-content/uploads/2023/07/image-58-1024x512.png.webp",
    bannerImg:
      "https://connect-assets.prosple.com/cdn/ff/O2IMzWy_ZQkq0aW_tm81Ra48iSWtGl2yKJzEepiUDf8/1654605318/public/styles/scale_and_crop_center_890x320/public/2022-06/banner-apple-india-1786x642-2022.jpg?itok=MnVgguSR",
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
      { title: "ESPP", description: "Программа покупки акций со скидкой." },
    ],
    interviews: [
      {
        position: "UI/UX Designer",
        difficulty: 3.7,
        experience: "Положительный",
        details: "Тестовое задание и оценка портфолио.",
      },
      {
        position: "Hardware Engineer",
        difficulty: 4.0,
        experience: "Положительный",
        details: "Глубокие вопросы по схемотехнике и системному дизайну.",
      },
    ],
    reviews: [
      {
        title: "Стремление к совершенству",
        body: "Высокие требования, но и большие награды.",
        rating: 5,
        author: "Дизайнер",
      },
      {
        title: "Много работы",
        body: "Иногда переработки, но проекты всемирно известны.",
        rating: 4,
        author: "Инженер",
      },
    ],
    salaries: [
      { position: "UI/UX Designer", amount: "4500 USD/мес" },
      { position: "Hardware Engineer", amount: "5500 USD/мес" },
    ],
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "5",
    name: "JPMorganChase",
    logoUrl:
      "https://logos-world.net/wp-content/uploads/2024/10/JPMorgan-Chase-Symbol-500x281.png",
    bannerImg:
      "https://www.boldbusiness.com/wp-content/uploads/2019/02/JPMorgan-Chase_Featured-Image.jpg",
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
        description: "Программа 401(k) + бонусы.",
      },
      {
        title: "Страхование жизни",
        description: "Групповое страхование для сотрудников.",
      },
    ],
    interviews: [
      {
        position: "Associate Consultant",
        difficulty: 3.0,
        experience: "Положительный",
        details: "Три раунда: резюме-скрининг, технический и HR.",
      },
      {
        position: "Investment Analyst",
        difficulty: 3.5,
        experience: "Нейтральный",
        details: "Вопросы по финансовому анализу и кейсы по рынку капитала.",
      },
    ],
    reviews: [
      {
        title: "Хороший банк",
        body: "Надёжная структура, но много бюрократии.",
        rating: 4,
        author: "Консультант",
      },
      {
        title: "Карьерный рост",
        body: "Продвижение внутри компании требует больших усилий.",
        rating: 4,
        author: "Аналитик",
      },
    ],
    salaries: [
      { position: "Associate Consultant", amount: "3800 USD/мес" },
      { position: "Investment Analyst", amount: "5000 USD/мес" },
    ],
    recommended: [
      { id: "6", name: "Cisco", logoUrl: "/images/cisco.png", rating: 4.1 },
      { id: "7", name: "Meta", logoUrl: "/images/meta.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "6",
    name: "Cisco",
    logoUrl:
      "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo-1024x540.png",
    bannerImg:
      "http://stevehardie.com/wp-content/uploads/2016/02/cisco-banner.jpg",
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
      {
        title: "Субсидия на обучение",
        description: "Возмещение части расходов на курсы.",
      },
    ],
    interviews: [
      {
        position: "Network Engineer",
        difficulty: 3.4,
        experience: "Положительный",
        details: "Вопросы по протоколам и настройке оборудования.",
      },
      {
        position: "DevOps Engineer",
        difficulty: 3.6,
        experience: "Положительный",
        details: "Кейсы по CI/CD, Docker, Kubernetes.",
      },
    ],
    reviews: [
      {
        title: "Отличная компания",
        body: "Внимание к развитию сотрудников, гибкие условия труда.",
        rating: 5,
        author: "Инженер",
      },
      {
        title: "Сложные задачи",
        body: "Иногда приходится работать в выходные, если есть срочные проекты.",
        rating: 4,
        author: "DevOps",
      },
    ],
    salaries: [
      { position: "Network Engineer", amount: "4000 USD/мес" },
      { position: "DevOps Engineer", amount: "4500 USD/мес" },
    ],
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "7",
    name: "Meta",
    logoUrl:
      "https://static.dezeen.com/uploads/2021/11/meta-facebook-rebranding-name-news_dezeen_2364_col_hero2-1704x735.jpg",
    bannerImg:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-6/250030516_10165060777571337_4513794379224036627_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ma6WL9bSt4gQ7kNvgEL1GlR&_nc_oc=Adhdj91FJjIndJ6ISPliCA_ejRqbRrwtyKYZ3yVsK4XPD3WOJVebHH9RH1MtafXxG9c&_nc_zt=23&_nc_ht=scontent.fala4-1.fna&_nc_gid=AzyLS3Jo6qUXaOw4vz7S1m2&oh=00_AYA0CTf0b-_zX40vmsWI7D1S9IVT6oIuI026m7m70Xnu5w&oe=67BF9C2F",
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
      {
        position: "Data Scientist",
        difficulty: 3.8,
        experience: "Положительный",
        details: "Вопросы по статистике, Machine Learning и A/B тестам.",
      },
    ],
    reviews: [
      {
        title: "Динамично и интересно",
        body: "Очень быстро развивающаяся среда, стрессоустойчивость обязательна.",
        rating: 4,
        author: "Разработчик",
      },
      {
        title: "Хорошие льготы",
        body: "Компенсации отличные, но много переработок.",
        rating: 4,
        author: "Аналитик",
      },
    ],
    salaries: [
      { position: "Frontend Engineer", amount: "4800 USD/мес" },
      { position: "Data Scientist", amount: "5200 USD/мес" },
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "8",
    name: "Amazon",
    logoUrl:
      "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png-1.webp",
    bannerImg:
      "https://businessreviewlive.com/wp-content/uploads/2022/05/Untitled-design-min-29.png",
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
      {
        title: "Расширенные бенефиты",
        description: "Дополнительное покрытие здоровья.",
      },
    ],
    interviews: [
      {
        position: "Operations Manager",
        difficulty: 3.8,
        experience: "Нейтральный",
        details: "Поведенческие вопросы по Leadership Principles.",
      },
      {
        position: "Software Engineer",
        difficulty: 4.0,
        experience: "Положительный",
        details: "Много вопросов о микросервисах, AWS, масштабировании.",
      },
    ],
    reviews: [
      {
        title: "Высокие темпы работы",
        body: "Много задач, быстрый ритм, но хорошая оплата.",
        rating: 4,
        author: "Менеджер",
      },
      {
        title: "Давление на результат",
        body: "Могут быть долгие смены, но карьерные возможности огромны.",
        rating: 3,
        author: "Сотрудник",
      },
    ],
    salaries: [
      { position: "Operations Manager", amount: "4600 USD/мес" },
      { position: "Software Engineer", amount: "4800 USD/мес" },
    ],
    recommended: [
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
    ],
    topCompanies: [
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "9",
    name: "Oracle",
    logoUrl:
      "https://1000logos.net/wp-content/uploads/2017/04/Oracle-Logo-1-1536x864.png",
    bannerImg:
      "https://imageio.forbes.com/specials-images/imageserve/6202af41f8def65659f919e8/Oracle/960x0.jpg?format=jpg&width=1440",
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
      {
        title: "Корпоративное обучение",
        description: "Доступ к Oracle Academy и др. платформам.",
      },
    ],
    interviews: [
      {
        position: "Database Administrator",
        difficulty: 3.6,
        experience: "Положительный",
        details: "Вопросы по SQL, Oracle DB и оптимизации.",
      },
      {
        position: "Cloud Architect",
        difficulty: 3.8,
        experience: "Положительный",
        details: "Архитектура облачных решений, Terraform, Ansible.",
      },
    ],
    reviews: [
      {
        title: "Хороший соцпакет",
        body: "Есть возможности для развития, но менее гибко, чем в стартапах.",
        rating: 4,
        author: "Администратор",
      },
      {
        title: "Стабильный рост",
        body: "Компания не очень быстрая, но даёт хорошую базу.",
        rating: 4,
        author: "Архитектор",
      },
    ],
    salaries: [
      { position: "Database Administrator", amount: "4100 USD/мес" },
      { position: "Cloud Architect", amount: "5500 USD/мес" },
    ],
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "10",
    name: "HP Inc.",
    logoUrl:
      "https://1000logos.net/wp-content/uploads/2017/02/HP-Logo-1954.jpg",
    bannerImg:
      "https://www.ict-news.org/wp-content/uploads/2017/02/banner1.jpg",
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
      {
        title: "Здоровье и спорт",
        description: "Частичная оплата спортзала и страховки.",
      },
    ],
    interviews: [
      {
        position: "Sales Specialist",
        difficulty: 3.2,
        experience: "Нейтральный",
        details: "Вопросы по продажам и пониманию рынка.",
      },
      {
        position: "Software Developer",
        difficulty: 3.5,
        experience: "Положительный",
        details:
          "C++, Java, вопросы про драйвера и системное программирование.",
      },
    ],
    reviews: [
      {
        title: "Дружелюбная атмосфера",
        body: "Коллеги всегда помогают, но карьерный рост может быть медленным.",
        rating: 3,
        author: "Специалист",
      },
      {
        title: "Стабильная компания",
        body: "Неплохие бенефиты, но мало инноваций.",
        rating: 4,
        author: "Разработчик",
      },
    ],
    salaries: [
      { position: "Sales Specialist", amount: "3500 USD/мес" },
      { position: "Software Developer", amount: "4000 USD/мес" },
    ],
    recommended: [
      { id: "9", name: "Oracle", logoUrl: "/images/oracle.png", rating: 3.8 },
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "11",
    name: "Akvelon",
    logoUrl: "https://old.roi4cio.com/fileadmin/user_upload/Akvelon__logo_.png",
    bannerImg:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-6/300026171_454455083362988_8579564377298983445_n.png?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=acbBuFtWAEoQ7kNvgFeHqM_&_nc_oc=Adhb4IEQj8WFco4446Q7xI1HsJEIs1Hp-ZWpzgxt-tVsx7pZbRHJ-EQlmU_oNfaJSvE&_nc_zt=23&_nc_ht=scontent.fala4-1.fna&_nc_gid=AfsJhiFKeuiJrn6d9csfjNR&oh=00_AYDx28LvWz09ykiWfvKFjgUYo6ej1A3kCeX62QgsEQEdXA&oe=67BF9FF4",
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
      { title: "English courses", description: "Занятия с носителями языка." },
    ],
    interviews: [
      {
        position: "Consultant",
        difficulty: 3.0,
        experience: "Нейтральный",
        details: "Стандартные вопросы о прошлом опыте и технологиях.",
      },
      {
        position: "Project Manager",
        difficulty: 3.2,
        experience: "Положительный",
        details: "Кейсы по управлению командами, Scrum, Kanban.",
      },
    ],
    reviews: [
      {
        title: "Разноплановые проекты",
        body: "Хорошо для стартовой позиции, но много аутсорса.",
        rating: 3,
        author: "Консультант",
      },
      {
        title: "Удалённая работа",
        body: "Можно работать из дома, главное — соблюдать дедлайны.",
        rating: 4,
        author: "PM",
      },
    ],
    salaries: [
      { position: "Consultant", amount: "3000 USD/мес" },
      { position: "Project Manager", amount: "4200 USD/мес" },
    ],
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "12",
    name: "Robert Bosch",
    logoUrl:
      "https://1000logos.net/wp-content/uploads/2016/10/Bosch-Logo-1024x640.png",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-6/468209014_10162394936887359_5550146038813800460_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=2285d6&_nc_ohc=ObYK6AwnYkIQ7kNvgHBHXDC&_nc_oc=Adj0md_qLKnJ2kAxmwS3yTPuq_nHJPnV8vqt584-YNgvqgKTmYH7KDidZVebrZ4ApFY&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=AYf3OAnHUjn_IxecPfpDfIe&oh=00_AYAflr3cBAC3vidT8Kp-h6ztMK4GSL0YPgFXSQNleXkuhQ&oe=67BFAC4F",
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
      {
        title: "Стажировки за рубежом",
        description: "Возможность работать в офисах по всему миру.",
      },
    ],
    interviews: [
      {
        position: "Mechanical Engineer",
        difficulty: 3.3,
        experience: "Положительный",
        details: "Технические вопросы по проектированию и механике.",
      },
      {
        position: "Embedded Developer",
        difficulty: 3.6,
        experience: "Положительный",
        details: "C, C++, RTOS, вопросы по автомобильным стандартам.",
      },
    ],
    reviews: [
      {
        title: "Отличная инженерная школа",
        body: "Хорошие проекты, много обучающих программ.",
        rating: 4,
        author: "Инженер",
      },
      {
        title: "Распределённые команды",
        body: "Много международных команд, нужно часто общаться на английском.",
        rating: 4,
        author: "Developer",
      },
    ],
    salaries: [
      { position: "Mechanical Engineer", amount: "3800 USD/мес" },
      { position: "Embedded Developer", amount: "4000 USD/мес" },
    ],
    recommended: [
      {
        id: "15",
        name: "Honeywell Int",
        logoUrl: "/images/honeywell.png",
        rating: 3.9,
      },
      { id: "1", name: "IBM", logoUrl: "/images/ibm.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "13",
    name: "Honeywell",
    logoUrl:
      "https://1000logos.net/wp-content/uploads/2017/12/Honeywell-Logo.png",
    bannerImg:
      "https://peigroup.com/wp-content/uploads/Honeywell-Banner-768x360.jpg",
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
      {
        title: "Корпоративное обучение",
        description: "Курсы по промышленной автоматизации.",
      },
    ],
    interviews: [
      {
        position: "Automation Engineer",
        difficulty: 3.5,
        experience: "Положительный",
        details: "Вопросы по контроллерам, системам автоматизации и PLC.",
      },
      {
        position: "Project Engineer",
        difficulty: 3.7,
        experience: "Положительный",
        details: "Расскажите о проектах по оптимизации, Lean, Six Sigma.",
      },
    ],
    reviews: [
      {
        title: "Сильная техподдержка",
        body: "Хорошие возможности для инженеров, иногда много бюрократии.",
        rating: 4,
        author: "Автоматизатор",
      },
      {
        title: "Инновации в автоматизации",
        body: "Есть интересные решения, но проекты могут затягиваться.",
        rating: 4,
        author: "Инженер",
      },
    ],
    salaries: [
      { position: "Automation Engineer", amount: "4000 USD/мес" },
      { position: "Project Engineer", amount: "4500 USD/мес" },
    ],
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
      { id: "14", name: "Bosch Mobility", rating: 3.8 },
      { id: "15", name: "Honeywell Int", rating: 3.9 },
    ],
  },
  {
    id: "14",
    name: "Bosch Mobility",
    logoUrl:
      "https://1000logos.net/wp-content/uploads/2016/10/Bosch-Logo-1024x640.png",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-6/468209014_10162394936887359_5550146038813800460_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=2285d6&_nc_ohc=ObYK6AwnYkIQ7kNvgHBHXDC&_nc_oc=Adj0md_qLKnJ2kAxmwS3yTPuq_nHJPnV8vqt584-YNgvqgKTmYH7KDidZVebrZ4ApFY&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=AYf3OAnHUjn_IxecPfpDfIe&oh=00_AYAflr3cBAC3vidT8Kp-h6ztMK4GSL0YPgFXSQNleXkuhQ&oe=67BFAC4F",
    rating: 3.8,
    location: "Штутгарт, Германия",
    industries: ["Инжиниринг", "Электромобильность"],
    size: "10000+",
    description:
      "Bosch Mobility — новое подразделение фокусируется на решениях для транспорта.",
    overallInfo: {
      founded: "1886",
      revenue: ">$80 млрд",
      mission: "Продвинутые инженерные решения для мобильности.",
      competitors: ["Siemens", "Conti"],
    },
    benefits: [
      { title: "Гибкий график", description: "Частичная удалённая работа." },
      {
        title: "Корпоративный транспорт",
        description: "Электробусы для сотрудников.",
      },
    ],
    interviews: [
      {
        position: "R&D Engineer",
        difficulty: 3.4,
        experience: "Нейтральный",
        details: "Вопросы о предыдущих проектах, научном подходе.",
      },
    ],
    reviews: [
      {
        title: "Инновационные проекты",
        body: "Есть ограничения из-за большой структуры, но много R&D.",
        rating: 4,
        author: "Инженер",
      },
    ],
    salaries: [{ position: "R&D Engineer", amount: "3700 USD/мес" }],
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
      { id: "2", name: "Google", rating: 4.3 },
      { id: "8", name: "Amazon", rating: 3.6 },
    ],
  },
  {
    id: "15",
    name: "Honeywell Int",
    logoUrl:
      "https://1000logos.net/wp-content/uploads/2017/12/Honeywell-Logo.png",
    bannerImg:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-6/480447123_2773672296172626_4629679993227193274_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=oD2xJMwChFMQ7kNvgFHjVFU&_nc_oc=AdjhvPhgYDc72GhpDGS9N_otXcigFM6L2mWv4sit09CE2Q6uh2Ldohg4WTNhYsor3Gk&_nc_zt=23&_nc_ht=scontent.fala4-3.fna&_nc_gid=AIjOpO_Xs9PEkzQjP2zlKvD&oh=00_AYD3uH4tKWiCLjwm7k5nhsrsfgey9RBdxtf41pYOXovzoQ&oe=67BF8D51",
    rating: 3.9,
    location: "Финикс, США",
    industries: ["Автоматизация", "Авионика"],
    size: "10000+",
    description:
      "Honeywell Int — фокус на авиационном и промышленном оборудовании.",
    overallInfo: {
      founded: "1906",
      revenue: ">$30 млрд",
      mission: "Решения в области автоматизации и авиации.",
      competitors: ["Bosch", "GE"],
    },
    benefits: [
      {
        title: "Компенсация питания",
        description: "Частичное покрытие расходов на обеды.",
      },
      {
        title: "Отпуск по уходу",
        description: "Увеличенный декретный отпуск.",
      },
    ],
    interviews: [
      {
        position: "Automation Tester",
        difficulty: 3.2,
        experience: "Нейтральный",
        details: "Несколько задач по тестированию и сценариям QA.",
      },
    ],
    reviews: [
      {
        title: "Есть перспективы",
        body: "Можно вырасти, но нужно приложить усилия. Множество процессов.",
        rating: 4,
        author: "Тестировщик",
      },
    ],
    salaries: [{ position: "Automation Tester", amount: "3200 USD/мес" }],
    recommended: [
      {
        id: "13",
        name: "Honeywell",
        logoUrl: "/images/honeywell.png",
        rating: 3.9,
      },
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "3", name: "Microsoft", rating: 4.2 },
    ],
  },
  {
    id: "16",
    name: "Dell",
    logoUrl:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-1/460813983_1069666871481812_2251301434273760488_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=100&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=tBZpXgUuw-4Q7kNvgFlze_3&_nc_oc=AdgkMcIOOJNpdFHPs9W2dUa81-Xt82F3AP3oD_Pi5w_3G-ovQPaitau2xGvei1_ubpU&_nc_zt=24&_nc_ht=scontent.fala4-3.fna&_nc_gid=AIzOqEXbp_kbIXgzI7F-S-f&oh=00_AYAqZD57kUzF6hw1HleOHSrmjKj6LmxwQ022_BKRIC923Q&oe=67BFABF3",
    bannerImg:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-6/354225230_807039181077917_8721795076188734823_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=KTqzXMK4zjoQ7kNvgEzITJT&_nc_oc=Adjh2PgAQRBIKj61kWcB3V6jvf2v5p1t2-PoPQFzmgHLhPSOJRwdjE04MzVuLMhOhJQ&_nc_zt=23&_nc_ht=scontent.fala4-3.fna&_nc_gid=AIzOqEXbp_kbIXgzI7F-S-f&oh=00_AYDF8_R3cjoB_22tOaac03cLVdCkd7VJ0f-CrvFKMIyF2w&oe=67BF8729",
    rating: 3.9,
    location: "Раунд-Рок, США",
    industries: ["Аппаратное обеспечение", "ПО"],
    size: "10000+",
    description:
      "Dell — один из крупнейших производителей компьютеров и серверов.",
    overallInfo: {
      founded: "1984",
      revenue: ">$90 млрд",
      mission: "Создавать доступные и надёжные компьютерные решения.",
      competitors: ["HP", "Lenovo", "Asus"],
    },
    benefits: [
      {
        title: "Скидки на устройства",
        description: "Специальные цены для сотрудников.",
      },
      {
        title: "Гибридный график",
        description: "Можно работать в офисе или удалённо.",
      },
    ],
    interviews: [
      {
        position: "Technical Support Engineer",
        difficulty: 3.2,
        experience: "Положительный",
        details: "Проверка навыков в диагностике и обслуживании компьютеров.",
      },
    ],
    reviews: [
      {
        title: "Хорошая техника",
        body: "Дает доступ к современному “железу” и ПО.",
        rating: 4,
        author: "Инженер",
      },
      {
        title: "Служба поддержки",
        body: "Бывает много рутины, но есть возможность расти.",
        rating: 3,
        author: "Support",
      },
    ],
    salaries: [
      { position: "Technical Support Engineer", amount: "3000 USD/мес" },
      { position: "Sales Manager", amount: "3500 USD/мес" },
    ],
    recommended: [
      { id: "10", name: "HP Inc.", logoUrl: "/images/hp.png", rating: 3.6 },
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
    ],
    topCompanies: [
      { id: "1", name: "IBM", rating: 4.0 },
      { id: "2", name: "Google", rating: 4.3 },
    ],
  },
  {
    id: "17",
    name: "Lenovo",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/296223397_10159166034734635_1898927931736557324_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=7lP89buw7jMQ7kNvgF641oH&_nc_oc=Adjt-x-9mQGAFdeDO9oPszp9IXkPZy04AB6XbQLsEMJmzjQ7w5eb8r-yddpazIiv7lY&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=AMriylVXHke8QtmmfXr910B&oh=00_AYCfhFgwZ_SqeBhUIWNeP7hlf50n9mWwDJYCbZIFNHy31A&oe=67BF7BC8",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-6/480966072_1115379360614973_1894125425525758874_n.jpg?stp=dst-jpg_s2048x2048_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=eBoFnyzbEnIQ7kNvgGghZ8f&_nc_oc=Adg8ZDCzlX7FCA6VjahZKpahWZCUMk-lQiquRVuUGX8oitCZELE95Dnu4eUY3E3vuJk&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=AMriylVXHke8QtmmfXr910B&oh=00_AYA8DEev0zIIwSHL39JeU2PjZeTvmjl9iWiwwOP9Ozg58w&oe=67BF9B24",
    rating: 3.7,
    location: "Пекин, Китай",
    industries: ["Аппаратное обеспечение", "Смартфоны"],
    size: "10000+",
    description:
      "Lenovo — глобальный производитель ПК, ноутбуков и смартфонов.",
    overallInfo: {
      founded: "1984",
      revenue: ">$60 млрд",
      mission:
        "Инновации в области персональных устройств и корпоративных решений.",
      competitors: ["Dell", "HP", "Acer"],
    },
    benefits: [
      {
        title: "Страховка",
        description: "Расширенное покрытие для сотрудников.",
      },
      { title: "Купоны на питание", description: "Внутренняя система скидок." },
    ],
    interviews: [
      {
        position: "Firmware Engineer",
        difficulty: 3.5,
        experience: "Нейтральный",
        details: "Прошивки BIOS/UEFI, вопросы по архитектуре х86.",
      },
    ],
    reviews: [
      {
        title: "Развитие в Китае",
        body: "Международная компания, можно путешествовать.",
        rating: 4,
        author: "Инженер",
      },
      {
        title: "Культурные различия",
        body: "Требуется адаптация к корпоративной политике.",
        rating: 3,
        author: "Сотрудник",
      },
    ],
    salaries: [{ position: "Firmware Engineer", amount: "3800 USD/мес" }],
    recommended: [
      { id: "10", name: "HP Inc.", logoUrl: "/images/hp.png", rating: 3.6 },
      { id: "16", name: "Dell", logoUrl: "/images/dell.png", rating: 3.9 },
    ],
    topCompanies: [
      { id: "1", name: "IBM", rating: 4.0 },
      { id: "4", name: "Apple", rating: 4.1 },
    ],
  },
  {
    id: "18",
    name: "Accenture",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/359453892_597778089149141_4521339302675636379_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=zXaNJqeEX9EQ7kNvgHbBRYf&_nc_oc=Adj20E5w-7b5gyEwcGLqglItL0SKI3HLJwfybWBxRfoTacNzPkOQZwHskY9IddPNE8k&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=A1GtU_FMMNhESl2fXdIpo7l&oh=00_AYANTSZmvIvenyiEsEYmpycFJea-xMXjea5sY_Rqdz4CFQ&oe=67BFAAB1",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-6/439338580_750104900583125_3957351619102499158_n.png?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=unGVKIujLBkQ7kNvgFi6nN0&_nc_oc=Adhut4Y7oCz2ePx1j-wSKL2VvDluQY2JzYLuGC3Id3uD27vW6_etcRsNo6LdgnuBtmE&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=A1GtU_FMMNhESl2fXdIpo7l&oh=00_AYC8yaG5GokVOsKdXsGgFV-DMSWiT9Yum5Cj0X75aJy-Qg&oe=67BF7D74",
    rating: 3.8,
    location: "Дублин, Ирландия",
    industries: ["Консалтинг", "Аутсорсинг"],
    size: "10000+",
    description:
      "Accenture — ведущая консалтинговая и аутсорсинговая компания.",
    overallInfo: {
      founded: "1989",
      revenue: ">$40 млрд",
      mission: "Помогать клиентам внедрять инновации и повышать эффективность.",
      competitors: ["Deloitte", "PwC", "Avanade"],
    },
    benefits: [
      {
        title: "Корпоративная культура",
        description: "Эффективные тренинги и тимбилдинги.",
      },
      {
        title: "Международные проекты",
        description: "Возможность работать с клиентами по всему миру.",
      },
    ],
    interviews: [
      {
        position: "Consultant",
        difficulty: 3.3,
        experience: "Положительный",
        details: "Кейс-интервью, решение бизнес-задач.",
      },
    ],
    reviews: [
      {
        title: "Большие клиенты",
        body: "Интересно решать крупные бизнес-проблемы.",
        rating: 4,
        author: "Консультант",
      },
    ],
    salaries: [{ position: "Consultant", amount: "3800 USD/мес" }],
    recommended: [
      {
        id: "11",
        name: "Akvelon",
        logoUrl: "/images/akvelon.png",
        rating: 3.7,
      },
      {
        id: "5",
        name: "JPMorganChase",
        logoUrl: "/images/jpmc.png",
        rating: 4.0,
      },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "3", name: "Microsoft", rating: 4.2 },
    ],
  },
  {
    id: "19",
    name: "SAP",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/449667369_916525133848884_6740279834876316728_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=Ebtof_55GQAQ7kNvgFk8-CH&_nc_oc=Adj3Z6xEa8-iAACF2Ar5vFSHcJOPXanQ0I0m4-LL7YepOT5x03RwnH5h_sYVBj6HT_Q&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=APeaH_3wrOOTGfyeYsCy8o3&oh=00_AYDRIU-22wADYlfbJfRiT7zgIkVt12Nknopi13HlPRRVgg&oe=67BF964D",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-6/480086568_1082637450570984_2117019105676567568_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=AciG-AuKojsQ7kNvgFexNBA&_nc_oc=AdjC905Y5AnuG2Xzd_dbsZrmvQ_1MstAm_GgXBkkGqDHV7rcS0oR1kJYLmGdN3Ryf3U&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=APeaH_3wrOOTGfyeYsCy8o3&oh=00_AYCcr0WvsyM5p1psLwjxHuaKRdi8gp5bsY68b9KwVj1u2w&oe=67BF90AE",
    rating: 4.0,
    location: "Вальдорф, Германия",
    industries: ["ERP", "Корпоративное ПО"],
    size: "10000+",
    description:
      "SAP — мировой лидер в разработке ERP-систем и корпоративных решений.",
    overallInfo: {
      founded: "1972",
      revenue: ">$30 млрд",
      mission: "Помогать предприятиям работать эффективнее и прозрачнее.",
      competitors: ["Oracle", "Microsoft", "Salesforce"],
    },
    benefits: [
      {
        title: "Work-life balance",
        description: "Гибкое расписание, культура “без переработок”.",
      },
      {
        title: "Курсы по ERP",
        description: "Внутренние тренинги по продуктам SAP.",
      },
    ],
    interviews: [
      {
        position: "SAP Consultant",
        difficulty: 3.2,
        experience: "Положительный",
        details: "ABAP, модули FI/CO, тест на логику.",
      },
    ],
    reviews: [
      {
        title: "Отличная ERP-база",
        body: "Можно стать узкопрофильным специалистом и хорошо зарабатывать.",
        rating: 4,
        author: "SAP-консультант",
      },
    ],
    salaries: [{ position: "SAP Consultant", amount: "4000 USD/мес" }],
    recommended: [
      { id: "9", name: "Oracle", logoUrl: "/images/oracle.png", rating: 3.8 },
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
    ],
    topCompanies: [
      { id: "1", name: "IBM", rating: 4.0 },
      { id: "2", name: "Google", rating: 4.3 },
    ],
  },
  {
    id: "20",
    name: "Salesforce",
    logoUrl:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-1/352296368_975909216941719_4853739021789044429_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=Vouulp_Fka8Q7kNvgE1AZ98&_nc_oc=AdihcvmYfuyG4XohebemrOLyPfMj0zcEBM4Cqd-_l6koj-UU-V8y6uDyLUsP8ma-qo4&_nc_zt=24&_nc_ht=scontent.fala4-3.fna&_nc_gid=ASswanbd6iBXBkmZuwrORrZ&oh=00_AYARfXCZcKkhb4TxLfpCW1CiDmMZTm54hiXBuP1e9qdCsQ&oe=67BF98DE",
    bannerImg:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-6/383321545_713354250835368_2181100368892587865_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=zK4sP_mbmmMQ7kNvgHkNacT&_nc_oc=Adh6eezJ_lWMRvuIYy8j0kKT8VoqmsFINhzBecPshowE-_9QPil9MuvHxyLdsmpsrys&_nc_zt=23&_nc_ht=scontent.fala4-1.fna&_nc_gid=ASswanbd6iBXBkmZuwrORrZ&oh=00_AYAjpUqtqDRbs34Hg2uXfud4eaWliwU8r9cYZn_JdP-Jiw&oe=67BF8BCD",
    rating: 4.2,
    location: "Сан-Франциско, США",
    industries: ["Облачные решения", "CRM"],
    size: "10000+",
    description:
      "Salesforce — мировой лидер в сфере CRM и облачных бизнес-платформ.",
    overallInfo: {
      founded: "1999",
      revenue: ">$20 млрд",
      mission:
        "Помогать компаниям выстраивать отношения с клиентами с помощью облака.",
      competitors: ["Microsoft Dynamics", "Oracle", "SAP"],
    },
    benefits: [
      {
        title: "Volunteering Time Off",
        description: "Уплачиваемое время для волонтёрских проектов.",
      },
      { title: "Wellness", description: "Покрытие психологической помощи." },
    ],
    interviews: [
      {
        position: "Salesforce Developer",
        difficulty: 3.7,
        experience: "Положительный",
        details: "Apex, Lightning, интеграции API.",
      },
    ],
    reviews: [
      {
        title: "Ценность культуры “Ohana”",
        body: "Компания дорожит ценностями, отличная командная атмосфера.",
        rating: 5,
        author: "Developer",
      },
    ],
    salaries: [{ position: "Salesforce Developer", amount: "4500 USD/мес" }],
    recommended: [
      {
        id: "3",
        name: "Microsoft",
        logoUrl: "/images/microsoft.png",
        rating: 4.2,
      },
      { id: "19", name: "SAP", logoUrl: "/images/sap.png", rating: 4.0 },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "8", name: "Amazon", rating: 3.6 },
    ],
  },
  {
    id: "21",
    name: "Twitter",
    logoUrl:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-1/348556241_557828136548523_5326881297993320119_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=iJ7U-k8ojqgQ7kNvgFjKRpS&_nc_oc=Adhh3YaECmi752IkYRUJ7SViTYUCIsigICrcp7y4k4s_kzviy3WlpfliartD81znvUE&_nc_zt=24&_nc_ht=scontent.fala4-2.fna&_nc_gid=Av7VCrJLuu9EZ2dt5Brt8nL&oh=00_AYCXcObQYFt5tUG375Ocn2D6bfvPg7gqwBRnHGPi7pEm1g&oe=67BF7935",
    bannerImg:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-6/480175635_1204779724345375_8648142861837738921_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=b39J4ZjmzdoQ7kNvgEj_Reo&_nc_oc=AdjXCk5P-Pvo3E-125tVwITAFGHkC-Vvhlg1378Q6EjvHs4cxxANyPGYa28OWgdR6Ww&_nc_zt=23&_nc_ht=scontent.fala4-1.fna&_nc_gid=Av7VCrJLuu9EZ2dt5Brt8nL&oh=00_AYDXGVnG6ofwEXFNOttaE0K5haCJjVFPYdKbO2jgf-kBoA&oe=67BF7BE2",
    rating: 3.5,
    location: "Сан-Франциско, США",
    industries: ["Социальные сети"],
    size: "10000+",
    description: "Twitter — популярная платформа микроблогов и соцсеть.",
    overallInfo: {
      founded: "2006",
      revenue: ">$4 млрд",
      mission: "Дать возможность обмена короткими сообщениями по всему миру.",
      competitors: ["Meta", "TikTok", "Snap"],
    },
    benefits: [
      {
        title: "Свободный график",
        description: "Можно договариваться о гибком времени.",
      },
      {
        title: "Бонусы по KPI",
        description: "Зависят от вовлечённости пользователей.",
      },
    ],
    interviews: [
      {
        position: "Backend Engineer",
        difficulty: 3.8,
        experience: "Негативный",
        details:
          "Сложные задачи по распределённым системам, интервью длилось 5 этапов.",
      },
    ],
    reviews: [
      {
        title: "Стрессовая работа",
        body: "Высокая динамика, много изменений, нужно быстро адаптироваться.",
        rating: 3,
        author: "Инженер",
      },
    ],
    salaries: [{ position: "Backend Engineer", amount: "4600 USD/мес" }],
    recommended: [
      { id: "7", name: "Meta", logoUrl: "/images/meta.png", rating: 4.0 },
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
    ],
    topCompanies: [
      { id: "3", name: "Microsoft", rating: 4.2 },
      { id: "4", name: "Apple", rating: 4.1 },
    ],
  },
  {
    id: "22",
    name: "Tesla",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/422246029_937710134819984_7865127798603499606_n.jpg?stp=c0.135.1080.1080a_dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=Vw2bp6kzCYAQ7kNvgGRQhiq&_nc_oc=AdjfDrEprSYvDLbuz6bt8YZR_p24fMAGQpbl9CXDhpwNdTEpUdbJPlqLfUhzudzFpSA&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=AWqPWI_nyKjM9stQACnsmC3&oh=00_AYB3RI5yUK3Ri0nCgtjMzgezUDYC02p1VgiBtayxxmcsrg&oe=67BF88A9",
    bannerImg:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-6/474501896_1189780369612958_2562844042251586735_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=M2zlbt5b43gQ7kNvgExAaUz&_nc_oc=Adjy7ZXQUihDcL8QiMFFUIo-nMMwLmfof6i4s8o6Psu10XjUAtiETW-6Rr81PYTCCzA&_nc_zt=23&_nc_ht=scontent.fala4-3.fna&_nc_gid=AWqPWI_nyKjM9stQACnsmC3&oh=00_AYCAzjO36Y4VtunYABI7ySLJbRSaOQt4nXnPwU-oI0cddw&oe=67BFA1AB",
    rating: 4.1,
    location: "Пало-Альто, США",
    industries: ["Автомобилестроение", "Энергетика"],
    size: "10000+",
    description:
      "Tesla — производитель электромобилей и решений для хранения энергии.",
    overallInfo: {
      founded: "2003",
      revenue: ">$80 млрд",
      mission: "Ускорить переход мира к устойчивой энергетике.",
      competitors: ["Ford", "GM", "Lucid"],
    },
    benefits: [
      {
        title: "Скидки на электромобили",
        description: "Специальные лизинговые условия.",
      },
      { title: "Опционы", description: "Возможность получать акции Tesla." },
    ],
    interviews: [
      {
        position: "Mechanical Engineer",
        difficulty: 3.9,
        experience: "Положительный",
        details: "Вопросы по проектированию электромоторов, термодинамике.",
      },
    ],
    reviews: [
      {
        title: "Инновации и драйв",
        body: "Проекты меняют мир, но нагрузка очень высокая.",
        rating: 4,
        author: "Инженер",
      },
    ],
    salaries: [{ position: "Mechanical Engineer", amount: "5000 USD/мес" }],
    recommended: [
      { id: "8", name: "Amazon", logoUrl: "/images/amazon.png", rating: 3.6 },
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
    ],
    topCompanies: [
      { id: "3", name: "Microsoft", rating: 4.2 },
      { id: "2", name: "Google", rating: 4.3 },
    ],
  },
  {
    id: "23",
    name: "SpaceX",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/371834446_307795905188539_1891928832272990551_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=USsfOeuPyS0Q7kNvgGbcikJ&_nc_oc=AdhtinxJimErDLXwkeXYiXWMkEpmyhNYdsNhUJqO588c0QFyLLbTUPE4qCa7_Qzerwc&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=A5j8xQM7RRLrnv8lbBYSh0C&oh=00_AYC5IWQinp6jdZmCXFcjK6x43g9pr-v_NS7ErJ_LVaudjg&oe=67BF9CFE",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t1.6435-9/60357370_308961263347376_697231453095723008_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2285d6&_nc_ohc=dpWUIFWiriMQ7kNvgENUZG9&_nc_oc=AdiUwT4Gv8cvzSyUIinNXKxjJ4u-HTubSb-hj74aKOAxA-KAXvWztba5zD7TRlnQc0A&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=A_fGA2SA0l3Z4yydLupbKcy&oh=00_AYAA3hT90VTt5VYXAjWMK82KApwlQNkrwaDqiJh3CvcUag&oe=67E145A0",
    rating: 4.2,
    location: "Хоторн, США",
    industries: ["Аэрокосмическая"],
    size: "10000+",
    description:
      "SpaceX — частная космическая компания, занимающаяся ракетостроением и полётами.",
    overallInfo: {
      founded: "2002",
      revenue: ">$2 млрд",
      mission: "Сделать космические полёты доступными, колонизировать Марс.",
      competitors: ["Blue Origin", "ULA"],
    },
    benefits: [
      {
        title: "Акции компании",
        description: "Опционы, зависящие от проектов.",
      },
      {
        title: "Внутренние кафе",
        description: "Питание для сотрудников на площадке.",
      },
    ],
    interviews: [
      {
        position: "Propulsion Engineer",
        difficulty: 4.5,
        experience: "Положительный",
        details:
          "Сложные технические задачи по двигателям, вопросы по физике плазмы.",
      },
    ],
    reviews: [
      {
        title: "Работа мечты",
        body: "Настоящие ракеты, крутая миссия, но приходится работать 24/7.",
        rating: 5,
        author: "Инженер",
      },
    ],
    salaries: [{ position: "Propulsion Engineer", amount: "6000 USD/мес" }],
    recommended: [
      { id: "22", name: "Tesla", logoUrl: "/images/tesla.png", rating: 4.1 },
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "3", name: "Microsoft", rating: 4.2 },
    ],
  },
  {
    id: "24",
    name: "Netflix",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/352235145_618708150215768_1913373511794735820_n.png?stp=dst-png_s480x480&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=NTkdr4A4tXYQ7kNvgG2Brjl&_nc_oc=Adg9oqAbDXWVP0XcMC44CuH0AzBU3hR3F6JYlqQX9wUb6OvrmA2aPFFjXVKTSO-RfXM&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=AMPLZAa_tHFeFBIeMjRvbSH&oh=00_AYCqYeF1X_Fk_E_3inuJwTMwmHZ7vuv8lEMSWy2j9I9V2A&oe=67BF7F3E",
    bannerImg:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-6/480084566_941503498100125_7329151167471224952_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=uS66O3cipgAQ7kNvgFo_wDU&_nc_oc=AdhC0a7h0Pd4YiL9WyCQRvQJqa2Yo4-VKCPompO3PCrhO8coWW_zI5Nq6yMKOiT3_dw&_nc_zt=23&_nc_ht=scontent.fala4-1.fna&_nc_gid=AMPLZAa_tHFeFBIeMjRvbSH&oh=00_AYAfzLV_uLlmtL-SmuHxSqleTVEdVSkN1Moq5zM9N9AQiQ&oe=67BF7DC0",
    rating: 4.0,
    location: "Лос-Гатос, США",
    industries: ["Стриминг", "Развлечения"],
    size: "5001-10000",
    description:
      "Netflix — ведущая платформа потокового видео, производит собственные фильмы и сериалы.",
    overallInfo: {
      founded: "1997",
      revenue: ">$25 млрд",
      mission: "Развлекать весь мир, предоставляя качественный контент онлайн.",
      competitors: ["Amazon Prime", "Disney+", "HBO"],
    },
    benefits: [
      {
        title: "Неограниченный отпуск",
        description: "Trust-based policy на отпуск и больничные.",
      },
      {
        title: "Отсутствие бюрократии",
        description: "Минимум правил, максимальная свобода.",
      },
    ],
    interviews: [
      {
        position: "Backend Developer",
        difficulty: 4.0,
        experience: "Положительный",
        details: "Java, Scala, микросервисы, вопросы по AWS.",
      },
    ],
    reviews: [
      {
        title: "Культура свободы",
        body: "Мало процессов, но нужна самодисциплина.",
        rating: 5,
        author: "Разработчик",
      },
    ],
    salaries: [{ position: "Backend Developer", amount: "5500 USD/мес" }],
    recommended: [
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
      { id: "2", name: "Google", logoUrl: "/images/google.png", rating: 4.3 },
    ],
    topCompanies: [
      { id: "3", name: "Microsoft", rating: 4.2 },
      { id: "8", name: "Amazon", rating: 3.6 },
    ],
  },
  {
    id: "25",
    name: "Airbnb",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/289840534_10160185317062458_71839744288889599_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=-N_76YWQgLIQ7kNvgEjT4_E&_nc_oc=Adj8BAvv5yS5xJmYg-jswOB6k7y-tEFMDjropEE4CHnsDZQEEi1airWFqChrTrvxOpA&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=AMjbYuSanPdZpQdBEU1TT5T&oh=00_AYC1q-PLgeHW5PsPXaMWqh6Osp82EZLueUBBSny4lWINJA&oe=67BF8F24",
    bannerImg:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-6/355485542_659676602865219_3357551211323296273_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=juh0I30X48gQ7kNvgFLLB8R&_nc_oc=Adi0dHOOzC5e_vKH0zcJ4PHxxYE98DMkL-gZzdTr3VqELHk5W_v1Go6nAPPEwfm81X8&_nc_zt=23&_nc_ht=scontent.fala4-3.fna&_nc_gid=AMjbYuSanPdZpQdBEU1TT5T&oh=00_AYDrPfKH2EVed836hIcQvO3GcPJA-4KLzNy7SjCkTu4MOg&oe=67BF8E1B",
    rating: 4.1,
    location: "Сан-Франциско, США",
    industries: ["Онлайн-платформа", "Туризм"],
    size: "5001-10000",
    description:
      "Airbnb — онлайн-площадка для аренды жилья и поиска уникальных путешествий.",
    overallInfo: {
      founded: "2008",
      revenue: ">$5 млрд",
      mission:
        "Создавать чувство общности и уникальные впечатления в путешествиях.",
      competitors: ["Booking.com", "Expedia"],
    },
    benefits: [
      {
        title: "Гибридная работа",
        description: "Можно работать из офиса или из любого места.",
      },
      {
        title: "Кредиты на поездки",
        description: "Бонусы на проживание через Airbnb.",
      },
    ],
    interviews: [
      {
        position: "Data Scientist",
        difficulty: 3.8,
        experience: "Положительный",
        details: "Вопросы по аналитике, A/B тестам, продуктовым метрикам.",
      },
    ],
    reviews: [
      {
        title: "Классная атмосфера",
        body: "Люди увлечены путешествиями, дружелюбные коллеги.",
        rating: 4,
        author: "Data Scientist",
      },
    ],
    salaries: [{ position: "Data Scientist", amount: "5000 USD/мес" }],
    recommended: [
      {
        id: "24",
        name: "Netflix",
        logoUrl: "/images/netflix.png",
        rating: 4.0,
      },
      { id: "10", name: "HP Inc.", logoUrl: "/images/hp.png", rating: 3.6 },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "1", name: "IBM", rating: 4.0 },
    ],
  },
  {
    id: "26",
    name: "Deloitte",
    logoUrl:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-1/361097317_775831400842490_179110507208738487_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=wiuJ939wrBwQ7kNvgG0JPtl&_nc_oc=AdhQDnvbj6iojjsPoeN64lHQcZBZtHisSBL-Yg5vruc0Ar3r4ETobGloqUud-YWjym4&_nc_zt=24&_nc_ht=scontent.fala4-3.fna&_nc_gid=AzfeNPlMxrvYj6F-9ykZRY5&oh=00_AYBnOFEdiMvXfDjlikGagIRV-lVusdUi0iJBO4Dcnuxafg&oe=67BF85D0",
    bannerImg:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-6/289451284_10159007257772689_3472615280117932482_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=0apMH1Wv-scQ7kNvgFiSygt&_nc_oc=Adh90gBRRHI3jrCIB9bEcDVOt4uZOb5qrGsw14AIRRXcTaKl2z0781B_cgflbTj8sIE&_nc_zt=23&_nc_ht=scontent.fala4-3.fna&_nc_gid=AzfeNPlMxrvYj6F-9ykZRY5&oh=00_AYDcnkjJK8OkFoyjLnaVAIiVi6-GVemWYnAM35F4gjXhnQ&oe=67BF7FDE",
    rating: 3.8,
    location: "Лондон, Великобритания",
    industries: ["Консалтинг", "Аудит"],
    size: "10000+",
    description:
      "Deloitte — одна из крупнейших в мире сетей консультационных и аудиторских компаний.",
    overallInfo: {
      founded: "1845",
      revenue: ">$40 млрд",
      mission:
        "Помогать организациям достигать целей посредством высококачественных консультаций.",
      competitors: ["PwC", "EY", "KPMG"],
    },
    benefits: [
      {
        title: "Корпоративный рост",
        description: "Чёткие карьерные лестницы.",
      },
      {
        title: "Международная мобильность",
        description: "Возможность перевода в офисы других стран.",
      },
    ],
    interviews: [
      {
        position: "Consultant",
        difficulty: 3.4,
        experience: "Положительный",
        details: "Кейсы, финансовый анализ, поведенческие вопросы.",
      },
    ],
    reviews: [
      {
        title: "Много работы",
        body: "Проекты сложные и долгие, но опыт бесценен.",
        rating: 4,
        author: "Консультант",
      },
    ],
    salaries: [{ position: "Consultant", amount: "3600 USD/мес" }],
    recommended: [
      { id: "27", name: "KPMG", logoUrl: "/images/kpmg.png", rating: 3.7 },
      { id: "28", name: "EY", logoUrl: "/images/ey.png", rating: 3.8 },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "3", name: "Microsoft", rating: 4.2 },
    ],
  },
  {
    id: "27",
    name: "KPMG",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/299812574_370014488640757_8078108454472283730_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=AZg_cDh7YV8Q7kNvgHWmjoZ&_nc_oc=Adgx37ZxlHThX9WO61gtEyKaurt3dBSuuELq9wZzSPKzFqDb_ZsVL-S_Rd0LRny_Iac&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=AWXd-wQrFxobYVFW0_p2lk2&oh=00_AYCYzlXo4YXVpxmd87SUZCxd0fdUyOSlOQL2KHPrUyN7aQ&oe=67BFAA10",
    bannerImg:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-6/460442975_829519069356961_3486595101990867608_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ODNTgwgelZ8Q7kNvgF0A2pI&_nc_oc=AdgIzGtMkDQGgL1Atm5_mKD9dtq4Ul7Vjo55gfQzgptmrp7ztoDc16uXovp4LIkGRm4&_nc_zt=23&_nc_ht=scontent.fala4-3.fna&_nc_gid=AWXd-wQrFxobYVFW0_p2lk2&oh=00_AYAnchVMsKQtAFueIQNuxlqqMURBfdlRelC8wUMB6ObR5g&oe=67BFA4E5",
    rating: 3.7,
    location: "Амстелвен, Нидерланды",
    industries: ["Аудит", "Консалтинг"],
    size: "10000+",
    description:
      "KPMG — международная сеть фирм, оказывающих аудиторские и консалтинговые услуги.",
    overallInfo: {
      founded: "1987",
      revenue: ">$29 млрд",
      mission:
        "Вести бизнес честно и прозрачно, помогая клиентам в сложных задачах.",
      competitors: ["Deloitte", "PwC", "EY"],
    },
    benefits: [
      {
        title: "Страховка путешествий",
        description: "Для сотрудников и их семей.",
      },
      {
        title: "Корпоративная SIM-карта",
        description: "Оплачиваются деловые звонки.",
      },
    ],
    interviews: [
      {
        position: "Audit Associate",
        difficulty: 3.1,
        experience: "Нейтральный",
        details: "Проверка знаний по МСФО, кейсы аудит отчетности.",
      },
    ],
    reviews: [
      {
        title: "Хороший старт карьеры",
        body: "Можно быстро научиться аудиту и перейти в другой сектор.",
        rating: 4,
        author: "Аудитор",
      },
    ],
    salaries: [{ position: "Audit Associate", amount: "3200 USD/мес" }],
    recommended: [
      {
        id: "26",
        name: "Deloitte",
        logoUrl: "/images/deloitte.png",
        rating: 3.8,
      },
      { id: "28", name: "EY", logoUrl: "/images/ey.png", rating: 3.8 },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "3", name: "Microsoft", rating: 4.2 },
    ],
  },
  {
    id: "28",
    name: "EY",
    logoUrl:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-1/180311311_4444913438875449_117212782360460240_n.png?_nc_cat=100&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=ow5W0w-iXCcQ7kNvgHGSRbY&_nc_oc=Adib5MOwu_Rm8TXdDPpG1jHme0enNFLlTH1hykhf9iDF9SIGOyUyM2HkFZ5hyF92UCU&_nc_zt=24&_nc_ht=scontent.fala4-3.fna&_nc_gid=ApJ2ZcEpUqbNsPDWVo9aExU&oh=00_AYAz7z7iFgNpUyOpfj1CDoHU8_fDwL03QeDuU03u-hAeYg&oe=67BFA4B6",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-6/472711780_1027399376096208_7513469530974593198_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=DD9hlMYk75EQ7kNvgExSKYk&_nc_oc=Adim4uUFX9fvJ0-rQx4tj2d76GTyEzK-jcCZzDIg1MXPtL9o4Ap8yQ47d8Z_Tp52C6s&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=ApJ2ZcEpUqbNsPDWVo9aExU&oh=00_AYAyqA7OKZSIF_rpjNO2hwt6jLa0dt5gzHU5Fr1fo1HgxQ&oe=67BFA6C0",
    rating: 3.8,
    location: "Лондон, Великобритания",
    industries: ["Аудит", "Консалтинг"],
    size: "10000+",
    description:
      "EY — одна из крупнейших аудиторско-консультационных фирм в мире.",
    overallInfo: {
      founded: "1989",
      revenue: ">$35 млрд",
      mission: "Создавать качественные услуги и строить доверие к бизнесу.",
      competitors: ["Deloitte", "PwC", "KPMG"],
    },
    benefits: [
      {
        title: "Обучение и сертификации",
        description: "Поддержка ACCA, CPA и др.",
      },
      {
        title: "Премии за привлечение клиентов",
        description: "Финансовые бонусы при расширении бизнеса.",
      },
    ],
    interviews: [
      {
        position: "Tax Consultant",
        difficulty: 3.3,
        experience: "Положительный",
        details: "Знание налогового законодательства, тесты на внимательность.",
      },
    ],
    reviews: [
      {
        title: "Большой бренд",
        body: "Хорошо смотрится в резюме, но темп высок, возможен стресс.",
        rating: 4,
        author: "Tax Specialist",
      },
    ],
    salaries: [{ position: "Tax Consultant", amount: "3400 USD/мес" }],
    recommended: [
      { id: "27", name: "KPMG", logoUrl: "/images/kpmg.png", rating: 3.7 },
      { id: "29", name: "PwC", logoUrl: "/images/pwc.png", rating: 3.9 },
    ],
    topCompanies: [
      { id: "26", name: "Deloitte", rating: 3.8 },
      { id: "2", name: "Google", rating: 4.3 },
    ],
  },
  {
    id: "29",
    name: "PwC",
    logoUrl:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-1/348217806_635062528476692_6951285755683255524_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=heMhK8gw4qYQ7kNvgEQkwsV&_nc_oc=AdjiMjuB_6OwAwtdZGrVCSl1aUOKKjXaSZjYmPRuFc-Fj3qTY0kMEErk1UY4QxTnix0&_nc_zt=24&_nc_ht=scontent.fala4-3.fna&_nc_gid=ApiQjiA4VWTZbF0rYHUrzzU&oh=00_AYCi4OMMa7y3kkkOVmnKWHEfwYtfHshiXpVpjhgjF6ocFQ&oe=67BFA58E",
    bannerImg:
      "https://scontent.fala4-2.fna.fbcdn.net/v/t39.30808-6/348237812_602402781844787_1359937235991094660_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=bHdQ5eIKs8cQ7kNvgGTSgXB&_nc_oc=Adj1Gm99kK949WoCmnU6S_3tsmc_Kon11EdeE9_wrVxlWkniZKVtoLEVf5PgYiuaSx8&_nc_zt=23&_nc_ht=scontent.fala4-2.fna&_nc_gid=ApiQjiA4VWTZbF0rYHUrzzU&oh=00_AYCdhu44uZiZczxNre6MtTwdDCH7Hcwt0plm1Lf93WW7Xg&oe=67BF8096",
    rating: 3.9,
    location: "Лондон, Великобритания",
    industries: ["Аудит", "Консалтинг"],
    size: "10000+",
    description:
      "PwC — глобальная сеть фирм, предоставляющих профессиональные аудиторские, налоговые и консультационные услуги.",
    overallInfo: {
      founded: "1998",
      revenue: ">$40 млрд",
      mission: "Создавать доверие к бизнесу и решать важные проблемы общества.",
      competitors: ["Deloitte", "KPMG", "EY"],
    },
    benefits: [
      {
        title: "Career development",
        description: "Ротация между департаментами, тренинги.",
      },
      {
        title: "Мобильность",
        description: "Возможность командировок за рубеж.",
      },
    ],
    interviews: [
      {
        position: "Advisory Associate",
        difficulty: 3.5,
        experience: "Положительный",
        details: "Тесты на критическое мышление и бизнес-кейсы.",
      },
    ],
    reviews: [
      {
        title: "Сильный бренд",
        body: "Работы много, но опыт масштабный и ценный.",
        rating: 4,
        author: "Advisory",
      },
    ],
    salaries: [{ position: "Advisory Associate", amount: "3500 USD/мес" }],
    recommended: [
      { id: "28", name: "EY", logoUrl: "/images/ey.png", rating: 3.8 },
      {
        id: "26",
        name: "Deloitte",
        logoUrl: "/images/deloitte.png",
        rating: 3.8,
      },
    ],
    topCompanies: [
      { id: "2", name: "Google", rating: 4.3 },
      { id: "3", name: "Microsoft", rating: 4.2 },
    ],
  },
  {
    id: "30",
    name: "Epic Games",
    logoUrl:
      "https://scontent.fala4-1.fna.fbcdn.net/v/t39.30808-1/476800636_1050883003745374_8480727607216342337_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=FhbyR_paupIQ7kNvgFMpJiJ&_nc_oc=AdiQqGE6KPi0fWEQPDWwt4fXAfIFYl-bqa-jg47xQeeLS-0xcxCker-0d4LAFljYnh0&_nc_zt=24&_nc_ht=scontent.fala4-1.fna&_nc_gid=Ab1zd6M9xXtntmN1ehyqzYS&oh=00_AYBWlu1PcQnJO2qxf2PAcoqui87wtk_pk_rfS_8ziPd2iQ&oe=67BF7DEE",
    bannerImg:
      "https://scontent.fala4-3.fna.fbcdn.net/v/t39.30808-6/476872199_1050836347083373_139352602116227694_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=GI036YgfS7IQ7kNvgGZXtLW&_nc_oc=AdinSnkPs65CTQRwnMtj2bK7XKnHAlHcGTka7zs_TMrutlL_xKxzCt4DNQt0NnRTUfM&_nc_zt=23&_nc_ht=scontent.fala4-3.fna&_nc_gid=Ab1zd6M9xXtntmN1ehyqzYS&oh=00_AYCrfmdsm4u-CCicwbyX7DT3QPbYoGd_0HckmFCi7Fk2Cg&oe=67BFA226",
    rating: 4.0,
    location: "Кэри, США",
    industries: ["Геймдев", "Движки"],
    size: "1001-5000",
    description:
      "Epic Games — разработчик игр (Fortnite) и создатель движка Unreal Engine.",
    overallInfo: {
      founded: "1991",
      revenue: ">$5 млрд",
      mission: "Создавать захватывающие игры и инструменты для разработчиков.",
      competitors: ["Unity", "Valve", "EA"],
    },
    benefits: [
      {
        title: "Epic Bonus",
        description: "Бонусы за релизы и успешные проекты.",
      },
      {
        title: "Гибкий график",
        description: "Можно работать в разное время суток.",
      },
    ],
    interviews: [
      {
        position: "Gameplay Programmer",
        difficulty: 4.0,
        experience: "Положительный",
        details:
          "C++ тест, задачи по оптимизации рендера, вопросы по игровым механикам.",
      },
    ],
    reviews: [
      {
        title: "Работа мечты геймера",
        body: "Создавать игры — круто, но сроки жёсткие и релизы стрессовые.",
        rating: 4,
        author: "Программист",
      },
    ],
    salaries: [{ position: "Gameplay Programmer", amount: "4800 USD/мес" }],
    recommended: [
      { id: "4", name: "Apple", logoUrl: "/images/apple.png", rating: 4.1 },
      { id: "22", name: "Tesla", logoUrl: "/images/tesla.png", rating: 4.1 },
    ],
    topCompanies: [
      { id: "1", name: "IBM", rating: 4.0 },
      { id: "2", name: "Google", rating: 4.3 },
    ],
  },
];
