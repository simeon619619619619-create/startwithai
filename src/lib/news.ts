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
const NEWS_RAW: NewsItem[] = [
  {
    date: "2026-03-01",
    title: "Европейски AI Office: център на експертиза за внедряване",
    excerpt:
      "Европейският AI Office координира експертизата и прилагането на политики за изкуствен интелект в ЕС. За бизнеса това означава по-ясна рамка и доверие при внедряване. Ние следваме принципите за сигурност и съответствие в реални автоматизации.",
    sourceLabel: "Digital Strategy (EC)",
    url: "https://digital-strategy.ec.europa.eu/en/policies/ai-office",
    imageUrl:
      "https://images.unsplash.com/photo-1526378722447-4a5bb62b5f83?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Европейска дигитална екосистема",
  },
  {
    date: "2026-02-15",
    title: "AI Act: регулаторна рамка и риск-базиран подход",
    excerpt:
      "Официално описание на AI Act и модела с 4 нива на риск. Това помага на фирмите да преценят какво е допустимо и как да структурират процеси за контрол. В програмата превеждаме регулацията в практични стъпки за внедряване.",
    sourceLabel: "Digital Strategy (EC)",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Правна рамка и документи",
  },
  {
    date: "2025-11-01",
    title: "Политика на ЕС: изкуствен интелект (overview)",
    excerpt:
      "Официален обзор на европейските политики, приоритети и инициативи за AI. Полезен контекст за фирми, които искат да внедряват автоматизации устойчиво и в съответствие с изискванията. Ние превеждаме тези принципи в практични процеси.",
    sourceLabel: "Digital Strategy (EC)",
    url: "https://digital-strategy.ec.europa.eu/en/policies/artificial-intelligence",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Технологии и мрежи",
  },
  {
    date: "2025-02-20",
    title: "ЕС и AI Act: какво означава за бизнеса",
    excerpt:
      "Европейският съюз въведе правила за безопасно и отговорно използване на AI — първи в света по рода си. Това повишава доверието и улеснява избора на устойчиви решения. В програмата прилагаме принципи на GDPR и добри практики за сигурност.",
    sourceLabel: "Европейски парламент",
    url: "https://www.europarl.europa.eu/topics/bg/article/20230601STO93804/zakon-za-izkustveniya-intelekt-na-es",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Европейски флагове",
  },
  {
    date: "2024-08-01",
    title: "Текст на AI Act (EUR-Lex) — официален документ",
    excerpt:
      "Официалната публикация на регламента в EUR-Lex. Добър референтен източник за правни екипи и мениджъри, които искат точната формулировка на изискванията. За внедряване в МСП важни са правилната класификация и процесите за съответствие.",
    sourceLabel: "EUR-Lex",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Документи и правна рамка",
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

export const NEWS: NewsItem[] = [...NEWS_RAW].sort((a, b) => b.date.localeCompare(a.date));
