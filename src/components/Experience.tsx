"use client";
import { motion } from 'framer-motion';

interface ExperienceItem {
  id: number
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
  type: string
  tech: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: 'MERN Stack Development Intern',
    company: 'Zeetron Networks Pvt. Ltd.',
    location: 'Jaipur, Rajasthan',
    startDate: 'June 2025',
    endDate: 'Present',
    description: 'Developing full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).',
    type: 'Full-time',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind']
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Craftory Studio (Self-Started Venture)',
    location: 'Jaipur, Rajasthan',
    startDate: 'Jun 2020',
    endDate: 'Present',
    description: 'Developed full stack applications and managed cloud deployments.',
    type: 'Full-time',
    tech: ['Node.js', 'MongoDB', 'AWS']
  },
  {
    id: 3,
    title: 'Web Developer',
    company: 'CodeSoft',
    location: 'Remote',
    startDate: 'Jan 2024',
    endDate: 'May 2024',
    description: 'Built responsive websites for various clients.',
    type: 'Contract',
    tech: ['HTML', 'CSS', 'JavaScript']
  }
]

export const Experience = () => {
  return (
    <section id="experience" className="relative py-20 bg-gradient-to-br from-black/40 to-gray-900/80">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Experience</h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 sm:text-base">Mera professional journey – roles, companies & growth timeline.</p>
        </div>
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-neutral-700/50 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <ol className="space-y-14 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-14 md:gap-y-20">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0
              return (
                <li key={exp.id} className="relative flex md:block pl-14 md:pl-0">
                  {/* timeline dot */}
                  <span className="absolute left-5 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-neutral-900 bg-gradient-to-tr from-blue-500 to-purple-500 shadow md:left-1/2 md:-translate-x-1/2" />
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className={[
                      'relative mt-0 w-full rounded-xl border border-neutral-800/70 bg-neutral-900/80 backdrop-blur-md p-6 pt-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45)]',
                      'md:pt-10',
                      'md:max-w-xl',
                      'transition hover:border-neutral-700 hover:shadow-[0_6px_28px_-6px_rgba(0,0,0,0.6)]'
                    ].join(' ')}
                    style={{ marginLeft: isLeft ? '0' : 'auto' }}
                  >
                    <span
                      className="hidden md:block absolute top-10 h-px w-8 bg-neutral-700/60"
                      style={{ [isLeft ? 'right' : 'left']: '-2rem' as any }}
                      aria-hidden="true"
                    />
                    <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white sm:text-xl">{exp.title}</h3>
                        <p className="text-sm font-medium text-blue-400">
                          {exp.company}
                          <span className="text-gray-400"> {' '}| {exp.location}</span>
                        </p>
                      </div>
                      <time className="text-xs font-mono text-gray-400 md:text-right">
                        {exp.startDate} – {exp.endDate}
                      </time>
                    </header>
                    <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-[15px]">{exp.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tech.map(t => (
                        <span key={t} className="rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Experience
