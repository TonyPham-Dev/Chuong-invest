"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Modern corporate building representing Investex"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-900/65 via-stone-900/55 to-stone-900/70"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Building Sustainable Business Value
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg text-stone-200 sm:text-xl"
        >
          Investex is your strategic partner in investment advisory, business
          growth, and long-term corporate transformation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#products"
            className="inline-flex min-w-[200px] items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-stone-900 shadow-lg shadow-stone-900/10 transition hover:bg-stone-100"
          >
            Explore Services
          </Link>
          <Link
            href="#contact"
            className="inline-flex min-w-[200px] items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
