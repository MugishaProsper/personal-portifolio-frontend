import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, Brain, Globe, Smartphone, Heart, MessageCircleDashed, X, Send, Calendar, User, ThumbsUp } from "lucide-react";
import { useState } from "react";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [commentText, setCommentText] = useState("");

  const projects = [
    {
      _id: "688cd969829bba9eb0e9f316",
      user: "688bbe1f99ca254be72f6cec",
      projectName: "AI-Powered Chat Assistant",
      projectUrl: "https://ai-chat-assistant.vercel.app",
      sampleImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
      projectDescription: "An intelligent chatbot built with OpenAI GPT-4, featuring natural language processing and context-aware responses. The system handles complex conversations and provides personalized assistance to users.",
      categories: ["AI/ML", "Web Development"],
      technologies: ["React", "Node.js", "OpenAI API", "Socket.io", "MongoDB"],
      projectStatus: "COMPLETED",
      createdAt: "2024-12-01T15:12:41.127Z",
      updatedAt: "2024-12-15T21:13:54.998Z",
      statistics: {
        likes: 127,
        comments_count: 8,
        comments: [
          {
            _id: "comment1",
            user: "John Doe",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            text: "Amazing AI integration! The response time is incredible.",
            createdAt: "2024-12-10T10:30:00.000Z"
          },
          {
            _id: "comment2",
            user: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            text: "The natural language processing is really impressive. Great work!",
            createdAt: "2024-12-12T14:20:00.000Z"
          }
        ]
      },
      icon: Brain,
      color: "text-ai-primary"
    },
    {
      _id: "688cd969829bba9eb0e9f317",
      user: "688bbe1f99ca254be72f6cec",
      projectName: "Smart E-commerce Platform",
      projectUrl: "https://smart-ecommerce.vercel.app",
      sampleImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      projectDescription: "A modern e-commerce solution with AI-powered product recommendations and personalized user experience. Features include real-time inventory management, secure payment processing, and advanced analytics dashboard.",
      categories: ["Full-Stack", "E-commerce"],
      technologies: ["Next.js", "Python", "TensorFlow", "MongoDB", "Stripe API"],
      projectStatus: "COMPLETED",
      createdAt: "2024-11-15T09:30:00.000Z",
      updatedAt: "2024-12-01T16:45:00.000Z",
      statistics: {
        likes: 89,
        comments_count: 12,
        comments: [
          {
            _id: "comment3",
            user: "Mike Johnson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            text: "The AI recommendations are spot on! Increased our sales by 35%.",
            createdAt: "2024-11-25T11:15:00.000Z"
          }
        ]
      },
      icon: Globe,
      color: "text-ai-secondary"
    },
    {
      _id: "688cd969829bba9eb0e9f318",
      user: "688bbe1f99ca254be72f6cec",
      projectName: "Computer Vision App",
      projectUrl: "https://cv-detection.vercel.app",
      sampleImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&h=300&fit=crop",
      projectDescription: "Real-time object detection and image classification using deep learning models and computer vision. The app can identify objects, faces, and text in images with high accuracy.",
      categories: ["AI/ML", "Computer Vision"],
      technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "React"],
      projectStatus: "COMPLETED",
      createdAt: "2024-10-20T14:20:00.000Z",
      updatedAt: "2024-11-30T12:10:00.000Z",
      statistics: {
        likes: 156,
        comments_count: 15,
        comments: [
          {
            _id: "comment4",
            user: "Emily Watson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
            text: "Incredible accuracy in object detection! The real-time processing is impressive.",
            createdAt: "2024-11-05T09:45:00.000Z"
          }
        ]
      },
      icon: Brain,
      color: "text-ai-accent"
    },
    {
      _id: "688cd969829bba9eb0e9f319",
      user: "688bbe1f99ca254be72f6cec",
      projectName: "Mobile AI Assistant",
      projectUrl: "https://mobile-ai-assistant.vercel.app",
      sampleImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
      projectDescription: "Cross-platform mobile app with voice recognition and AI-powered task automation. Features include voice commands, smart scheduling, and integration with various APIs.",
      categories: ["Mobile", "AI/ML"],
      technologies: ["React Native", "Python", "Speech Recognition", "Firebase", "Node.js"],
      projectStatus: "IN_PROGRESS",
      createdAt: "2024-12-05T08:15:00.000Z",
      updatedAt: "2024-12-20T18:30:00.000Z",
      statistics: {
        likes: 67,
        comments_count: 5,
        comments: [
          {
            _id: "comment5",
            user: "Alex Kim",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
            text: "Voice recognition works perfectly! Can't wait for the full release.",
            createdAt: "2024-12-15T13:20:00.000Z"
          }
        ]
      },
      icon: Smartphone,
      color: "text-ai-success"
    },
    {
      _id: "688cd969829bba9eb0e9f320",
      user: "688bbe1f99ca254be72f6cec",
      projectName: "Data Analytics Dashboard",
      projectUrl: "https://analytics-dashboard.vercel.app",
      sampleImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      projectDescription: "Interactive dashboard for real-time data visualization and AI-powered insights generation. Provides comprehensive analytics with customizable charts and predictive modeling.",
      categories: ["Data", "Web Development"],
      technologies: ["React", "D3.js", "Python", "PostgreSQL", "TensorFlow"],
      projectStatus: "COMPLETED",
      createdAt: "2024-09-10T11:45:00.000Z",
      updatedAt: "2024-12-10T15:20:00.000Z",
      statistics: {
        likes: 203,
        comments_count: 18,
        comments: [
          {
            _id: "comment6",
            user: "David Wilson",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
            text: "The predictive analytics feature is game-changing for our business decisions.",
            createdAt: "2024-10-15T16:30:00.000Z"
          }
        ]
      },
      icon: Code,
      color: "text-ai-warning"
    },
    {
      _id: "688cd969829bba9eb0e9f321",
      user: "688bbe1f99ca254be72f6cec",
      projectName: "AI Content Generator",
      projectUrl: "https://content-generator.vercel.app",
      sampleImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop",
      projectDescription: "Automated content creation tool using natural language generation and machine learning. Generates high-quality articles, social media posts, and marketing copy.",
      categories: ["AI/ML", "Content Creation"],
      technologies: ["Python", "Transformers", "FastAPI", "Redis", "React"],
      projectStatus: "COMPLETED",
      createdAt: "2024-08-25T13:30:00.000Z",
      updatedAt: "2024-12-05T10:15:00.000Z",
      statistics: {
        likes: 178,
        comments_count: 22,
        comments: [
          {
            _id: "comment7",
            user: "Lisa Thompson",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
            text: "This tool has saved us hours of content creation time. The quality is outstanding!",
            createdAt: "2024-09-20T14:45:00.000Z"
          }
        ]
      },
      icon: Brain,
      color: "text-ai-primary"
    }
  ];

  const categories = ["All", "AI/ML", "Full-Stack", "Mobile", "Data", "E-commerce", "Computer Vision", "Content Creation", "Web Development"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.categories.includes(selectedCategory));

  const closePopover = () => {
    setSelectedProject(null);
    setCommentText("");
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        _id: `comment_${Date.now()}`,
        user: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        text: commentText,
        createdAt: new Date().toISOString()
      };

      setSelectedProject(prev => ({
        ...prev,
        statistics: {
          ...prev.statistics,
          comments: [newComment, ...prev.statistics.comments],
          comments_count: prev.statistics.comments_count + 1
        }
      }));
      setCommentText("");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-400";
      case "IN_PROGRESS":
        return "text-yellow-400";
      case "PLANNED":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-gradient-ai">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my latest work showcasing AI integration, modern web development, and innovative solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategory === category
                ? "bg-gradient-primary text-white shadow-lg"
                : "card-glass text-gray-300 hover:bg-white/10"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="card-glass overflow-hidden h-full">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.sampleImage}
                    alt={project.projectName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium ${project.color}`}>
                      <project.icon className="w-4 h-4" />
                      {project.categories[0]}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full glass text-xs font-medium ${getStatusColor(project.projectStatus)}`}>
                      {project.projectStatus}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient-ai transition-colors duration-300">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {project.projectDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Statistics */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {project.statistics.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircleDashed className="w-4 h-4" />
                        {project.statistics.comments_count}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(project.createdAt)}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Project
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-ai px-8 py-4 text-lg font-semibold">
            View All Projects
          </button>
        </motion.div>
      </div>

      {/* Project Details Popover */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePopover}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="card-glass max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePopover}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="p-8">
                {/* Project Header */}
                <div className="mb-8">
                  <div className="flex items-start gap-6 mb-6">
                    <img
                      src={selectedProject.sampleImage}
                      alt={selectedProject.projectName}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.projectName}</h2>
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium ${selectedProject.color}`}>
                          <selectedProject.icon className="w-4 h-4" />
                          {selectedProject.categories.join(", ")}
                        </div>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full glass text-sm font-medium ${getStatusColor(selectedProject.projectStatus)}`}>
                          {selectedProject.projectStatus}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Created: {formatDate(selectedProject.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Updated: {formatDate(selectedProject.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <h3 className="text-white font-semibold text-lg mb-3">Description</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.projectDescription}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-white font-semibold text-lg mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/10 rounded-lg text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Link */}
                  <div className="mb-8">
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Live Project
                    </a>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold text-lg">Comments ({selectedProject.statistics.comments_count})</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {selectedProject.statistics.likes} likes
                      </div>
                    </div>
                  </div>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <div className="flex gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="Your avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-ai-primary"
                          rows="3"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleAddComment}
                            disabled={!commentText.trim()}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-4 h-4" />
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {selectedProject.statistics.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-3">
                        <img
                          src={comment.avatar}
                          alt={comment.user}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium text-sm">{comment.user}</span>
                            <span className="text-gray-500 text-xs">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
