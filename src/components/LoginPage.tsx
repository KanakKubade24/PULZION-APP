import React, { useState } from 'react';
import { 
  Radio, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  UserCheck, 
  Lock,
  Mail
} from 'lucide-react';
import { UserAccount } from '../types';
import { AuthService } from '../services/authService';
import { APP_CONFIG } from '../theme/designSystem';

interface LoginPageProps {
  onBack: () => void;
  onGoToRegister: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  onForgotPassword?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onBack,
  onGoToRegister,
  onLoginSuccess,
  onForgotPassword,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your registered email terminal address or username handle.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your security access clearance code.');
      return;
    }

    setLoading(true);
    const res = await AuthService.login(identifier, password);
    setLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user);
    } else {
      setErrorMsg(res.error || 'Authentication clearance failed.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    const res = await AuthService.login('kanakkubade@gmail.com', 'conclave2026');
    setLoading(false);
    if (res.success && res.user) {
      onLoginSuccess(res.user);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-8 px-4 sm:px-6 flex flex-col items-center justify-center">
      
      {/* Top Back Link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between text-xs font-chakra text-slate-400">
        <button 
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 hover:text-[#f8d092] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Conclave Hub</span>
        </button>

        <span className="text-[10px] font-telemetry text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SECURE CHANNEL
        </span>
      </div>

      {/* Main Login Card */}
      <div 
        className="w-full max-w-md rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(5, 7, 22, 0.95)',
          borderColor: 'rgba(21, 144, 151, 0.55)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(21, 144, 151, 0.2)',
        }}
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div 
            className="w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.6)',
              borderColor: 'rgba(248, 208, 146, 0.6)',
            }}
          >
            <Radio className="w-7 h-7 text-[#f8d092]" />
          </div>

          <h1 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide">
            OPERATIVE SIGN IN
          </h1>
          <p className="font-chakra text-xs text-slate-400">
            Access your {APP_CONFIG.appName} profile, digital passes & mission schedule.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs font-chakra flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 font-chakra">
          <div>
            <label htmlFor="login-identifier" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Terminal Address or Handle
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="operative@pict.edu or @callsign"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#f8d092] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Security Access Code
              </label>
              {onForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-[11px] text-[#f8d092] hover:underline cursor-pointer font-bold"
                >
                  Forgot Code?
                </button>
              )}
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/50 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#f8d092] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl font-orbitron font-extrabold text-xs tracking-wider bg-[#f8d092] text-[#050716] hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>AUTHENTICATING CLEARANCE...</span>
            ) : (
              <>
                <span>CONFIRM SIGN IN</span>
                <ShieldCheck className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center space-y-3">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-chakra font-bold text-slate-300 hover:text-[#f8d092] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#38a48c]" />
            <span>1-Click Test Operative Login</span>
          </button>

          <p className="text-xs font-chakra text-slate-400">
            Don't have an operative pass yet?{' '}
            <button
              type="button"
              onClick={onGoToRegister}
              className="text-[#f8d092] font-bold hover:underline cursor-pointer"
            >
              Enlist Now
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
