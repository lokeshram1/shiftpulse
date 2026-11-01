import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "C:/Users/lokar/OneDrive/Documents/ChatGPT/webiste/presentation_build/output";
await fs.mkdir(OUT, { recursive: true });

const navy = "#0B1220", navy2 = "#121C2D", orange = "#FF6B4A", white = "#F8FAFC", muted = "#A9B4C3", green = "#41C58A", yellow = "#F2C94C", red = "#F05B63", blue = "#6EA8FE", line = "#314056";
const pres = Presentation.create({ slideSize: { width: 1280, height: 720 } });

function shape(slide, geometry, position, fill = "none", stroke = "none", width = 0) {
  return slide.shapes.add({ geometry, position, fill, line: { style: "solid", fill: stroke, width } });
}
function text(slide, value, position, style = {}) {
  const s = slide.shapes.add({ geometry: "textbox", position, text: { text: value }, fill: "none", line: { style: "solid", fill: "none", width: 0 } });
  s.text.style = { fontFamily: "Aptos", fontSize: 18, color: white, ...style };
  return s;
}
function base(slide, number, title, kicker = "AEROMITRA | AI-POWERED SOCIAL LISTENING") {
  slide.background.fill = navy;
  shape(slide, "rect", { left: 0, top: 0, width: 14, height: 720 }, orange, orange, 0);
  text(slide, kicker, { left: 56, top: 28, width: 560, height: 22 }, { fontSize: 12, bold: true, color: orange });
  text(slide, title, { left: 56, top: 65, width: 1040, height: 54 }, { fontSize: 34, bold: true, color: white, fontFamily: "Aptos Display" });
  text(slide, String(number).padStart(2, "0"), { left: 1160, top: 35, width: 68, height: 42 }, { fontSize: 22, bold: true, color: orange, align: "right" });
  shape(slide, "rect", { left: 56, top: 128, width: 1168, height: 1 }, line, line, 0);
  text(slide, "Educational prototype | AeroMitra is fictional | No response is published without human approval", { left: 56, top: 688, width: 1000, height: 18 }, { fontSize: 10, color: muted });
}
function card(slide, x, y, w, h, heading, body, accent = orange) {
  shape(slide, "roundRect", { left: x, top: y, width: w, height: h }, navy2, line, 1);
  shape(slide, "rect", { left: x, top: y, width: 5, height: h }, accent, accent, 0);
  text(slide, heading, { left: x + 22, top: y + 18, width: w - 42, height: 28 }, { fontSize: 19, bold: true, color: white });
  text(slide, body, { left: x + 22, top: y + 58, width: w - 42, height: Math.max(20, h - 72) }, { fontSize: 15, color: muted, breakLine: true });
}
function metric(slide, x, y, w, value, label, accent = orange) {
  text(slide, value, { left: x, top: y, width: w, height: 48 }, { fontSize: 31, bold: true, color: accent });
  text(slide, label, { left: x, top: y + 49, width: w, height: 36 }, { fontSize: 14, color: muted });
}
function bar(slide, x, y, label, value, max, color) {
  text(slide, label, { left: x, top: y, width: 220, height: 24 }, { fontSize: 15, color: white });
  shape(slide, "roundRect", { left: x + 235, top: y + 4, width: 390, height: 18 }, "#243149", "none", 0);
  shape(slide, "roundRect", { left: x + 235, top: y + 4, width: Math.max(8, 390 * value / max), height: 18 }, color, "none", 0);
  text(slide, `${(value * 100).toFixed(1)}%`, { left: x + 645, top: y - 1, width: 80, height: 24 }, { fontSize: 14, bold: true, color: color, align: "right" });
}

// 1 Cover
{
  const s = pres.slides.add(); s.background.fill = navy;
  shape(s, "rect", { left: 0, top: 0, width: 16, height: 720 }, orange, orange, 0);
  text(s, "FOUNDATIONS OF AI FOR BUSINESS", { left: 72, top: 76, width: 450, height: 24 }, { fontSize: 15, bold: true, color: orange });
  text(s, "AI-Powered Social Listening\nand Crisis Response", { left: 72, top: 166, width: 820, height: 130 }, { fontSize: 49, bold: true, color: white, fontFamily: "Aptos Display" });
  text(s, "AeroMitra | A decision-support prototype for an Indian airline", { left: 76, top: 344, width: 760, height: 34 }, { fontSize: 22, color: muted });
  shape(s, "rect", { left: 76, top: 430, width: 630, height: 2 }, orange, orange, 0);
  text(s, "Detect what may spread.\nGround the response. Keep a person accountable.", { left: 76, top: 468, width: 670, height: 84 }, { fontSize: 20, color: white });
  text(s, "IIM MBA project presentation\n28 October 2026", { left: 920, top: 560, width: 250, height: 52 }, { fontSize: 15, color: muted, align: "right" });
}

