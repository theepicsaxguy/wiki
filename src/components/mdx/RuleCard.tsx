import { useState } from 'preact/hooks';
import { X, Shield, AlertTriangle, Ban, ShieldAlert, Sparkles, Scale, SearchX, Zap, UserCheck, Server, Lock, Hand, Bot, AlertOctagon } from 'lucide-preact';

interface RuleCardProps {
  title: string;
  iconName?: string;
  severity?: 'high' | 'medium' | 'low';
  number?: number;
  children: any;
}

export default function RuleCard({ title, iconName = 'shield', severity = 'medium', number, children }: RuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Map icon names to Lucide components
  const iconComponents: Record<string, any> = {
    'shield': Shield,
    'alert': AlertTriangle,
    'ban': Ban,
    'shield-alert': ShieldAlert,
    'sparkles': Sparkles,
    'scale': Scale,
    'search-x': SearchX,
    'zap': Zap,
    'user-check': UserCheck,
    'server': Server,
    'lock': Lock,
    'hand': Hand,
    'bot': Bot,
    'alert-octagon': AlertOctagon,
  };

  const IconComponent = iconComponents[iconName] || Shield;

  // Design System: Using CSS variables
  const severityColors = {
    high: 'border-red-500/20 hover:border-red-500/40',
    medium: 'border-yellow-500/20 hover:border-yellow-500/40',
    low: 'border-blue-500/20 hover:border-blue-500/40',
  };

  const severityBadge = {
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <>
      {/* Card - Using Design System */}
      <button
        onClick={() => setIsOpen(true)}
        class={`group relative bg-surface border ${severityColors[severity]} rounded-xl p-6 transition-all duration-200 hover:border-opacity-100 text-left w-full`}
        aria-label={`Read rule: ${title}`}
      >
        {/* Rule Number Badge */}
        {number && (
          <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center border border-primary/20">
            {number}
          </div>
        )}

        {/* Icon - Lucide SVG instead of emoji */}
        <div class="mb-4 text-text-muted">
          <IconComponent size={32} />
        </div>

        {/* Title */}
        <h3 class="text-lg font-bold text-white mb-3 pr-8 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Severity Badge - Removed redundant "Click to read more" */}
        <span class={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${severityBadge[severity]}`}>
          {severity.toUpperCase()}
        </span>
      </button>

      {/* Modal - Simplified, using Design System */}
      {isOpen && (
        <div
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="presentation"
        >
          {/* Backdrop - Simpler without glassmorphism */}
          <div
            class="absolute inset-0 bg-black/80 cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
          />

          {/* Modal Content - Design System colors */}
          <div
            class="relative bg-surface border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div class="sticky top-0 z-10 bg-surface border-b border-border px-6 py-4 flex items-start justify-between">
              <div class="flex items-start gap-4 flex-1">
                <div class="text-text-muted">
                  <IconComponent size={28} />
                </div>
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
                class="btn btn-ghost btn-icon"
                aria-label="Close modal"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div class="px-6 py-6">
              <div class="prose prose-invert prose-slate max-w-none">
                <div class="text-text-main leading-relaxed">
                  {children}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div class="sticky bottom-0 bg-surface border-t border-border px-6 py-4">
              <button
                onClick={() => setIsOpen(false)}
                class="btn btn-primary w-full"
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
