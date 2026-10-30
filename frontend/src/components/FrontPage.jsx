import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Clock,
  Compass,
  Globe,
  GraduationCap,
  HeartPulse,
  LoaderCircle,
  Moon,
  Smartphone,
  Sparkles,
  Unlock,
  User,
  Users,
} from "lucide-react";

const initialForm = {
  age: 21,
  gender: "Female",
  academic_lvl: "Undergraduate",
  country: "India",
  most_used_platform: "Instagram",
  purpose_of_use: "Entertainment",
  avg_daily_usage_hours: 5,
  daily_unlocks: 120,
  study_hours: 4,
  physical_activity: 1.5,
  sleep: 7,
  stress: "Medium",
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

      const payload = {
        age: Number(form.age),
        gender: form.gender,
        academic_lvl: form.academic_lvl,
        country: form.country,
        most_used_platform: form.most_used_platform,
        purpose_of_use: form.purpose_of_use,
        avg_daily_usage_hours: Number(form.avg_daily_usage_hours),
        daily_unlocks: Number(form.daily_unlocks),
        study_hours: Number(form.study_hours),
        physical_activity: Number(form.physical_activity),
        sleep: Number(form.sleep),
        stress: form.stress,
      };

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || "Unable to predict your score. Please try again."
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the backend server. Please make sure the FastAPI server is running."
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
    "mt-2 w-full rounded-xl border border-white/10 bg-[#111a2d] px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10 [&>option]:bg-[#111a2d] [&>option]:text-white";

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
              Answer questions about your everyday digital and lifestyle
              routine. Our trained model estimates your mental wellness score
              based on real student habit patterns.
            </p>

            <div className="mt-8 space-y-5">
              {[
                ["01", "Share your daily habits"],
                ["02", "Predict your wellness score"],
                ["03", "Explore personalized insights"],
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
                This is an educational estimate powered by a machine learning model,
                not a clinical diagnosis. It provides guidance on habit balance.
              </p>
              <div className="mt-4 border-t border-white/5 pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 transition hover:text-teal-200"
                >
                  Learn about our research & model
                  <ArrowRight size={13} />
                </Link>
              </div>
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
                Provide your details below to predict your mental wellness score.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* 1. Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <User size={17} className="text-teal-300" />
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min={13}
                    max={100}
                    value={form.age}
                    onChange={updateField}
                    required
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Years</p>
                </div>

                {/* 2. Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Users size={17} className="text-teal-300" />
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={updateField}
                    required
                    className={inputClass}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500">Gender identity</p>
                </div>

                {/* 3. Academic Level */}
                <div>
                  <label
                    htmlFor="academic_lvl"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <GraduationCap size={17} className="text-teal-300" />
                    Academic Level
                  </label>
                  <select
                    id="academic_lvl"
                    name="academic_lvl"
                    value={form.academic_lvl}
                    onChange={updateField}
                    required
                    className={inputClass}
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="High School">High School</option>
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500">Current education level</p>
                </div>

                {/* 4. Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Globe size={17} className="text-teal-300" />
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={updateField}
                    required
                    className={inputClass}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Turkey">Turkey</option>
                    <option value="France">France</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500">Country of residence</p>
                </div>

                {/* 5. Most Used Platform */}
                <div>
                  <label
                    htmlFor="most_used_platform"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Smartphone size={17} className="text-teal-300" />
                    Most Used Platform
                  </label>
                  <select
                    id="most_used_platform"
                    name="most_used_platform"
                    value={form.most_used_platform}
                    onChange={updateField}
                    required
                    className={inputClass}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Twitter">Twitter / X</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="WeChat">WeChat</option>
                    <option value="LINE">LINE</option>
                    <option value="KakaoTalk">KakaoTalk</option>
                    <option value="VKontakte">VKontakte</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500">Platform you use most</p>
                </div>

                {/* 6. Purpose of Use */}
                <div>
                  <label
                    htmlFor="purpose_of_use"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Compass size={17} className="text-teal-300" />
                    Purpose of Use
                  </label>
                  <select
                    id="purpose_of_use"
                    name="purpose_of_use"
                    value={form.purpose_of_use}
                    onChange={updateField}
                    required
                    className={inputClass}
                  >
                    <option value="Entertainment">Entertainment</option>
                    <option value="Education">Education</option>
                    <option value="Networking">Networking</option>
                    <option value="News">News</option>
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500">Primary motivation for use</p>
                </div>

                {/* 7. Avg Daily Usage in Hours */}
                <div>
                  <label
                    htmlFor="avg_daily_usage_hours"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Clock size={17} className="text-teal-300" />
                    Avg Daily Usage
                  </label>
                  <input
                    id="avg_daily_usage_hours"
                    name="avg_daily_usage_hours"
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    value={form.avg_daily_usage_hours}
                    onChange={updateField}
                    required
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Hours per day on screen</p>
                </div>

                {/* 8. Daily Unlocks */}
                <div>
                  <label
                    htmlFor="daily_unlocks"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Unlock size={17} className="text-teal-300" />
                    Daily Unlocks
                  </label>
                  <input
                    id="daily_unlocks"
                    name="daily_unlocks"
                    type="number"
                    min={0}
                    max={500}
                    step={1}
                    value={form.daily_unlocks}
                    onChange={updateField}
                    required
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Phone unlocks per day</p>
                </div>

                {/* 9. Study Hours */}
                <div>
                  <label
                    htmlFor="study_hours"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <BookOpen size={17} className="text-teal-300" />
                    Study Hours
                  </label>
                  <input
                    id="study_hours"
                    name="study_hours"
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    value={form.study_hours}
                    onChange={updateField}
                    required
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Hours per day studying</p>
                </div>

                {/* 10. Physical Activity */}
                <div>
                  <label
                    htmlFor="physical_activity"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <HeartPulse size={17} className="text-teal-300" />
                    Physical Activity
                  </label>
                  <input
                    id="physical_activity"
                    name="physical_activity"
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    value={form.physical_activity}
                    onChange={updateField}
                    required
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Hours per day exercising</p>
                </div>

                {/* 11. Sleep */}
                <div>
                  <label
                    htmlFor="sleep"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Moon size={17} className="text-teal-300" />
                    Sleep
                  </label>
                  <input
                    id="sleep"
                    name="sleep"
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    value={form.sleep}
                    onChange={updateField}
                    required
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Hours of sleep per night</p>
                </div>

                {/* 12. Stress */}
                <div>
                  <label
                    htmlFor="stress"
                    className="flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Activity size={17} className="text-teal-300" />
                    Stress Level
                  </label>
                  <select
                    id="stress"
                    name="stress"
                    value={form.stress}
                    onChange={updateField}
                    required
                    className={inputClass}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                  <p className="mt-1.5 text-xs text-slate-500">Perceived stress level</p>
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

              {/* Predict Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 px-6 py-4 font-semibold text-[#07111b] transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin" />
                    Predicting Wellness Score...
                  </>
                ) : (
                  <>
                    Predict Wellness Score
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
                      Your estimated mental wellness score
                    </p>

                    <div className="mx-auto my-5 flex h-36 w-36 items-center justify-center rounded-full border-[7px] border-teal-400/20 bg-teal-400/5 shadow-lg shadow-teal-500/10">
                      <div>
                        <p className="text-4xl font-bold text-teal-300">
                          {score.toFixed(1)}
                        </p>
                        <p className="text-xs text-slate-400">out of 10</p>
                      </div>
                    </div>

                    <div className="inline-block rounded-full bg-teal-400/10 px-4 py-1 text-sm font-semibold text-teal-300 border border-teal-400/20">
                      {result.category || getCategory(score)}
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {result.message ||
                        (score < 3
                          ? "Consider reviewing your daily routine and seeking support if you are struggling."
                          : score < 5
                            ? "Consider making small, sustainable changes to your sleep, activity, and screen-time habits."
                            : score < 7
                              ? "Some of your habits may be supporting your well-being. Look for areas where you can improve."
                              : score < 9
                                ? "Your reported habits suggest a positive routine. Keep making time for rest and offline activities."
                                : "Your reported habits correspond to a high estimated score. Continue maintaining a balanced routine.")}
                    </p>
                  </>
                ) : (
                  <p role="alert" className="text-sm text-amber-300">
                    The server returned an unexpected score. Please check your backend response format.
                  </p>
                )}

                <p className="mt-5 text-xs leading-5 text-slate-500">
                  This estimate is generated by machine learning for informational purposes and is not a clinical diagnosis.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-6 text-center text-xs leading-5 text-slate-500">
        <div className="mb-3 flex items-center justify-center gap-5 text-slate-400">
          <Link to="/" className="transition hover:text-teal-300">
            Home
          </Link>
          <span>•</span>
          <a href="/#assessment" className="transition hover:text-teal-300">
            Assessment
          </a>
          <span>•</span>
          <Link to="/about" className="transition hover:text-teal-300">
            About the Project
          </Link>
        </div>
        © {new Date().getFullYear()} Signal. Built to encourage mindful digital
        habits.
        <br />
        Not a medical diagnostic tool.
      </footer>
    </main>
  );
}
