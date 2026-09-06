import React, { useState } from 'react';
import { 
  Gamepad2, 
  ArrowLeft, 
  Check, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAccount, EventItem } from '../types';
import { useAlienTheme } from '../context/ThemeContext';

interface RegisterPageProps {
  onBack: () => void;
  onGoToLogin: () => void;
  onRegisterSuccess: (user: UserAccount) => void;
  preselectedEventId?: string;
  allEvents: EventItem[];
}

const COLLEGES = [
  'Pune Institute of Computer Technology (PICT)',
  'College of Engineering Pune (COEP Tech)',
  'Veermata Jijabai Technological Institute (VJTI Mumbai)',
  'Indian Institute of Technology Bombay (IITB)',
  'BITS Pilani',
  'MIT World Peace University (MIT-WPU)',
  'Vishwakarma Institute of Technology (VIT Pune)',
  'Sardar Patel Institute of Technology (SPIT)',
  'Delhi Technological University (DTU)',
  'National Institute of Technology (NIT)',
  'Other Extraterrestrial Institution',
] as const;

const ACADEMIC_YEARS = [
  'First Year (FE)',
  'Second Year (SE)',
  'Third Year (TE)',
  'Final Year (BE/BTech)',
  'Post-Graduate / MTech / MCA / PhD',
] as const;

