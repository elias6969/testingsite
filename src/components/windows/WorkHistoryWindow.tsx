import React from 'react';
import { Briefcase, Calendar, MapPin, Code, Database, Shield } from 'lucide-react';
import '../../styles/windows/WorkHistoryWindow.css';

const WorkHistoryWindow: React.FC = () => {
  return (
    <div className="work-history-window">
      <div className="work-header">
        <h2>Work History</h2>
      </div>
      
      <div className="work-content">
        <div className="work-timeline">
          <div className="work-entry">
            <div className="work-icon">
              <Briefcase size={24} />
            </div>
            <div className="work-details">
              <h3>Freelance Backend Developer</h3>
              <div className="work-meta">
                <span className="company">Self-employed</span>
                <span className="duration">
                  <Calendar size={14} />
                  Mar 2025 - Present
                </span>
                <span className="location">
                  <MapPin size={14} />
                  Remote
                </span>
              </div>
              <div className="tech-stack">
                <h4>Technology Stack:</h4>
                <div className="tech-categories">
                  <div className="tech-category">
                    <Code size={14} />
                    <span>Runtime & Framework</span>
                    <ul>
                      <li>Node.js (v18+)</li>
                      <li>Express 5</li>
                      <li>Socket.io v4</li>
                    </ul>
                  </div>
                  <div className="tech-category">
                    <Database size={14} />
                    <span>Database</span>
                    <ul>
                      <li>PostgreSQL</li>
                      <li>pg (Node PostgreSQL driver)</li>
                    </ul>
                  </div>
                  <div className="tech-category">
                    <Shield size={14} />
                    <span>Authentication & Security</span>
                    <ul>
                      <li>JWT (jsonwebtoken)</li>
                      <li>bcrypt</li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul className="work-responsibilities">
                <li>Developing a robust backend system for real-time messaging application</li>
                <li>Implementing secure user authentication with JWT and bcrypt</li>
                <li>Designing and maintaining PostgreSQL database schema</li>
                <li>Setting up WebSocket connections for instant messaging functionality</li>
                <li>Handling file uploads and profile picture management</li>
                <li>Implementing environment configuration and security best practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryWindow