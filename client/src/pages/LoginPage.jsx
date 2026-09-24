import React, { useState } from "react";
import { Wallet, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const LoginPage = ({ onSwitchToRegister }) => {
  const { login, demoLogin, authError, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }
    const result = await login(email, password);
    if (!result.success) {
      setLocalError(result.message);
    }
  };

  const handleDemoClick = async () => {
    setLocalError("");
    const result = await demoLogin();
    if (!result.success) {
      setLocalError(result.message);
    }
  };

  const error = localError || authError;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F9FA] dark:bg-[#0F1115] transition-colors duration-200">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#15181D] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:text-[#0F1115] shadow-xl mb-1 animate-bounce-in">
            <Wallet className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA] tracking-tight">
            SmartSpend Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9DA3AD]">
            Sign in to manage your budget and finances
          </p>
        </div>

        {/* Card */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-xl dark:shadow-2xl space-y-5">
          {/* Demo Button Callout */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#15181D] border border-[#E2E8F0] dark:border-[#2C323A] text-center space-y-2">
            <button
              type="button"
              onClick={handleDemoClick}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#F4F1EA] bg-[#15181D] hover:bg-[#22272F] dark:text-[#0F1115] dark:bg-[#F4F1EA] dark:hover:bg-white shadow-md active:scale-98 transition-all"
            >
              {loading ? "Logging in..." : "Explore with  Demo Account"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px bg-[#E2E8F0] dark:bg-[#2C323A] flex-1" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6F7680]">
              or sign in with email
            </span>
            <div className="h-px bg-[#E2E8F0] dark:bg-[#2C323A] flex-1" />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#D95C68]/10 border border-[#D95C68]/20 text-[#D95C68] text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA3AF] dark:text-[#9DA3AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="abc@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3AF] dark:text-[#9DA3AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="........"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] dark:text-[#9DA3AD] hover:text-[#0F1115] dark:hover:text-[#F4F1EA]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#F4F1EA] bg-[#15181D] hover:bg-[#22272F] dark:text-[#0F1115] dark:bg-[#F4F1EA] dark:hover:bg-white shadow-lg active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to register */}
          <div className="pt-2 text-center">
            <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
              Don't have an account yet?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-bold text-[#0F1115] dark:text-[#F4F1EA] hover:underline transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
