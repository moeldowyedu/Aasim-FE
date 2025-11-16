import { clsx } from 'clsx';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  hover = false,
  onClick
}) => {
  const baseStyles = 'bg-white rounded-lg border border-gray-200';

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowStyles = shadow ? 'shadow-sm' : '';
  const hoverStyles = hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : '';

  return (
    <div
      className={clsx(
        baseStyles,
        paddings[padding],
        shadowStyles,
        hoverStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
