import React, { useState } from "react";
import {
  Wallet,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { CURRENCIES } from "../utils/constants";

export const RegisterPage = ({ onSwitchToLogin }) => {
  const { register, demoLogin, authError, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    currency: "₹",
    monthlyBudget: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.name || !formData.email || !formData.password) {
      setLocalError("Please complete all required fields");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return;
    }

    const payload = {
      ...formData,
      monthlyBudget: Number(formData.monthlyBudget) || 0,
    };

    const result = await register(payload);
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#15181D] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:text-[#0F1115] shadow-xl mb-1">
            <Wallet className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA] tracking-tight">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9DA3AD]">
            Start tracking, budgeting, and saving smarter
          </p>
        </div>

        {/* Card */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-xl dark:shadow-2xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-[#D95C68]/10 border border-[#D95C68]/20 text-[#D95C68] text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#9CA3AF] dark:text-[#9DA3AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="abc xyz"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA3AF] dark:text-[#9DA3AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="abc@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                Password (Min. 6 chars) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3AF] dark:text-[#9DA3AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  placeholder="......"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Currency & Monthly Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-xs focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.symbol}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                  Target Monthly Budget
                </label>
                <input
                  type="number"
                  name="monthlyBudget"
                  placeholder="3000"
                  value={formData.monthlyBudget}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-xs focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#F4F1EA] bg-[#15181D] hover:bg-[#22272F] dark:text-[#0F1115] dark:bg-[#F4F1EA] dark:hover:bg-white shadow-lg active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Creating Account..." : "Get Started"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo */}
          <div className="pt-2 text-center space-y-3">
            <button
              type="button"
              onClick={handleDemoClick}
              className="text-xs text-[#0F1115] dark:text-[#F4F1EA] hover:underline font-semibold"
            >
              Or test with 1-Click Demo Account
            </button>

            <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-bold text-[#0F1115] dark:text-[#F4F1EA] hover:underline transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
