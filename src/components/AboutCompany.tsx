"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Strategic expertise",
    description:
      "Our consultants combine market insights with execution experience across diverse industries.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Data-driven approach",
    description:
      "Every recommendation is backed by financial analysis, market signals, and measurable outcomes.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: "Long-term partnership",
    description:
      "We stay with your team from planning to delivery, ensuring sustainable growth and governance.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutCompany() {
  return (
    <section id="about" className="bg-stone-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-warm-wood-dark">
            About Investex
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            Professional advisory with measurable impact
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-600">
            Investex is a business consulting and investment advisory firm focused
            on helping enterprises scale with confidence. We support leadership
            teams in strategy, operations, and capital planning to build resilient
            organizations in a changing market.
          </p>
        </motion.div>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-8 sm:grid-cols-3"
        >
          {highlights.map((h) => (
            <motion.li
              key={h.title}
              variants={item}
              className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm shadow-stone-900/5 transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800">
                {h.icon}
              </div>
              <h3 className="mt-5 font-serif text-xl text-stone-900">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {h.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
