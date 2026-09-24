import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = 'neutral', // 'positive' | 'negative' | 'neutral' | 'warning'
  variant = 'indigo', // 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan'
}) => {
  const variantStyles = {
    indigo: {
      border: 'hover:border-[#94A3B8] dark:hover:border-[#6F7680]',
      iconBg: 'bg-[#F1F3F6] text-[#15181D] border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#F4F1EA] dark:border-[#2C323A]',
      glow: 'group-hover:shadow-md',
    },
    emerald: {
      border: 'hover:border-[#45B97C]/40',
      iconBg: 'bg-[#45B97C]/10 text-[#45B97C] border-[#45B97C]/20',
      glow: 'group-hover:shadow-glow-emerald',
    },
    rose: {
      border: 'hover:border-[#D95C68]/40',
      iconBg: 'bg-[#D95C68]/10 text-[#D95C68] border-[#D95C68]/20',
      glow: 'group-hover:shadow-glow-rose',
    },
    amber: {
      border: 'hover:border-[#94A3B8] dark:hover:border-[#6F7680]',
      iconBg: 'bg-[#F1F3F6] text-[#15181D] border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#F4F1EA] dark:border-[#2C323A]',
      glow: 'group-hover:shadow-md',
    },
    cyan: {
      border: 'hover:border-[#94A3B8] dark:hover:border-[#6F7680]',
      iconBg: 'bg-[#F1F3F6] text-[#15181D] border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#F4F1EA] dark:border-[#2C323A]',
      glow: 'group-hover:shadow-md',
    },
  };

  const badgeStyles = {
    positive: 'bg-[#45B97C]/10 text-[#45B97C] border-[#45B97C]/20',
    negative: 'bg-[#D95C68]/10 text-[#D95C68] border-[#D95C68]/20',
    warning: 'bg-[#F1F3F6] text-[#4B5563] border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#9DA3AD] dark:border-[#2C323A]',
    neutral: 'bg-[#F1F3F6] text-[#6B7280] border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#9DA3AD] dark:border-[#2C323A]',
  };

  const activeStyle = variantStyles[variant] || variantStyles.indigo;

  return (
    <div
      className={`group relative p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm transition-all duration-300 ${activeStyle.border} ${activeStyle.glow}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#6B7280] dark:text-[#9DA3AD]">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1115] dark:text-[#F4F1EA]">
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${activeStyle.iconBg}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtitle || badgeText) && (
        <div className="mt-4 flex items-center gap-2 pt-3 border-t border-[#E2E8F0] dark:border-[#2C323A]">
          {badgeText && (
            <span
              className={`text-xs px-2 py-0.5 rounded-md font-semibold border ${
                badgeStyles[badgeType] || badgeStyles.neutral
              }`}
            >
              {badgeText}
            </span>
          )}
          {subtitle && (
            <p className="text-xs text-[#9CA3AF] dark:text-[#6F7680] truncate">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
