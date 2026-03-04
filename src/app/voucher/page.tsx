import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function VoucherInfoPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href="/program"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)]"
            >
              <span aria-hidden>←</span>
              Назад
            </Link>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Информация</div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-4xl">
            Ваучер за обучение: „Квалификация, умения и кариерно развитие на заети лица“
          </h1>
          <p className="mt-4 text-pretty text-[color:var(--muted)]">
            Това е кратко, практично обяснение на процедурата и как ние помагаме с документите. (Текстът по-долу е подготвен за кандидати.)
          </p>

          <div className="mt-8 border border-[color:var(--stroke)] bg-white p-6">
            <h2 className="text-lg font-semibold text-[color:var(--text)]">Описание</h2>
            <div className="mt-3 space-y-4 text-sm leading-6 text-[color:var(--muted)]">
              <p>Уважаема/и госпожо/господине,</p>
              <p>
                Вие сте отворили Заявлението за предоставяне на ваучер за обучение по П „Развитие на човешките ресурси“ (2021–2027),
                Националния план за възстановяване и устойчивост и Фонда за справедлив преход.
              </p>
              <p>С настоящото Заявление имате възможност да кандидатствате по проект:</p>

              <ul className="list-disc pl-5">
                <li>
                  BG05SFPR002-1.001 „Квалификация, умения и кариерно развитие на заети лица“ — проект, финансиран от Европейския съюз чрез
                  Европейския социален фонд+.
                </li>
              </ul>

              <h3 className="pt-2 font-semibold text-[color:var(--text)]">Начин на получаване на услугата</h3>
              <p>
                След като подадете електронното заявление-декларация, в което да посочите всички необходими данни, след одобрение системата ще
                генерира електронен ваучер, който ще бъде автоматично изпратен на посочената от Вас страна електронна поща, както и на избрания
                от Вас доставчик на обучение (ДОБ). За да бъдете включен/а в обучението, е необходимо да се свържете с ДОБ, който ще ви
                информира допълнително за датата на стартиране на курса и графика на провеждането му.
              </p>

              <div className="border border-[color:var(--stroke)] bg-white p-4">
                <div className="text-sm font-semibold text-[color:var(--text)]">Как помагаме ние</div>
                <ul className="mt-2 list-disc pl-5">
                  <li>Проверка на допустимост и насоки за правилно попълване.</li>
                  <li>Подготовка на пакет документи и координация с доставчик на обучение.</li>
                  <li>Календар и план за 3 месеца: обучение + AI модули + внедряване.</li>
                </ul>
              </div>

              <p className="text-xs text-[color:var(--muted)]">
                Забележка: Тази страница е информационна и не представлява официална публикация на институция.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
