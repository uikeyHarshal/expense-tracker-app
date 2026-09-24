import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, getCategoryColor } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#1A1E24] p-3 rounded-xl shadow-xl border border-[#E2E8F0] dark:border-[#2C323A] text-xs">
        <p className="font-bold text-[#0F1115] dark:text-[#F4F1EA] mb-1 flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.fill }}
          />
          {data.category}
        </p>
        <p className="text-[#0F1115] dark:text-[#F4F1EA] font-bold">
          {formatCurrency(data.amount, currency)}{' '}
          <span className="text-[#6B7280] dark:text-[#9DA3AD] font-normal">({data.percentage}%)</span>
        </p>
      </div>
    );
  }
  return null;
};

export const CategoryPieChart = ({ categories = [] }) => {
  const { currency } = useAuth();

  const chartData = categories.slice(0, 6).map((c) => ({
    ...c,
    name: c.category,
    value: c.amount,
    fill: getCategoryColor(c.category),
  }));

  const hasData = chartData && chartData.length > 0;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
          Expenses by Category
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
          Where your money goes the most
        </p>
      </div>

      {!hasData ? (
        <div className="h-64 flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9DA3AD] text-sm">
          <p>No expense data recorded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip currency={currency} />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {chartData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="font-medium text-[#0F1115] dark:text-[#F4F1EA] truncate">
                    {item.category}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-[#0F1115] dark:text-[#F4F1EA]">
                    {formatCurrency(item.amount, currency)}
                  </span>
                  <span className="text-[10px] text-[#6B7280] dark:text-[#9DA3AD] ml-1.5">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
