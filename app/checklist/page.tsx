import type { Metadata } from "next";
import styles from "./checklist.module.css";

export const metadata: Metadata = {
  title: "The LifeForge Trading System Checklist",
  description: "A 7-rule pre-trade checklist from LifeForge."
};

const brandName = "LifeForge";
// Update this when the final Amazon or store URL changes.
const amazonBookLink =
  "https://www.amazon.ca/Traders-Operating-System-Practical-Discipline/dp/B0GXL4SFBR";

const rules = [
  {
    title: "Define Your Risk First",
    copy: "I know exactly how much I am willing to lose."
  },
  {
    title: "Position Size is Calculated",
    copy: "My position size matches my predefined risk."
  },
  {
    title: "Stop Loss is Set Before Entry",
    copy: "I will not move my stop based on emotion."
  },
  {
    title: "Trade Has a Clear Reason",
    copy: "I can explain this trade in one sentence."
  },
  {
    title: "Entry is Planned, Not Reactive",
    copy: "I am not chasing price."
  },
  {
    title: "Exit Strategy is Defined",
    copy: "I know where I will take profit."
  },
  {
    title: "Emotional State is Controlled",
    copy:
      "I am calm, focused, and not trading out of frustration, boredom, or revenge."
  }
];

function BrandMark() {
  // Update the brand text here if LifeForge changes.
  return <p className={styles.brand}>{brandName} Trading Checklist</p>;
}

function Footer() {
  return <p className={styles.footer}>Build systems. Protect capital. Stay disciplined.</p>;
}

function RuleItem({
  index,
  title,
  copy
}: {
  index: number;
  title: string;
  copy: string;
}) {
  return (
    <article className={styles.rule}>
      <span className={styles.checkbox} aria-hidden="true" />
      <div>
        <h3>
          {index}. {title}
        </h3>
        <p>{copy}</p>
      </div>
    </article>
  );
}

export default function ChecklistPage() {
  return (
    <main className={styles.screen}>
      <nav className={styles.toolbar} aria-label="Checklist actions">
        <a href="/lifeforge-trading-checklist.pdf" download>
          Download PDF
        </a>
        <a href="/">Back to Site</a>
      </nav>

      <div className={styles.document}>
        <section className={styles.page}>
          <div className={`${styles.pageInner} ${styles.cover}`}>
            <BrandMark />
            <h1 className={styles.coverTitle}>The LifeForge Trading System</h1>
            <p className={styles.coverSubtitle}>7 Rules to Follow Before Every Trade</p>
            <p className={styles.tagline}>Build systems. Protect capital. Stay disciplined.</p>
          </div>
        </section>

        <section className={styles.page}>
          <div className={styles.pageInner}>
            <BrandMark />
            <h2 className={styles.heading}>Before You Take a Trade</h2>
            <div className={styles.introBody}>
              <p className={styles.body}>
                Most traders don&apos;t fail because of bad strategies.
                <br />
                They fail because they enter trades without a system.
              </p>
              <p className={styles.body}>
                This checklist forces structure before every decision - so you can
                trade with clarity instead of emotion.
              </p>
            </div>
            <Footer />
          </div>
        </section>

        <section className={styles.page}>
          <div className={styles.pageInner}>
            <BrandMark />
            <h2 className={styles.rulesHeading}>Checklist Rules 1-3</h2>
            {rules.slice(0, 3).map((rule, index) => (
              <RuleItem key={rule.title} index={index + 1} {...rule} />
            ))}
            <Footer />
          </div>
        </section>

        <section className={styles.page}>
          <div className={styles.pageInner}>
            <BrandMark />
            <h2 className={styles.rulesHeading}>Checklist Rules 4-7</h2>
            {rules.slice(3).map((rule, index) => (
              <RuleItem key={rule.title} index={index + 4} {...rule} />
            ))}
            <Footer />
          </div>
        </section>

        <section className={styles.page}>
          <div className={`${styles.pageInner} ${styles.finalRule}`}>
            <BrandMark />
            <p className={styles.finalText}>If you answered NO to any of these...</p>
            <p className={styles.doNotTrade}>Do not take the trade.</p>
            <Footer />
          </div>
        </section>

        <section className={styles.page}>
          <div className={`${styles.pageInner} ${styles.ctaPage}`}>
            <BrandMark />
            <h2 className={styles.ctaHeading}>Want the Full System?</h2>
            <p className={styles.ctaBody}>
              This checklist is the foundation.
              <br />
              The full LifeForge system shows you how to trade with structure,
              discipline, and control.
            </p>
            <a className={styles.ctaButton} href={amazonBookLink}>
              Get the LifeForge Book
            </a>
            <a className={styles.placeholder} href={amazonBookLink}>
              {amazonBookLink}
            </a>
            <Footer />
          </div>
        </section>
      </div>
    </main>
  );
}
