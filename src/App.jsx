import { useState } from "react";

const questions = [
  {
    id: 1,
    stem: "A 35-year-old woman has had four previous live births. Sixteen weeks into her fifth pregnancy she presents with diffuse lower abdominal pain. On examination she is tender in the suprapubic area. She has a fundal height of 25 cm and there is a firm mass related to the uterus. She has urinary frequency but no dysuria. Only one fetal heart is heard.",
    question: "What is the most likely diagnosis?",
    options: ["Acute appendicitis", "Polyhydramnios", "Uterine fibroids", "Urinary tract infection", "Placental abruption"],
    correct: 2,
    topic: "Uterine Fibroids in Pregnancy",
    explanation: [
      "The reported incidence of fibroids varies from 5.4–77.0%, depending on the method of diagnosis used (the gold standard is histological evidence).",
      "They are oestrogen dependent and may increase in size in pregnancy. This increase in size leads to large for dates pregnancies.",
      "They may be complicated by red degeneration when the blood supply to the fibroid is compromised, leading to pain and uterine tenderness.",
      "Treatment is expectant with bed rest and analgesia.",
      "Other complications include malpresentation, obstructed labour and rarely postpartum haemorrhage.",
    ],
    keyPoints: [
      "Firm uterine mass + large for dates = think fibroids",
      "Oestrogen-dependent — enlarge in pregnancy",
      "Red degeneration causes acute pain in pregnancy",
      "Management: conservative (bed rest + analgesia)",
    ],
    imagePlaceholder: "🫄",
    references: [
      { title: "RCOG Green-top Guideline No. 34 – Fibroids in Pregnancy", url: "https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/" },
      { title: "UpToDate – Uterine fibroids in pregnancy", url: "https://www.uptodate.com/contents/uterine-fibroids-leiomyomas-issues-in-pregnancy" },
    ],
  },
  {
    id: 2,
    stem: "A patient reports losing urine with physical activity such as coughing, sneezing, climbing stairs, and laughing. The urine loss is instantaneous, often described as a 'squirt'.",
    question: "Which of the following is suggestive of genuine stress incontinence (GSI)?",
    options: ["Dysuria", "Haematuria", "Passage of large amounts of urine", "Uterine prolapse", "Constant wetness"],
    correct: 3,
    topic: "Genuine Stress Incontinence (GSI)",
    explanation: [
      "With genuine stress incontinence, the patient often reports loss of urine with physical activity.",
      "These activities include coughing, sneezing, climbing stairs, laughing, bouncing, and intercourse. Urine loss is instantaneous and often described as a 'squirt' of urine.",
      "In detrusor dyssynergia (DD), urgency follows physical activity or occurs at rest, followed by a large loss of urine.",
      "Dysuria indicates either an infection of the bladder and urethra, or irritation of the vulval and perineal epithelium by dribbling urine.",
      "GSI is often associated with other pelvic relaxation problems such as cystocele, rectocele, and uterine prolapse.",
    ],
    keyPoints: [
      "GSI = small 'squirt' with exertion, instantaneous loss",
      "Uterine prolapse is a classic associated finding",
      "Large volumes suggest detrusor overactivity, not GSI",
      "Constant wetness suggests a fistula",
    ],
    imagePlaceholder: "🩺",
    references: [
      { title: "NICE CG171 – Urinary Incontinence in Women", url: "https://www.nice.org.uk/guidance/cg171" },
      { title: "ICS Terminology Report", url: "https://www.ics.org/publications/ics_glossary" },
    ],
  },
  {
    id: 3,
    stem: "A 50-year-old woman with menorrhagia presents with fatigue. Her nails show flattened concavities (koilonychia).",
    question: "What is the most appropriate test?",
    options: ["Ultrasound abdomen", "Faecal protoporphyrins", "Serum copper", "Full blood count", "Urinary cortisol"],
    correct: 3,
    topic: "Iron Deficiency Anaemia & Koilonychia",
    explanation: [
      "Nails may exhibit many different abnormalities in systemic disease.",
      "In koilonychia, the nails are flattened and have concavities (spoon-shaped). This is classically associated with iron deficiency anaemia.",
      "The full blood count would show a low haemoglobin, low mean corpuscular volume (MCV) and low mean cell haemoglobin (MCH).",
      "Menorrhagia is a leading cause of chronic iron loss in women of reproductive age.",
      "Fatigue is a hallmark symptom of anaemia due to reduced oxygen-carrying capacity of the blood.",
    ],
    keyPoints: [
      "Koilonychia = spoon-shaped nails → think iron deficiency",
      "FBC shows low Hb, low MCV, low MCH",
      "Menorrhagia is a leading cause in women",
      "Treat with oral iron supplementation",
    ],
    imagePlaceholder: "💊",
    references: [
      { title: "WHO – Iron Deficiency Anaemia Assessment", url: "https://www.who.int/publications/i/item/9241545615" },
      { title: "British Journal of Haematology – Iron deficiency anaemia guidelines", url: "https://onlinelibrary.wiley.com/doi/10.1111/bjh.15641" },
    ],
  },
];

