import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  CheckSquare, 
  Square, 
  Layers, 
  Flame, 
  Share2, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  FileCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TimelineView({ data, onUpdateMilestone, onOpenExport }) {
  const { courseName, courseCode, instructor, term, totalWorkloadHours, assignments = [] } = data;
  const [filterType, setFilterType] = useState('ALL');
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMilestoneToggle = (asgnId, milestoneId, currentCompleted) => {
    onUpdateMilestone(asgnId, milestoneId, !currentCompleted);

    // If completing milestone, fire micro confetti!
    if (!currentCompleted) {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']
      });
    }
  };

  // Calculate overall progress
  const allMilestones = assignments.flatMap(a => a.milestones || []);
  const completedMilestones = allMilestones.filter(m => m.completed).length;
  const progressPercent = allMilestones.length > 0 
    ? Math.round((completedMilestones / allMilestones.length) * 100) 
    : 0;

  const filteredAssignments = assignments.filter(a => {
    if (filterType === 'ALL') return true;
    return a.type?.toUpperCase() === filterType;
  });

  const getUrgencyBadge = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'critical':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <Flame className="w-3 h-3 text-rose-400 fill-rose-400" />
            Critical Focus
          </span>
        );
      case 'high':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            High Priority
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Clock className="w-3 h-3 text-indigo-400" />
            Standard
          </span>
        );
    }
  };

  const getTypeChip = (type) => {
    const t = type?.toUpperCase() || 'ASSIGNMENT';
    if (t.includes('EXAM') || t.includes('MIDTERM')) return 'chip-exam';
    if (t.includes('PROJECT')) return 'chip-project';
    if (t.includes('LAB')) return 'chip-lab';
    if (t.includes('QUIZ')) return 'chip-quiz';
    return 'chip-assignment';
  };

  const getDaysUntil = (dueDateStr) => {
    const due = new Date(dueDateStr);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: `${Math.abs(diffDays)}d ago`, isPast: true };
    if (diffDays === 0) return { text: 'Due Today', isToday: true };
    if (diffDays === 1) return { text: 'Due Tomorrow', isUrgent: true };
    return { text: `in ${diffDays} days`, isFuture: true };
  };

  return (
    <div className="space-y-6">
      
      {/* Course Header & Executive Metric Bar */}
      <div className="glass-panel p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {courseCode || 'COURSE'}
              </span>
              <span className="text-xs text-slate-400">{term || 'Active Term'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {courseName || 'Course Schedule'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Instructor: <span className="text-slate-200">{instructor || 'Staff'}</span> • Total Estimated Workload: <span className="text-cyan-300 font-semibold">{totalWorkloadHours || 'N/A'} hours</span>
            </p>
          </div>

          {/* Action Export Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenExport}
              className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Sync & Export (iCal / PDF)
            </button>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              Sub-Milestone Execution Progress
            </span>
            <span className="font-bold text-indigo-300 font-mono">
              {completedMilestones} of {allMilestones.length} Tasks ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {['ALL', 'ASSIGNMENT', 'PROJECT', 'EXAM', 'LAB', 'QUIZ'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === type
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {type === 'ALL' ? 'All Deliverables' : `${type}S`}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500">
          Showing {filteredAssignments.length} scheduled items
        </span>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-10 space-y-6">
        <div className="timeline-stem" />

        {filteredAssignments.map((item, index) => {
          const isExpanded = expandedCards[item.id] !== false; // default open
          const daysInfo = getDaysUntil(item.dueDate);
          const itemMilestones = item.milestones || [];
          const itemDoneMilestones = itemMilestones.filter(m => m.completed).length;
          const isAllItemDone = itemMilestones.length > 0 && itemDoneMilestones === itemMilestones.length;

          return (
            <div key={item.id || index} className="relative group">
              
              {/* Timeline Node Bullet */}
              <div className={`absolute -left-[30px] sm:-left-[46px] top-6 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                isAllItemDone
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-900 border-indigo-500 text-indigo-300 group-hover:scale-110'
              }`}>
                {isAllItemDone ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold font-mono">{index + 1}</span>
                )}
              </div>

              {/* Assignment Card */}
              <div className={`glass-panel p-5 sm:p-6 transition-all border ${
                isAllItemDone ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-white/10 hover:border-indigo-500/40'
              }`}>
                
                {/* Top Row: Title, Date, Urgency */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`chip ${getTypeChip(item.type)}`}>
                        {item.type}
                      </span>
                      {getUrgencyBadge(item.urgency)}
                      {item.weight && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                          {item.weight}% Grade
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display mt-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Due Date & Countdown */}
                  <div className="sm:text-right shrink-0">
                    <div className="flex items-center sm:justify-end gap-1.5 text-xs font-semibold text-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {new Date(item.dueDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold block mt-0.5">
                      ⏳ {daysInfo.text} • ~{item.estimatedHours || 5}h study
                    </span>
                  </div>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-slate-400 mb-4 bg-slate-950/40 p-3 rounded-lg border border-white/5">
                    {item.description}
                  </p>
                )}

                {/* Decomposed Action Milestones Accordion */}
                <div className="pt-2 border-t border-white/10">
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center justify-between cursor-pointer py-1 text-xs font-semibold text-indigo-300 hover:text-indigo-200 select-none"
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Decomposed Milestones ({itemDoneMilestones}/{itemMilestones.length} Done)
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>

                  {isExpanded && (
                    <div className="mt-2.5 space-y-2">
                      {itemMilestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          onClick={() => handleMilestoneToggle(item.id, milestone.id, milestone.completed)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            milestone.completed
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300 line-through'
                              : 'bg-slate-900/60 border-white/5 hover:border-white/20 text-slate-200 hover:bg-slate-900'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0 text-indigo-400">
                            {milestone.completed ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 hover:text-indigo-400" />
                            )}
                          </div>
                          <div className="flex-1 flex items-center justify-between gap-2">
                            <span className={milestone.completed ? 'text-slate-400' : 'text-slate-100'}>
                              {milestone.title}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full shrink-0">
                              {milestone.hours} hrs
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
