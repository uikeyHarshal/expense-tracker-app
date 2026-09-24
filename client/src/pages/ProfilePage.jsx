import React, { useState, useEffect } from "react";
import {
  User,
  Wallet,
  Lock,
  CheckCircle2,
  Shield,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionContext";
import { CURRENCIES } from "../utils/constants";

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useTransactions();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    currency: user?.currency || "₹",
    monthlyBudget: user?.monthlyBudget || "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        currency: user.currency || "₹",
        monthlyBudget: user.monthlyBudget || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMsg({ text: "Passwords do not match", type: "error" });
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setMsg({ text: "Password must be at least 6 characters", type: "error" });
      return;
    }

    setLoading(true);

    const updatePayload = {
      name: formData.name,
      currency: formData.currency,
      monthlyBudget: Number(formData.monthlyBudget) || 0,
    };

    if (formData.password) {
      updatePayload.password = formData.password;
    }

    const result = await updateProfile(updatePayload);
    setLoading(false);

    if (result.success) {
      setMsg({ text: "Profile updated successfully!", type: "success" });
      showToast("Profile updated!", "success");
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } else {
      setMsg({ text: result.message || "Update failed", type: "error" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA]">
          Account & Preferences
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9DA3AD]">
          Personalize your currency, profile details, and security
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: User Card & Stack Details */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#15181D] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:text-[#0F1115] flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-md">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h3 className="font-bold text-lg text-[#0F1115] dark:text-[#F4F1EA]">
              {user?.name}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD] mb-4">
              {user?.email}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F3F6] text-[#15181D] border border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#F4F1EA] dark:border-[#2C323A]">
              <Shield className="w-3.5 h-3.5" />
              <span>Active Account</span>
            </div>
          </div>
        </div>

        {/* Right Col: Settings Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-3xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm space-y-5"
          >
            <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA] border-b border-[#E2E8F0] dark:border-[#2C323A] pb-3">
              Edit Profile Settings
            </h3>

            {msg.text && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold border ${
                  msg.type === "success"
                    ? "bg-[#45B97C]/10 border-[#45B97C]/20 text-[#45B97C]"
                    : "bg-[#D95C68]/10 border-[#D95C68]/20 text-[#D95C68]"
                }`}
              >
                {msg.text}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
              />
            </div>

            {/* Email (Read only) */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F1F3F6] dark:bg-[#15181D]/60 text-[#9CA3AF] dark:text-[#6F7680] text-sm cursor-not-allowed"
              />
            </div>

            {/* Currency & Monthly Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1.5">
                  Preferred Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
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
                  Monthly Target Budget ({formData.currency})
                </label>
                <input
                  type="number"
                  name="monthlyBudget"
                  value={formData.monthlyBudget}
                  onChange={handleChange}
                  placeholder="e.g. 3000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#2C323A] space-y-4">
              <h4 className="text-xs font-bold text-[#0F1115] dark:text-[#F4F1EA] uppercase tracking-wider">
                Change Password (Leave blank to keep current)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-white dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#0F1115] dark:focus:border-[#F4F1EA] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] font-bold text-sm shadow-md disabled:opacity-50 transition-all"
              >
                {loading ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
