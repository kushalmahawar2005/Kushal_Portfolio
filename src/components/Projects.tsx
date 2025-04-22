'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const projects = {
  major: [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with Next.js, MongoDB, and Stripe integration.",
      image: "/img/projects/ecommerce.jpg",
      tags: ["Next.js", "MongoDB", "Stripe", "TailwindCSS"],
      link: "https://github.com/kushalmahawar2005/BMW-e-commerce-site.git",
      demo: "https://bastiramjimithaiwale.vercel.app/"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses and user authentication.",
      image: "/projects/placeholder-dark.jpg",
      tags: ["React", "Node.js", "Socket.io", "OpenAI"],
      link: "https://github.com/yourusername/ai-chat",
      demo: "https://ai-chat-demo.com"
    },
    {
      title: "Portfolio Website",
      description: "Interactive portfolio website with 3D animations and modern UI design.",
      image: "/projects/placeholder-dark.jpg",
      tags: ["Next.js", "Three.js", "Framer Motion", "TailwindCSS"],
      link: "https://github.com/kushalmahawar2005/Kushal_Portfolio",
      demo: "https://kushal-portfolio-one.vercel.app"
    }
  ],
  minor: [
    {
      title: "Task Management System",
      description: "A collaborative task management system with real-time updates and team features.",
      image: "/projects/placeholder-dark.jpg",
      tags: ["React", "Firebase", "Material-UI", "Redux"],
      link: "https://github.com/yourusername/task-manager",
      demo: "https://task-manager-demo.com"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather information dashboard with location-based forecasts.",
      image: "/projects/placeholder-dark.jpg",
      tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
      link: "https://github.com/yourusername/weather-dashboard",
      demo: "https://weather-dashboard-demo.com"
    },
    {
      title: "Recipe Finder",
      description: "Search and discover recipes with ingredient-based filtering and favorites.",
      image: "/projects/placeholder-dark.jpg",
      tags: ["React", "Edamam API", "LocalStorage", "CSS Modules"],
      link: "https://github.com/yourusername/recipe-finder",
      demo: "https://recipe-finder-demo.com"
    }
  ]
}

const ProjectCard = ({ project }: { project: typeof projects['major'][0] }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-1 backdrop-blur-xl"
    >
      <div 
        className="relative z-10 rounded-xl bg-black/50 p-6 transform-style-3d"
        style={{ transform: "translateZ(75px)" }}
      >
        <div className="relative h-48 md:h-64 mb-6 overflow-hidden rounded-lg">
          {imageLoading && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        <h3 
          className="text-xl font-semibold mb-2"
          style={{ transform: "translateZ(50px)" }}
        >
          {project.title}
        </h3>
        
        <p 
          className="text-gray-400 text-sm mb-4"
          style={{ transform: "translateZ(25px)" }}
        >
          {project.description}
        </p>
        
        <div 
          className="flex flex-wrap gap-2 mb-4"
          style={{ transform: "translateZ(25px)" }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div 
          className="flex gap-4"
          style={{ transform: "translateZ(50px)" }}
        >
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Live Demo
          </motion.a>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-full text-sm font-medium transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Source Code
          </motion.a>
        </div>
      </div>

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(100,150,255,0.15), transparent 25%)"
        }}
      />
    </motion.div>
  )
}

export const Projects = () => {
  const [activeTab, setActiveTab] = useState<'major' | 'minor'>('major');

  return (
    <section id="projects" className="py-20 bg-black/20">
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
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
            in building modern web applications.
          </p>
        </motion.div>

        {/* Project Type Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            onClick={() => setActiveTab('major')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'major'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Major Projects
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('minor')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'minor'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Minor Projects
          </motion.button>
        </div>

        {/* Projects Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects[activeTab].map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/kushalmahawar2005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-full font-medium transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View More Projects</span>
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
} 
