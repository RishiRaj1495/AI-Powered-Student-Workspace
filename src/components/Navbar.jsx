import React from 'react';
import { Sparkles, Key, Calendar, BookOpen, RotateCcw, Award } from 'lucide-react';

export default function Navbar({ apiKey, onOpenKeyModal, onReset, activeTab, setActiveTab, hasData }) {
  return (
    <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Event Tag */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display">
                ChronoScribe <span className="text-cyan-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                PROMPT WARS
              </span>
            </div>
            <p className="text-xs text-slate-400">Google for Developers × Hack2Skill × VIT Bhopal</p>
          </div>
        </div>

        {/* Center View Tabs (if data loaded) */}
        {hasData && (
          <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Timeline & Milestones
            </button>
            <button
              onClick={() => setActiveTab('gantt')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'gantt'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Gantt Matrix
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Weekly Study Plan
            </button>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {hasData && (
            <button
              onClick={onReset}
              title="Upload another document"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              apiKey
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {apiKey ? 'Gemini API Connected' : 'BYOK / Demo Mode'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
