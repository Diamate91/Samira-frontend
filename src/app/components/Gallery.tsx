import { motion } from "motion/react";
import { memo } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const galleryImages = [
  {
    src: "/gallery/1.jpg",
    alt: "Profesjonalne czytanie kart tarota",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/2.jpg",
    alt: "Rytuały i ceremonie duchowe",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/3.jpg",
    alt: "Konsultacje astrologiczne",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/4.jpg",
    alt: "Sesje z kartami tarota",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/5.jpg",
    alt: "Przestrzeń duchowa",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/6.jpg",
    alt: "Praktyki ezoteryczne",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/7.jpg",
    alt: "Magia i mistycyzm",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/8.jpg",
    alt: "Duchowe przewodnictwo",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/9.jpg",
    alt: "Karty i symbole",
    span: "col-span-1 row-span-2", // Portrait
  },
  {
    src: "/gallery/10.jpg",
    alt: "Mistyczna atmosfera",
    span: "col-span-1 row-span-2", // Portrait
  },
   {
    src: "/gallery/11.jpg",
    alt: "Mistyczna atmosfera 2",
    span: "col-span-1 row-span-2", // Portrait
  },
   {
    src: "/gallery/12.jpg",
    alt: "Mistyczna atmosfera 3",
    span: "col-span-1 row-span-2", // Portrait
  },
];

export const Gallery = memo(function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4 text-3xl sm:text-4xl md:text-5xl text-violet-100"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Galeria Duchowej Pracy
          </h2>
          <p
            className="text-lg text-violet-200/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Zajrzyj do mojej świętej przestrzeni i praktyk
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl ${image.span}`}
            >
              <div className="relative w-full h-full">
                {/* Image */}
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p
                    className="text-white text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {image.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p
            className="text-violet-200/80 mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Chcesz zobaczyć więcej?
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-violet-200 hover:bg-white/10 hover:text-violet-100 transition-all"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Obserwuj na Instagramie
          </a>
        </motion.div>
      </div>
    </section>
  );
});