"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { cn } from "@/utils/cn";
import CoursesData from "@/data/music_courses.json";

const TOPICS = [
  "Course Inquiry",
  "Trial Availability",
  "General Question",
];

function MusicSchoolContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const course = CoursesData.courses.find(
      (item) => item.slug === params.get("course")
    );
    if (course) setSelectedCourse(course.title);

    const requestedTopic = params.get("topic");
    const matchingTopic = TOPICS.find((item) => item === requestedTopic);
    if (matchingTopic) setTopic(matchingTopic);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          course: selectedCourse,
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setFeedback(
          data.error || "Unable to send your message. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedback(data.message || "Your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback("Network error while sending message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-black py-16 pt-32 sm:pt-36 px-4 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(20,184,166,0.16),transparent_65%)]"
      />
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-block text-xs sm:text-sm text-teal-400 font-semibold tracking-[0.2em] uppercase">
            Get In Touch
          </span>
          <h1 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-500">
            Contact Us
          </h1>
          <p className="mt-4 text-neutral-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Send a question about a course or ask whether a trial is available.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-400 mb-5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Message Sent!
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-md">
                  {feedback}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFeedback("");
                  }}
                  className="mt-7 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-teal-300 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <p className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2.5">
                    What can we help you with?
                  </p>
                  <div
                    role="group"
                    aria-label="Inquiry topic"
                    className="flex flex-wrap gap-2"
                  >
                    {TOPICS.map((item) => {
                      const active = topic === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setTopic(item)}
                          className={cn(
                            "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200",
                            active
                              ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                              : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/25"
                          )}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedCourse && (
                  <p className="rounded-xl border border-teal-400/20 bg-teal-500/[0.06] px-4 py-3 text-sm text-teal-100">
                    Course selected:{" "}
                    <span className="font-semibold">{selectedCourse}</span>
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="rounded-xl border border-white/10 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 w-full px-4 py-3.5 bg-black/70 placeholder:text-neutral-600 text-white text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2"
                    >
                      Email Address <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="rounded-xl border border-white/10 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 w-full px-4 py-3.5 bg-black/70 placeholder:text-neutral-600 text-white text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2"
                  >
                    Message <span className="text-teal-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your musical background, instrument, or questions..."
                    rows={5}
                    required
                    minLength={5}
                    className="rounded-xl border border-white/10 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 w-full px-4 py-3.5 bg-black/70 placeholder:text-neutral-600 text-white text-sm transition-all resize-y"
                  />
                </div>

                {status === "error" && feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{feedback}</span>
                  </motion.div>
                )}

                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-neutral-500">
                    Your message will be sent to our contact email.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-semibold text-sm hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_0_25px_rgba(20,184,166,0.28)]"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-4 text-xs sm:text-sm"
        >
          <a
            href="mailto:subhanallauddin@gmail.com"
            className="rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-md p-4 flex items-center gap-3 hover:border-teal-400/30"
          >
            <Mail className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <p className="text-neutral-400 text-xs">Email</p>
              <p className="text-white font-medium truncate">
                subhanallauddin@gmail.com
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </main>
  );
}

export default MusicSchoolContactUs;
