import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, Lightbulb } from 'lucide-react';
import { clsx } from 'clsx';

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const CalloutIcon = ({ type, className }: { type: CalloutType; className?: string }) => {
  const props = { className, size: 20, strokeWidth: 2.5 };

  switch (type) {
    case 'warning':
      return <AlertCircle {...props} />;
    case 'error':
      return <XCircle {...props} />;
    case 'success':
      return <CheckCircle {...props} />;
    case 'tip':
      return <Lightbulb {...props} />;
    case 'info':
    default:
      return <Info {...props} />;
  }
};

const styles = {
  info: {
    container: 'bg-blue-500/5 border-blue-500/30',
    title: 'text-blue-300',
    text: 'text-blue-100/90',
    icon: 'text-blue-400'
  },
  warning: {
    container: 'bg-yellow-500/5 border-yellow-500/30',
    title: 'text-yellow-300',
    text: 'text-yellow-100/90',
    icon: 'text-yellow-400'
  },
  error: {
    container: 'bg-red-500/5 border-red-500/30',
    title: 'text-red-300',
    text: 'text-red-100/90',
    icon: 'text-red-400'
  },
  success: {
    container: 'bg-green-500/5 border-green-500/30',
    title: 'text-green-300',
    text: 'text-green-100/90',
    icon: 'text-green-400'
  },
  tip: {
    container: 'bg-purple-500/5 border-purple-500/30',
    title: 'text-purple-300',
    text: 'text-purple-100/90',
    icon: 'text-purple-400'
  }
};

export const Callout = ({ type = 'info', title, children }: CalloutProps) => {
  const style = styles[type];

  return (
    <div className={clsx(
      "rounded-lg border p-5 my-6 flex gap-4",
      style.container
    )}>
      <div className="flex-shrink-0 mt-0.5">
        <div className={clsx("p-2 rounded-lg bg-surface-900/50", style.icon)}>
          <CalloutIcon type={type} className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={clsx("font-semibold mb-2 text-base", style.title)}>
            {title}
          </h4>
        )}
        <div className={clsx("text-sm leading-relaxed prose prose-invert max-w-none", style.text)}>
          {children}
        </div>
      </div>
    </div>
  );
};