// 2 Executive summary
{
  const s = pres.slides.add(); base(s, 2, "Executive summary");
  text(s, "The prototype turns a noisy social feed into a prioritised human work queue.", { left: 56, top: 160, width: 1120, height: 36 }, { fontSize: 24, bold: true, color: white });
  card(s, 56, 230, 350, 200, "Business need", "Airlines receive routine mentions, service complaints and a small number of posts that can become public incidents. Response capacity is limited.", orange);
  card(s, 465, 230, 350, 200, "AI contribution", "An LLM classifies the post. A virality model estimates spread. Policy retrieval constrains the draft reply.", blue);
  card(s, 874, 230, 350, 200, "Management choice", "Use AI to prioritise and draft. Keep crisis escalation and public release with a human reviewer.", green);
  metric(s, 86, 500, 210, "0.7209", "selected model recall", orange);
  metric(s, 360, 500, 210, "1,159", "held-out test posts", blue);
  metric(s, 635, 500, 210, "6", "guardrail tests passed", green);
  metric(s, 910, 500, 220, "P1", "no automatic reply", red);
}

// 3 Problem
{
  const s = pres.slides.add(); base(s, 3, "The operating problem");
  text(s, "The cost of a missed crisis is not the same as the cost of an unnecessary review.", { left: 56, top: 160, width: 1080, height: 42 }, { fontSize: 25, bold: true, color: white });
  card(s, 56, 240, 360, 250, "Volume", "Most mentions are routine. Manual teams cannot read every post with equal attention.", orange);
  card(s, 460, 240, 360, 250, "Asymmetry", "A missed safety, discrimination or legal issue can escalate before the brand reacts. A false alarm mainly consumes review time.", red);
  card(s, 864, 240, 360, 250, "Control", "A fluent LLM reply can create new risk if it promises compensation, exposes booking details or invents policy.", yellow);
  text(s, "Decision to support", { left: 56, top: 550, width: 210, height: 28 }, { fontSize: 16, bold: true, color: orange });
  text(s, "Which posts deserve attention now, and what reply—if any—is safe to prepare?", { left: 260, top: 546, width: 870, height: 38 }, { fontSize: 23, color: white });
}

// 4 Architecture
{
  const s = pres.slides.add(); base(s, 4, "System architecture");
  const y = 265, w = 190, h = 110, gap = 28, xs = [56, 274, 492, 710, 928];
  const labels = ["Social post", "Guardrails", "LLM tags", "Virality +\ncrisis score", "Decision queue"];
  const bodies = ["English, Hindi\nor Hinglish", "Mask PII\nignore injections", "Sentiment, topic,\nseverity, urgency", "Spread probability\nP1 / P2 / P3", "Reply, escalate,\nno reply"];
  const colors = [orange, blue, yellow, red, green];
  for (let i = 0; i < xs.length; i++) { card(s, xs[i], y, w, h, labels[i], bodies[i], colors[i]); if (i < xs.length - 1) { shape(s, "rect", { left: xs[i] + w + 6, top: y + 52, width: gap - 12, height: 3 }, orange, orange, 0); } }
  card(s, 240, 480, 800, 112, "Policy-grounded response", "ChromaDB retrieves relevant AeroMitra policies. The LLM drafts only within that context. A human Approve, Edit or Reject action is required.", orange);
  text(s, "Core principle", { left: 56, top: 165, width: 160, height: 26 }, { fontSize: 16, bold: true, color: orange });
  text(s, "The system recommends attention and prepares language. It does not publish on its own.", { left: 230, top: 160, width: 920, height: 34 }, { fontSize: 23, color: white });
}

// 5 Data
{
  const s = pres.slides.add(); base(s, 5, "Data and evaluation design");
  card(s, 56, 170, 540, 210, "Virality model data", "6,000 synthetic posts\n4,841 train | 1,159 held-out test\nTarget: spread\nInputs: text, language, issue, sentiment, severity and synthetic account metadata\nOutcome field retweets_24h excluded to prevent leakage", orange);
  card(s, 640, 170, 584, 210, "LLM evaluation data", "635 synthetic English, Hindi and Hinglish posts\nGold labels for sentiment, issue type, severity and escalation\nHeld-out evaluation sample protects against prompt tuning on the test set", blue);
  text(s, "What good evidence looks like", { left: 56, top: 445, width: 320, height: 28 }, { fontSize: 19, bold: true, color: orange });
  text(s, "A model result is useful only when the test set is untouched, the target is defined before training, and failure costs are explicit.", { left: 56, top: 490, width: 1060, height: 52 }, { fontSize: 22, color: white });
  text(s, "Limitation: the data is synthetic and should demonstrate the pipeline, not represent production airline behaviour.", { left: 56, top: 585, width: 1050, height: 28 }, { fontSize: 15, color: yellow });
}

