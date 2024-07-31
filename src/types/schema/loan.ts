import * as z from 'zod';

export const LoanFormSchema = z.object({
  career: z.string().min(1, {
    message: 'Career is required',
  }),
  dateOfBirth: z.string(),
  loanPeriod: z.number(),
  loanAmount: z.number(),
});

export type LoanFormType = z.infer<typeof LoanFormSchema>;

export const LoanFormDefaultValues: LoanFormType = {
  career: '',
  dateOfBirth: '',
  loanPeriod: 0,
  loanAmount: 0,
};
