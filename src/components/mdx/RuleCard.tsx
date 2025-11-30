import { useState } from 'preact/hooks';
import { X } from 'lucide-preact';

interface RuleCardProps {
  title: string;
  icon?: string;
  severity?: 'high' | 'medium' | 'low';
  number?: number;
  children: any;
}

export default function RuleCard({ title, icon = '📋', severity = 'medium', number, children }: RuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const severityColors = {
    high: 'border-red-500/30 hover:border-red-500/60',
    medium: 'border-yellow-500/30 hover:border-yellow-500/60',
    low: 'border-blue-500/30 hover:border-blue-500/60',
  };

  const severityBadge = {
    high: 'bg-red-500/10 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  return (
    <>
      {/* Card */}
      <button
        onClick={() => setIsOpen(true)}
        class={`group relative bg-[#1e293b] border-2 ${severityColors[severity]} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:transform hover:-translate-y-1 text-left w-full`}
        aria-label={`Read rule: ${title}`}
      >
        {/* Rule Number Badge */}
        {number && (
          <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center border border-primary/30">
            {number}
          </div>
        )}

        {/* Icon */}
        <div class="text-4xl mb-4">{icon}</div>

        {/* Title */}
        <h3 class="text-lg font-bold text-white mb-3 pr-8 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Severity Badge */}
        <div class="flex items-center gap-2">
          <span class={`text-xs font-semibold px-3 py-1 rounded-full border ${severityBadge[severity]}`}>
            {severity.toUpperCase()}
          </span>
          <span class="text-xs text-slate-400">Click to read more</span>
        </div>

        {/* Hover Arrow */}
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          {/* Backdrop with glassmorphism */}
          <div class="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal Content */}
          <div
            class="relative bg-[#1e293b] border border-[#3b4558] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div class="sticky top-0 z-10 bg-[#1e293b]/95 backdrop-blur-lg border-b border-[#3b4558] px-6 py-4 flex items-start justify-between">
              <div class="flex items-start gap-4 flex-1">
                <div class="text-3xl">{icon}</div>
                <div>
                  <h2 id="modal-title" class="text-xl font-bold text-white mb-1">
                    {number && <span class="text-primary">Rule {number}:</span>} {title}
                  </h2>
                  <span class={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${severityBadge[severity]}`}>
                    {severity.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                class="p-2 hover:bg-[#2d3748] rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X class="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Body */}
            <div class="px-6 py-6">
              <div class="prose prose-invert prose-slate max-w-none">
                <div class="text-slate-300 leading-relaxed">
                  {children}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div class="sticky bottom-0 bg-[#1e293b]/95 backdrop-blur-lg border-t border-[#3b4558] px-6 py-4">
              <button
                onClick={() => setIsOpen(false)}
                class="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
