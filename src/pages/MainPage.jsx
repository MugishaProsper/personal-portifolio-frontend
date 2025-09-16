import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";

const MainPage = () => {
    const { isDark } = useTheme();
    
    return (
        <div className={`relative min-h-screen transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-light'}`}>
            <Navbar />

            {/* Main Content */}
            <main id="main-content">
                {/* Hero Section */}
                <section id="home">
                    <Hero />
                </section>

                {/* About Section */}
                <About />

                {/* Projects Section */}
                <Projects />

                {/* Skills Section */}
                <Skills />

                {/* Testimonials Section */}
                <Testimonials />

                {/* Contact Section */}
                <Contact />

                {/* Footer */}
                <Footer />
            </main>
        </div>
    );
};

export default MainPage;