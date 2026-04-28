import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const outputPath = join(process.cwd(), "public", "lifeforge-trading-checklist.pdf");

const width = 612;
const height = 792;
const margin = 56;
const white = "1 1 1";
const muted = "0.72 0.72 0.72";
const gray = "0.2 0.2 0.2";

// Update these brand constants when the offer or Amazon link changes.
const brandName = "LifeForge";
const amazonBookLink =
  "https://www.amazon.ca/Traders-Operating-System-Practical-Discipline/dp/B0GXL4SFBR";

const rules = [
  ["Define Your Risk First", "I know exactly how much I am willing to lose."],
  ["Position Size is Calculated", "My position size matches my predefined risk."],
  ["Stop Loss is Set Before Entry", "I will not move my stop based on emotion."],
  ["Trade Has a Clear Reason", "I can explain this trade in one sentence."],
  ["Entry is Planned, Not Reactive", "I am not chasing price."],
  ["Exit Strategy is Defined", "I know where I will take profit."],
  [
    "Emotional State is Controlled",
    "I am calm, focused, and not trading out of frustration, boredom, or revenge."
  ]
];

function esc(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function text(line, x, y, size = 14, font = "F1", color = white) {
  return `BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${esc(line)}) Tj ET\n`;
}

function line(x1, y1, x2, y2, color = gray, w = 1) {
  return `${color} RG ${w} w ${x1} ${y1} m ${x2} ${y2} l S\n`;
}

function rect(x, y, w, h, color = white, strokeWidth = 1.5) {
  return `${color} RG ${strokeWidth} w ${x} ${y} ${w} ${h} re S\n`;
}

function fillRect(x, y, w, h, color = "0 0 0") {
  return `${color} rg ${x} ${y} ${w} ${h} re f\n`;
}

function wrap(textValue, maxChars) {
  const words = textValue.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function paragraph(copy, x, y, maxChars, size = 16, leading = 26, color = "0.83 0.83 0.83") {
  let out = "";
  let cursor = y;
  for (const part of copy.split("\n")) {
    for (const wrapped of wrap(part, maxChars)) {
      out += text(wrapped, x, cursor, size, "F1", color);
      cursor -= leading;
    }
    cursor -= leading * 0.45;
  }
  return { out, y: cursor };
}

function brand() {
  return text(`${brandName} TRADING CHECKLIST`, margin, height - 70, 10, "F2", muted);
}

function footer() {
  return (
    line(margin, 70, width - margin, 70) +
    text("BUILD SYSTEMS. PROTECT CAPITAL. STAY DISCIPLINED.", margin, 45, 10, "F2", muted)
  );
}

function page(content) {
  return fillRect(0, 0, width, height) + content;
}

function coverPage() {
  return page(
    brand() +
      text("The LifeForge", margin, 520, 54, "F2") +
      text("Trading System", margin, 460, 54, "F2") +
      text("7 Rules to Follow", margin, 385, 22, "F2") +
      text("Before Every Trade", margin, 356, 22, "F2") +
      line(margin, 142, width - margin, 142) +
      text("Build systems. Protect capital. Stay disciplined.", margin, 112, 13, "F2", muted)
  );
}

function introPage() {
  const intro = paragraph(
    "Most traders don't fail because of bad strategies.\nThey fail because they enter trades without a system.\n\nThis checklist forces structure before every decision - so you can trade with clarity instead of emotion.",
    margin,
    530,
    56,
    18,
    29
  );
  return page(brand() + text("Before You Take", margin, 610, 36, "F2") + text("a Trade", margin, 570, 36, "F2") + intro.out + footer());
}

function checkbox(x, y) {
  return rect(x, y, 28, 28) + line(x + 8, y + 15, x + 13, y + 8, white, 2) + line(x + 13, y + 8, x + 22, y + 22, white, 2);
}

function rulesPage(title, items, startIndex) {
  let out = brand() + text(title, margin, 625, 25, "F2") + line(margin, 595, width - margin, 595);
  let y = 535;

  items.forEach(([ruleTitle, copy], index) => {
    out += checkbox(margin, y - 4);
    out += text(`${startIndex + index}. ${ruleTitle}`, margin + 48, y + 9, 18, "F2");
    const para = paragraph(copy, margin + 48, y - 20, 52, 14, 21);
    out += para.out;
    y -= index === items.length - 1 ? 0 : 115;
    if (index < items.length - 1) out += line(margin, y + 40, width - margin, y + 40);
  });

  return page(out + footer());
}

function finalPage() {
  return page(
    brand() +
      text("If you answered NO", 126, 455, 34, "F2", "0.83 0.83 0.83") +
      text("to any of these...", 150, 414, 34, "F2", "0.83 0.83 0.83") +
      rect(104, 315, 404, 78, white, 1.2) +
      text("Do not take the trade.", 139, 342, 32, "F2") +
      footer()
  );
}

function ctaPage() {
  const body = paragraph(
    "This checklist is the foundation.\nThe full LifeForge system shows you how to trade with structure, discipline, and control.",
    margin,
    482,
    58,
    17,
    27
  );
  return page(
    brand() +
      text("Want the", margin, 585, 40, "F2") +
      text("Full System?", margin, 541, 40, "F2") +
      body.out +
      rect(margin, 300, 210, 48, white, 1.2) +
      text("Get the LifeForge Book", margin + 19, 318, 15, "F2") +
      text(amazonBookLink, margin, 268, 12, "F1", muted) +
      footer()
  );
}

const pages = [
  coverPage(),
  introPage(),
  rulesPage("Checklist Rules 1-3", rules.slice(0, 3), 1),
  rulesPage("Checklist Rules 4-7", rules.slice(3), 4),
  finalPage(),
  ctaPage()
];

const objects = [];

function addObject(content) {
  objects.push(content);
  return objects.length;
}

const catalogRef = addObject("<< /Type /Catalog /Pages 2 0 R >>");
const pagesRef = addObject("");
const fontRef = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
const boldFontRef = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

const pageRefs = [];
for (const content of pages) {
  const contentRef = addObject(`<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}endstream`);
  const pageRef = addObject(`<< /Type /Page /Parent ${pagesRef} 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 ${fontRef} 0 R /F2 ${boldFontRef} 0 R >> >> /Contents ${contentRef} 0 R >>`);
  pageRefs.push(pageRef);
}

objects[pagesRef - 1] = `<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let index = 1; index < offsets.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogRef} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, pdf);
console.log(`Generated ${outputPath}`);
