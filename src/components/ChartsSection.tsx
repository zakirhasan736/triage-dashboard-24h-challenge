import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Category, Priority } from '@/types/types';

interface ChartData {
  name: string;
  count: number;
}

interface Stats {
  catData: ChartData[];
  prioData: ChartData[];
}

interface ChartsSectionProps {
  stats: Stats;
}

const CATEGORY_COLORS = {
  [Category.BUG]: '#EF4444',
  [Category.BILLING]: '#F59E0B',
  [Category.FEATURE_REQUEST]: '#8B5CF6',
  [Category.GENERAL]: '#6B7280',
};

const PRIORITY_COLORS = {
  [Priority.HIGH]: '#EF4444',
  [Priority.MEDIUM]: '#F97316',
  [Priority.LOW]: '#3B82F6',
};

export const ChartsSection: React.FC<ChartsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Category Chart */}
        <section 
            id="chart-volume-category"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow"
        >
            <div className="flex-1 w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    Volume by Category
                </h2>
                <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.catData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                width={1} 
                                tick={false} 
                            />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                                {stats.catData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as Category] || '#CBD5E1'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* Legend / Breakdown */}
            <div className="w-full md:w-48 shrink-0 bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Breakdown</h3>
                    <div className="space-y-2">
                    {stats.catData.map(d => (
                        <div key={d.name} className="flex justify-between items-center text-sm group cursor-default">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: CATEGORY_COLORS[d.name as Category] }}></div>
                                <span className="text-gray-600 truncate max-w-[100px] group-hover:text-gray-900 transition-colors" title={d.name}>{d.name}</span>
                            </div>
                            <span className="font-mono font-semibold text-gray-700 bg-white px-1.5 rounded border border-gray-100">{d.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Priority Chart */}
        <section 
            id="chart-volume-priority"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow"
        >
                <div className="flex-1 w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Volume by Priority</h2>
                <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats.prioData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="count"
                            >
                                {stats.prioData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name as Priority]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* Legend / Breakdown */}
            <div className="w-full md:w-48 shrink-0 bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Breakdown</h3>
                    <div className="space-y-2">
                    {stats.prioData.map(d => (
                        <div key={d.name} className="flex justify-between items-center text-sm group cursor-default">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: PRIORITY_COLORS[d.name as Priority] }}></div>
                                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{d.name}</span>
                            </div>
                            <span className="font-mono font-semibold text-gray-700 bg-white px-1.5 rounded border border-gray-100">{d.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
};