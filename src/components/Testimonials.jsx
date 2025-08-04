import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, User, Building, Globe, Smartphone, Brain, Server, Database, Code, Zap, X } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "CTO",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Mugisha delivered an exceptional AI-powered recommendation system that increased our user engagement by 40%. His expertise in machine learning and backend architecture is truly outstanding. The system has been running flawlessly for 8 months with 99.9% uptime.",
      fullContent: "Mugisha delivered an exceptional AI-powered recommendation system that increased our user engagement by 40%. His expertise in machine learning and backend architecture is truly outstanding. The system has been running flawlessly for 8 months with 99.9% uptime. His ability to understand complex business requirements and translate them into scalable technical solutions is remarkable. The recommendation engine processes millions of user interactions daily and provides real-time personalized suggestions. Mugisha's attention to detail in performance optimization and system monitoring has ensured zero downtime since deployment. We're already planning our next AI project with him.",
      project: "AI Recommendation Engine",
      category: "AI/ML",
      icon: Brain,
      color: "text-ai-primary",
      metrics: "40% increase in user engagement, 99.9% uptime, 8 months flawless operation"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      position: "Lead Developer",
      company: "DataVault Inc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Working with Mugisha on our microservices architecture was a game-changer. He implemented a scalable backend system that handles 10M+ daily requests. His attention to detail and performance optimization skills are remarkable.",
      fullContent: "Working with Mugisha on our microservices architecture was a game-changer. He implemented a scalable backend system that handles 10M+ daily requests. His attention to detail and performance optimization skills are remarkable. The microservices platform he built reduced our API response times by 60% and improved system reliability significantly. Mugisha's expertise in containerization and orchestration with Kubernetes made our deployment process seamless. He also implemented comprehensive monitoring and logging solutions that give us complete visibility into our system performance. The architecture he designed is future-proof and can easily scale to handle our growing user base. His documentation and knowledge transfer were excellent, making it easy for our team to maintain and extend the system.",
      project: "Microservices Platform",
      category: "Backend",
      icon: Server,
      color: "text-ai-secondary",
      metrics: "10M+ daily requests, 60% faster API responses, seamless Kubernetes deployment"
    },
    {
      id: 3,
      name: "Emily Watson",
      position: "Product Manager",
      company: "InnovateAI",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Mugisha's expertise in computer vision and NLP helped us build a revolutionary content moderation system. His ability to translate complex AI requirements into production-ready solutions is invaluable. Highly recommended!",
      fullContent: "Mugisha's expertise in computer vision and NLP helped us build a revolutionary content moderation system. His ability to translate complex AI requirements into production-ready solutions is invaluable. The content moderation AI he developed processes over 100,000 images and text pieces daily with 95% accuracy. His implementation of real-time processing pipelines and automated decision-making systems has dramatically reduced our manual review workload. Mugisha's understanding of ethical AI practices and bias mitigation was crucial for our compliance requirements. He also built a comprehensive dashboard for monitoring system performance and flagging potential issues. The system has been running in production for 6 months with zero false positives. Highly recommended!",
      project: "Content Moderation AI",
      category: "AI/ML",
      icon: Brain,
      color: "text-ai-accent",
      metrics: "100K+ daily content pieces, 95% accuracy, 6 months zero false positives"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Engineering Director",
      company: "CloudScale Systems",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The data pipeline Mugisha built for us processes terabytes of data daily with incredible efficiency. His knowledge of big data technologies and cloud architecture is exceptional. The ROI was immediate and substantial.",
      fullContent: "The data pipeline Mugisha built for us processes terabytes of data daily with incredible efficiency. His knowledge of big data technologies and cloud architecture is exceptional. The ETL pipeline he designed processes 5TB of data daily with 99.5% data quality and near real-time processing capabilities. Mugisha implemented Apache Kafka for stream processing and Apache Spark for batch processing, creating a hybrid architecture that handles both real-time and historical data analysis. His expertise in cloud-native solutions with AWS services like EMR, Glue, and Redshift optimized our costs by 40% while improving performance. The data warehouse he built provides business intelligence dashboards that our executive team uses daily. The ROI was immediate and substantial, with our data processing costs reduced by 60%.",
      project: "Big Data Pipeline",
      category: "Data Engineering",
      icon: Database,
      color: "text-ai-success",
      metrics: "5TB daily processing, 99.5% data quality, 40% cost optimization"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "CEO",
      company: "StartupHub",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Mugisha transformed our startup's technical foundation. His full-stack development skills and AI integration expertise helped us launch our MVP in record time. He's not just a developer, he's a strategic partner.",
      fullContent: "Mugisha transformed our startup's technical foundation. His full-stack development skills and AI integration expertise helped us launch our MVP in record time. He built a complete React frontend with Node.js backend, integrated AI-powered features for user personalization, and implemented a robust authentication system. The MVP was delivered in just 8 weeks, 2 weeks ahead of schedule. Mugisha's understanding of startup needs and rapid iteration cycles was invaluable. He implemented CI/CD pipelines that allow us to deploy multiple times daily, and his code quality standards ensured we have a solid foundation for future development. He's not just a developer, he's a strategic partner who understands our business goals and technical requirements. The AI features he integrated have become our key differentiator in the market.",
      project: "Full-Stack MVP",
      category: "Full-Stack",
      icon: Code,
      color: "text-ai-warning",
      metrics: "8-week delivery, 2 weeks ahead of schedule, daily deployments enabled"
    },
    {
      id: 6,
      name: "Alex Johnson",
      position: "DevOps Engineer",
      company: "SecureNet",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Mugisha's implementation of our CI/CD pipeline and infrastructure automation was flawless. His understanding of DevOps best practices and cloud security is top-notch. Our deployment process is now 10x faster.",
      fullContent: "Mugisha's implementation of our CI/CD pipeline and infrastructure automation was flawless. His understanding of DevOps best practices and cloud security is top-notch. He built a comprehensive GitLab CI/CD pipeline that automates testing, security scanning, and deployment across multiple environments. The infrastructure as code implementation using Terraform and Ansible reduced our provisioning time from days to minutes. Mugisha implemented security best practices including secret management, network segmentation, and automated vulnerability scanning. His monitoring and alerting setup with Prometheus and Grafana gives us complete visibility into our infrastructure health. Our deployment process is now 10x faster, and we've achieved zero-downtime deployments. The security posture improvements he implemented helped us pass our SOC 2 audit with flying colors.",
      project: "DevOps Automation",
      category: "DevOps",
      icon: Zap,
      color: "text-ai-error",
      metrics: "10x faster deployments, zero-downtime releases, SOC 2 compliance achieved"
    }
  ];

  const stats = [
    {
      value: "100%",
      label: "Client Satisfaction",
      icon: Star,
      color: "text-ai-primary"
    },
    {
      value: "50+",
      label: "Projects Completed",
      icon: Building,
      color: "text-ai-secondary"
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      icon: Globe,
      color: "text-ai-accent"
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: Smartphone,
      color: "text-ai-success"
    }
  ];

  const closePopover = () => {
    setSelectedTestimonial(null);
  };

  return (
    <section id="testimonials" className="min-h-screen relative flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client <span className="text-gradient-ai">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from clients who have experienced the quality and professionalism of my work
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <div className="card-ai p-6 h-full relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="w-8 h-8 text-ai-primary" />
                </div>

                {/* Project Badge */}
                <div className="mb-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium ${testimonial.color}`}>
                    <testimonial.icon className="w-3 h-3" />
                    {testimonial.category}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
                  "{testimonial.content}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.position}</p>
                    <p className="text-ai-primary text-xs font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Project Name */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-ai-accent text-xs font-medium">Project: {testimonial.project}</p>
                </div>

                {/* Click indicator */}
                <div className="absolute bottom-2 right-2 opacity-50">
                  <p className="text-xs text-gray-400">Click to read more</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="card-ai p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              Ready to join these satisfied clients?
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Let's discuss how I can help bring your AI and backend projects to life
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ai px-6 py-3 text-base font-semibold"
            >
              Start Your Project
            </button>
          </div>
        </motion.div>
      </div>

      {/* Custom Popover */}
      <AnimatePresence>
        {selectedTestimonial && (
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
              className="card-glass max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
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
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={selectedTestimonial.avatar}
                    alt={selectedTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-1">{selectedTestimonial.name}</h3>
                    <p className="text-gray-400 text-sm mb-1">{selectedTestimonial.position}</p>
                    <p className="text-ai-primary text-sm font-medium mb-2">{selectedTestimonial.company}</p>
                    <div className="flex gap-1">
                      {[...Array(selectedTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium ${selectedTestimonial.color} mb-3`}>
                    <selectedTestimonial.icon className="w-4 h-4" />
                    {selectedTestimonial.category}
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">Project: {selectedTestimonial.project}</h4>
                </div>

                {/* Metrics */}
                <div className="mb-6 p-4 bg-white/5 rounded-lg">
                  <h5 className="text-white font-semibold text-sm mb-2">Key Metrics & Achievements:</h5>
                  <p className="text-ai-accent text-sm">{selectedTestimonial.metrics}</p>
                </div>

                {/* Full Content */}
                <div className="mb-6">
                  <h5 className="text-white font-semibold text-sm mb-3">Full Testimonial:</h5>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-ai-primary opacity-30" />
                    <p className="text-gray-300 text-sm leading-relaxed pl-6">
                      "{selectedTestimonial.fullContent}"
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      closePopover();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-ai px-6 py-3 text-sm font-semibold"
                  >
                    Start Your Similar Project
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
