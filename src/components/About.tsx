'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/Container';
import dynamic from 'next/dynamic';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function About() {
  const [isHovered, setIsHovered] = useState(false)
  const photoRef = useRef(null)
  const isInView = useInView(photoRef, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/kushalmahawar2005', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/kushalmahawar', label: 'LinkedIn' },
    { icon: <FiTwitter />, url: 'https://twitter.com/kushalmahawar', label: 'Twitter' },
    { icon: <FiMail />, url: 'mailto:kushalmahawar2005@gmail.com', label: 'Email' }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          {/* Photo Section with Dynamic Effects */}
          <motion.div 
            ref={photoRef}
            className="relative w-full max-w-xs mx-auto"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 to-purple-500/20 rounded-2xl transform -rotate-3"></div>
            
            <div 
              className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src="/profile.jpg"
                alt="Kushal's Photo"
                fill
                className={`object-cover transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                priority
              />
              
              {/* Overlay with social links */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
        </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                About Me
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              I am a passionate full-stack developer with expertise in modern web technologies.
              My journey in software development started with a curiosity to build things that make a difference.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              With a strong foundation in both frontend and backend development,
              I create scalable and user-friendly applications that solve real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiDownload className="w-5 h-5" />
                Download Resume
              </motion.a>
              
              <motion.a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
