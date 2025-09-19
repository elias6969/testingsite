import React, { useEffect, useState } from 'react';
import '../styles/ShutdownScreen.css';

const ShutdownScreen: React.FC = () => {
  const [message, setMessage] = useState('Saving your settings...');
  
  useEffect(() => {
    const messages = [
      'Saving your settings...',
      'Closing applications...',
      'Windows is shutting down...',
      'It is now safe to turn off your computer.'
    ];
    
    messages.forEach((msg, index) => {
      setTimeout(() => {
        setMessage(msg);
      }, index * 1000);
    });
  }, []);

  return (
    <div className="shutdown-screen">
      <div className="shutdown-content">
        <div className="shutdown-logo">Windows XP</div>
        <div className="shutdown-message">{message}</div>
      </div>
    </div>
  );
};

export default ShutdownScreen;