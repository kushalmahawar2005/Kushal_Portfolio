'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const certificates = [
  {
    title: "JavaScript, jQuery and React Bootcamp",
    issuer: "Udemy",
    date: "6 Aug 2024",
    image: "/img/certificates/udemy.jpg",
    link: "https://udemy.com/certificate/123"
  },
  {
    title: "Data Visualization",
    issuer: "TATA",
    date: "12 Aug 2024",
    image: "/img/certificates/tata.jpg",
    link: "https://coursera.org/certificate/456"
  },
  {
    title: "AI/ML for Geodata Analysis",
    issuer: "ISRO",
    date: "2023",
    image: "/img/certificates/isro.jpg",
    link: "https://freecodecamp.org/certificate/789"
  },
  {
    title: "Problem solving through Programming in C",
    issuer: "IIT KHARAGPUR",
    date: "2023",
    image: "/img/certificates/C.jpg",
    link: "https://datacamp.com/certificate/101"
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "/img/certificates/aws.jpg",
    link: "https://aws.amazon.com/certificate/102"
  },
  {
    title: "Machine Learning Fundamentals",
    issuer: "Stanford Online",
    date: "2023",
    image: "/img/certificates/ml.jpg",
    link: "https://stanford.edu/certificate/103"
  }
]

const CertificateModal = ({ 
  certificate, 
  onClose 
}: { 
  certificate: typeof certificates[0], 
  onClose: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full bg-black/90 rounded-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        <div className="relative h-[70vh] w-full">
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            className="object-contain"
          />
        </div>
        
        <div className="p-6 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
          <p className="text-gray-400 mb-4">
            Issued by {certificate.issuer} • {certificate.date}
          </p>
          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium hover:bg-blue-600/30 transition-colors"
          >
            View Certificate
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

const CertificateCard = ({ 
  certificate, 
  onClick 
}: { 
  certificate: typeof certificates[0], 
  onClick: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group relative rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-1 backdrop-blur-xl cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden rounded-lg">
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
          <p className="text-gray-400 text-sm">
            {certificate.issuer} • {certificate.date}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null)
  const [showAll, setShowAll] = useState(false)

  // Show only first 3 certificates initially
  const displayedCertificates = showAll ? certificates : certificates.slice(0, 3)

  return (
    <section id="certificates" className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Certificates
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my certifications that demonstrate my commitment to continuous learning
            and professional development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCertificates.map((certificate) => (
            <CertificateCard
              key={certificate.title}
              certificate={certificate}
              onClick={() => setSelectedCertificate(certificate)}
            />
          ))}
        </div>

        {certificates.length > 3 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-full font-medium transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{showAll ? "Show Less" : "View All Certificates"}</span>
              <svg
                className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </div>

      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </section>
  )
} 