const LETTERS = ["A", "B", "C", "D", "E"];

function ProgressDots({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < current ? "bg-emerald-400" : i === current ? "bg-sky-400" : "bg-slate-700"}`} />
      ))}
      <span className="text-slate-500 text-xs font-mono ml-2">{current + 1}/{total}</span>
    </div>
  );
}

function QuizCard({ question, qIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const confirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    setTimeout(() => onAnswer(selected), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-white text-sm">Rx</div>
        <span className="font-semibold text-slate-200 tracking-wide" style={{ fontFamily: "Georgia, serif" }}>MedQuiz</span>
        <span className="ml-auto text-slate-500 text-sm font-mono">Question {qIndex + 1} of {total}</span>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-5 py-8">
        <ProgressDots current={qIndex} total={total} />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <span className="inline-block bg-sky-500/15 text-sky-400 text-xs font-mono px-2 py-1 rounded border border-sky-500/25 mb-4">CLINICAL VIGNETTE</span>
          <p className="text-slate-300 leading-relaxed text-[15px]">{question.stem}</p>
          <p className="text-white font-semibold mt-4 text-[15px]">{question.question}</p>
        </div>

        <div className="space-y-3 mb-8">
          {question.options.map((opt, i) => {
            let cls = "w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center gap-4 font-medium text-[15px] ";
            if (!confirmed) {
              cls += selected === i ? "bg-sky-500/15 border-sky-500 text-white" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70";
            } else {
              if (i === question.correct) cls += "bg-emerald-500/15 border-emerald-500 text-emerald-300";
              else if (i === selected) cls += "bg-red-500/15 border-red-500 text-red-300";
              else cls += "bg-slate-900 border-slate-800 text-slate-500";
            }

            const dotCls = `w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
              confirmed && i === question.correct ? "border-emerald-400 bg-emerald-400 text-slate-900"
              : confirmed && i === selected ? "border-red-400 bg-red-400 text-white"
              : selected === i && !confirmed ? "border-sky-400 bg-sky-400 text-slate-900"
              : "border-slate-600 text-slate-400"
            }`;

            return (
              <button key={i} className={cls} onClick={() => !confirmed && setSelected(i)}>
                <span className={dotCls}>
                  {confirmed && i === question.correct ? "✓" : confirmed && i === selected ? "✗" : LETTERS[i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {!confirmed ? (
          <button onClick={confirm} disabled={selected === null}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 ${selected !== null ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20" : "bg-slate-800 text-slate-600 cursor-not-allowed"}`}>
            Confirm Answer
          </button>
        ) : (
          <div className={`w-full py-4 rounded-xl font-bold text-base text-center ${selected === question.correct ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
            {selected === question.correct ? "✓ Correct! Loading explanation…" : "✗ Incorrect. Loading explanation…"}
          </div>
        )}
      </div>
    </div>
  );
}

function ExplanationPage({ question, userAnswer, onNext, isLast }) {
  const correct = userAnswer === question.correct;
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-white text-sm">Rx</div>
        <span className="font-semibold text-slate-200 tracking-wide" style={{ fontFamily: "Georgia, serif" }}>MedQuiz</span>
        <span className="ml-auto text-slate-500 text-sm">Explanation</span>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-8 space-y-6">
        {/* Result */}
        <div className={`rounded-2xl px-6 py-5 border flex items-start gap-4 ${correct ? "bg-emerald-500/10 border-emerald-500/40" : "bg-amber-500/10 border-amber-500/40"}`}>
          <span className="text-3xl">{correct ? "✅" : "📖"}</span>
          <div>
            <p className={`font-bold text-lg ${correct ? "text-emerald-400" : "text-amber-400"}`}>{correct ? "Correct!" : "The correct answer is:"}</p>
            <p className="text-white font-semibold mt-1">{LETTERS[question.correct]}. {question.options[question.correct]}</p>
            {!correct && <p className="text-slate-400 text-sm mt-1">You selected: {LETTERS[userAnswer]}. {question.options[userAnswer]}</p>}
          </div>
        </div>

        {/* Topic */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>{question.topic}</h2>
          <div className="w-16 h-1 bg-sky-500 rounded-full" />
        </div>

        {/* Visual */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 flex flex-col items-center gap-3">
          <span className="text-7xl">{question.imagePlaceholder}</span>
          <p className="text-slate-500 text-sm">{question.topic} — Illustration</p>
        </div>

        {/* Explanation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sky-400 font-bold text-xs uppercase tracking-widest mb-4">Explanation</h3>
          <div className="space-y-3">
            {question.explanation.map((para, i) => (
              <p key={i} className="text-slate-300 leading-relaxed text-[15px]">{para}</p>
            ))}
          </div>
        </div>

        {/* Key Points */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">Key Points</h3>
          <ul className="space-y-2">
            {question.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px]">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-slate-300">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* References */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sky-400 font-bold text-xs uppercase tracking-widest mb-4">References</h3>
          <ul className="space-y-3">
            {question.references.map((ref, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-sky-500 text-lg mt-0.5">↗</span>
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline underline-offset-2 text-sm leading-relaxed transition-colors">{ref.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={onNext} className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-sky-500/20">
          {isLast ? "View Results →" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}

function ResultsPage({ questions, answers, onRestart }) {
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const pct = Math.round((score / questions.length) * 100);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <div className="w-28 h-28 rounded-full bg-sky-500/20 border-4 border-sky-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-sky-400">{pct}%</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>Quiz Complete</h1>
          <p className="text-slate-400">You scored <span className="text-white font-semibold">{score}</span> out of <span className="text-white font-semibold">{questions.length}</span></p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-left">
          {questions.map((q, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${answers[i] === q.correct ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"}`}>
                {answers[i] === q.correct ? "✓" : "✗"}
              </span>
              <div className="min-w-0">
                <p className="text-slate-300 text-sm font-medium truncate">Q{i + 1}: {q.topic}</p>
                <p className="text-slate-500 text-xs">Correct: {q.options[q.correct]}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onRestart} className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-sky-500/20">
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

function App() {
  const [phase, setPhase] = useState("quiz");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [pendingAnswer, setPendingAnswer] = useState(null);

  const handleAnswer = (selected) => { setPendingAnswer(selected); setPhase("explanation"); };
  const handleNext = () => {
    const newAnswers = [...answers, pendingAnswer];
    setAnswers(newAnswers);
    if (qIndex + 1 >= questions.length) { setPhase("results"); }
    else { setQIndex(qIndex + 1); setPhase("quiz"); setPendingAnswer(null); }
  };
  const handleRestart = () => { setQIndex(0); setAnswers([]); setPendingAnswer(null); setPhase("quiz"); };

  if (phase === "results") return <ResultsPage questions={questions} answers={answers} onRestart={handleRestart} />;
  if (phase === "explanation") return <ExplanationPage question={questions[qIndex]} userAnswer={pendingAnswer} onNext={handleNext} isLast={qIndex + 1 >= questions.length} />;
  return <QuizCard question={questions[qIndex]} qIndex={qIndex} total={questions.length} onAnswer={handleAnswer} />;
}

export default App
