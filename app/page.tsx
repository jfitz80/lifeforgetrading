import { SubscribeForm } from "./subscribe-form";

const principles = [
  "Risk before return",
  "Process before prediction",
  "Skill before urgency"
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Life For Trading</p>
          <h1 id="hero-title">The Trader&apos;s Operating System</h1>
          <p className="subtitle">
            A practical guide to risk, discipline, and long-term market skill.
          </p>
          <p className="intro">
            Built for traders who want a repeatable framework instead of
            another rush of signals, hot takes, or fragile confidence.
          </p>

          <SubscribeForm />

          <div className="principles" aria-label="Book principles">
            {principles.map((principle) => (
              <span key={principle}>{principle}</span>
            ))}
          </div>
        </div>

        <div className="book-stage" aria-label="Book cover preview">
          <div className="book">
            <div className="book-spine" />
            <div className="book-cover">
              <p className="cover-kicker">Life For Trading</p>
              <h2>The Trader&apos;s Operating System</h2>
              <p>Risk. Discipline. Long-term market skill.</p>
              <span>John Fitzpatrick</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
