import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#121212] min-h-screen">
      <Navbar />
      
      {/* Scroll container for canvas & overlay */}
      <div className="relative w-full">
        {/* Anchor point for About Me section */}
        <div id="about" className="absolute top-[150vh] w-full" />
        
        <ScrollyCanvas />
        <Overlay />
      </div>
      
      {/* Projects Grid below the scroll animation */}
      <Projects />
      
      {/* Contact Section at the bottom */}
      <Contact />
    </main>
  );
}
