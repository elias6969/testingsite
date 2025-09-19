import React from 'react';
import { XIcon as Icon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import '../styles/DesktopIcon.css';
import { WindowType } from '../context/WindowContext';
import { useLanguageContext } from '../context/LanguageContext';

interface DesktopIconProps {
  id: WindowType;
  label: string;
  icon: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon, onClick }) => {
  const LucideIcon = (LucideIcons as any)[icon] as React.FC<React.ComponentProps<typeof Icon>> || Icon;
  const { t } = useLanguageContext();

  return (
    <div className="desktop-icon" onClick={onClick}>
      <div className="icon-container">
        <LucideIcon size={32} />
      </div>
      <div className="icon-label">{t(id)}</div>
    </div>
  );
};

export default DesktopIcon;