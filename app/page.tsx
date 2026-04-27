import { KitForm } from "./kit-form";

export default function Home() {
  return (
    <main className="page-shell" aria-labelledby="hero-title">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Life For Trading</p>
          <h1 id="hero-title">
            Most Traders Don&apos;t Need a Better Strategy.
            <br />
            They Need a System.
          </h1>

          <p className="subtitle">
            Download the 7-rule checklist that eliminates emotional trades and
            protects your capital.
          </p>

          <KitForm />

          <div className="book-cta">
            <p>Want the full system?</p>
            <a
              href="https://www.amazon.ca/Traders-Operating-System-Practical-Discipline/dp/B0GXL4SFBR"
              aria-label="Get The Trader's Operating System book on Amazon"
            >
              Get the Book
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
