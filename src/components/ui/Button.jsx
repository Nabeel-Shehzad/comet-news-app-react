import { forwardRef } from "react";
import Loader from "./Loader";
import { cn } from "../../lib/utils";

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      disabled,
      isLoading,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:opacity-90",
      secondary: "bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--accent))]",
      outline: "bg-transparent border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))]",
      ghost: "bg-transparent hover:bg-[hsl(var(--secondary))]",
      destructive: "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:opacity-90",
    };

    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader size="sm" className="mr-2" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;