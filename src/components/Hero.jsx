import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Code, Brain, Zap } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { isDark } = useTheme()

  return (
    <section
      className="min-h-screen relative flex items-center justify-center overflow-hidden w-full pt-10"
      aria-label="Hero section introducing MUGISHA Prosper"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-dark opacity-20"></div>

      {/* Background AI Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl ai-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl ai-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl ai-pulse"></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-secondary rounded-full opacity-20"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-ai rounded-full opacity-20"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Additional AI-themed floating elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-ai-accent rounded-full opacity-30"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-ai-success rounded-full opacity-25"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold p-4"
          role="banner"
        >
          <span className="text-gradient-ai">MUGISHA Prosper</span>
          <br />
          <span className="sr-only">AI Developer and Full-Stack Engineer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-2xl ${isDark ? 'text-gray-300' : ''} p-4 max-w-2xl mx-auto leading-relaxed`}
        >
          Crafting intelligent digital experiences with cutting-edge AI technologies and modern web development
        </motion.p>

        {/* Skills Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 pt-8"
        >
          <div className="card-ai p-6 text-center">
            <Code className="w-10 h-10 mx-auto mb-3" />
            <h3 className={`${isDark ? 'text-gray-200' : 'text-gray-700'} font-semibold mb-2`}>Backend Development</h3>
            <p className="text-gray-400 text-sm">Node.js, FastAPI, Django, Golang</p>
          </div>
          <div className="card-ai p-6 text-center">
            <Brain className="w-10 h-10 text-ai-secondary mx-auto mb-3" />
            <h3 className={`${isDark ? 'text-gray-200' : 'text-gray-700'} font-semibold mb-2`}>AI & Machine Learning</h3>
            <p className="text-gray-400 text-sm">TensorFlow, OpenAI, Computer Vision, PyTorch</p>
          </div>
          <div className="card-ai p-6 text-center">
            <Zap className="w-10 h-10 text-ai-accent mx-auto mb-3" />
            <h3 className={`${isDark ? 'text-gray-200' : 'text-gray-700'} font-semibold mb-2`}>Modern Technologies</h3>
            <p className="text-gray-400 text-sm">Cloud Computing, DevOps, Microservices</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
