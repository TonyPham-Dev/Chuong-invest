"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-stone-900 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to scale with confidence?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-300">
            Partner with Investex to build resilient strategies and unlock your
            next stage of growth.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10"
          >
            <Link
              href="#contact"
              className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-white px-10 py-4 text-sm font-semibold text-stone-900 shadow-lg transition hover:bg-stone-100"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
