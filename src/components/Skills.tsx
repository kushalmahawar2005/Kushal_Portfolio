export const Skills = () => {
  const skills = {
    "Web Development": [
      "React",
      "Next.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "TailwindCSS",
      "Shadcn/UI",
      "Node.js",
      "Express",
      "Python",
      "C++",
      "Flutter",
      "Dart",
    ],
    "Databases": ["MongoDB", "PostgreSQL", "SQL", "Firebase"],
    "AI & Data Science": [
      "OpenAI API",
      "Numpy",
      "Pandas",
      "Seaborn",
      "Matplotlib",
      "Data Analysis",
    ],
    "DevOps & Tools": ["Git", "GitHub", "GitLab", "AWS", "Vite"],
  };

  return (
    <section id="skills" className="py-20 bg-black text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Skills
          </span>
        </h2>

        <div className="space-y-12">
          {Object.entries(skills).map(([category, items], index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6">
                {category}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
