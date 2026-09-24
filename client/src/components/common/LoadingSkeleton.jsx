import React from 'react';

export const StatCardSkeleton = () => (
  <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-3 w-2/3">
        <div className="h-4 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-1/2"></div>
        <div className="h-8 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-3/4"></div>
      </div>
      <div className="w-12 h-12 bg-[#E2E8F0] dark:bg-[#22272F] rounded-xl"></div>
    </div>
    <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#2C323A] flex gap-2">
      <div className="h-4 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-1/4"></div>
      <div className="h-4 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-1/2"></div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="animate-pulse border-b border-[#E2E8F0] dark:border-[#2C323A]/60">
    <td className="py-4 px-4"><div className="h-4 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-20"></div></td>
    <td className="py-4 px-4"><div className="h-4 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-36"></div></td>
    <td className="py-4 px-4"><div className="h-6 bg-[#E2E8F0] dark:bg-[#22272F] rounded-full w-24"></div></td>
    <td className="py-4 px-4"><div className="h-4 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-24"></div></td>
    <td className="py-4 px-4"><div className="h-4 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-16"></div></td>
    <td className="py-4 px-4 text-right"><div className="h-8 bg-[#E2E8F0] dark:bg-[#22272F] rounded-lg w-16 ml-auto"></div></td>
  </tr>
);

export const ChartSkeleton = () => (
  <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] animate-pulse h-80 flex flex-col justify-between">
    <div className="h-5 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-1/3"></div>
    <div className="h-48 bg-[#F8F9FA] dark:bg-[#15181D] rounded-xl"></div>
    <div className="flex justify-around">
      <div className="h-3 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-12"></div>
      <div className="h-3 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-12"></div>
      <div className="h-3 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-12"></div>
      <div className="h-3 bg-[#E2E8F0] dark:bg-[#22272F] rounded w-12"></div>
    </div>
  </div>
);
