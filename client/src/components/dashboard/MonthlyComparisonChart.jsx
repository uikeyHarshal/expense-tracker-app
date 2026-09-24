import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1A1E24] p-3.5 rounded-xl shadow-xl border border-[#E2E8F0] dark:border-[#2C323A] text-xs">
        <p className="font-bold text-[#0F1115] dark:text-[#F4F1EA] mb-2 pb-1 border-b border-[#E2E8F0] dark:border-[#2C323A]">
          {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.fill }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }} />
                {entry.name}:
              </span>
              <span className="font-bold text-[#0F1115] dark:text-[#F4F1EA]">
                {formatCurrency(entry.value, currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const MonthlyComparisonChart = ({ data = [] }) => {
  const { currency } = useAuth();

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex flex-col justify-between">
      <div className="mb-6">
        <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
          Monthly Income vs Expense
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
          Side-by-side breakdown across billing cycles
        </p>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" opacity={0.2} />
            <XAxis
              dataKey="name"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1', opacity: 0.5 }}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${currency}${val}`}
            />
            <Tooltip content={<CustomTooltip currency={currency} />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill="#45B97C"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#D95C68"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