// Custom Alien Tech reCAPTCHA Refresh SVG
const RecaptchaIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 48 48" className={`${className} fill-current`}>
    <path d="M24 8V2l-8 8 8 8v-6c6.63 0 12 5.37 12 12 0 2.03-.51 3.93-1.39 5.61l2.94 2.94C39.06 29.83 40 27.02 40 24c0-8.84-7.16-16-16-16zm-8 22c0-2.03.51-3.93 1.39-5.61l-2.94-2.94C12.94 18.17 12 20.98 12 24c0 8.84 7.16 16 16 16v6l8-8-8-8v6c-6.63 0-12-5.37-12-12z"/>
  </svg>
);

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onBack,
  onGoToLogin,
  onRegisterSuccess,
}) => {
  const { currentTheme } = useAlienTheme();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    college: COLLEGES[0],
    year: ACADEMIC_YEARS[2],
    password: '',
    confirmPassword: '',
  });

  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMsg('Please enter your full first and last name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must contain at least 6 extraterrestrial characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (!captchaChecked) {
      setErrorMsg('Please confirm you are an authentic lifeform (reCAPTCHA).');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [currentTheme.palette.primaryHex, currentTheme.palette.secondaryHex, '#ffffff'],
      });
    } catch {
      // Fallback if canvas-confetti fails to load
    }

    const randomTicketId = `PLZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const cleanFirstName = formData.firstName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const defaultUsername = `cadet_${cleanFirstName || 'operative'}_${Math.floor(100 + Math.random() * 900)}`;

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      username: formData.username.trim() ? formData.username.trim().replace(/^@/, '') : defaultUsername,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      contactNumber: formData.phone.trim(),
      country: 'India',
      college: formData.college,
      year: formData.year,
      registeredEvents: [],
      joinedAt: new Date().toISOString(),
      ticketId: randomTicketId,
    };

    onRegisterSuccess(newUser);
  };

  const inputStyle = {
    backgroundColor: 'rgba(26, 86, 120, 0.4)',
    borderColor: 'rgba(21, 144, 151, 0.5)',
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-10 sm:py-16">
      <div
        className="w-full max-w-lg rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl"
        style={{
          backgroundColor: 'rgba(37, 36, 93, 0.85)',
          borderColor: 'rgba(21, 144, 151, 0.6)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(21, 144, 151, 0.25)',
        }}
      >
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: '#159097' }}
        />

        <div className="relative flex items-center justify-center mb-4 min-h-[40px]">
          <button
            id="register-back-btn"
            type="button"
            onClick={onBack}
            className="absolute left-0 p-2 -ml-2 text-slate-300 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5 z-10"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <span 
            className="text-[11px] font-chakra font-bold px-3 py-1 rounded-full border tracking-wider uppercase"
            style={{
              backgroundColor: 'rgba(21, 144, 151, 0.2)',
              borderColor: '#159097',
              color: '#f8d092',
            }}
          >
            CADET REGISTRATION
          </span>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2.5 mb-1.5">
            <Gamepad2 
              className="w-8 h-8 stroke-[2.2]" 
              style={{ color: '#38a48c' }}
            />
            <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl tracking-widest text-white uppercase">
              REGISTER
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-chakra tracking-wide" style={{ color: '#d8e8ea' }}>
            Join the defence force and get your invasion ticket.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/70 text-rose-200 text-xs font-medium flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            id="register-first-name"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border text-white placeholder:text-slate-400 text-sm font-chakra transition-all outline-none"
            style={{
              ...inputStyle,
              borderColor: formData.firstName ? '#159097' : inputStyle.borderColor,
            }}
            required
          />

          <input
            id="register-last-name"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border text-white placeholder:text-slate-400 text-sm font-chakra transition-all outline-none"
            style={{
              ...inputStyle,
              borderColor: formData.lastName ? '#159097' : inputStyle.borderColor,
            }}
            required
          />

          <input
            id="register-username"
            name="username"
            type="text"
            placeholder="Call Sign / Username (e.g. cadet_alex) - Optional"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border text-white placeholder:text-slate-400 text-sm font-chakra transition-all outline-none"
            style={{
              ...inputStyle,
              borderColor: formData.username ? '#159097' : inputStyle.borderColor,
            }}
          />

          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border text-white placeholder:text-slate-400 text-sm font-chakra transition-all outline-none"
            style={{
              ...inputStyle,
              borderColor: formData.email ? '#159097' : inputStyle.borderColor,
            }}
            required
          />

          <input
            id="register-phone"
            name="phone"
            type="tel"
            placeholder="Phone No."
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border text-white placeholder:text-slate-400 text-sm font-chakra transition-all outline-none"
            style={{
              ...inputStyle,
              borderColor: formData.phone ? '#159097' : inputStyle.borderColor,
            }}
            required
          />

          <div className="relative">
            <select
              id="register-college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border text-white text-sm font-chakra appearance-none outline-none cursor-pointer pr-10"
              style={inputStyle}
            >
              {COLLEGES.map((col) => (
                <option key={col} value={col} className="bg-[#25245d] text-white">
                  {col}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

          <div className="relative">
            <select
              id="register-year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border text-white text-sm font-chakra appearance-none outline-none cursor-pointer pr-10"
              style={inputStyle}
            >
              {ACADEMIC_YEARS.map((y) => (
                <option key={y} value={y} className="bg-[#25245d] text-white">
                  {y}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

          <div className="relative">
            <input
              id="register-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border text-white placeholder:text-slate-400 text-sm font-chakra transition-all outline-none pr-11"
              style={inputStyle}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative">
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border text-white placeholder:text-slate-400 text-sm font-chakra transition-all outline-none pr-11"
              style={inputStyle}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div 
            className="p-3.5 rounded-2xl border flex items-center justify-between select-none" 
            style={{ backgroundColor: 'rgba(26, 86, 120, 0.35)', borderColor: 'rgba(21, 144, 151, 0.4)' }}
          >
            <div 
              onClick={handleCaptchaClick}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div 
                className="w-7 h-7 rounded-lg border flex items-center justify-center transition-all"
                style={{
                  backgroundColor: captchaChecked ? '#38a48c' : 'white',
                  borderColor: captchaChecked ? '#38a48c' : '#94a3b8',
                }}
              >
                {captchaLoading && (
                  <div 
                    className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: '#38a48c' }}
                  />
                )}
                {captchaChecked && (
                  <Check className="w-5 h-5 text-[#25245d] stroke-[3]" />
                )}
              </div>
              <span className="text-sm font-chakra" style={{ color: '#d8e8ea' }}>
                I'm not a robot
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-[10px]" style={{ color: '#38a48c' }}>
              <div className="w-6 h-6 flex items-center justify-center mb-0.5" style={{ color: '#38a48c' }}>
                <RecaptchaIcon />
              </div>
              <span className="tracking-tight text-[9px]">reCAPTCHA</span>
            </div>
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            className="w-full py-4 rounded-full font-orbitron font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            style={{
              backgroundColor: '#f8d092',
              color: '#25245d',
              boxShadow: '0 0 20px rgba(248, 208, 146, 0.4)',
            }}
          >
            <Zap className="w-5 h-5 text-[#25245d] fill-current" />
            <span>SIGN UP / TRANSMIT CADET DATA</span>
          </button>

          <div className="text-center pt-2">
            <p className="text-sm font-chakra" style={{ color: '#d8e8ea' }}>
              Already have an alien access terminal?{' '}
              <button
                type="button"
                id="link-go-to-login"
                onClick={onGoToLogin}
                className="font-orbitron font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: '#f8d092' }}
              >
                LOGIN
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
