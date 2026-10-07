"use client";

import { ExternalLink, Code } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    description: "A high-performance e-commerce platform built with Next.js and Shopify.",
    tags: ["Next.js", "Tailwind", "Shopify"],
    link: "#",
    github: "#"
  },
  {
    title: "Project Beta",
    description: "An interactive WebGL experience using Three.js and React Three Fiber.",
    tags: ["React", "Three.js", "WebGL"],
    link: "#",
    github: "#"
  },
  {
    title: "Project Gamma",
    description: "A modern dashboard for real-time analytics with complex data visualizations.",
    tags: ["TypeScript", "Recharts", "Supabase"],
    link: "#",
    github: "#"
  },
  {
    title: "Project Delta",
    description: "A sleek, animated marketing site for a FinTech startup.",
    tags: ["Framer Motion", "Next.js", "Tailwind"],
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight text-white">
          Selected Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <a href={project.link} className="flex items-center gap-2 text-sm font-medium hover:text-white text-gray-300 transition-colors pointer-events-auto">
                    <ExternalLink size={16} /> Live Site
                  </a>
                  <a href={project.github} className="flex items-center gap-2 text-sm font-medium hover:text-white text-gray-300 transition-colors pointer-events-auto">
                    <Code size={16} /> Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
