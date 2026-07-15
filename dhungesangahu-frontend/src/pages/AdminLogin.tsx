import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminLogin } from '../api';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await adminLogin(username, password);
      if (res.success && res.token) {
        localStorage.setItem('admin_token', res.token);
        localStorage.setItem('admin_user', res.username);
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('Login submit error:', err);
      setError(err.message || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative colored blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#652d90]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 relative z-10"
      >
        {/* Back Link */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#652d90] transition-colors text-xs font-bold mb-6 group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to School Website
        </button>

        {/* Logo and Titles */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#652d90]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#652d90]/20 shadow-inner">
            <Lock className="h-8 w-8 text-[#652d90]" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 font-serif">Admin Portal</h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">Dhungesanghu Boarding School</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-2.5 bg-rose-50 border border-rose-100 p-4 rounded-xl text-xs sm:text-sm text-rose-700"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Username Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input 
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#652d90] hover:bg-[#4b1f6b] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm sm:text-base mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Logging you in...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-300 text-xs">
          Secure Administrative Session • DB-Seeded Portal
        </div>
      </motion.div>
    </div>
  );
};
