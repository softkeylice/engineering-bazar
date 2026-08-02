import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (identifier: string) => void;
}
const getFriendlyError = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
      return 'No account found with these details. Check your email/password or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email. Try logging in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const { login, signup, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
   try {
      if (mode === 'login') await login(email, password);
      else await signup(email, password);
      onAuthSuccess?.(email);
      onClose();
    } catch (err: any) {
            setError(getFriendlyError(err.code));

    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      onAuthSuccess?.(result.user.displayName || result.user.email || 'your account');
      onClose();
    } catch (err: any) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#1A2A6C] text-white p-5 flex items-center justify-between">
          <h2 className="text-base font-extrabold">
            {mode === 'login' ? 'Customer Login' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#1A2A6C]"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password" required minLength={6} value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#1A2A6C]"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-[#F4B93E] text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[10px] text-slate-400 font-semibold">OR</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <button
            type="button" onClick={handleGoogle} disabled={loading}
            className="w-full py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all"
          >
            Continue with Google
          </button>

          <p className="text-center text-xs text-slate-500">
            {mode === 'login' ? "New here? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-[#1A2A6C] font-bold hover:underline"
            >
              {mode === 'login' ? 'Create an account' : 'Log in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};