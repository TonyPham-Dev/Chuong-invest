"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    title: "Investment Advisory",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    alt: "Business professionals discussing investments",
  },
  {
    title: "Corporate Strategy",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop",
    alt: "Corporate team in strategic workshop",
  },
  {
    title: "M&A Consulting",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    alt: "Financial planning and merger documentation",
  },
  {
    title: "Risk Management",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    alt: "Analyst reviewing business risk dashboard",
  },
] as const;

export default function ProductCategories() {
  return (
    <section id="products" className="bg-stone-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-warm-wood-dark">
            Core services
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            What we do
          </h2>
          <p className="mt-4 text-stone-600">
            Comprehensive solutions designed for enterprise performance and
            long-term value creation.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {categories.map((cat, index) => (
            <motion.article
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-stone-900/10 lg:aspect-[5/4]"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent opacity-90 transition group-hover:from-stone-900/80"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-serif text-2xl text-white sm:text-3xl">
                  {cat.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-stone-200 opacity-0 transition duration-300 group-hover:opacity-100">
                  Discover how Investex supports this area
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
