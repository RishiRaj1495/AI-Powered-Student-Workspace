import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Sparkles, Sliders, Target, Clock, Zap, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { SAMPLE_SYLLABI } from '../services/sampleData';
import { parseFile } from '../services/fileParser';

export default function UploadSection({
  onProcess,
  isLoading,
  loadingStep,
  studyStyle,
  setStudyStyle,
  dailyHours,
  setDailyHours,
  gradeTarget,
  setGradeTarget
}) {
  const [inputText, setInputText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [activeInputMode, setActiveInputMode] = useState('upload'); // 'upload' | 'paste' | 'preset'
  const [selectedPresetId, setSelectedPresetId] = useState('');
  const [parseError, setParseError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setParseError('');
    setUploadedFileName(file.name);

    try {
      const extractedText = await parseFile(file);
      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error('No readable text could be extracted from this document.');
      }
      setInputText(extractedText);
    } catch (err) {
      console.error(err);
      setParseError(err.message || 'Failed to read file. Please paste syllabus text directly.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePresetSelect = (preset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.text);
    setUploadedFileName(`${preset.name} (Preset)`);
    setParseError('');
  };

  const handleTriggerProcess = () => {
    if (!inputText.trim()) {
      // Default to CS301 preset if empty
      const defaultPreset = SAMPLE_SYLLABI[0];
      handlePresetSelect(defaultPreset);
      onProcess(defaultPreset.text);
      return;
    }
    onProcess(inputText);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Hero Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Single Polished AI Student Flow • Hackathon Showcase
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Turn Course Syllabi into <br className="hidden sm:inline" />
          <span className="gradient-text">Smart Timelines & Study Roadmaps</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Stop manually digging for deadlines and exam dates. Upload your course PDF, doc, or assignment sheet to get a prioritized timeline, sub-milestones, and calendar sync in seconds.
        </p>
      </div>

      {/* Quick 1-Click Preset Selector for Judges */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-900/60 border border-indigo-500/20 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            1-Click Judge Demos (Zero Setup)
          </span>
          <span className="text-[11px] text-slate-500">Instant realistic CS/Eng syllabi</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_SYLLABI.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handlePresetSelect(sample)}
              className={`p-3 rounded-xl text-left text-xs transition-all border flex flex-col justify-between gap-1.5 ${
                selectedPresetId === sample.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="font-semibold flex items-center justify-between">
                <span className="truncate">{sample.code}</span>
                {selectedPresetId === sample.id && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate">{sample.name.split(':')[1] || sample.name}</p>
              <span className="text-[10px] text-slate-500 mt-0.5">{sample.term}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload / Input Card */}
      <div className="glass-panel p-6 sm:p-8 space-y-6">
        {/* Tab switcher: Upload vs Paste */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveInputMode('upload')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeInputMode === 'upload'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              Upload PDF / DOCX / TXT
            </button>
            <button
              onClick={() => setActiveInputMode('paste')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeInputMode === 'paste'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Paste Text
            </button>
          </div>
          {uploadedFileName && (
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 max-w-[200px] truncate">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              {uploadedFileName}
            </span>
          )}
        </div>

        {/* Upload Mode Dropzone */}
        {activeInputMode === 'upload' ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                : 'border-white/15 hover:border-indigo-400/50 hover:bg-white/[0.02]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
              accept=".pdf,.docx,.txt,.md"
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">
              Click to browse or drop your Syllabus / Assignment sheet
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Supports <span className="text-slate-200 font-medium">PDF, DOCX, Markdown, Plain Text</span> (up to 20MB)
            </p>
            <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-[11px] text-slate-400 border border-white/5">
              Client-side private parsing • No file storage
            </span>
          </div>
        ) : (
          /* Paste Mode Textarea */
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Paste Syllabus Text or Assignment Deadlines:</span>
              <span className="text-slate-500">{inputText.length} characters</span>
            </label>
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSelectedPresetId('');
                setUploadedFileName('');
              }}
              placeholder="Paste the course grading criteria, assignment list, exam dates, or project milestones here..."
              className="w-full rounded-xl bg-slate-950/80 border border-white/10 p-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        )}

        {/* Error Alert */}
        {parseError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
            <span>⚠️ {parseError}</span>
          </div>
        )}

        {/* Personalization Section (Bonus Criteria) */}
        <div className="pt-2 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Light Personalization & Study Constraints
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Target Grade Goal */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Target Grade Goal
              </label>
              <select
                value={gradeTarget}
                onChange={(e) => setGradeTarget(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="A+">Aim for A+ (Deep Mastery & 100% Milestones)</option>
                <option value="A">Aim for A (Solid High Yield Focus)</option>
                <option value="B+">Aim for B+ (Balanced Core Deliverables)</option>
                <option value="Pass">Pass with Buffer (Emergency Rescue)</option>
              </select>
            </div>

            {/* Study Pacing Strategy */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Pacing Strategy
              </label>
              <select
                value={studyStyle}
                onChange={(e) => setStudyStyle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="balanced">Balanced Pace (3-Day Pre-Deadline Buffer)</option>
                <option value="procrastinator-rescue">Procrastinator Rescue (Intense 48h Sprints)</option>
                <option value="deep-mastery">Deep Mastery (Early Research & Revision)</option>
              </select>
            </div>

            {/* Daily Study Capacity */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <label className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Available Hours/Day
                </label>
                <span className="text-indigo-400 font-bold">{dailyHours} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Primary Action CTA */}
        <div className="pt-2">
          <button
            onClick={handleTriggerProcess}
            disabled={isLoading}
            className="btn-primary w-full py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{loadingStep || 'AI Analyzing Syllabus...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Generate Smart Timeline & Study Roadmap</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
