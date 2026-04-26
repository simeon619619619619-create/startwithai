import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

type Service = {
  title: string;
  helps: string;
  what: string;
  case?: string;
  price: string;
};

type Category = {
  num: string;
  id: string;
  title: string;
  intro: string;
  startsAt: string;
  services: Service[];
};

const CATEGORIES: Category[] = [
  {
    num: "01",
    id: "web",
    title: "Уеб платформи & E-commerce",
    startsAt: "от 1 500 €",
    intro:
      "Готови за production уеб платформи — Next.js + Supabase + Vercel. SSR, edge functions, real-time, плащания, имейл, ролева автентикация.",
    services: [
      {
        title: "E-commerce магазин (B2C)",
        helps:
          "Имаш продукти, но продаваш през Facebook съобщения и Excel. Плащанията не са автоматизирани, складът се води на ръка, не знаеш кой какво е поръчал.",
        what: "Каталог, кошница, Stripe плащания, складова наличност, админ панел, абонаментни оферти.",
        case: "BOSY Club — пълен e-commerce + админ + промо системи + Easter eggs.",
        price: "от 3 500 €",
      },
      {
        title: "Luxury продуктов сайт",
        helps:
          "Продаваш скъп продукт, а сайтът не предава усещането за стойност — клиентите обикалят и купуват от чужбина.",
        what: "Cartier-style mega menu, мулти-колекции, advanced filters, search, image galleries, сертификати.",
        case: "Cara Diamanti — 671 диаманти, 9 италиански колекции.",
        price: "от 4 500 €",
      },
      {
        title: "Конкурс / event платформа",
        helps:
          "Организираш събитие или конкурс, но кандидатите попълват Google форми, гласуването е през Instagram, билетите ги пращаш ръчно.",
        what: "Apply форми, online voting, sponsor pages, ticket sales (Stripe), email капторинг, admin dashboard.",
        case: "Face of Sofia (EFI) — кандидати, кастинг, 23 април конкурс.",
        price: "от 2 500 €",
      },
      {
        title: "Membership community платформа",
        helps:
          "Имаш аудитория която иска ексклузивно съдържание, но Facebook групите умират и нямаш контрол върху достъпа и плащанията.",
        what: "Theme system, ролеви достъпи, sidebar customization, събития, posts, AI Ghost Writer, mobile-first.",
        case: "Founders Club — community + AI генерация.",
        price: "от 3 800 €",
      },
      {
        title: "Sales funnel / лендинг",
        helps:
          "Хвърляш пари в реклама, но трафикът не се конвертира защото landing-ът е слаб или го няма изобщо.",
        what: "High-converting landing page, A/B testing, форма за лийд, Stripe интеграция, email секвенция.",
        case: "Social Empire — Freedom Blueprint funnel.",
        price: "от 1 500 €",
      },
      {
        title: "Корпоративен / агенция сайт",
        helps:
          "Имаш фирма от 5+ години, но сайтът ти е на WordPress от 2018, не се намира в Google и не привлича запитвания.",
        what: "Multi-language (BG/EN), портфолио, екип, услуги, blog с SEO, integration с CRM.",
        case: "EFI (eufashioninstitute.com) — модна агенция.",
        price: "от 2 000 €",
      },
    ],
  },
  {
    num: "02",
    id: "ai",
    title: "AI асистенти & автоматизация",
    startsAt: "от 800 €",
    intro:
      "Специализирани AI агенти и multi-bot системи. От прости Telegram чатботове до сложни orchestrator системи с инструменти, памет и event-driven изпълнение.",
    services: [
      {
        title: "Telegram / уеб AI чатбот",
        helps:
          "Клиентите ти задават едни и същи въпроси по 30 пъти на ден в Messenger. Губиш по 2-3 часа дневно за support.",
        what: "Custom prompt, контекстна памет, integration с твоите данни (Supabase), Claude или Gemini backend.",
        case: "BOSY Clawbot — продуктови препоръки, AI SDK v6.",
        price: "от 800 €",
      },
      {
        title: "AI Ghost Writer / контент генератор",
        helps:
          "Знаеш че трябва да публикуваш редовно, но след 12-часов работен ден нямаш енергия да измисляш постове.",
        what: "Генерира публикации в твоя tone of voice, с brand guidelines, шаблони, A/B subjects.",
        case: "Founders Club — постове в общността с brand voice.",
        price: "от 1 800 €",
      },
      {
        title: "AI бизнес платформа (multi-bot)",
        helps:
          "Управляваш всичко сам — продажби, support, маркетинг, операции — и нямаш време за стратегия.",
        what: "7+ специализирани бота (sales, support, marketing, ops), orchestrator, user memory, billing.",
        case: "Simora — 6 бота + Stripe + workflow engine.",
        price: "от 6 500 €",
      },
      {
        title: "Voice AI агент",
        helps:
          "Искаш AI асистент който говориш с него директно — за идеи, бележки, анализ на екрана, без да пишеш в чат.",
        what: "Continuous dialog, OpenAI Vision, screen capture, tools (memory, shell, app control), TTS.",
        case: "Voice Face — Electron app с гласов асистент.",
        price: "от 2 200 €",
      },
      {
        title: "AI Reply detection / email triage",
        helps:
          "Пращаш bulk кампании и не знаеш кой е отговорил — пращаш follow-ups на хора които вече са ти писали.",
        what: "Gmail OAuth интеграция, маркира отговорилите контакти, follow-up автоматично пропуска.",
        case: "EFI — намалихме спама от двойни follow-ups при кампании.",
        price: "от 900 €",
      },
      {
        title: "Workflow engine (visual)",
        helps:
          "Имаш сложен бизнес процес (lead → qualify → send → follow-up → book) и го водиш ръчно или с 5 различни инструмента.",
        what: "Mind-map editor за бизнес процеси, event-driven execution, intervals, decision branches.",
        case: "Simora Automation Engine — orchestrator визуализация.",
        price: "от 4 500 €",
      },
    ],
  },
  {
    num: "03",
    id: "scrape",
    title: "Скрейпване & бази с данни",
    startsAt: "от 200 €",
    intro:
      "Извличане на структурирани данни от уебсайтове, генериране на CSV/XML/Google Sheets, multi-language превод, deduplication, geocoding. Подходящо за каталози и B2B контакти.",
    services: [
      {
        title: "Продуктов каталог (1 марка)",
        helps:
          "Получаваш продукти от чужд доставчик, но техният сайт няма български, цените са в евро без ДДС, снимките не са оптимизирани.",
        what: "До 1000 продукта, снимки, спецификации, цени, превод на български. CSV + XML формат.",
        case: "Welder Watch — 391 модела × 25 колони, 7 колекции.",
        price: "от 250 €",
      },
      {
        title: "B2B контакти (1 държава, 1 ниша)",
        helps:
          "Искаш да правиш cold outreach, но нямаш списък с контакти — а да платиш на агенция е скъпо.",
        what: "До 5 000 имейла, телефони, адреси, geocoded по град, dedupliciate, CSV ready за внос.",
        case: "19 186 имейла на спонсори в 14 категории.",
        price: "от 400 €",
      },
      {
        title: "Multi-niche scrape (1 държава)",
        helps:
          "Експанзираш в нова страна и трябва да достигнеш 8+ ниши едновременно (ресторанти, хотели, магазини…).",
        what: "8+ ниши, до 20 000 контакта, паралелизирани процеси, 12-15ч пълно покритие.",
        case: "Германия 10 128 / Италия / Швейцария 19 626 (DE/FR/IT тризично).",
        price: "от 900 €",
      },
      {
        title: "Master contact database setup",
        helps:
          "Имаш контакти в 5 различни CSV-та от години и не знаеш кой е дублиран, кой е отговорил, кой е потенциален клиент.",
        what: "Обединяване на множество CSV-та, нормализиране, chunking, follow-up tracking, replied_at.",
        case: "EFI Master Contacts — 43 886 контакта, 44 chunks, multi-country.",
        price: "от 700 €",
      },
      {
        title: "Custom scraper (специален сайт)",
        helps:
          "Целевият сайт има anti-bot защита, login wall или сложна структура — стандартни инструменти не работят.",
        what: "Сайтове с anti-bot, JS rendering, login walls, специфична структура.",
        price: "от 500 €",
      },
    ],
  },
  {
    num: "04",
    id: "email",
    title: "Имейл маркетинг & кампании",
    startsAt: "от 200 €",
    intro:
      "Setup и управление на bulk email кампании през Resend / GoHighLevel. Включва доставимост, A/B subject rotation, follow-up sequences, reply detection и spam testing.",
    services: [
      {
        title: "Единична кампания (setup)",
        helps:
          "Искаш да пратиш една промоция на 5000 контакта, но не знаеш как да не паднеш в спам и нямаш надежден инструмент.",
        what: "Дизайн на template, segmentация, schedule, доставимост test (Primary/Promotions/Spam).",
        case: "BOSY B2C — 9 580 контакта, WELCOME20 промокод, marketing@.",
        price: "от 250 €",
      },
      {
        title: "Multi-niche campaign система",
        helps:
          "Достигаш до различни сегменти (ресторанти, хотели, магазини) — всеки иска различно послание и follow-up.",
        what: "7+ niche templates × 3 senders, ген 0/3/7/14 follow-ups, plain-text fallback, multi-language.",
        case: "EFI Reality — 12 ниши × 6 езика, ген 1/3/7/14 секвенция.",
        price: "от 1 200 €",
      },
      {
        title: "Subject A/B + rotation",
        helps:
          "Едни и същи subject lines на всеки follow-up — отварянето пада до 5%, изглеждаш като спамър.",
        what: "Никога същия subject 2 пъти на същия контакт, автоматичен tracking, retargeting логика.",
        case: "EFI Subject Rotation — 4 кампании × 953 кандидати.",
        price: "от 400 €",
      },
      {
        title: "Mass send pipeline (15K+)",
        helps:
          "Имаш 15 000+ контакта и трябва да пратиш в 7-дневен прозорец без да хвърчиш в спам.",
        what: "Batch scheduling (30 мин x 85 batch), avoid throttling, cancel script, ген 3/7/14 auto.",
        case: "EFI 25.04 — 15 990 fashion контакти, 7 дни schedule.",
        price: "от 1 500 €",
      },
      {
        title: "Domain warmup & deliverability",
        helps:
          "Новият ти домейн отива право в спам — губиш първите 1000 имейла за нищо.",
        what: "SPF/DKIM/DMARC, MX setup, gradual ramp, blacklist monitoring, reputation tracking.",
        price: "от 500 €",
      },
    ],
  },
  {
    num: "05",
    id: "seo",
    title: "SEO & AI Search оптимизация",
    startsAt: "от 300 €",
    intro:
      "Технически SEO, schema markup, content readiness за AI search engines (ChatGPT, Perplexity, Google AI Overviews). Реални документирани повишения на скоровете в портфолиото.",
    services: [
      {
        title: "Технически SEO одит + fix",
        helps:
          "Сайтът ти не се вижда в Google, не знаеш защо — индексира се бавно, score 30-40, мобилни проблеми.",
        what: "Crawlability, Core Web Vitals, sitemaps, robots.txt, indexing, mobile, HTTPS, canonical.",
        case: "BOSY 34 → ~82, EFI 62 → ~90 (документирани повишения).",
        price: "от 700 €",
      },
      {
        title: "Schema markup (JSON-LD)",
        helps:
          "Конкурентите ти излизат с rich snippets (звезди, цени, FAQ) в Google — твоят сайт е обикновен син линк.",
        what: "Product, NewsArticle, Person, Service, LocalBusiness, FAQ — generated и validated.",
        case: "EFI — Person/Service schema; BOSY — Product schema с EUR.",
        price: "от 400 €",
      },
      {
        title: "AI Search readiness (GEO)",
        helps:
          "ChatGPT и Perplexity отговарят на въпроси за индустрията ти, но не цитират твоя сайт — пропускаш бъдещите търсения.",
        what: "llms.txt, AI crawlers (GPTBot, ClaudeBot, PerplexityBot), passage-citability, brand mentions.",
        case: "EFI и BOSY — двата сайта подготвени за AI Overviews.",
        price: "от 600 €",
      },
      {
        title: "Multi-language / hreflang",
        helps:
          "Имаш версия на 2+ езика, но Google ги дублира или показва грешния език на потребителя.",
        what: "BG ↔ EN ↔ IT ↔ DE правилен hreflang, middleware redirects, country-specific URLs.",
        case: "EFI EN на root, BG на /bg, Accept-Language auto-redirect.",
        price: "от 500 €",
      },
      {
        title: "Programmatic SEO (генерирани страници)",
        helps:
          "Имаш база с 500+ продукти/локации/услуги — ръчно ги слагаш на страници ще отнеме месеци.",
        what: "Шаблонни страници от база данни, internal linking, thin-content guards, sitemap chunks.",
        price: "от 900 €",
      },
    ],
  },
  {
    num: "06",
    id: "visual",
    title: "Визуален контент & реклама",
    startsAt: "от 100 €",
    intro:
      "AI-генерирани продуктови снимки, реклами, видео-Reels, постери и брандинг материали. Higgsfield + Gemini + Seedream + Seedance pipeline.",
    services: [
      {
        title: "Продуктови AI снимки (10 визии)",
        helps:
          "Не можеш да си позволиш фотограф за всеки нов продукт, а телефонните снимки убиват конверсията.",
        what: "Higgsfield Seedream Edit, branded overlays (PIL), brand fonts, multi-variant.",
        case: "ClassicWatches — 10 v3 снимки за 5 бранда.",
        price: "от 350 €",
      },
      {
        title: "Reel hero clips (5 видеа)",
        helps:
          "Reels и TikTok искат видеа всяка седмица, но статичните ти снимки не работят там.",
        what: "Higgsfield Seedance Pro, motion на статични продуктови снимки, готови за IG/TikTok.",
        case: "ClassicWatches — 5 hero clips × 5 бранда без OpenAI.",
        price: "от 500 €",
      },
      {
        title: "Дизайн на банер / постер",
        helps:
          "Трябва ти fast turnaround визия за event, реклама или social post — без да чакаш 2 седмици от агенция.",
        what: "Step-and-repeat banners, social posters, OG images, event визии — full-bleed без crop.",
        case: "FoS 200×200cm photo wall с 15 лога + 4 EFI.",
        price: "от 120 €",
      },
      {
        title: "Brand identity kit",
        helps:
          "Стартираш бранд / ребранднираш — нужен ти е цялостен пакет (лого, цветове, шрифтове, документи) на едно място.",
        what: "Лого, цветова палитра, типография, документ template, guidelines PDF.",
        case: "EFI Luxury Editorial — Playfair + Montserrat, черно/бяло/злато.",
        price: "от 700 €",
      },
      {
        title: "Презентации / документи (PDF)",
        helps:
          "Имаш съдържание (offering, оферта, course outline) — но изглежда като Word документ от 2010.",
        what: "Multi-page PDF, brand-aligned design, без празни места, директно от Chrome headless.",
        case: "EFI Micro-Influencer 29-стр. презентация за обучение.",
        price: "от 250 €",
      },
    ],
  },
  {
    num: "07",
    id: "logistics",
    title: "Логистика & плащания",
    startsAt: "от 400 €",
    intro:
      "Интеграции на български куриерски и платежни услуги в e-commerce flow. Speedy, Еконт, BoxNow, Stripe — тествани end-to-end в production.",
    services: [
      {
        title: "Speedy / Еконт / BoxNow интеграция",
        helps:
          "Клиентите чакат на checkout-а защото няма избор на офис, ти изчисляваш доставка ръчно, печаташ етикети едно по едно.",
        what: "Office picker, cost calculation, label generation, OAuth2, webhook tracking.",
        case: "BOSY — и трите куриера на checkout, real BoxNow API.",
        price: "от 800 €",
      },
      {
        title: "Stripe Checkout + webhook",
        helps:
          "Приемаш плащания, но webhook-а се чупи и не получаваш уведомление за платените поръчки — клиентите чакат с ядосани имейли.",
        what: "Subscription / one-time, webhook за order creation, replay при fail, customer portal.",
        case: "Simora subscriptions, Face of Sofia tickets.",
        price: "от 500 €",
      },
      {
        title: "Order management dashboard",
        helps:
          "Управляваш поръчките през Excel или Google Sheets — пропускаш статуси, не знаеш кое е изпратено, кое не е.",
        what: "Админ панел за поръчки, inline бележки, статуси, печат на label, expedite, refund.",
        case: "BOSY — full e-commerce backend с RLS policies.",
        price: "от 1 000 €",
      },
      {
        title: "Abandoned cart система",
        helps:
          "30-50% от количките се изоставят — губиш продажби на хора които вече са дошли на checkout-а.",
        what: "Cron jobs за reminder емейли, времеви timer, разпознаване на завършени поръчки.",
        case: "BOSY — Easter egg crack + abandoned cart cron.",
        price: "от 400 €",
      },
    ],
  },
  {
    num: "08",
    id: "ops",
    title: "Мониторинг & операции",
    startsAt: "от 200 €",
    intro:
      "Автоматизирани health checks, brand monitoring, daily reports. Получаваш Telegram + email сутрин и вечер за всичко важно.",
    services: [
      {
        title: "Daily health check агент",
        helps:
          "Научаваш за счупен checkout от ядосан клиент в Telegram — час след като е спрял да работи.",
        what: "12+ проверки 2× дневно (signup, checkout, форми, email pipeline), Telegram alert при fail.",
        case: "EFI + Founders Club + BOSY — 08:00 и 17:00 BG.",
        price: "от 400 €",
      },
      {
        title: "Brand monitoring (multi-brand)",
        helps:
          "Имаш 4+ бранда и трябва да следиш SEO, analytics, конкуренти за всеки — нямаш време да обикаляш dashboards.",
        what: "Playwright + SEO + Analytics + competitor scrape — 4+ бранда, automatic fix recommendations.",
        case: "4 бранда мониторинг чрез launchd, auto-fix грешките.",
        price: "от 700 €",
      },
      {
        title: "Storage / egress optimization",
        helps:
          "Vercel / Supabase сметката скочи 5× защото някой не оптимизирал снимките или има infinite loop.",
        what: "next/image config, client-side compress, daily monitor, alert при превишение.",
        case: "EFI — fix на 822 GB egress overage.",
        price: "от 300 €",
      },
      {
        title: "Custom cron-based автоматизации",
        helps:
          "Искаш нещо да се случва автоматично всеки ден / седмица (отчет, scrape, имейл) без да го пускаш ръчно.",
        what: "Vercel cron / launchd, daily / hourly tasks, Telegram + Resend нотификации.",
        price: "от 250 €",
      },
    ],
  },
  {
    num: "09",
    id: "special",
    title: "Специализирани проекти",
    startsAt: "по уговорка",
    intro:
      "По-сложни / multi-disciplinary проекти. Цената се определя след кратко изясняване и план за изпълнение. Включва end-to-end изграждане плюс поддръжка.",
    services: [
      {
        title: "Reality show production system",
        helps:
          "Произвеждаш съдържание като YouTube reality / docu-series — нужен ти е целият production stack като операционна машина.",
        what: "Multi-фазов проект: scrape, sponsorship campaigns, episodic уебсайт, YouTube pipeline, per-city sales funnels (5×4 матрица), tracking на reality рекорди в DB.",
        case: "EFI Reality Show — 3 фази (FoS, Рим, Къщата), Rome FW 7-9 юни.",
        price: "по уговорка",
      },
      {
        title: "Конкурс / реалити full pipeline",
        helps:
          "Организираш голям конкурс / event със стотици кандидати, спонсори, гласуване, продажба на билети, after party.",
        what: "Апликейшън, voting, ticket sales, sponsor packages (Сребърен/Златен/Диамантен), photo wall, after party, push-vote crons, sponsor reply triage.",
        case: "Face of Sofia 2026 — Mazo, OBLK, 953 кандидати.",
        price: "по уговорка",
      },
      {
        title: "Multi-brand digital strategy",
        helps:
          "Управляваш 4+ бранда — всеки със свой Resend, Supabase, Vercel — и операционната работа дублира.",
        what: "Стратегия + изпълнение върху 4+ бранда с обща операционна шина (Resend, Supabase, MCPs). Cross-brand правила, dedicated keys, scoped MCP gateways.",
        case: "Simora / EFI / BOSY / Cara Diamanti / Founders Club.",
        price: "по уговорка",
      },
      {
        title: "MCP / Telegram bot custom integration",
        helps:
          "Искаш да управляваш бизнеса си от Telegram чат — заявки, отчети, поръчки, всичко през AI.",
        what: "OpenClaw scoped gateways, Resend/Supabase/Vercel MCP, Telegram bot с AI Gateway.",
        case: "BOSY MCP setup, @bosy_bitchy_bot webhook.",
        price: "от 1 500 €",
      },
      {
        title: "Course / video / TTS pipeline",
        helps:
          "Имаш курс на английски / видео материали — искаш да ги преведеш и озвучиш на български без actor recording.",
        what: "Транскрипция, ElevenLabs TTS, Remotion видео генерация, английски → български flow.",
        case: "Course pipeline + video-to-audio process.",
        price: "от 1 200 €",
      },
    ],
  },
];

