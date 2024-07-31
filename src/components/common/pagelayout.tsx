import { HTMLAttributes } from 'react';

import { cn } from '@/libs/utils';

export const PageLayout = ({ className, children }: HTMLAttributes<HTMLElement>) => {
  return <main className={cn('bg-background relative flex min-h-screen flex-col', className)}>{children}</main>;
};
