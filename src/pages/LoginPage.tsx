import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { authApi } from '../services/apiService';
import type { LoginResponse } from '../services/apiService';

interface LoginPageProps {
  onLogin: (user: LoginResponse) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  /* ── Client-side validation ── */
  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Username is required';
    if (!password.trim()) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    try {
      const user = await authApi.login({ name: name.trim(), password });
      onLogin(user);
    } catch (err: any) {
      setErrors({ general: err.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full bg-[#1a1c24] border rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none transition-colors';
  const inputCls = (field: keyof typeof errors) =>
    `${inputBase} ${errors[field] ? 'border-red-500 focus:border-red-400' : 'border-[#2d3045] focus:border-blue-500'}`;

  return (
    <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-sm bg-[#111217] border border-[#21242d] rounded-2xl shadow-2xl px-8 py-9">

        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-600/30">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-100 tracking-tight">Welcome back</h1>
          <p className="text-xs text-gray-500 mt-1">Sign in to your account to continue</p>
        </div>

        {/* General error banner */}
        {errors.general && (
          <div className="mb-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <p className="text-xs text-red-400 leading-relaxed">{errors.general}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
              placeholder="Enter your username"
              autoComplete="username"
              className={inputCls('name')}
            />
            {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={`${inputCls('password')} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-400 mt-1">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-wait text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer hint */}
        <p className="text-center text-[11px] text-gray-600 mt-7 leading-relaxed">
          Use your registered credentials to sign in
        </p>
      </div>
    </div>
  );
};
