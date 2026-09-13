import React, { useState } from 'react';
import { X, Calendar, Copy, Check, Download, Printer, Share2, Sparkles, FileText } from 'lucide-react';
import { downloadICS, generateMarkdownExport } from '../services/calendarExport';

export default function ExportModal({ data, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const handleCopyMarkdown = () => {
    const md = generateMarkdownExport(data);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadICS = () => {
    downloadICS(data);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 relative border-indigo-500/30 shadow-2xl shadow-indigo-500/20 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Share2 className="w-3.5 h-3.5" />
            Shareable Exports & Calendar Sync
          </div>
          <h3 className="text-xl font-extrabold text-white font-display">
            Sync Deadlines with Your Setup
          </h3>
          <p className="text-xs text-slate-400">
            Export directly to your preferred calendar or study workspace.
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          
          {/* Option 1: .ICS Calendar Sync */}
          <div
            onClick={handleDownloadICS}
            className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-950/20 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  iCal (.ics) Calendar File
                </h4>
                <p className="text-xs text-slate-400">
                  Direct import into Google Calendar, Apple Calendar, or Outlook with automatic 24h & 3-day reminder alarms.
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-indigo-400 shrink-0" />
          </div>

          {/* Option 2: Copy Markdown */}
          <div
            onClick={handleCopyMarkdown}
            className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Copy Markdown Summary
                </h4>
                <p className="text-xs text-slate-400">
                  Formatted for Notion, Obsidian, GitHub readmes, or study notes.
                </p>
              </div>
            </div>
            {copied ? (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Copied!
              </span>
            ) : (
              <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 shrink-0" />
            )}
          </div>

          {/* Option 3: Print / PDF */}
          <div
            onClick={handlePrint}
            className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-950/20 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Print to PDF / Paper
                </h4>
                <p className="text-xs text-slate-400">
                  Clean, printer-friendly summary sheet for your physical study desk.
                </p>
              </div>
            </div>
            <Printer className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 shrink-0" />
          </div>

        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary text-xs py-2 px-4"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
