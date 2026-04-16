import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Card = ({ children, className = '', delay = 0 }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`glass-card p-6 rounded-2xl ${className}`}
  >
    {children}
  </motion.div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button = ({ children, variant = 'primary', icon: Icon, isLoading, className = '', ...props }: ButtonProps) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/50',
  };

  return (
    <button
      className={`${variants[variant]} flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      ) : Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export const Input = ({ label, error, ...props }: { label?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm font-medium text-muted-foreground ml-1">{label}</label>}
    <input {...props} />
    {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
  </div>
);

export const Select = ({ label, options, error, ...props }: { label?: string; options: { label: string; value: string }[], error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm font-medium text-muted-foreground ml-1">{label}</label>}
    <select {...props}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
  </div>
);
