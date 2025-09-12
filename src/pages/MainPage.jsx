import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const MainPage = () => {
    return (
        <div className="relative bg-dark">
            <Navbar />

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
        </div>
    );
};

export default MainPage;