import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

type CalloutType = 'info' | 'warning' | 'error' | 'success';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/10',
    text: 'text-blue-200',
    icon: Info,
    iconColor: 'text-blue-400'
  },
  warning: {
    border: 'border-yellow-500/20',
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-200',
    icon: AlertCircle,
    iconColor: 'text-yellow-400'
  },
  error: {
    border: 'border-red-500/20',
    bg: 'bg-red-500/10',
    text: 'text-red-200',
    icon: XCircle,
    iconColor: 'text-red-400'
  },
  success: {
    border: 'border-green-500/20',
    bg: 'bg-green-500/10',
    text: 'text-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-400'
  }
};

export const Callout = ({ type = 'info', title, children }: CalloutProps) => {
  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={clsx("rounded-lg border p-4 my-6 flex gap-3", style.border, style.bg)}>
      <div className="shrink-0 mt-0.5">
        <Icon className={clsx("w-5 h-5", style.iconColor)} />
      </div>
      <div className={clsx("text-sm leading-relaxed", style.text)}>
        {title && <strong className="block mb-1 text-white">{title}</strong>}
        {children}
      </div>
    </div>
  );
};