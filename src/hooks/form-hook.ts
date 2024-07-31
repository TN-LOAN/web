import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';
import * as z from 'zod';

export const useStrictForm = <T extends z.ZodType, R extends z.infer<T>>(schema: T, defaultValues?: Partial<R>) =>
  useForm<R>({
    //resolver is a function that takes a schema and returns a function that takes a form data object and returns a validation result object
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<R>,
    mode: 'onSubmit',
  });
