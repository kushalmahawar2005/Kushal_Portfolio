'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'

const skills = {
  frontend: {
    title: "Frontend Development",
    icon: "💻",
    description: "Building beautiful and responsive user interfaces",
    items: [
      { name: "React", level: 90, color: "#61DAFB" },
      { name: "Next.js", level: 85, color: "#000000" },
      { name: "TypeScript", level: 80, color: "#3178C6" },
      { name: "Tailwind CSS", level: 85, color: "#06B6D4" },
      { name: "Three.js", level: 75, color: "#000000" }
    ]
  },
  backend: {
    title: "Backend Development",
    icon: "⚙️",
    description: "Creating robust and scalable server-side applications",
    items: [
      { name: "Node.js", level: 85, color: "#339933" },
      { name: "Python", level: 80, color: "#3776AB" },
      { name: "MongoDB", level: 75, color: "#47A248" },
      { name: "PostgreSQL", level: 70, color: "#336791" },
      { name: "GraphQL", level: 75, color: "#E10098" }
    ]
  },
  devops: {
    title: "DevOps & Tools",
    icon: "🛠️",
    description: "Streamlining development and deployment processes",
    items: [
      { name: "Git", level: 90, color: "#F05032" },
      { name: "Docker", level: 70, color: "#2496ED" },
      { name: "AWS", level: 65, color: "#FF9900" },
      { name: "CI/CD", level: 75, color: "#2088FF" },
      { name: "Agile", level: 80, color: "#009688" }
    ]
  }
}

const SkillCard = ({ category, items }: { category: typeof skills.frontend; items: typeof skills.frontend.items }) => {
  const [isHovered, setIsHovered] = useState(false)
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
    setIsHovered(false)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
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
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
            <p className="text-sm text-gray-400">{category.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((skill) => (
            <div key={skill.name} className="relative">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-gray-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
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

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-black/30">
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
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web development world.
            Here's an overview of my technical skills and proficiency levels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([key, category], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <SkillCard category={category} items={category.items} />
            </motion.div>
          ))}
        </div>

        {/* Floating badges */}
        <div className="mt-16 relative h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="flex gap-4 whitespace-nowrap"
              animate={{
                x: [0, -1000],
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                },
              }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  {Object.values(skills).flatMap(category => 
                    category.items.map(skill => (
                      <motion.span
                        key={skill.name}
                        className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{ color: skill.color }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "rgba(255,255,255,0.1)"
                        }}
                      >
                        {skill.name}
                      </motion.span>
                    ))
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 
