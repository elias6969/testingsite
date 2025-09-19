import React from 'react';
import Window from './Window';
import HomeWindow from './windows/HomeWindow';
import AboutWindow from './windows/AboutWindow';
import SkillsWindow from './windows/SkillsWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ComputerWindow from './windows/ComputerWindow';
import WorkHistoryWindow from './windows/WorkHistoryWindow';
import EducationWindow from './windows/EducationWindow';
import CVWindow from './windows/CVWindow';
import SnakeGame from './windows/SnakeGame';
import { useWindowContext } from '../context/WindowContext';
import ContactWindow from './windows/ContactWindow';

const WindowManager: React.FC = () => {
  const { windows } = useWindowContext();

  return (
    <div className="window-manager">
      {windows.map(window => {
        if (!window.isOpen) return null;
        
        let WindowComponent: React.FC | null = null;
        
        switch (window.id) {
          case 'home':
            WindowComponent = HomeWindow;
            break;
          case 'about':
            WindowComponent = AboutWindow;
            break;
          case 'skills':
            WindowComponent = SkillsWindow;
            break;
          case 'projects':
            WindowComponent = ProjectsWindow;
            break;
          case 'contact':
            WindowComponent = ContactWindow;
            break;
          case 'computer':
            WindowComponent = ComputerWindow;
            break;
          case 'work':
            WindowComponent = WorkHistoryWindow;
            break;
          case 'education':
            WindowComponent = EducationWindow;
            break;
          case 'cv':
            WindowComponent = CVWindow;
            break;
          case 'snake':
            WindowComponent = SnakeGame;
            break;
          default:
            return null;
        }
        
        return (
          <Window 
            key={window.id} 
            id={window.id} 
            title={window.title} 
            icon={window.icon}
          >
            <WindowComponent />
          </Window>
        );
      })}
    </div>
  );
};

export default WindowManager;
