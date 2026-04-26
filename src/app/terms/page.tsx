import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-32 border-t border-[color:var(--stroke)] pt-8">
      <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">{num}</div>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[color:var(--text)] md:text-3xl">{title}</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-[color:var(--muted)]">{children}</div>
    </section>
  );
}

const TOC = [
  ["scope", "01", "Обхват и страни"],
  ["services", "02", "Услуги в обхвата"],
  ["voucher", "03", "Ваучерна програма (опционално)"],
  ["pricing", "04", "Цени и плащане"],
  ["delivery", "05", "Изпълнение и срокове"],
  ["ip", "06", "Интелектуална собственост"],
  ["security", "07", "Сигурност на данните"],
  ["gdpr", "08", "GDPR и лични данни"],
  ["confidentiality", "09", "Конфиденциалност"],
  ["liability", "10", "Отговорност и гаранции"],
  ["cancellation", "11", "Прекратяване и възстановяване"],
  ["dispute", "12", "Спорове и приложимо право"],
  ["changes", "13", "Промени в условията"],
];

export default function TermsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Версия 1.0 · April 2026
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-5xl">
            Условия и сигурност
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-[color:var(--muted)]">
            Прозрачни условия за работа с нас — обхват, цени, отговорности, защита на данните и GDPR. Прочети преди да подпишем договор или да изпратиш заявка през формата за контакт.
          </p>
        </div>

        {/* TOC */}
        <nav className="mx-auto mt-10 max-w-4xl border border-[color:var(--stroke)] bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Съдържание</div>
          <ul className="mt-3 grid grid-cols-1 gap-1 md:grid-cols-2">
            {TOC.map(([id, num, title]) => (
              <li key={id}>
                <a href={`#${id}`} className="flex gap-3 py-1 text-sm text-[color:var(--text)] hover:text-[color:var(--accent)]">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">{num}</span>
                  <span>{title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Section id="scope" num="01" title="Обхват и страни">
          <p>
            Тези условия уреждат отношенията между:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span className="font-semibold text-[color:var(--text)]">Изпълнител:</span> European Fashion Institute (Симеон Димитров,
              физическо лице / еднолично юридическо лице, със седалище в София, България). Контакт: simeondimitrov@eufashioninstitute.com.
            </li>
            <li>
              <span className="font-semibold text-[color:var(--text)]">Клиент:</span> юридическото или физическото лице, което
              изпраща запитване, подписва оферта или сключва договор за услуги.
            </li>
          </ul>
          <p>
            С изпращане на заявка през формата за контакт, имейл или Telegram, клиентът заявява че е прочел и приема настоящите условия.
            Договорни отношения възникват само след писмено потвърждение на оферта от двете страни.
          </p>
        </Section>

        <Section id="services" num="02" title="Услуги в обхвата">
          <p>
            Изпълнителят предоставя дигитални услуги в десет категории, описани в публичния
            <Link href="/uslugi" className="font-semibold text-[color:var(--accent)] underline"> каталог Услуги &amp; Цени</Link>:
          </p>
          <ol className="list-decimal pl-5">
            <li>Уеб платформи &amp; E-commerce</li>
            <li>AI асистенти &amp; автоматизация</li>
            <li>Скрейпване &amp; бази с данни</li>
            <li>Имейл маркетинг &amp; кампании</li>
            <li>SEO &amp; AI Search оптимизация</li>
            <li>Визуален контент &amp; реклама</li>
            <li>Логистика &amp; плащания (куриерски и платежни интеграции)</li>
            <li>Мониторинг &amp; операции</li>
            <li>Специализирани проекти (custom)</li>
            <li>Поддръжка &amp; Retainer (месечни пакети)</li>
          </ol>
          <p>
            Точният обхват на всеки проект се описва в индивидуална оферта (Statement of Work) с конкретни deliverables, технологии,
            срокове и приемателен критерий.
          </p>
        </Section>

        <Section id="voucher" num="03" title="Ваучерна програма (опционално)">
          <p>
            При допустимост, обучителната част от 90-дневния план може да бъде финансирана по проект „Квалификация, умения и кариерно
            развитие на заети лица&ldquo; на Агенция по заетостта (ваучерна схема, ЕСФ+). Това покрива <span className="font-semibold text-[color:var(--text)]">обучението</span>,
            <span className="italic"> не</span> покрива техническото внедряване, лицензите за софтуер и оперативните разходи.
          </p>
          <p>
            Изпълнителят съдейства със заявката, но <span className="font-semibold text-[color:var(--text)]">одобрението е изцяло в правомощията на Агенция по заетостта</span>.
            Изпълнителят не гарантира одобрение и не носи отговорност при отказ.
          </p>
          <p>
            При отказ от АЗ, клиентът може: (а) да заплати обучението по каталог, (б) да премине само към техническо внедряване, (в) да се
            откаже без задължение.
          </p>
        </Section>

        <Section id="pricing" num="04" title="Цени и плащане">
          <ul className="list-disc pl-5">
            <li>Всички цени в каталога са в <span className="font-semibold text-[color:var(--text)]">EUR без ДДС</span>. При фактуриране се добавя 20% ДДС за БГ юридически лица.</li>
            <li>Цените са „<span className="italic">от X €</span>&ldquo; — финална цена се определя след безплатно 30-минутно изясняване и писмена оферта.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Стандартен график на плащане:</span> 50% при стартиране, 50% при предаване.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Проекти над 5 000 €:</span> разбиване на 3 транша (40% / 30% / 30%) спрямо milestone-и.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Retainer пакети:</span> заплащат се месечно предварително, минимум 1 месец.</li>
            <li><span className="font-semibold text-[color:var(--text)]">3rd party услуги</span> (Vercel, Supabase, Resend, OpenAI/Anthropic API, домейни, Stripe такси, Higgsfield, ElevenLabs и др.) се заплащат отделно от клиента, на негов акаунт.</li>
            <li>Закъснение над 14 дни от падеж дава на Изпълнителя право да спре работата до уреждане.</li>
            <li>Каталогът отразява изпълнени проекти от април 2026. Цените може да се актуализират за нови запитвания.</li>
          </ul>
        </Section>

        <Section id="delivery" num="05" title="Изпълнение и срокове">
          <ul className="list-disc pl-5">
            <li><span className="font-semibold text-[color:var(--text)]">Стек по подразбиране:</span> Next.js 16, Supabase, Vercel, Resend (production-ready, скалируеми).</li>
            <li><span className="font-semibold text-[color:var(--text)]">Atomic commits в git</span> с прозрачно проследяване на промените.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Daily / weekly updates</span> в Telegram или имейл според тарифа.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Staging URL</span> за тестване преди production deploy.</li>
            <li><span className="font-semibold text-[color:var(--text)]">14-дневен support</span> след предаване — включен във всеки проект (бъг fix-ове, минорни корекции).</li>
            <li>След 14-те дни — retainer пакет (Basic 200€/мес, Pro 500€/мес, Enterprise 1200€/мес) или per-incident по час.</li>
            <li>Срокове се определят в офертата. Закъснение по вина на Изпълнителя над 14 дни от deadline-а дава право на клиента да поиска корекция или отказ без неустойка.</li>
          </ul>
        </Section>

        <Section id="ip" num="06" title="Интелектуална собственост">
          <ul className="list-disc pl-5">
            <li><span className="font-semibold text-[color:var(--text)]">След пълно заплащане</span> — целият custom код, дизайн, текст и интеграции стават собственост на клиента.</li>
            <li>GitHub repo се прехвърля на акаунт на клиента; Vercel project — на негова организация; домейни — на негов registrar.</li>
            <li>Open-source библиотеки (Next.js, React, Supabase SDK и т.н.) запазват оригиналните си лицензи (MIT, Apache, etc.).</li>
            <li>Изпълнителят запазва правото да използва анонимизирани метрики (без чувствителни данни) в портфолио и казуси, освен ако клиентът изрично откаже в писмена форма.</li>
            <li>Кодова база, шаблони и вътрешни инструменти на Изпълнителя (генератори, scaffolds, internal MCP gateways) <span className="font-semibold text-[color:var(--text)]">остават негова собственост</span> и не се прехвърлят.</li>
          </ul>
        </Section>

        <Section id="security" num="07" title="Сигурност на данните">
          <ul className="list-disc pl-5">
            <li><span className="font-semibold text-[color:var(--text)]">Encrypted in transit:</span> HTTPS / TLS 1.3 за всички production deploy-ове.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Encrypted at rest:</span> Supabase Postgres (AES-256), Vercel storage (AES-256).</li>
            <li><span className="font-semibold text-[color:var(--text)]">Управление на secrets:</span> environment variables в Vercel/Supabase, никога в git.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Принцип на най-малките права (Least privilege):</span> service-role keys се ограничават до конкретни таблици; анонимни клиенти ползват RLS (Row-Level Security) policies.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Authentication:</span> Supabase Auth с криптирани сесии, или OAuth (Google, GitHub) при заявка.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Daily health checks:</span> автоматизирани проверки за compromise, downtime, suspicious traffic.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Backup:</span> Supabase автоматичен daily backup (7 дни retention при Pro tier и нагоре).</li>
            <li><span className="font-semibold text-[color:var(--text)]">Никакви production данни</span> не се копират в local development.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Pre-commit security scans</span> за случайно изтичане на ключове, токени, .env файлове в git.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Incident response:</span> при breach — клиентът се уведомява в рамките на 24 часа, с план за смекчаване и log на засегнати данни.</li>
          </ul>
        </Section>

        <Section id="gdpr" num="08" title="GDPR и лични данни">
          <ul className="list-disc pl-5">
            <li>Изпълнителят е <span className="font-semibold text-[color:var(--text)]">обработващ (Processor)</span> на лични данни от името на клиента (Controller), когато услугата включва събиране/обработка на потребителски данни.</li>
            <li>Подписва се <span className="font-semibold text-[color:var(--text)]">Data Processing Agreement (DPA)</span> при заявка за всеки проект, в който се обработват лични данни.</li>
            <li>Данните се съхраняват в EU/EEA региони на доставчиците (Frankfurt / Stockholm / Dublin), освен ако не е изрично уговорено друго.</li>
            <li>Изпълнителят НЕ предава лични данни на трети страни без писмено съгласие, освен на договорените технически доставчици (Supabase, Vercel, Resend и др.) — те имат собствени GDPR условия и DPA-та.</li>
            <li>Клиентите имат право: на достъп, корекция, изтриване (right to erasure), ограничаване на обработката, преносимост на данните, възражение.</li>
            <li>Запитвания за GDPR права: simeondimitrov@eufashioninstitute.com — отговор в рамките на 30 дни (по GDPR).</li>
            <li>При завършване на договора — данните се връщат на клиента или се изтриват в рамките на 30 дни (по избор на клиента), освен legal hold.</li>
            <li>Бисквитки: сайтът ползва само технически необходими cookies и (опционално) Vercel Analytics с анонимизиран tracking.</li>
          </ul>
        </Section>

        <Section id="confidentiality" num="09" title="Конфиденциалност">
          <p>
            Изпълнителят се задължава да не разкрива на трети лица никаква бизнес информация, до която получава достъп по време на работа
            (стратегии, клиентски списъци, финансови данни, цени, ноу-хау, source code на клиента).
          </p>
          <p>
            Конфиденциалност важи и след прекратяване на договора — за срок от 5 години.
          </p>
          <p>
            При работа с подизпълнители (рядко — само при изрично съгласие на клиента) — те подписват същите клаузи за конфиденциалност.
          </p>
        </Section>

        <Section id="liability" num="10" title="Отговорност и гаранции">
          <ul className="list-disc pl-5">
            <li><span className="font-semibold text-[color:var(--text)]">Гаранция за качество:</span> 14 дни след предаване — всички бъгове, произтичащи от изпълнението, се поправят безплатно.</li>
            <li>Изпълнителят НЕ носи отговорност за: (а) загуби от прекъсване на 3rd party услуги (Vercel/Supabase/Stripe outage), (б) загуби от грешни данни въведени от клиента, (в) последици от ползване на AI-генерирано съдържание без преглед, (г) проблеми поради невнедрени security updates от страна на клиента след предаване.</li>
            <li><span className="font-semibold text-[color:var(--text)]">Лимит на отговорността:</span> до размера на платената сума по конкретния проект през последните 12 месеца. Изключения: умишлено увреждане или груба небрежност от Изпълнителя.</li>
            <li>Force majeure (война, природно бедствие, масов outage на интернет инфраструктура) — освобождава от отговорност.</li>
          </ul>
        </Section>

        <Section id="cancellation" num="11" title="Прекратяване и възстановяване">
          <ul className="list-disc pl-5">
            <li>Клиентът може да прекрати договора по всяко време с писмено уведомление.</li>
            <li><span className="font-semibold text-[color:var(--text)]">При прекратяване по време на проект:</span> заплаща се пропорционално отработената работа до момента (по почасова ставка от 60 €/час за работа извън офертата, или milestone-based).</li>
            <li><span className="font-semibold text-[color:var(--text)]">Без неустойки</span> ако клиентът прекрати в първите 14 дни от подписване на офертата (cooling-off period).</li>
            <li><span className="font-semibold text-[color:var(--text)]">Retainer пакети:</span> прекратяват се с 30-дневно предизвестие в края на текущия месец. Без частични месеци.</li>
            <li>Изпълнителят може да прекрати при: неплащане над 30 дни, нарушение на конфиденциалност от страна на клиента, незаконно използване на услугата, изрично искания за съдържание което нарушава законодателство (бот мрежи, автоматизирани измами и т.н.).</li>
          </ul>
        </Section>

        <Section id="dispute" num="12" title="Спорове и приложимо право">
          <p>
            Тези условия се регулират от законите на Република България.
          </p>
          <p>
            Всеки спор се решава първо чрез добросъвестни преговори (30 дни). При неразрешим спор — компетентен е съответният
            съд в гр. София, България.
          </p>
          <p>
            За потребители (физически лица) — приложимо е и европейското законодателство за защита на потребителите.
          </p>
        </Section>

        <Section id="changes" num="13" title="Промени в условията">
          <p>
            Изпълнителят може да актуализира тези условия за нови проекти. Активни договори се регулират от условията към момента на подписване.
          </p>
          <p>
            При съществени промени — известие в имейла на клиента + 30-дневен grace period преди влизане в сила.
          </p>
          <p className="mt-6 text-xs text-[color:var(--muted-2)]">
            Версия 1.0 · April 2026 · Последна актуализация: 27 април 2026
          </p>
        </Section>

        {/* CTA */}
        <section className="mt-16 border border-[color:var(--accent)] bg-[color:var(--accent)] p-8 text-white md:p-10">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Имаш въпрос за условията?</h2>
              <p className="mt-3 text-white/80">
                Преди да подпишеш каквото и да е — кратък безплатен 30-минутен разговор. Изпрати запитване през контактната форма.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[color:var(--accent)] hover:bg-[#f5f5f5]"
            >
              Контакт →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