// 6 Model comparison
{
  const s = pres.slides.add(); base(s, 6, "Model comparison and selection");
  text(s, "We select for crisis coverage, not headline accuracy.", { left: 56, top: 160, width: 900, height: 34 }, { fontSize: 24, bold: true, color: white });
  text(s, "Recall", { left: 56, top: 220, width: 130, height: 24 }, { fontSize: 16, bold: true, color: muted });
  bar(s, 56, 260, "Logistic Regression", 0.6977, 1, blue);
  bar(s, 56, 315, "SGD Classifier", 0.7209, 1, orange);
  text(s, "Precision", { left: 56, top: 390, width: 130, height: 24 }, { fontSize: 16, bold: true, color: muted });
  bar(s, 56, 430, "Logistic Regression", 0.3069, 1, blue);
  bar(s, 56, 485, "SGD Classifier", 0.2851, 1, orange);
  card(s, 820, 220, 365, 290, "Selected for the app", "SGD Classifier\n\nRecall 72.1%\nPrecision 28.5%\nF1 40.9%\n\nIt catches more spreading posts while meeting the precision floor used for selection.", orange);
  text(s, "Majority baseline: precision 0.0% | recall 0.0% | F1 0.0%", { left: 56, top: 590, width: 700, height: 24 }, { fontSize: 14, color: muted });
}

// 7 LLM and RAG
{
  const s = pres.slides.add(); base(s, 7, "Generative AI: grounded classification and reply drafting");
  card(s, 56, 175, 350, 285, "Classify", "Structured JSON\nLanguage\nSentiment\nIssue type\nSeverity\nUrgency\nEscalation\nConfidence", blue);
  card(s, 465, 175, 350, 285, "Retrieve", "ChromaDB indexes six policy sections. The reply prompt receives only the most relevant policy context and the post.", orange);
  card(s, 874, 175, 350, 285, "Constrain", "60-word limit\nNo booking details\nNo money promises\nNo blame\nNo liability admission\nP1 requires human review", green);
  text(s, "Evaluation plan", { left: 56, top: 520, width: 180, height: 26 }, { fontSize: 17, bold: true, color: orange });
  text(s, "Compare LLM labels against held-out gold labels. Report macro F1, escalation recall, invalid JSON rate, unsafe misses and representative failure examples.", { left: 250, top: 515, width: 900, height: 42 }, { fontSize: 21, color: white });
  text(s, "Live LLM metrics should be populated after the rotated Groq key and current model are configured.", { left: 56, top: 600, width: 950, height: 24 }, { fontSize: 14, color: yellow });
}

// 8 Decision policy
{
  const s = pres.slides.add(); base(s, 8, "Decision policy and human checkpoint");
  text(s, "Crisis Score = 50% severity + 30% spread probability + 20% negativity", { left: 56, top: 160, width: 1080, height: 34 }, { fontSize: 23, bold: true, color: white });
  const rows = [
    ["P1", "Safety, medical, discrimination, legal/media threat or score ≥ 70", "Crisis alert; no automatic reply", red],
    ["P2", "Score 40–69 or escalation signal", "Draft reply enters approval queue", yellow],
    ["P3", "Routine, praise or general query", "Short draft or no reply", green],
  ];
  let y = 240;
  for (const [p, trigger, action, color] of rows) { shape(s, "roundRect", { left: 56, top: y, width: 100, height: 72 }, color, "none", 0); text(s, p, { left: 56, top: y + 20, width: 100, height: 30 }, { fontSize: 25, bold: true, color: navy, align: "center" }); text(s, trigger, { left: 184, top: y + 12, width: 500, height: 46 }, { fontSize: 17, color: white }); text(s, action, { left: 735, top: y + 12, width: 390, height: 46 }, { fontSize: 17, bold: true, color: color }); y += 100; }
  card(s, 56, 560, 1120, 92, "Human checkpoint", "No public response leaves the system without Approve, Edit or Reject. P1 cases require a human holding response.", orange);
}

