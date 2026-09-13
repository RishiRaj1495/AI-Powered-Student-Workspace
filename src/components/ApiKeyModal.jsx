import React, { useState } from 'react';
import { X, Key, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey }) {
  const [tempKey, setTempKey] = useState(apiKey || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(tempKey.trim());
    onClose();
  };

  const handleClear = () => {
    setTempKey('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-6 sm:p-8 relative border-indigo-500/30 shadow-2xl space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Key className="w-3.5 h-3.5" />
            Gemini API Configuration
          </div>
          <h3 className="text-xl font-extrabold text-white font-display">
            Bring Your Own API Key
          </h3>
          <p className="text-xs text-slate-400">
            Powered by Google's Gemini models (gemini-1.5-flash / gemini-2.0-flash).
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-indigo-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Private & Client-Side
            </div>
            <p className="text-[11px] text-slate-400">
              Your API key is kept exclusively in your browser's localStorage and never sent to any external server.
            </p>
          </div>

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Get a free Gemini API Key from Google AI Studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-rose-400 underline transition-colors"
          >
            Clear / Use Offline Demo
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="btn-secondary text-xs py-2 px-3.5"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary text-xs py-2 px-4"
            >
              Save Key
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
