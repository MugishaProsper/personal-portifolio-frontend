import { motion } from "framer-motion";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "/icons/code.svg",
      color: "text-ai-primary",
      bgColor: "bg-ai-primary/10",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Vue.js", level: 85 }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: "/icons/brain.svg",
      color: "text-ai-secondary",
      bgColor: "bg-ai-secondary/10",
      skills: [
        { name: "TensorFlow", level: 88 },
        { name: "PyTorch", level: 85 },
        { name: "OpenAI API", level: 92 },
        { name: "Computer Vision", level: 80 }
      ]
    },
    {
      title: "Backend Development",
      icon: "/icons/server.svg",
      color: "text-ai-accent",
      bgColor: "bg-ai-accent/10",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 88 },
        { name: "Express.js", level: 92 },
        { name: "FastAPI", level: 85 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: "/icons/cloud.svg",
      color: "text-ai-success",
      bgColor: "bg-ai-success/10",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 88 },
        { name: "Kubernetes", level: 75 },
        { name: "CI/CD", level: 82 }
      ]
    },
    {
      title: "Mobile Development",
      icon: "/icons/phone.svg",
      color: "text-ai-warning",
      bgColor: "bg-ai-warning/10",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Flutter", level: 80 },
        { name: "iOS Development", level: 75 },
        { name: "Android Development", level: 78 }
      ]
    },
    {
      title: "Data & Analytics",
      icon: "/icons/globe.svg",
      color: "text-ai-error",
      bgColor: "bg-ai-error/10",
      skills: [
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "Data Visualization", level: 82 },
        { name: "Big Data", level: 75 }
      ]
    }
  ];

  const technologies = [
    { name: "React", icon: "/icons/react.svg", color: "text-ai-primary" },
    { name: "Node.js", icon: "/icons/nodejs.svg", color: "text-ai-success" },
    { name: "Python", icon: "/icons/python.svg", color: "text-ai-secondary" },
    { name: "AWS", icon: "/icons/aws.svg", color: "text-ai-warning" },
    { name: "Docker", icon: "/icons/docker.svg", color: "text-ai-accent" },
    { name: "MongoDB", icon: "/icons/mongodb.svg", color: "text-ai-success" },
    { name: "TensorFlow", icon: "/icons/tensorflow.svg", color: "text-ai-primary" },
    { name: "TypeScript", icon: "/icons/typescript.svg", color: "text-ai-secondary" },
    { name: "Next.js", icon: "/icons/nextjs.svg", color: "text-ai-accent" },
    { name: "PostgreSQL", icon: "/icons/postgres.svg", color: "text-ai-warning" },
    { name: "GraphQL", icon: "/icons/graphql.svg", color: "text-ai-primary" },
    { name: "Redis", icon: "/icons/redis.svg", color: "text-ai-error" }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl ai-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl ai-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl ai-pulse"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-gradient-ai">Technologies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build intelligent solutions.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="card-ai p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${category.bgColor}`}>
                  <img 
                    src={category.icon} 
                    alt={category.title}
                    className={`w-6 h-6 ${category.color}`}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-white font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full ${category.color.replace('text-', 'bg-')}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            Technologies I <span className="text-gradient-ai">Work With</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="card-ai p-6 text-center group cursor-pointer"
            >
              <div className={`w-12 h-12 mx-auto mb-4 p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300`}>
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  className={`w-full h-full ${tech.color}`}
                />
              </div>
              <h4 className="text-white font-medium text-sm">{tech.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
