import * as z from 'zod';

export const LoanFormSchema = z.object({
  career: z.string().min(1, { message: 'กรุณาเลือกอาชีพของคุณ' }),
  dateOfBirth: z.string().min(1, { message: 'กรุณาใส่วันเกิดของคุณ' }), 
  salary: z.coerce.number({required_error: "require"}).min(1, { message: 'กรุณากรอกรายได้ของคุณ' }), 
  debtexpenses: z.coerce.number().min(1, { message: 'กรุณากรอกภาระหนี้สิ้นของคุณ' }), 
  loanPeriod: z.coerce.number().min(1, { message: 'กรุณากรอกระยะเวลากู้ที่คุณต้องการ' }), 
  loanAmount: z.coerce.number().min(0,), 
  acceptTerms: z.boolean().refine(val => val === true,{ message: '' }),
});

export type LoanFormType = z.infer<typeof LoanFormSchema>;

export const LoanFormDefaultValues: LoanFormType = {
  career: '',
  dateOfBirth: '',
  salary: 0,
  debtexpenses: 0,
  loanPeriod: 0,
  loanAmount: 0,
  acceptTerms: false,
};
