# Windows XP Portfolio

A modern, interactive portfolio website styled after Windows XP. Built with React, TypeScript, and Tailwind CSS, featuring full internationalization support.

## Features

- 🖥️ Windows XP-style interface with draggable windows
- 🌐 Complete internationalization (English/Swedish)
- 🎨 Dark/Light mode theming
- 🎮 Interactive elements including Snake game
- 🔊 Authentic Windows XP sound effects
- 📱 Fully responsive design
- 🔒 Secure contact form with reCAPTCHA
- 📄 Multi-language CV support

## Tech Stack

- React 18.3.1
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- react-google-recaptcha

## Getting Started

1. Clone the repository
2. Create a `.env` file with your reCAPTCHA site key:
   ```
   VITE_RECAPTCHA_SITE_KEY=your_site_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # React components
│   ├── windows/   # Window-specific components
│   └── ...
├── context/       # React context providers
├── styles/        # CSS modules
└── ...
```

## Internationalization

The project supports multiple languages through a comprehensive translation system:

- Use the language toggle in the taskbar
- All UI elements are translated
- Easy to add new languages
- Translations managed in LanguageContext

## Features in Detail

### Window System
- Draggable and resizable windows
- Window focus management
- Z-index ordering
- Minimize/maximize/close functionality

### Desktop Environment
- Interactive desktop icons
- Start menu with quick access
- System taskbar
- Theme toggle
- Language switcher

### Interactive Elements
- Snake game with translations
- Terminal emulator
- Contact form with reCAPTCHA
- PDF viewer for multi-language CVs

## Development

### Adding New Features
1. Create component
2. Add translations
3. Update window management if needed
4. Add styles
5. Register in WindowManager

### Adding Translations
1. Add keys to LanguageContext
2. Provide translations for all languages
3. Use `t()` function in components

## Environment Variables

Required environment variables:
```
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for all screen sizes
- Touch support for mobile devices

## License

MIT