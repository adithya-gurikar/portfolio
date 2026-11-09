import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Awards from "@/components/Awards";
import ScrollProgress from "@/components/ScrollProgress";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-ink min-h-screen">
      <ScrollProgress />
      <Navbar />
      
      <Hero />

      {/* Dedicated About Me Section */}
      <About />
      <Skills />
      <Education />
      <Experience />
      <Publications />
      <Awards />
      
      {/* Projects Grid */}
      <Projects />
      
      {/* Contact Section at the bottom */}
      <Contact />
    </main>
  );
}
