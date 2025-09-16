import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDark } = useTheme();

    const navigation = [
        {
            name: 'Home',
            href: '#home'
        },
        {
            name: 'About',
            href: '#about',
        },
        {
            name: 'Projects',
            href: '#projects',
        },
        {
            name: 'Skills',
            href: '#skills'
        },
        {
            name: 'Testimonials',
            href: '#testimonials'
        },
        {
            name: 'Contact',
            href: '#contact'
        }
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            icon: Github,
            href: 'https://github.com/MugishaProsper',
            color: 'hover:text-ai-primary'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: 'https://linkedin.com/in/mugisha-prosper-7a5981297',
            color: 'hover:text-ai-secondary'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            href: 'https://instagram.com/p.o.l.o_10',
            color: 'hover:text-ai-accent'
        }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-4 left-4 right-4 z-50 glass rounded-lg"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <h3 className="text-2xl font-bold">
                            { isDark ? (<img src="/logo.svg" alt="logo" className="w-25" />) : (<img src="/logo_dark.svg" alt="logo" className="w-25" />)}
                        </h3>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navigation.map((item) => (
                        <motion.button
                            key={item.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection(item.href)}
                            className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
                            aria-label={`Navigate to ${item.name} section`}
                        >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Social Links and Theme Toggle */}
                    <div className="hidden md:flex items-center space-x-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${isDark ? 'text-gray-300' : 'text-gray-600'} ${social.color} transition-colors duration-200 p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'} focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
                                aria-label={`Visit my ${social.name} profile`}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                        <div className="h-6 w-px bg-gray-300 opacity-30"></div>
                        <ThemeToggle />
                    </div>

                    {/* Mobile menu button and theme toggle */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} p-2 rounded-md`}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden glass-dark border-t border-white/10"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <motion.button
                                key={item.name}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection(item.href)}
                                className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-ai-primary focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
                                aria-label={`Navigate to ${item.name} section`}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                        <div className="flex space-x-4 px-3 py-2">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileTap={{ scale: 0.95 }}
                                    className={`text-gray-300 ${social.color} transition-colors duration-200 p-2 rounded-lg hover:bg-white/10`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;