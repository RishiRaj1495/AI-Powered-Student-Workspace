import React from 'react';
import { Calendar as CalendarIcon, Clock, Layers, Flame, Award, BookOpen } from 'lucide-react';

export default function GanttCalendarView({ data, onOpenExport }) {
  const { assignments = [], courseName } = data;

  // Sort assignments chronologically
  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  // Group by Month
  const monthsMap = {};
  sortedAssignments.forEach((item) => {
    const d = new Date(item.dueDate);
    const monthKey = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!monthsMap[monthKey]) {
      monthsMap[monthKey] = [];
    }
    monthsMap[monthKey].push(item);
  });

  const getBarColor = (type) => {
    const t = type?.toUpperCase() || '';
    if (t.includes('EXAM') || t.includes('MIDTERM')) return 'from-rose-500 to-rose-600 border-rose-400';
    if (t.includes('PROJECT')) return 'from-purple-500 to-purple-600 border-purple-400';
    if (t.includes('LAB')) return 'from-emerald-500 to-teal-600 border-emerald-400';
    if (t.includes('QUIZ')) return 'from-amber-500 to-amber-600 border-amber-400';
    return 'from-indigo-500 to-blue-600 border-indigo-400';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5" />
              Gantt Workload Matrix
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-display">
            Course Workload & Timeline Distribution
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualize time spacing between assignments to avoid crunch weeks and plan ahead.
          </p>
        </div>

        <button
          onClick={onOpenExport}
          className="btn-primary py-2 px-4 text-xs font-bold shrink-0 flex items-center gap-2"
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          Export to Calendar
        </button>
      </div>

      {/* Monthly Gantt Blocks */}
      <div className="space-y-6">
        {Object.entries(monthsMap).map(([month, items]) => (
          <div key={month} className="glass-panel p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                {month}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {items.length} deliverables
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => {
                const dueDate = new Date(item.dueDate);
                const dayNum = dueDate.getDate();
                const dayName = dueDate.toLocaleString('en-US', { weekday: 'short' });

                return (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                  >
                    {/* Date Block */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] uppercase font-bold text-indigo-400">{dayName}</span>
                        <span className="text-sm font-extrabold text-white font-mono">{dayNum}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </span>
                          {item.weight && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                              {item.weight}%
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.type} • Est. {item.estimatedHours || 5} hours • {(item.milestones || []).length} checkpoints
                        </p>
                      </div>
                    </div>

                    {/* Workload Bar Visualization */}
                    <div className="flex-1 max-w-xs md:max-w-sm">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Workload Allocation</span>
                        <span className="font-mono text-cyan-300 font-bold">{item.estimatedHours || 5}h</span>
                      </div>
                      <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(item.type)} border transition-all`}
                          style={{ width: `${Math.min(100, Math.max(20, (item.estimatedHours || 5) * 3))}%` }}
                        />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
