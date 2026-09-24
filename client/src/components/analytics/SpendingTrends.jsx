import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { formatCurrency } from "../../utils/formatters";

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    const isPositive = payload[0].value >= 0;
    return (
      <div className="bg-white dark:bg-[#1A1E24] p-3 rounded-xl shadow-xl border border-[#E2E8F0] dark:border-[#2C323A] text-xs">
        <p className="font-bold text-[#0F1115] dark:text-[#F4F1EA] mb-1">
          {label}
        </p>
        <p
          className={`font-bold ${isPositive ? "text-[#45B97C]" : "text-[#D95C68]"}`}
        >
          Net: {formatCurrency(payload[0].value, currency)}
        </p>
      </div>
    );
  }
  return null;
};

export const SpendingTrends = ({ monthlyTrends = [], paymentMethods = [] }) => {
  const { currency } = useAuth();

  const netSavingsData = monthlyTrends.map((m) => ({
    name: m.name,
    net: m.net,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Net Monthly Savings Bar Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
            Net Monthly Savings
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
            Surplus or deficit after monthly expenses
          </p>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={netSavingsData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#94A3B8"
                opacity={0.2}
              />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${currency}${val}`}
              />
              <Tooltip content={<CustomTooltip currency={currency} />} />
              <Bar dataKey="net" radius={[4, 4, 4, 4]}>
                {netSavingsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.net >= 0 ? "#45B97C" : "#D95C68"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Method Distribution */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
            Payment Methods
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
            Volume of funds moved across payment channels
          </p>
        </div>

        <div className="space-y-3 my-auto max-h-60 overflow-y-auto custom-scrollbar pr-1">
          {paymentMethods.map((pm, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F6] dark:bg-[#15181D] dark:hover:bg-[#22272F] border border-[#E2E8F0] dark:border-[#2C323A] flex items-center justify-between transition-colors"
            >
              <span className="text-xs font-bold text-[#0F1115] dark:text-[#F4F1EA]">
                {pm.method}
              </span>
              <div className="text-right">
                <span className="text-xs font-bold text-[#0F1115] dark:text-[#F4F1EA]">
                  {formatCurrency(pm.total, currency)}
                </span>
                <span className="text-[10px] text-[#6B7280] dark:text-[#9DA3AD] ml-2">
                  ({pm.count} txns)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
