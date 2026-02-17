import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  colorClass: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between h-full hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</span>
        <div className={`p-2 rounded-md ${colorClass} bg-opacity-10`}>
             {/* Clone icon with smaller size */}
             {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" }) : icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
};