// 9 Demo
{
  const s = pres.slides.add(); base(s, 9, "Demo walkthrough");
  text(s, "Four posts show the operating range of the system.", { left: 56, top: 160, width: 850, height: 34 }, { fontSize: 24, bold: true, color: white });
  const demos = [
    ["01", "Routine query", "Cabin baggage limit?", "Neutral | P3 | Point to app", green],
    ["02", "Complaint", "Refund pending for 30 days", "Negative | Draft DM request", yellow],
    ["03", "Crisis alert", "Wheelchair support complaint", "Discrimination | P1 | Human review", red],
    ["04", "Edge case", "Sarcastic Hinglish delay post", "Negative despite sarcasm", orange],
  ];
  let y = 225;
  for (const [num, heading, post, result, color] of demos) { text(s, num, { left: 62, top: y + 5, width: 55, height: 34 }, { fontSize: 22, bold: true, color }); text(s, heading, { left: 142, top: y, width: 260, height: 28 }, { fontSize: 19, bold: true, color: white }); text(s, post, { left: 420, top: y, width: 400, height: 28 }, { fontSize: 17, color: muted }); text(s, result, { left: 860, top: y, width: 330, height: 28 }, { fontSize: 16, bold: true, color }); shape(s, "rect", { left: 56, top: y + 52, width: 1130, height: 1 }, line, line, 0); y += 92; }
  text(s, "The demo makes the human decision visible, rather than presenting the AI as an autonomous agent.", { left: 56, top: 620, width: 1000, height: 28 }, { fontSize: 18, color: white });
}

// 10 Business case
{
  const s = pres.slides.add(); base(s, 10, "Business case and operating recommendation");
  text(s, "Rent the foundation model. Build the decision layer and controls.", { left: 56, top: 160, width: 1100, height: 36 }, { fontSize: 25, bold: true, color: white });
  card(s, 56, 230, 350, 235, "Buy", "Enterprise social listening suite\n\nStrength: mature integrations and support\nTrade-off: less control over policy logic and cost", blue);
  card(s, 465, 230, 350, 235, "Rent", "Hosted LLM and managed infrastructure\n\nStrength: fast prototyping and variable cost\nTrade-off: privacy, model availability and rate limits", orange);
  card(s, 874, 230, 350, 235, "Build", "AeroMitra decision layer\n\nStrength: transparent thresholds, policy rules and approval workflow\nTrade-off: maintenance and governance effort", green);
  text(s, "Recommendation", { left: 56, top: 540, width: 170, height: 26 }, { fontSize: 17, bold: true, color: orange });
  text(s, "Pilot with rented model capacity and a small internal review team. Scale only after real-data validation, privacy review, and evidence that alert quality improves response time.", { left: 245, top: 535, width: 930, height: 55 }, { fontSize: 21, color: white });
}

// 11 Responsible AI
{
  const s = pres.slides.add(); base(s, 11, "Responsible AI and limitations");
  card(s, 56, 175, 350, 260, "Data risk", "Synthetic labels may not reflect real airline behaviour. Hinglish, sarcasm and language mixing can reduce model reliability.", yellow);
  card(s, 465, 175, 350, 260, "Model risk", "False alarms consume PR capacity. Missed high-spread negative posts delay action. Spread is a proxy, not the same as a crisis.", red);
  card(s, 874, 175, 350, 260, "Generation risk", "A fluent reply can still hallucinate a promise or cite the wrong policy. Grounding and validation reduce, but do not eliminate, that risk.", orange);
  text(s, "Before going live", { left: 56, top: 520, width: 220, height: 28 }, { fontSize: 18, bold: true, color: orange });
  text(s, "Validate on real permitted data. Test across languages. Add access-controlled audit logs. Review privacy terms. Keep human approval for every public response.", { left: 56, top: 565, width: 1120, height: 48 }, { fontSize: 20, color: white });
}

// 12 Conclusion
{
  const s = pres.slides.add(); s.background.fill = navy;
  shape(s, "rect", { left: 0, top: 0, width: 14, height: 720 }, orange, orange, 0);
  text(s, "MANAGERIAL TAKEAWAY", { left: 72, top: 78, width: 350, height: 22 }, { fontSize: 14, bold: true, color: orange });
  text(s, "Use AI to focus attention.\nKeep accountability human.", { left: 72, top: 180, width: 860, height: 126 }, { fontSize: 49, bold: true, color: white, fontFamily: "Aptos Display" });
  text(s, "AeroMitra demonstrates a practical operating model for social listening: detect, prioritise, ground, draft and review.", { left: 76, top: 365, width: 820, height: 58 }, { fontSize: 23, color: muted });
  shape(s, "rect", { left: 76, top: 480, width: 630, height: 2 }, orange, orange, 0);
  text(s, "Questions", { left: 76, top: 515, width: 260, height: 34 }, { fontSize: 26, bold: true, color: orange });
  text(s, "Educational prototype | AeroMitra is fictional", { left: 76, top: 650, width: 650, height: 24 }, { fontSize: 14, color: muted });
}

for (const [i, slide] of pres.slides.items.entries()) {
  const png = await pres.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(`${OUT}/slide-${String(i + 1).padStart(2, "0")}.png`, new Uint8Array(await png.arrayBuffer()));
}
const pptx = await PresentationFile.exportPptx(pres);
await pptx.save(`${OUT}/AeroMitra_MBA_Presentation.pptx`);
console.log(JSON.stringify({ slides: pres.slides.items.length, pptx: `${OUT}/AeroMitra_MBA_Presentation.pptx` }));
