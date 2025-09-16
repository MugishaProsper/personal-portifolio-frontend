import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import useMessage from "../hooks/useMessage";
import { InlineLoading } from "./LoadingSpinner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { loading, error, success, sendMessage, clearMessage } = useMessage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage(); // Clear any previous messages
    
    const success = await sendMessage(formData);
    
    if (success) {
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "nelsonprox92@gmail.com",
      href: "mailto:nelsonprox92@gmail.com",
      color: "text-ai-primary"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+250 798 615 286",
      href: "tel:+250798615286",
      color: "text-ai-secondary"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kigali, Rwanda",
      href: "#",
      color: "text-ai-accent"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/MugishaProsper",
      color: "hover:text-ai-primary"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/mugisha-prosper",
      color: "hover:text-ai-secondary"
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/p.o.l.o_10",
      color: "hover:text-ai-accent"
    }
  ];

  return (
    <section id="contact" className="min-h-screen relative flex items-center">
      {/* Background AI Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl ai-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl ai-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl ai-pulse"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-gradient-ai">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto p-2">
            Ready to collaborate on your next project? Let's discuss how we can bring your ideas to life with AI-powered solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="card-ai p-6">
              <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-300 mb-6 text-sm">
                I'm always interested in new opportunities and exciting projects.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className={`p-2 rounded-lg bg-white/10 ${info.color}`}>
                      <info.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{info.title}</h4>
                      <p className="text-gray-300 text-sm">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex gap-3 flex-row justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg bg-white/10 text-gray-300 ${social.color} transition-all duration-300`}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card-ai p-6">
              <h3 className="text-xl font-bold text-white mb-4">Send Message</h3>

              {/* Success/Error Messages */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 dark:text-green-200 font-medium">Message sent successfully!</p>
                    <p className="text-green-600 dark:text-green-300 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 dark:text-red-200 font-medium">Failed to send message</p>
                    <p className="text-red-600 dark:text-red-300 text-sm">{error.message}</p>
                    {error.canRetry && (
                      <button
                        onClick={() => handleSubmit({ preventDefault: () => {} })}
                        className="text-red-700 dark:text-red-300 underline text-sm mt-1 hover:no-underline"
                      >
                        Try again
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-1 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-ai w-full bg-white/5 border-white/20 text-white placeholder-gray-400 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-1 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-ai w-full bg-white/5 border-white/20 text-white placeholder-gray-400 text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-1 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="input-ai w-full bg-white/5 border-white/20 text-white placeholder-gray-400 text-sm"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-1 text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="input-ai w-full bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none text-sm"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="btn-ai w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? (
                    <>
                      <InlineLoading size="sm" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 