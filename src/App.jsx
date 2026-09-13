import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import TimelineView from './components/TimelineView';
import GanttCalendarView from './components/GanttCalendarView';
import StudyPlanRoadmap from './components/StudyPlanRoadmap';
import ExportModal from './components/ExportModal';
import ApiKeyModal from './components/ApiKeyModal';
import { extractDeadlinesWithGemini } from './services/gemini';
import { Sparkles, Calendar, BookOpen, Layers, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('chronoscribe_gemini_key') || '');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  // Personalization settings
  const [studyStyle, setStudyStyle] = useState('balanced');
  const [dailyHours, setDailyHours] = useState(3.5);
  const [gradeTarget, setGradeTarget] = useState('A');

  // App state
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    // Check if there was cached schedule in session
    const saved = sessionStorage.getItem('chronoscribe_current_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('chronoscribe_gemini_key', key);
    } else {
      localStorage.removeItem('chronoscribe_gemini_key');
    }
  };

  const handleProcessSyllabus = async (rawText) => {
    setIsLoading(true);
    setLoadingStep('Reading document structure & dates...');

    try {
      setTimeout(() => setLoadingStep('Extracting deliverables & calculating workload...'), 400);
      setTimeout(() => setLoadingStep('Generating decomposed action milestones...'), 800);

      const result = await extractDeadlinesWithGemini({
        rawText,
        apiKey,
        studyStyle,
        dailyHours,
        gradeTarget
      });

      setData(result);
      sessionStorage.setItem('chronoscribe_current_data', JSON.stringify(result));
      setActiveTab('timeline');
    } catch (err) {
      console.error('Error processing:', err);
      alert(`Processing error: ${err.message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleUpdateMilestone = (assignmentId, milestoneId, newCompleted) => {
    setData((prev) => {
      if (!prev) return prev;
      const updatedAssignments = prev.assignments.map((asgn) => {
        if (asgn.id === assignmentId) {
          const updatedMilestones = (asgn.milestones || []).map((m) => {
            if (m.id === milestoneId) {
              return { ...m, completed: newCompleted };
            }
            return m;
          });
          return { ...asgn, milestones: updatedMilestones };
        }
        return asgn;
      });

      const updated = { ...prev, assignments: updatedAssignments };
      sessionStorage.setItem('chronoscribe_current_data', JSON.stringify(updated));
      return updated;
    });
  };

  const handleReset = () => {
    setData(null);
    sessionStorage.removeItem('chronoscribe_current_data');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100">
      
      {/* Top Navbar */}
      <div>
        <Navbar
          apiKey={apiKey}
          onOpenKeyModal={() => setIsKeyModalOpen(true)}
          onReset={handleReset}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasData={!!data}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!data ? (
            <UploadSection
              onProcess={handleProcessSyllabus}
              isLoading={isLoading}
              loadingStep={loadingStep}
              studyStyle={studyStyle}
              setStudyStyle={setStudyStyle}
              dailyHours={dailyHours}
              setDailyHours={setDailyHours}
              gradeTarget={gradeTarget}
              setGradeTarget={setGradeTarget}
            />
          ) : (
            <div className="space-y-6">
              
              {/* Mobile View Switcher */}
              <div className="flex md:hidden items-center justify-center bg-slate-900/90 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                    activeTab === 'timeline' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('gantt')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                    activeTab === 'gantt' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Gantt
                </button>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                    activeTab === 'roadmap' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Roadmap
                </button>
              </div>

              {/* Active Tab Component */}
              {activeTab === 'timeline' && (
                <TimelineView
                  data={data}
                  onUpdateMilestone={handleUpdateMilestone}
                  onOpenExport={() => setIsExportModalOpen(true)}
                />
              )}

              {activeTab === 'gantt' && (
                <GanttCalendarView
                  data={data}
                  onOpenExport={() => setIsExportModalOpen(true)}
                />
              )}

              {activeTab === 'roadmap' && (
                <StudyPlanRoadmap
                  data={data}
                  studyStyle={studyStyle}
                  dailyHours={dailyHours}
                  gradeTarget={gradeTarget}
                />
              )}

            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950/60 backdrop-blur-md py-6 px-4 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">ChronoScribe AI</span>
            <span>• Built for PROMPT WARS</span>
          </div>
          <p className="text-slate-400 flex items-center gap-1.5">
            Google for Developers × Hack2Skill × Android Club, VIT Bhopal
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Private & Client-Side
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={data}
      />

    </div>
  );
}
