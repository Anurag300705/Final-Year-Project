import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Sparkles,
  ShieldCheck,
  Cpu,
  Database,
  Activity,
  HeartPulse,
  ArrowRight,
  Clock,
  Smartphone,
  BookOpen,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: Smartphone,
      title: "Digital Engagement",
      description:
        "Analyzes screen duration and unlock frequency to measure how fragmented or immersive your daily phone usage is.",
    },
    {
      icon: Brain,
      title: "Intentionality & Motivation",
      description:
        "Distinguishes between purposeful use (education, networking) and passive scrolling (entertainment, boredom).",
    },
    {
      icon: HeartPulse,
      title: "Restorative Lifestyle",
      description:
        "Weighs crucial balance factors including sleep quality, physical movement, and regular academic/work routines.",
    },
    {
      icon: Activity,
      title: "Perceived Stress Context",
      description:
        "Considers your baseline stress level to contextualize how digital habits interact with everyday academic pressures.",
    },
  ];

  const pipelineSteps = [
    {
      step: "01",
      title: "Data Ingestion & Cleaning",
      desc: "Handles multi-dimensional student data, clipping unrealistic physical activity values and deduplicating records.",
    },
    {
      step: "02",
      title: "Logarithmic Transformation",
      desc: "Applies log1p transformations to skewed distributions like study hours to stabilize feature variance.",
    },
    {
      step: "03",
      title: "Categorical & Ordinal Encoding",
      desc: "Encodes stress levels ordinally (Low to Very High) and one-hot encodes platforms, academic levels, and regions.",
    },
    {
      step: "04",
      title: "Random Forest Inference",
      desc: "Evaluates habit combinations using an ensemble of decision trees to predict a normalized mental wellness score (0-10).",
    },
  ];

  const highlights = [
    { label: "Observations Analyzed", val: "5,000+" },
    { label: "Habit Features Evaluated", val: "12" },
    { label: "Model Architecture", val: "Random Forest" },
    { label: "Target Score Range", val: "0.0 - 10.0" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d1a] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[130px]" />
        <div className="absolute -right-40 top-96 h-96 w-96 rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 lg:pt-16">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm text-teal-300">
            <Sparkles size={16} />
            Academic Capstone Research
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The Science Behind
            <span className="mt-2 block bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Digital Wellness & Signal.
            </span>
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-400 sm:text-lg">
            Signal is an applied machine learning project dedicated to uncovering
            how student digital lifestyle patterns—from screen unlock frequencies
            to sleep and study habits—directly correlate with mental health and overall well-being.
          </p>
        </motion.div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#0e1525]/80 p-5 text-center backdrop-blur-md"
            >
              <p className="text-2xl font-bold text-teal-300 sm:text-3xl">
                {item.val}
              </p>
              <p className="mt-1 text-xs text-slate-400">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Project Mission & Purpose */}
        <section className="mt-16 grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#142438] to-[#0d1423] p-7 sm:p-9"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <Cpu size={26} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-teal-300">
              Our Motivation
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">
              Moving Beyond Screen Time Shame to Self-Awareness
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Modern students live in hyper-connected ecosystems. Most wellness tools
              focus exclusively on restricting total minutes. Signal takes a more
              nuanced view: <em>context matters</em>.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Using social platforms for educational collaboration or networking has a
              drastically different psychological impact than late-night passive scrolling.
              By synthesizing 12 distinct habit parameters, our model delivers personalized
              insights designed to empower proactive balance rather than guilt.
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-slate-400">
              <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
              <span>Trained on representative student lifestyle datasets.</span>
            </div>
          </motion.div>

          {/* Core Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-[#0e1525]/90 p-5 shadow-lg shadow-black/10"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* Machine Learning Pipeline Architecture */}
        <section className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs text-teal-300">
              <Database size={14} />
              Machine Learning Pipeline
            </div>
            <h2 className="mt-3 text-3xl font-bold">How the Model Works</h2>
            <p className="mt-3 text-sm text-slate-400">
              Every habit evaluation flows through an end-to-end scikit-learn pipeline
              before inference by the Random Forest Regressor.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pipelineSteps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/10 bg-[#0e1525]/90 p-6"
              >
                <span className="text-3xl font-extrabold text-teal-400/30">
                  {s.step}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer & Ethical Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl border border-teal-400/20 bg-gradient-to-r from-teal-950/30 via-[#0e1525] to-blue-950/30 p-7 sm:p-9"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300">
              <ShieldCheck size={26} />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                Ethical & Educational AI Statement
              </h3>
              <p className="text-sm leading-6 text-slate-300">
                Signal is designed exclusively for educational, reflective, and
                academic research purposes. It provides algorithmic estimations of habit
                correlations and does <strong>not</strong> substitute for professional mental
                health evaluations, counseling, or clinical diagnostics.
              </p>
              <p className="text-xs leading-5 text-slate-400">
                If you or someone you know is experiencing acute stress, burnout, or mental
                health challenges, please consider reaching out to student counseling services,
                healthcare professionals, or dedicated wellness helplines in your area.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Link
            to="/#assessment"
            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 px-8 py-4 text-base font-semibold text-[#07111b] transition duration-300 hover:brightness-110"
          >
            Take the Wellness Assessment
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 px-5 py-6 text-center text-xs leading-5 text-slate-500">
        © {new Date().getFullYear()} Signal. Built to encourage mindful digital
        habits.
        <br />
        Not a medical diagnostic tool.
      </footer>
    </main>
  );
}
