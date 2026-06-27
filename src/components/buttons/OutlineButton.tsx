import { cn } from '@/utils';

const buttonSizeClasses = {
  '': '',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg text-sm sm:text-base',
  xl: 'lg:btn-xl btn-md sm:btn-lg',
  '4xl':
    'w-[450px] h-[111px] text-[32px] w-[250px] h-[80px] text-[24px] sm:w-[300px] sm:h-[80px] sm:text-[28px]',
};

const buttonColorClasses = {
  primary: 'bg-transparent hover:bg-maroon border-maroon text-maroon hover:text-main-white',
  secondary:
    'bg-transparent hover:bg-main-white border-main-white text-main-white hover:text-shadow-black',
};

const OutlineButton = ({
  startIcon,
  endIcon,
  isLoading,
  children,
  className,
  color,
  size,
  ...props
}: Button.OutlineButtonProps) => {
  return (
    <button
      className={cn(
        'hover:shadow-btn-outline animate-btn-outline duration-400 btn btn-outline rounded-none font-light transition-all',
        buttonSizeClasses[size],
        buttonColorClasses[color],
        className
      )}
      {...props}
    >
      {isLoading && <span className="loading loading-spinner loading-sm mr-2" />}
      {startIcon && !isLoading && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && !isLoading && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default OutlineButton;
