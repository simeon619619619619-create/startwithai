export type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
  sourceLabel: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
};

// NOTE: URLs provided by Simeon. Some institutional sites may block automated fetching,
// but links are intended to open in a new tab as external official sources.
export const NEWS: NewsItem[] = [
  {
    date: "2026-02-26",
    title: "Официално: старт на ваучерната схема за дигитални умения",
    excerpt:
      "Агенция по заетостта стартира приема на заявления за безплатни ваучери за обучение на заети лица. Това е ключов механизъм за модернизация на екипи без собствен разход. В програмата комбинираме обучението с реално AI внедряване.",
    sourceLabel: "Агенция по заетостта",
    url: "https://www.az.government.bg/bg/news/startira-priemat-na-zayavleniya-za-vaucheri-4138/",
    imageUrl:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Екип в офис среда",
  },
  {
    date: "2025-11-20",
    title: "Пътна карта за дигитална трансформация на България (2030)",
    excerpt:
      "Националните цели за дигитализация очертават посока за внедряване на технологии и развитие на компетенции. За МСП това означава по-лесен достъп до знания, инструменти и подкрепа. Програмата ни е построена върху този прагматичен подход.",
    sourceLabel: "МТИТС",
    url: "https://www.mtitc.government.bg/bg/category/86/cifrova-transformaciya-na-bulgariya-za-perioda-2020-2030",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Лаптоп и код",
  },
  {
    date: "2025-02-20",
    title: "ЕС и AI Act: първа регулация за изкуствения интелект",
    excerpt:
      "Европейският съюз въвежда рамка за безопасно и отговорно използване на AI. Това повишава доверието и улеснява бизнеса в избора на устойчиви решения. Ние прилагаме принципи на GDPR и добри практики за сигурност при внедряване.",
    sourceLabel: "Европейски парламент",
    url: "https://www.europarl.europa.eu/news/bg/headlines/society/20230601STO93804/zakon-za-izkustveniya-intelekt-na-es",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Европейски флагове",
  },
  {
    date: "2026-02-24",
    title: "Подкрепа за МСП: конкурентоспособност и иновации",
    excerpt:
      "Финансирането за софтуерни решения и иновации позволява на фирмите да ускорят процеси и да повишат продуктивността. В контекста на AI това означава по-бързо внедряване на автоматизации. Ние превеждаме бизнеса през процеса от оценка до реална интеграция.",
    sourceLabel: "Министерство на иновациите",
    url: "https://www.mig.gov.bg/programi-i-proekti/pkiep/",
    imageUrl:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Бизнес среща",
  },
  {
    date: "2024-01-15",
    title: "AI и продуктивност: защо преквалификацията е приоритет",
    excerpt:
      "AI ускорява офис и оперативни процеси, но реалният ефект идва, когато екипът е обучен. Затова комбинираме официално обучение с практични AI модули и внедряване. Резултатът се измерва в спестени часове и по-бързи решения.",
    sourceLabel: "World Economic Forum",
    url: "https://www.weforum.org/agenda/2024/01/ai-productivity-economic-growth/",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Екипна работа в офис",
  },
  {
    date: "2019-04-08",
    title: "Етика и доверие: насоки за trustworthy AI",
    excerpt:
      "Европейските етични насоки за trustworthy AI поставят фокус върху законност, етичност и техническа устойчивост. Това е базата за внедряване на AI в бизнес среда без компромис със сигурността. Прилагаме принципите като част от нашия процес.",
    sourceLabel: "Европейска комисия",
    url: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Киберсигурност и данни",
  },
];
