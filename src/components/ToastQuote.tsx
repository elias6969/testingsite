import React, { useState, useEffect } from 'react';
import '../styles/ToastQuote.css';

const quotes = [
  "I put that stuff on everything!",
  "Toast suit up!",
  "Looking sharp in my toast suit!",
  "Crumbs of wisdom coming your way!",
  "Time to get toasty!",
  "Butter late than never!",
  "Living the crusty life!",
  "Toast of the town!",
  "Feeling breaddy good!",
  "Just loafing around!"
];

const ToastQuote: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const showQuote = () => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    const interval = setInterval(() => {
      const shouldShow = Math.random() < 0.3; // 30% chance to show
      if (shouldShow) {
        showQuote();
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="toast-quote">
      <img 
        src="/public/assets/toast_suit_chudjak.png" 
        alt="Toast Suit Chudjak" 
        className="toast-image"
      />
      <div className="quote-bubble">
        {quote}
      </div>
    </div>
  );
};

export default ToastQuote;
