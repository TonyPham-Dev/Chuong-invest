"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    name: "Michael Tran",
    role: "CEO, Nova Holdings",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote:
      "Investex helped us redesign our capital strategy and improve operating margins within two quarters.",
  },
  {
    name: "Alicia Nguyen",
    role: "Managing Director, Horizon Group",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote:
      "Their advisory team is structured, practical, and highly responsive. We consider them a long-term partner.",
  },
  {
    name: "Daniel Park",
    role: "CFO, Zenith Capital",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    quote:
      "Investex delivered strong due diligence insights that protected our acquisition and accelerated integration.",
  },
] as const;

export default function Testimonials() {
  return (
    <section className="bg-stone-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-warm-wood-dark">
            Client voices
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            Trusted by ambitious businesses
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm shadow-stone-900/5"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-stone-100">
                  <Image
                    src={review.avatar}
                    alt={`Portrait of ${review.name}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{review.name}</p>
                  <p className="text-sm text-stone-500">{review.role}</p>
                </div>
              </div>
              <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-stone-600">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