const RETAINER_TIERS = [
  {
    name: "Basic",
    price: "200 €/мес",
    forWho: "За малки сайтове",
    features: [
      "До 4 часа работа на месец",
      "Email response в рамките на 48 ч",
      "Bug fixes (минорни)",
      "Security updates",
      "Месечен health report",
      "Hosting / DNS troubleshooting",
    ],
  },
  {
    name: "Pro",
    price: "500 €/мес",
    forWho: "За active e-commerce / платформи",
    features: [
      "До 12 часа работа на месец",
      "Telegram + email response < 12 ч",
      "Bug fixes & малки нови функции",
      "Daily health checks (cron)",
      "Brand monitoring (1 бранд)",
      "Уикенд support при критични fail-ове",
      "Месечен strategy call (60 мин)",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "1 200 €/мес",
    forWho: "За multi-brand операции",
    features: [
      "До 30 часа работа на месец",
      "Приоритетен Telegram чат < 2 ч",
      "Нови функции & integrations",
      "Multi-brand monitoring (до 4)",
      "24/7 incident response",
      "Седмичен strategy call",
      "Quarterly roadmap планиране",
      "Dedicated Telegram канал",
    ],
  },
];

export default function UslugiPage() {
  return (
    <div>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Каталог услуги · April 2026
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-5xl">
            Дигитално развитие <span className="italic text-[#C9A84C]">и автоматизация</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-[color:var(--muted)]">
            Изграждане на платформи, AI асистенти, маркетинг кампании, скрейпване на данни и операционна автоматизация — с реални клиентски кейсове и доказан резултат.
          </p>
        </div>

        {/* Special offer banner */}
        <section className="mt-10 border border-[#C9A84C] bg-[#0d0d0d] p-6 text-white md:p-8">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[auto_1fr_auto]">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
              Специална оферта
            </div>
            <div>
              <div className="text-2xl font-semibold leading-tight md:text-3xl">
                <span className="italic text-[#C9A84C]">−40%</span> на всички услуги от каталога
              </div>
              <div className="mt-1 text-sm text-white/70">
                при подписан 3-месечен договор за поддръжка (Basic / Pro / Enterprise)
              </div>
            </div>
            <Link
              href="#retainer"
              className="inline-flex bg-[#C9A84C] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#0d0d0d] hover:bg-white"
            >
              Виж пакетите →
            </Link>
          </div>
        </section>

        {/* Top — starting prices grid */}
        <section className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Начални цени по категории</h2>
            <p className="mt-3 text-[color:var(--muted)]">
              Цените са в EUR без ДДС. Точна оферта се определя след 30-минутен безплатен разговор.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="group flex items-center justify-between gap-4 border border-[color:var(--stroke)] bg-white p-5 transition-colors hover:border-[#C9A84C]"
              >
                <div className="flex items-center gap-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] group-hover:text-[#C9A84C]">
                    {c.num}
                  </div>
                  <div className="text-base font-semibold text-[color:var(--text)]">{c.title}</div>
                </div>
                <div className="text-sm font-semibold italic text-[#C9A84C]">{c.startsAt}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Detailed services per category */}
        {CATEGORIES.map((c) => (
          <section key={c.id} id={c.id} className="mt-20 scroll-mt-32">
            <div className="border-t border-[color:var(--stroke)] pt-10">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
                {c.num} · {c.startsAt}
              </div>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-[color:var(--text)] md:text-4xl">
                {c.title}
              </h2>
              <p className="mt-3 max-w-3xl text-[color:var(--muted)]">{c.intro}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {c.services.map((s) => (
                <div
                  key={s.title}
                  className="grid grid-cols-1 gap-4 border border-[color:var(--stroke)] bg-white p-6 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <div className="text-base font-semibold text-[color:var(--text)] md:text-lg">{s.title}</div>
                    <div className="mt-3 border-l-2 border-[#C9A84C] bg-[#faf7f0] px-4 py-3 text-sm leading-6 text-[color:var(--text)]">
                      <span className="font-semibold uppercase tracking-widest text-[#8a7028] text-[10px]">За кого</span>
                      <div className="mt-1">{s.helps}</div>
                    </div>
                    <div className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      <span className="font-semibold text-[color:var(--text)]">Какво получаваш:</span> {s.what}
                    </div>
                    {s.case ? (
                      <div className="mt-2 text-xs italic text-[color:var(--muted-2)]">Кейс: {s.case}</div>
                    ) : null}
                  </div>
                  <div className="md:text-right">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">от</div>
                    <div className="text-2xl font-semibold italic text-[#C9A84C]">{s.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Retainer / Maintenance */}
        <section id="retainer" className="mt-24 scroll-mt-32 border-t border-[color:var(--stroke)] pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
              10 · от 200 €/мес
            </div>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight md:text-4xl">
              Поддръжка <span className="italic">& Retainer</span>
            </h2>
            <p className="mt-3 text-[color:var(--muted)]">
              Месечни пакети след предаване на проекта. При 3-месечен договор —
              <span className="font-semibold text-[#C9A84C]"> автоматично 40% отстъпка </span>
              от всички услуги в каталога за същия период.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {RETAINER_TIERS.map((t) => (
              <div
                key={t.name}
                className={
                  "relative border bg-white p-6 " +
                  (t.recommended
                    ? "border-[#C9A84C] shadow-[0_0_0_1px_#C9A84C]"
                    : "border-[color:var(--stroke)]")
                }
              >
                {t.recommended ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0d0d0d]">
                    Препоръчан
                  </div>
                ) : null}
                <div className="text-2xl font-semibold tracking-tight">{t.name}</div>
                <div className="mt-2 text-3xl font-semibold italic text-[#C9A84C]">{t.price}</div>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[color:var(--muted)]">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-[#C9A84C]">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-xs italic text-[color:var(--muted-2)]">{t.forWho}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-5xl border border-[#C9A84C] bg-[#faf7f0] p-5 text-sm leading-6">
            <div className="font-semibold text-[color:var(--text)]">3-месечен договор → 40% отстъпка</div>
            <ul className="mt-2 list-disc pl-5 text-[color:var(--muted)]">
              <li>Подписваш минимум 3 месеца поддръжка (Basic / Pro / Enterprise) — получаваш −40% на всяка услуга от каталога 01–09 за същия период.</li>
              <li>Пример: E-commerce магазин &bdquo;от 3 500 €&ldquo; става <span className="font-semibold text-[color:var(--text)]">2 100 €</span> + Pro поддръжка 500 €/мес × 3 = общо <span className="font-semibold text-[color:var(--text)]">3 600 €</span> за 3 месеца build + поддръжка.</li>
              <li>Неизползваните часове в текущия месец преминават с 50% в следващия (само при Pro и Enterprise).</li>
              <li>Може да се upgrade-неш / downgrade-неш в края на всеки месец.</li>
            </ul>
          </div>
        </section>

        {/* Process / Conditions */}
        <section className="mt-24 border-t border-[color:var(--stroke)] pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Условия & процес</h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["01 — Безплатно изясняване", "30-минутен разговор за обхват, deadline, технологии и budget. Получаваш конкретна оферта в рамките на 48 часа."],
              ["02 — Изпълнение", "Atomic commits в git, daily updates, staging URL за тестване. Production stack: Next.js 16, Supabase, Vercel, Resend. Всеки deploy се проверява на live URL."],
              ["03 — Предаване", "Документация, environment variables, README, video walkthrough. Repo прехвърлен на твоя GitHub, Vercel project на твоя акаунт. 14-дневен support включен."],
              ["04 — Поддръжка", "След 14-дневния период — retainer от 200 €/месец (до 4 часа) или per-incident. Включва monitoring, security updates, минорни промени."],
            ].map(([t, d]) => (
              <div key={t} className="border border-[color:var(--stroke)] bg-white p-5">
                <div className="text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">{t}</div>
                <div className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{d}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-5xl border border-[#C9A84C] bg-[#faf7f0] p-5 text-sm leading-6">
            <div className="font-semibold text-[color:var(--text)]">Важно</div>
            <ul className="mt-2 list-disc pl-5 text-[color:var(--muted)]">
              <li>Цените са в EUR без ДДС. При фактуриране се добавя 20% ДДС за БГ юридически лица.</li>
              <li>Плащане 50% при стартиране, 50% при предаване. Проекти над 5 000 € — 3 транша.</li>
              <li>Всички 3rd party услуги (Vercel, Supabase, Resend, OpenAI и др.) се заплащат отделно от клиента.</li>
              <li>Каталогът отразява изпълнени проекти от април 2026. Цените може да се актуализират.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 border border-[color:var(--stroke)] bg-[#0d0d0d] p-8 text-white md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-4xl">
              Да започнем <span className="italic text-[#C9A84C]">заедно</span>
            </h2>
            <p className="mx-auto mt-4 text-pretty text-white/70">
              Изпрати кратко описание на проекта и preferred timeline. Отговор в рамките на 24 часа. За спешни проекти — Telegram.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Email</div>
                <a className="mt-1 block text-base hover:text-[#C9A84C]" href="mailto:simeondimitrov@eufashioninstitute.com">
                  simeondimitrov@eufashioninstitute.com
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Местоположение</div>
                <div className="mt-1 text-base">София, България</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Web</div>
                <a className="mt-1 block text-base hover:text-[#C9A84C]" href="https://eufashioninstitute.com" target="_blank">
                  eufashioninstitute.com
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Други брандове</div>
                <div className="mt-1 text-base">simora.bg · bosy.bg · founderclub.bg · caradiamanti.it</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
