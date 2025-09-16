import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, Brain, Globe, Smartphone, MessageCircleDashed, X, Send, Calendar, ThumbsUp, Loader2 } from "lucide-react";
import { useState } from "react";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Use the hook to fetch real data
  const { loading, error, projects } = useProjects();

  // Get unique categories from the API data
  const categories = ["All", ...new Set(projects.flatMap(project => project.categories || []))];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.categories && project.categories.includes(selectedCategory));

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
          comments: [newComment, ...(prev.statistics?.comments || [])],
          comments_count: (prev.statistics?.comments_count || 0) + 1
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

  const getProjectIcon = (categories) => {
    if (!categories || categories.length === 0) return Code;

    const category = categories[0];
    const iconMap = {
      "AI/ML": Brain,
      "Computer Vision": Brain,
      "Mobile": Smartphone,
      "Web Development": Globe,
      "Full-Stack": Code,
      "E-commerce": Globe,
      "Data": Code,
      "Content Creation": Brain
    };
    return iconMap[category] || Code;
  };

  const getProjectColor = (categories) => {
    if (!categories || categories.length === 0) return "text-ai-primary";

    const category = categories[0];
    const colorMap = {
      "AI/ML": "text-ai-primary",
      "Computer Vision": "text-ai-accent",
      "Mobile": "text-ai-success",
      "Web Development": "text-ai-secondary",
      "Full-Stack": "text-ai-warning",
      "E-commerce": "text-ai-secondary",
      "Data": "text-ai-success",
      "Content Creation": "text-ai-primary"
    };
    return colorMap[category] || "text-ai-primary";
  };

  // Loading state
  if (loading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Loader2 className="w-8 h-8 text-ai-primary animate-spin" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loading <span className="text-gradient-ai">Projects</span>
            </h2>
            <p className="text-xl text-gray-300">
              Fetching the latest projects from the backend...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Error Loading <span className="text-gradient-ai">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Unable to load projects. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-ai px-6 py-3 text-base font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl ai-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl ai-float" style={{ animationDelay: '1s' }}></div>
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
          {filteredProjects.map((project, index) => {
            const ProjectIcon = getProjectIcon(project.categories);
            const projectColor = getProjectColor(project.categories);

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => { setSelectedProject(project); setActiveImageIdx(0); }}
              >
                <div className="card-ai overflow-hidden h-full">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.sampleImage}
                      alt={project.projectName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium ${projectColor}`}>
                        <ProjectIcon className="w-4 h-4" />
                        {project.categories && project.categories[0]}
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
                      {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies && project.technologies.length > 3 && (
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
                          {project.statistics?.likes || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircleDashed className="w-4 h-4" />
                          {project.statistics?.comments_count || 0}
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
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <div className="card-ai p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-3">
                No projects found
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                No projects match the selected category. Try selecting a different category or check back later.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="btn-ai px-6 py-3 text-sm font-semibold"
              >
                View All Projects
              </button>
            </div>
          </motion.div>
        )}

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closePopover}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="card-glass w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePopover}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="p-4 sm:p-6 lg:p-8">
                {/* Project Header */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6 w-full">
                    <div className="w-full sm:w-1/3">
                      {(() => {
                        const images = (selectedProject.sampleImages && selectedProject.sampleImages.length > 0)
                          ? selectedProject.sampleImages
                          : [selectedProject.sampleImage].filter(Boolean);
                        const activeSrc = images[activeImageIdx] || images[0] || "";
                        return (
                          <>
                            <img
                              src={activeSrc}
                              alt={selectedProject.projectName}
                              className="w-full h-56 sm:h-64 rounded-lg object-cover"
                            />
                            {images.length > 1 && (
                              <div className="mt-3 grid grid-cols-5 gap-2">
                                {images.map((img, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setActiveImageIdx(idx)}
                                    className={`rounded-md overflow-hidden border ${idx === activeImageIdx ? 'border-ai-primary' : 'border-white/10'}`}
                                  >
                                    <img src={img} alt={`thumb-${idx}`} className="w-full h-14 object-cover" />
                                  </button>
                                ))}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{selectedProject.projectName}</h2>
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mb-3">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium ${getProjectColor(selectedProject.categories)}`}>
                          {(() => {
                            const ProjectIcon = getProjectIcon(selectedProject.categories);
                            return <ProjectIcon className="w-4 h-4" />;
                          })()}
                          <span className="hidden sm:inline">{selectedProject.categories?.join(", ")}</span>
                          <span className="sm:hidden">{selectedProject.categories?.[0]}</span>
                        </div>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full glass text-sm font-medium ${getStatusColor(selectedProject.projectStatus)}`}>
                          {selectedProject.projectStatus}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="hidden sm:inline">Created: {formatDate(selectedProject.createdAt)}</span>
                          <span className="sm:hidden">Created: {formatDate(selectedProject.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="hidden sm:inline">Updated: {formatDate(selectedProject.updatedAt)}</span>
                          <span className="sm:hidden">Updated: {formatDate(selectedProject.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">Description</h3>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedProject.projectDescription}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-white/10 rounded-lg text-xs sm:text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Link */}
                  <div className="mb-6 sm:mb-8">
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-primary rounded-lg text-white text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      Visit Live Project
                    </a>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-white/10 pt-4 sm:pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                    <h3 className="text-white font-semibold text-base sm:text-lg">Comments ({selectedProject.statistics?.comments_count || 0})</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {selectedProject.statistics?.likes || 0} likes
                      </div>
                    </div>
                  </div>

                  {/* Add Comment */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="Your avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-ai-primary text-sm sm:text-base"
                          rows="3"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleAddComment}
                            disabled={!commentText.trim()}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-primary rounded-lg text-white text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Post Comment</span>
                            <span className="sm:hidden">Post</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3 sm:space-y-4">
                    {selectedProject.statistics?.comments?.map((comment) => (
                      <div key={comment._id} className="flex gap-2 sm:gap-3">
                        <img
                          src={comment.avatar}
                          alt={comment.user}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <span className="text-white font-medium text-xs sm:text-sm">{comment.user}</span>
                            <span className="text-gray-500 text-xs">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-300 text-xs sm:text-sm break-words">{comment.text}</p>
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
