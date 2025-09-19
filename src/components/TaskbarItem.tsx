import React from 'react';
import * as LucideIcons from 'lucide-react';
import { XIcon as Icon } from 'lucide-react';
import '../styles/TaskbarItem.css';

interface TaskbarItemProps {
  id: string;
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const TaskbarItem: React.FC<TaskbarItemProps> = ({ id, title, icon, isActive, onClick }) => {
  // Dynamically get the icon from lucide-react with fallback
  const LucideIcon = (LucideIcons as any)[icon] as React.FC<React.ComponentProps<typeof Icon>> || Icon;

  return (
    <button 
      className={`taskbar-item ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      <LucideIcon size={16} />
      <span className="taskbar-item-title">{title}</span>
    </button>
  );
};

export default TaskbarItem;