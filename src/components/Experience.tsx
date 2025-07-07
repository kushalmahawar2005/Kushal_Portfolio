"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const experiences = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    startDate: 'Jan 2022',
    endDate: 'Present',
    description: 'Leading frontend development team and building scalable UI systems.',
    type: 'Full-time',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    logo: '/img/companies/techcorp.png',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    location: 'San Francisco, CA',
    startDate: 'Jun 2020',
    endDate: 'Dec 2021',
    description: 'Developed full stack applications and managed cloud deployments.',
    type: 'Full-time',
    tech: ['Node.js', 'MongoDB', 'AWS'],
    logo: '/img/companies/startupinc.png',
  },
  {
    id: 3,
    title: 'Web Developer',
    company: 'Digital Agency',
    location: 'Remote',
    startDate: 'Jan 2019',
    endDate: 'May 2020',
    description: 'Built responsive websites for various clients.',
    type: 'Contract',
    tech: ['HTML', 'CSS', 'JavaScript'],
    logo: '/img/companies/digitalagency.png',
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-black/40 to-gray-900/80 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey so far — a timeline of roles, companies, and growth.
          </p>
        </motion.div>
        <div className="relative flex flex-col items-center">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20 rounded-full -translate-x-1/2 z-0" />
          <div className="space-y-12 w-full max-w-2xl z-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                viewport={{ once: true }}
                className={`relative bg-white/10 dark:bg-black/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/10 transition-all duration-300 ${idx % 2 === 0 ? 'ml-0 md:ml-24' : 'mr-0 md:mr-24'}`}
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
              >
                {/* Timeline dot with company logo or initials */}
                <span className="absolute left-1/2 -top-7 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg border-4 border-white/20 -translate-x-1/2 z-20">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={exp.company + ' logo'}
                      width={44}
                      height={44}
                      className="object-cover rounded-lg bg-white/80"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-white text-xl font-bold select-none">
                      {getInitials(exp.company)}
                    </span>
                  )}
                </span>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 drop-shadow-lg">{exp.title}</h3>
                    <p className="text-blue-400 font-medium">{exp.company} <span className="text-gray-400">({exp.location})</span></p>
                  </div>
                  <span className="text-sm text-gray-400 font-mono">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="mt-4 text-gray-300">{exp.description}</p>
                {/* Tech stack tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white/90 shadow-sm font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Timeline connector dot (bottom) */}
                {idx !== experiences.length - 1 && (
                  <span className="absolute left-1/2 -bottom-6 w-4 h-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full border-4 border-white/20 -translate-x-1/2 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 