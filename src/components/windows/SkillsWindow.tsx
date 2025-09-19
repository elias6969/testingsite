import React from 'react';
import '../../styles/windows/SkillsWindow.css';

const SkillsWindow: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages & Web",
      skills: ["C++", "Lua", "Python", "JavaScript", "HTML5", "CSS3", "SQL", "PHP", "Rust", "C"]
    },
    {
      title: "Frameworks & Tools",
      skills: ["Node.js/Express", "CORS", "JWT", "bcrypt", "Socket.io", "Docker", "Postman"]
    },
    {
      title: "Databases & APIs",
      skills: ["PostgreSQL", "RESTful design", "API Security", "Database Optimization"]
    },
    {
      title: "Graphics & Game Dev",
      skills: ["C++/OpenGL", "Raylib", "Custom engines (e.g. Pigeon Engine)", "Game Architecture"]
    },
    {
      title: "Environments",
      skills: ["VS Code", "Visual Studio", "Vim", "Git/GitHub", "Bash/Zsh", "pacman/APT/DNF/ports"]
    }
  ];

  return (
    <div className="skills-window">
      <div className="skills-header">
        <h2>My Skills</h2>
      </div>
      
      <div className="skills-content">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="skill-items">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <div className="skill-icon"></div>
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWindow;