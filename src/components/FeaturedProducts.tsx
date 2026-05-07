"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { featuredProducts } from "@/lib/featured-products";

export default function FeaturedProducts() {
  return (
    <section className="border-y border-stone-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-warm-wood-dark">
              Signature solutions
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
              Featured consulting packages
            </h2>
          </div>
        </motion.div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm shadow-stone-900/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg text-stone-900">{product.name}</h3>
                <p className="mt-1 text-sm font-semibold text-stone-700">
                  {product.price}
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-stone-300 bg-white py-2.5 text-sm font-medium text-stone-800 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"
                >
                  View Details
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
