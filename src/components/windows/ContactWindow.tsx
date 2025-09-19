import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import { useLanguageContext } from '../../context/LanguageContext';
import '../../styles/windows/ContactWindow.css';

const ContactWindow: React.FC = () => {
  const { t } = useLanguageContext();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please verify you're not a robot.");
      return;
    }

    // Mock successful submission
    setStep(totalSteps);
  };

  return (
    <div className="contact-window">
      <div className="contact-header">
        <h2>{t('contact')}</h2>
        <p className="security-notice">{t('contactNote')}</p>
      </div>

      <div className="contact-content">
        <div className="contact-wizard">
          <div className="wizard-sidebar">
            <div className={`wizard-step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-title">Your Info</span>
            </div>
            <div className={`wizard-step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-title">Message</span>
            </div>
            <div className={`wizard-step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-title">Complete</span>
            </div>
          </div>

          <div className="wizard-content">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="wizard-page">
                  <h3>Your Information</h3>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="wizard-page">
                  <h3>Your Message</h3>
                  <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <ReCAPTCHA
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={value => setCaptchaValue(value)}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="wizard-page">
                  <div className="completion-message">
                    <Send size={48} className="completion-icon" />
                    <h3>{t('contactDisabled')}</h3>
                    <p>{t('contactNote')}</p>
                  </div>
                </div>
              )}

              <div className="wizard-controls">
                {step > 1 && step < totalSteps && (
                  <button type="button" className="btn-previous" onClick={handlePrevious}>
                    Back
                  </button>
                )}

                {step < 2 && (
                  <button type="button" className="btn-next" onClick={handleNext}>
                    Next
                  </button>
                )}

                {step === 2 && (
                  <button type="submit" className="btn-submit" disabled={!captchaValue}>
                    Send Message
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="contact-info">
          <h3>Other Ways to Connect</h3>
          <div className="contact-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;