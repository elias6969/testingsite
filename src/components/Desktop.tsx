import React, { useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import { useWindowContext, WindowType } from '../context/WindowContext';
import { useThemeContext } from '../context/ThemeContext';
import '../styles/Desktop.css';

const Desktop: React.FC = () => {
  const { openWindow, focusWindow, windows } = useWindowContext();
  const { isDarkMode } = useThemeContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
  }

  const handleIconClick = (id: WindowType) => {
    const window = windows.find(w => w.id === id);
    if (window && window.isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 30; // Account for taskbar
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: isDarkMode ? '#ffffff33' : '#0c52cd33'
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          particle.x += Math.cos(angle) * force * 2;
          particle.y += Math.sin(angle) * force * 2;
        }

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDarkMode]);

  const desktopIcons: { id: WindowType; label: string; icon: string }[] = [
    { id: 'home', label: 'Welcome', icon: 'Home' },
    { id: 'about', label: 'About Me', icon: 'User' },
    { id: 'skills', label: 'My Skills', icon: 'Code2' },
    { id: 'projects', label: 'My Projects', icon: 'Folder' },
    { id: 'contact', label: 'Contact Me', icon: 'Mail' },
    { id: 'computer', label: 'My Computer', icon: 'Computer' },
    { id: 'work', label: 'Work History', icon: 'Briefcase' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'cv', label: 'My CV', icon: 'FileText' },
    { id: 'snake', label: 'Snake Game', icon: 'Gamepad2' }
  ];

  return (
    <div className={`desktop ${isDarkMode ? 'dark' : ''}`}>
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="desktop-icons">
        {desktopIcons.map((icon) => (
          <DesktopIcon 
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Desktop;
