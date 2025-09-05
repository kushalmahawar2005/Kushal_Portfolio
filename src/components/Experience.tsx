"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    title: "MERN Stack Development Intern",
    company: "Zeetron Networks Pvt. Ltd.",
    location: "Jaipur, Rajasthan",
    startDate: "June 2025",
    endDate: "Present",
    description:
      "Developing full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).",
    type: "Full-time",
    tech: ["React", "Next.js", "TypeScript", "Tailwind"],
    logo: "/img/company/zeetron.png",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Craftory Studio (Self-Started Venture)",
    location: "Jaipur, Rajasthan",
    startDate: "Jun 2020",
    endDate: "Present",
    description:
      "Developed full stack applications and managed cloud deployments.",
    type: "Full-time",
    tech: ["Node.js", "MongoDB", "AWS"],
    logo: "/img/company/self.png",
  },
  {
    id: 3,
    title: "Web Developer",
    company: "CodeSoft",
    location: "Remote",
    startDate: "Jan 2024",
    endDate: "May 2024",
    description: "Built responsive websites for various clients.",
    type: "Contract",
    tech: ["HTML", "CSS", "JavaScript"],
    logo: "/img/companies/digitalagency.png",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-black/40 to-gray-900/80 relative"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey so far — a timeline of roles, companies, and
            growth.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-neutral-800 opacity-30 rounded-full -translate-x-1/2 z-0" />

          {/* Timeline items */}
          <div className="flex flex-col gap-20 relative z-10">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0; // Alternate sides
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${isLeft ? "md:justify-start" : "md:justify-end"
                    }`}
                >
                  {/* Card */}
                  <div
                    className={`bg-neutral-900 border border-neutral-800 rounded-xl shadow-md p-8 pl-8 w-full md:w-[40%] ${isLeft ? "md:mr-auto md:text-left" : "md:ml-auto md:text-left"
                      }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-blue-400 font-medium">
                          {exp.company}{" "}
                          <span className="text-gray-400">({exp.location})</span>
                        </p>
                      </div>
                      <span className="text-sm text-gray-400 font-mono">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="mt-4 text-gray-300">{exp.description}</p>

                    {/* Tech stack tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs rounded-full bg-neutral-800 text-white/90 border border-neutral-700 font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <span className="absolute left-1/2 top-8 w-6 h-6 bg-blue-500 rounded-full border-4 border-neutral-900 -translate-x-1/2 z-20" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
