"use client";

import { Mail, Phone, Link } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
          Let's Connect
        </h2>
        <p className="text-lg text-gray-400 mb-16 max-w-2xl">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full justify-center items-center">
          
          {/* Phone */}
          <a href="tel:+916366120580" className="flex flex-col items-center gap-4 text-gray-400 hover:text-white transition-all group">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
              <Phone size={24} />
            </div>
            <span className="text-lg font-medium">+91-6366120580</span>
          </a>
          
          {/* Email */}
          <a href="mailto:adithyagurikar10@gmail.com" className="flex flex-col items-center gap-4 text-gray-400 hover:text-white transition-all group">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
              <Mail size={24} />
            </div>
            <span className="text-lg font-medium">adithyagurikar10@gmail.com</span>
          </a>
          
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/adithya-s-g-645a95126/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 text-gray-400 hover:text-white transition-all group">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
              <Link size={24} />
            </div>
            <span className="text-lg font-medium underline underline-offset-4 decoration-white/20 group-hover:decoration-white transition-colors">
              LinkedIn
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}
