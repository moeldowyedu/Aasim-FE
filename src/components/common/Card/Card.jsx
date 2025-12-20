import { clsx } from 'clsx';
import { useTheme } from '../../../contexts/ThemeContext';

const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
  ...props
}) => {
  const { theme } = useTheme();

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        theme === 'dark'
          ? 'bg-white/5 border-white/10 text-white backdrop-blur-sm shadow-xl'
          : 'bg-white border-slate-100 text-slate-900 shadow-md',
        'rounded-xl border',
        paddings[padding],
        hover && (theme === 'dark'
          ? 'hover:bg-white/10 hover:border-white/20'
          : 'hover:shadow-lg hover:border-primary-200'),
        (hover || onClick) && 'transition-all duration-200 cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
