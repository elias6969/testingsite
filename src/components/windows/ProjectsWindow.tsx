import React from 'react';
import { Github } from 'lucide-react';
import '../../styles/windows/ProjectsWindow.css';

const ProjectsWindow: React.FC = () => {
  const projects = [
    {
      title: "Pigeon Engine",
      description: "A modular C++ game engine with 3D model support, custom shaders, and an intuitive UI system. Built with OpenGL, ImGui, and TinyFileDialog for a complete game development environment.",
      technologies: ["C++", "OpenGL", "ImGui", "GLSL", "TinyFileDialog"],
      githubLink: "https://github.com/elias6969/Pigeon-Engine",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Pigeon-Forge",
      description: "Desktop application for project scaffolding and management, built with C++ and wxWidgets for a native cross-platform experience.",
      technologies: ["C++", "wxWidgets", "Cross-platform UI"],
      githubLink: "https://github.com/elias6969/Pigeon-Forge",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Pigeon-Nest",
      description: "C-style OpenGL application featuring ImGui integration for user interface. Built with a focus on performance and low-level control.",
      technologies: ["C++", "OpenGL", "ImGui", "C-style code"],
      githubLink: "https://github.com/elias6969/Pigeon-Nest",
      image: "https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Client Messaging System",
      description: "Secure messaging API with JWT authentication, CORS support, WebSockets for real-time communication, and comprehensive user profiles. (Private repository - Available for review by hiring managers)",
      technologies: ["Express.js", "Socket.io", "JWT", "PostgreSQL"],
      githubLink: null,
      image: "https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <div className="projects-window">
      <div className="projects-header">
        <h2>My Projects</h2>
      </div>
      
      <div className="projects-content">
        <div className="project-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}></div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                {project.githubLink && (
                  <div className="project-links">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;