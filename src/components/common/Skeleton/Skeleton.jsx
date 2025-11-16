const Skeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
}) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
  };

  const getWidth = () => {
    if (width) return { width };
    if (variant === 'circle') return { width: height || '40px' };
    return {};
  };

  const getHeight = () => {
    if (height) return { height };
    if (variant === 'circle') return { height: height || '40px' };
    return {};
  };

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`bg-gray-200 animate-pulse ${variants[variant]} ${className}`}
      style={{ ...getWidth(), ...getHeight() }}
    />
  ));

  return count > 1 ? (
    <div className="space-y-2">{skeletons}</div>
  ) : (
    skeletons[0]
  );
};

const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <Skeleton variant="circle" height="60px" className="mb-4" />
      <Skeleton variant="title" width="60%" className="mb-2" />
      <Skeleton count={3} width="100%" />
      <div className="mt-4 flex gap-2">
        <Skeleton width="80px" height="32px" />
        <Skeleton width="80px" height="32px" />
      </div>
    </div>
  );
};

const SkeletonTable = ({ rows = 5, columns = 4, className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 p-4 flex gap-4">
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={i} width="100px" height="20px" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-t border-gray-200 flex gap-4">
          {Array.from({ length: columns }, (_, colIndex) => (
            <Skeleton key={colIndex} width="100px" height="16px" />
          ))}
        </div>
      ))}
    </div>
  );
};

Skeleton.Card = SkeletonCard;
Skeleton.Table = SkeletonTable;

export default Skeleton;
