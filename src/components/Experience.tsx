"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const experiences = [
  {
    id: 1,
    title: 'MERN Stack Development Intern',
    company: 'Zeetron Networks Pvt. Ltd.',
    location: 'Jaipur, Rajasthan',
    startDate: 'June 2025',
    endDate: 'Present',
    description: 'Developing full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).',
    type: 'Full-time',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    logo: '/img/company/zeetron.png',
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
    tech: ['Node.js', 'MongoDB', 'AWS'],
    logo: '/img/company/self.png',
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey so far — a timeline of roles, companies, and growth.
          </p>
        </div>
        <div className="relative flex flex-col items-center">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-neutral-800 opacity-30 rounded-full -translate-x-1/2 z-0" />
          <div className="flex flex-col gap-20 w-full max-w-md mx-auto z-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center"
              >
                {/* Timeline dot with company logo or initials */}
                <span className="z-20 w-14 h-14 flex items-center justify-center bg-white border-4 border-neutral-200 shadow-lg rounded-xl mb-[-28px]">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={exp.company + ' logo'}
                      width={48}
                      height={48}
                      className="object-cover rounded-lg bg-white"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-neutral-700 text-2xl font-bold select-none">
                      {getInitials(exp.company)}
                    </span>
                  )}
                </span>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-md p-8 w-full mt-0 text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                      <p className="text-blue-400 font-medium">{exp.company} <span className="text-gray-400">({exp.location})</span></p>
                    </div>
                    <span className="text-sm text-gray-400 font-mono">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="mt-4 text-gray-300">{exp.description}</p>
                  {/* Tech stack tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs rounded-full bg-neutral-800 text-white/90 border border-neutral-700 font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Timeline connector dot (bottom) */}
                {idx !== experiences.length - 1 && (
                  <span className="absolute left-1/2 -bottom-8 w-4 h-4 bg-neutral-800 rounded-full border-4 border-white -translate-x-1/2 z-10" />
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