import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/libs/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const form = useFormContext();
  const fieldState = form.getFieldState(props.name!);
  const error = fieldState?.error?.message;

  return (
    <input
      type={type}
      className={cn(
        error ? 'border-destructive' : 'border-input',
        'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
