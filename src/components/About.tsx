'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Import ThreeScene dynamically (SSR disabled)
const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false })

export const About = () => {
  return (
    <section id="about" className="min-h-screen relative py-20 bg-black/40">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* 3D Animation */}
        <motion.div 
          className="lg:w-1/2 h-[400px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Ensure ThreeScene is rendered dynamically without SSR issues */}
          <ThreeScene />
        </motion.div>

        {/* Content */}
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-gray-300 mb-6">
            I'm a passionate Full Stack Developer with expertise in building modern web applications.
            With a strong foundation in both frontend and backend technologies, I create seamless
            user experiences that solve real-world problems.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-sm text-gray-400">React, Next.js, TypeScript</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-sm text-gray-400">Node.js, Python, MongoDB</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Design</h3>
              <p className="text-sm text-gray-400">Figma, Tailwind, Framer</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Tools</h3>
              <p className="text-sm text-gray-400">Git, Docker, AWS</p>
            </div>
          </div>
          <a 
            href="/resume.pdf" 
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all transform hover:scale-105"
            target="_blank"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default About;
