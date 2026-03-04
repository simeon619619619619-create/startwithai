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
  {
    date: "2026-01-10",
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
];
