import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { AuthService } from '../services/authService';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }
    setError(null);
    setLoading(true);

    const res = await AuthService.forgotPassword(email);
    setLoading(false);

    if (res.success) {
      setStep(2);
    } else {
      setError(res.message);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setError('Please enter the 6-digit clearance code sent to your email.');
      return;
    }
    setError(null);
    setStep(3);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('Security pass code must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Access codes do not match.');
      return;
    }

    onSuccess('Clearance access code updated! You can now sign in.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden relative flex flex-col"
        style={{
          backgroundColor: 'rgba(5, 7, 22, 0.96)',
          borderColor: 'rgba(21, 144, 151, 0.6)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(21, 144, 151, 0.25)',
        }}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0b1026]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#f8d092]/20 border border-[#f8d092]/40 text-[#f8d092]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-sm sm:text-base text-white">
                CLEARANCE CODE RECOVERY
              </h2>
              <span className="text-[10px] font-telemetry text-slate-400">
                Step 0{step} of 03 // Secure Access Protocol
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 font-chakra text-slate-300">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/80 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleSendToken} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your registered operative terminal email address. We will dispatch a 6-digit temporary verification token to reset your security clearance code.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Operative Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cadet@pict.edu"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/50 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#f8d092]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-[#f8d092] text-[#050716] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : <span>DISPATCH RECOVERY CODE</span>}
              </button>
            </form>
          )}

          {/* STEP 2: Enter OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                A 6-digit recovery code has been sent to <strong className="text-white">{email}</strong>. (Demo Code: <span className="text-[#f8d092] font-mono">984210</span>)
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  6-Digit Clearance Token
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="984210"
                  className="w-full text-center tracking-widest font-mono text-base py-2.5 rounded-xl bg-black/50 border border-slate-800 text-[#f8d092] focus:outline-none focus:border-[#f8d092]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-[#f8d092] text-[#050716] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>VERIFY CLEARANCE TOKEN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Security Access Code
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/50 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#f8d092]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Access Code
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat access code"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/50 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#f8d092]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-[#f8d092] text-[#050716] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>UPDATE & ENCRYPT CLEARANCE</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
