import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'sv';

interface Translations {
  [key: string]: {
    en: string;
    sv: string;
  };
}

const translations: Translations = {
  welcome: {
    en: "Welcome",
    sv: "Välkommen"
  },
  aboutMe: {
    en: "About Me",
    sv: "Om Mig"
  },
  skills: {
    en: "My Skills",
    sv: "Mina Färdigheter"
  },
  projects: {
    en: "My Projects",
    sv: "Mina Projekt"
  },
  contact: {
    en: "Contact Me",
    sv: "Kontakta Mig"
  },
  computer: {
    en: "Terminal",
    sv: "Terminal"
  },
  work: {
    en: "Work History",
    sv: "Arbetshistorik"
  },
  education: {
    en: "Education",
    sv: "Utbildning"
  },
  cv: {
    en: "My CV",
    sv: "Mitt CV"
  },
  snake: {
    en: "Snake Game",
    sv: "Ormspelet"
  },
  downloadCV: {
    en: "Download CV",
    sv: "Ladda ner CV"
  },
  settings: {
    en: "Settings",
    sv: "Inställningar"
  },
  shutdown: {
    en: "Shut Down",
    sv: "Stäng Av"
  },
  language: {
    en: "Language",
    sv: "Språk"
  },
  contactDisabled: {
    en: "Contact form is currently disabled for security reasons",
    sv: "Kontaktformuläret är för närvarande inaktiverat av säkerhetsskäl"
  },
  contactNote: {
    en: "Note: This is a mock contact form. For security reasons, direct messaging is disabled.",
    sv: "Obs: Detta är ett simulerat kontaktformulär. Av säkerhetsskäl är direktmeddelanden inaktiverade."
  },
  developerTitle: {
    en: "Full Stack Developer",
    sv: "Fullstack-utvecklare"
  },
  welcomeTagline: {
    en: "Building modern web applications with a focus on clean code and user experience",
    sv: "Bygger moderna webbapplikationer med fokus på ren kod och användarupplevelse"
  },
  welcomeInstructions: {
    en: "Click on any desktop icon or use the Start Menu to explore",
    sv: "Klicka på valfri skrivbordsikon eller använd Startmenyn för att utforska"
  },
  useStartMenu: {
    en: "The Start Menu contains quick access to all features",
    sv: "Startmenyn innehåller snabbåtkomst till alla funktioner"
  },
  dragWindows: {
    en: "Windows can be dragged, resized, and arranged as you like",
    sv: "Fönster kan dras, storleksändras och arrangeras som du vill"
  },
  whoIAm: {
    en: "Who I Am",
    sv: "Vem jag är"
  },
  whoIAmText: {
    en: "I'm a passionate developer who believes in writing modern, maintainable code. Currently studying web development & software engineering, I'm always eager to learn and understand new concepts, even when learning from AI tools like ChatGPT - because understanding the code is more important than just copying solutions.",
    sv: "Jag är en passionerad utvecklare som tror på att skriva modern, underhållbar kod. För närvarande studerar jag webbutveckling och mjukvaruutveckling, och jag är alltid ivrig att lära mig och förstå nya koncept, även när jag lär mig från AI-verktyg som ChatGPT - eftersom att förstå koden är viktigare än att bara kopiera lösningar."
  },
  mySetup: {
    en: "My Setup",
    sv: "Min Setup"
  },
  mySetupText: {
    en: "I daily-drive EndeavourOS with i3 window manager, preferring a keyboard-driven workflow for maximum efficiency. Neovim is my primary code editor, though I enjoy exploring others like Emacs. This setup allows me to focus on coding without constantly switching between keyboard and mouse.",
    sv: "Jag använder dagligen EndeavourOS med i3 fönsterhanterare och föredrar ett tangentbordsdrivet arbetsflöde för maximal effektivitet. Neovim är min primära kodeditor, även om jag gillar att utforska andra som Emacs. Denna setup låter mig fokusera på kodning utan att ständigt växla mellan tangentbord och mus."
  },
  learningPhilosophy: {
    en: "Learning Philosophy",
    sv: "Inlärningsfilosofi"
  },
  learningPhilosophyText: {
    en: "I believe in understanding the code I write, not just making it work. When learning from resources or AI tools, I take time to analyze and comprehend the solutions before implementing them. This approach helps me write cleaner, more maintainable code and avoid technical debt.",
    sv: "Jag tror på att förstå koden jag skriver, inte bara få den att fungera. När jag lär mig från resurser eller AI-verktyg tar jag tid att analysera och förstå lösningarna innan jag implementerar dem. Detta tillvägagångssätt hjälper mig att skriva renare, mer underhållbar kod och undvika teknisk skuld."
  },
  beyondCoding: {
    en: "Beyond Coding",
    sv: "Bortom Kodning"
  },
  beyondCodingText: {
    en: "When I'm not coding, you'll find me experimenting with different Linux distributions, customizing my development environment, or testing new tools and editors. I'm particularly interested in optimizing my workflow and exploring efficient ways to interact with technology.",
    sv: "När jag inte kodar hittar du mig experimenterande med olika Linux-distributioner, anpassar min utvecklingsmiljö eller testar nya verktyg och editorer. Jag är särskilt intresserad av att optimera mitt arbetsflöde och utforska effektiva sätt att interagera med teknologi."
  },
  score: {
    en: "Score",
    sv: "Poäng"
  },
  pause: {
    en: "Pause",
    sv: "Paus"
  },
  resume: {
    en: "Resume",
    sv: "Fortsätt"
  },
  gameOver: {
    en: "Game Over!",
    sv: "Spelet Slut!"
  },
  finalScore: {
    en: "Final Score",
    sv: "Slutpoäng"
  },
  playAgain: {
    en: "Play Again",
    sv: "Spela Igen"
  },
  useArrowKeys: {
    en: "Use arrow keys to move",
    sv: "Använd piltangenterna för att röra dig"
  },
  spaceToPause: {
    en: "Space to pause",
    sv: "Mellanslag för att pausa"
  },
  enterToRestart: {
    en: "Enter to restart when game over",
    sv: "Enter för att starta om när spelet är slut"
  },
  yourInfo: {
    en: "Your Information",
    sv: "Din Information"
  },
  yourMessage: {
    en: "Your Message",
    sv: "Ditt Meddelande"
  },
  name: {
    en: "Name",
    sv: "Namn"
  },
  email: {
    en: "Email",
    sv: "E-post"
  },
  subject: {
    en: "Subject",
    sv: "Ämne"
  },
  message: {
    en: "Message",
    sv: "Meddelande"
  },
  send: {
    en: "Send Message",
    sv: "Skicka Meddelande"
  },
  back: {
    en: "Back",
    sv: "Tillbaka"
  },
  next: {
    en: "Next",
    sv: "Nästa"
  },
  otherWaysToConnect: {
    en: "Other Ways to Connect",
    sv: "Andra Sätt Att Kontakta"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};