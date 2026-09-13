import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle, Clock, Flame, Calendar, Sparkles, Compass } from 'lucide-react';

export default function StudyPlanRoadmap({ data, studyStyle, dailyHours, gradeTarget }) {
  const { studyPlan = [], courseName } = data;
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (key) => {
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalWeeklyHours = studyPlan.reduce((acc, curr) => acc + (curr.targetHours || 0), 0);

  const getStyleBadge = () => {
    switch (studyStyle) {
      case 'procrastinator-rescue':
        return { label: 'Procrastinator Rescue (48h Sprints)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      case 'deep-mastery':
        return { label: 'Deep Mastery (Early Buffers)', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' };
      default:
        return { label: 'Balanced Pacing (3-Day Buffer)', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
    }
  };

  const styleInfo = getStyleBadge();

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${styleInfo.color}`}>
                {styleInfo.label}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Goal: {gradeTarget} Grade
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white font-display">
              AI Personalized Study Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Custom-crafted weekly study sprints distributed around your {dailyHours}h/day study capacity.
            </p>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-white/10 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Guided Hours</span>
            <span className="text-xl font-extrabold text-cyan-400 font-mono">~{totalWeeklyHours} hrs</span>
          </div>
        </div>
      </div>

      {/* Week-by-Week Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {studyPlan.map((week) => (
          <div
            key={week.weekNumber}
            className="glass-panel p-5 sm:p-6 space-y-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-sm text-indigo-400 font-mono">
                    W{week.weekNumber}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {week.theme}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Target: ~{week.targetHours} hours this week
                    </span>
                  </div>
                </div>
              </div>

              {/* Focus Topics */}
              {week.focusItems && week.focusItems.length > 0 && (
                <div className="mb-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Core Focus Topics
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {week.focusItems.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Action Tasks */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Action Checklist
                </span>
                {(week.tasks || []).map((t, idx) => {
                  const taskKey = `w${week.weekNumber}-t${idx}`;
                  const isDone = completedTasks[taskKey];

                  return (
                    <div
                      key={taskKey}
                      onClick={() => toggleTask(taskKey)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-400 line-through'
                          : 'bg-slate-950/60 border-white/5 hover:border-white/20 text-slate-200'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <CheckCircle
                          className={`w-3.5 h-3.5 ${
                            isDone ? 'text-emerald-400' : 'text-slate-500 hover:text-indigo-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1 flex items-center justify-between gap-2">
                        <span>
                          <strong className="text-indigo-300 font-semibold">{t.day}:</strong> {t.activity}
                        </span>
                        {t.duration && (
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded shrink-0">
                            {t.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Week {week.weekNumber} Strategy</span>
              <span className="text-indigo-400 font-medium">Ready for execution</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
