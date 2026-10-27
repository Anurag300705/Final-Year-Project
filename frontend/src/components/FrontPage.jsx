
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Moon,
  Smartphone,
  BookOpen,
  Brain,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Clock,
  LoaderCircle,
} from "lucide-react";

const initialForm = {
  age: 21,
  screen_time: 5,
  sleep_hours: 7,
  study_hours: 4,
  physical_activity: 30,
  stress_level: 5,
  social_platform: "Instagram",
};

export default function FrontPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          screen_time: Number(form.screen_time),
          sleep_hours: Number(form.sleep_hours),
          study_hours: Number(form.study_hours),
          physical_activity: Number(form.physical_activity),
          stress_level: Number(form.stress_level),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to predict your score. Please try again.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const score = Number(result?.score);
  const validScore = Number.isFinite(score) && score >= 0 && score <= 10;

  const getCategory = (value) => {
    if (value < 3) return "Needs Attention";
    if (value < 5) return "Fair";
    if (value < 7) return "Good";
    if (value < 9) return "Very Good";
    return "Excellent";
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#111a2d] px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10";

  const fields = [
    {
      name: "age",
      label: "Your age",
      icon: Activity,
      type: "number",
      min: 13,
      max: 100,
      hint: "Years",
    },
    {
      name: "screen_time",
      label: "Daily screen time",
      icon: Smartphone,
      type: "number",
      min: 0,
      max: 24,
      step: 0.5,
      hint: "Hours per day",
    },
    {
      name: "sleep_hours",
      label: "Sleep duration",
      icon: Moon,
      type: "number",
      min: 0,
      max: 24,
      step: 0.5,
      hint: "Hours per night",
    },
    {
      name: "study_hours",
      label: "Study / work time",
      icon: BookOpen,
      type: "number",
      min: 0,
      max: 24,
      step: 0.5,
      hint: "Hours per day",
    },
    {
      name: "physical_activity",
      label: "Physical activity",
      icon: HeartPulse,
      type: "number",
      min: 0,
      max: 1440,
      hint: "Minutes per day",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d1a] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-96 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Hero section */}
      <section className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm text-teal-300">
            <Sparkles size={16} />
            Your personal wellness companion
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Understand your habits.
            <span className="mt-2 block bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Improve your wellness.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Your digital habits tell a story. Explore how your screen time,
            sleep, activity, and daily routine relate to your wellness score.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Brain size={17} className="text-teal-400" />
              AI-powered estimate
            </span>
            <span className="flex items-center gap-2">
              <Clock size={17} className="text-teal-400" />
              Takes 2 minutes
            </span>
            <span className="flex items-center gap-2">
              <HeartPulse size={17} className="text-teal-400" />
              Self-awareness
            </span>
          </div>
        </motion.div>
      </section>

      {/* Assessment form */}
      <section id="assessment" className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left information panel */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#142438] to-[#0d1423] p-7 sm:p-9"
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300">
              <Brain size={29} />
            </div>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-300">
              The Signal assessment
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-snug">
              Small habits can make a difference.
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Answer a few questions about your everyday routine. Our trained
              model will estimate a wellness score based on the information
              you provide.
            </p>

            <div className="mt-8 space-y-5">
              {[
                ["01", "Share your daily habits"],
                ["02", "Get your estimated score"],
                ["03", "Explore simple suggestions"],
              ].map(([number, title]) => (
                <div key={number} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/5 text-sm font-semibold text-teal-300">
                    {number}
                  </span>
                  <p className="text-sm text-slate-300">{title}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium text-white">
                <HeartPulse size={17} className="mr-2 inline text-teal-300" />
                Your well-being matters
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                This is an educational estimate, not a clinical assessment or
                diagnosis. It cannot determine whether someone has a mental
                health condition.
              </p>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-3xl border border-white/10 bg-[#0e1525]/90 p-6 shadow-2xl shadow-black/20 sm:p-9"
          >
            <div className="mb-7">
              <p className="text-sm font-medium text-teal-300">
                YOUR DAILY ROUTINE
              </p>
              <h2 className="mt-2 text-2xl font-bold">Let's get to know you</h2>
              <p className="mt-2 text-sm text-slate-400">
                Fill in your details as accurately as you can.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="flex items-center gap-2 text-sm font-medium text-slate-200"
                      >
                        <Icon size={17} className="text-teal-300" />
                        {field.label}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        min={field.min}
                        max={field.max}
                        step={field.step || 1}
                        value={form[field.name]}
                        onChange={updateField}
                        required
                        className={inputClass}
                      />

                      <p className="mt-1.5 text-xs text-slate-500">
                        {field.hint}
                      </p>
                    </div>
                  );
                })}

                {/* Stress level */}
                <div>
                  <label
                    htmlFor="stress_level"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Activity size={17} className="text-teal-300" />
                    Stress level
                  </label>

                  <select
                    id="stress_level"
                    name="stress_level"
                    value={form.stress_level}
                    onChange={updateField}
                    className={inputClass}
                    required
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(
                      (level) => (
                        <option key={level} value={level}>
                          {level} / 10
                          {level === 1
                            ? " — Very low"
                            : level === 10
                              ? " — Very high"
                              : ""}
                        </option>
                      )
                    )}
                  </select>

                  <p className="mt-1.5 text-xs text-slate-500">
                    Your perceived stress, from 1 to 10
                  </p>
                </div>

                {/* Social platform */}
                <div>
                  <label
                    htmlFor="social_platform"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Smartphone size={17} className="text-teal-300" />
                    Most-used social platform
                  </label>

                  <select
                    id="social_platform"
                    name="social_platform"
                    value={form.social_platform}
                    onChange={updateField}
                    className={inputClass}
                    required
                  >
                    {[
                      "Instagram",
                      "YouTube",
                      "Facebook",
                      "WhatsApp",
                      "TikTok",
                      "X",
                      "Snapchat",
                      "Other",
                      "None",
                    ].map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>

                  <p className="mt-1.5 text-xs text-slate-500">
                    Choose the platform you use most
                  </p>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 px-6 py-4 font-semibold text-[#07111b] transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin" />
                    Analyzing your habits...
                  </>
                ) : (
                  <>
                    Calculate My Wellness Score
                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Prediction result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-6 text-center"
              >
                {validScore ? (
                  <>
                    <p className="text-sm text-slate-400">
                      Your estimated wellness score
                    </p>

                    <div className="mx-auto my-5 flex h-36 w-36 items-center justify-center rounded-full border-[7px] border-teal-400/20 bg-teal-400/5">
                      <div>
                        <p className="text-4xl font-bold text-teal-300">
                          {score.toFixed(1)}
                        </p>
                        <p className="text-xs text-slate-400">out of 10</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold">
                      {getCategory(score)}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {score < 3
                        ? "Consider reviewing your daily routine and seeking support if you are struggling."
                        : score < 5
                          ? "Consider making small, sustainable changes to your sleep, activity, and screen-time habits."
                          : score < 7
                            ? "Some of your habits may be supporting your well-being. Look for areas where you can improve."
                            : score < 9
                              ? "Your reported habits suggest a positive routine. Keep making time for rest and offline activities."
                              : "Your reported habits correspond to a high estimated score. Continue maintaining a balanced routine."}
                    </p>
                  </>
                ) : (
                  <p role="alert" className="text-sm text-amber-300">
                    The server returned an unexpected score. Please check your
                    backend response format.
                  </p>
                )}

                <p className="mt-5 text-xs leading-5 text-slate-500">
                  This estimate is not a diagnosis and cannot determine your
                  mental health status. If you are concerned about your
                  well-being, consider speaking with a qualified professional.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-6 text-center text-xs leading-5 text-slate-500">
        © {new Date().getFullYear()} Signal. Built to encourage mindful digital
        habits.
        <br />
        Not a medical diagnostic tool.
      </footer>
    </main>
  );
}
