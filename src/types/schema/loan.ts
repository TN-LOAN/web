import * as z from 'zod';

export const LoanFormSchema = z.object({
  career: z.string().min(1, { message: 'กรุณาเลือกอาชีพของคุณ' }),
  dateOfBirth: z.string().min(1, { message: 'กรุณาใส่วันเกิดของคุณ' }),
  salary: z.coerce.number({ required_error: 'require' }).min(1, { message: 'กรุณากรอกรายได้ของคุณ' }),
  debtexpenses: z.coerce.number().min(0),
  loanPeriod: z.coerce.number().min(1, { message: 'กรุณากรอกระยะเวลากู้ที่คุณต้องการ' }),
  loanAmount: z.coerce.number().min(1, { message: 'กรุณากรอกจำนวนกู้ที่คุณต้องการ' }),
  acceptTerms: z.boolean().refine((val) => val === true, { message: '' }),
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

// ID                       string  json:"id" gorm:"primaryKey;type:char(255)"
//  Provider                 string  json:"provider"
//  Product                  string  json:"product"
//  InterestRateAverage      float64 json:"interest_rate_average"
//  InterestRatedDetail      string  json:"interest_rate_detail"
//  LoanType                 string  json:"loan_type"
//  Collateral               string  json:"collateral"
//  CollateralCondition      string  json:"collateral_condition"
//  Qualification            string  json:"qualification"
//  RelevantProductCondition string  json:"relevant_product_condition"
//  ProductCondition         string  json:"product_condition"
//  AgeMinimum               int     json:"age_minimum"
//  AgeMaximum               int     json:"age_maximum"
//  EmployeeIncomeMinimum    int     json:"employee_income_minimum"
//  FreelanceIncomeMinimum   int     json:"freelance_income_minimum"
//  RegisterCondition        string  json:"register_condition"
//  CreditMinimum            int     json:"credit_minimum"
//  CreditMaximum            int     json:"credit_maximum"
//  LtvRadioDetail           string  json:"ltv_radio_detail"
//  PeriodMinimum            int     json:"period_minimum"
//  PeriodMaximum            int     json:"period_maximum"
//  PeriodAgeMaximum         int     json:"period_age_maximum"
//  MrtaDetail               string  json:"mrta_detail"
//  Mrta                     bool    json:"mrta"
//  Fee                      string  json:"fee"
//  PaymentFee               string  json:"payment_fee"
//  ProductWebsite           string  json:"product_website"

export const LoanType = z.object({
  loan: z.object({
    id: z.string(),
  provider: z.string(),
  product: z.string(),
  interest_rate_average: z.number(),
  interest_rate_detail: z.string(),
  loan_type: z.string(),
  collateral: z.string(),
  collateral_condition: z.string(),
  qualification: z.string(),
  relevant_product_condition: z.string(),
  product_condition: z.string(),
  age_minimum: z.number(),
  age_maximum: z.number(),
  employee_income_minimum: z.number(),
  freelance_income_minimum: z.number(),
  register_condition: z.string(),
  credit_minimum: z.number(),
  credit_maximum: z.number(),
  ltv_radio_detail: z.string(),
  period_minimum: z.number(),
  period_maximum: z.number(),
  period_age_maximum: z.number(),
  mrta_detail: z.string(),
  mrta: z.boolean(),
  fee: z.string(),
  payment_fee: z.string(),
  product_website: z.string(),
  }),
  installment: z.number()
});

export const LoanResponseType = z.object({
  normal_loan: z.array(LoanType),
  decorate_loan: z.array(LoanType)
})

export type LoanType = z.infer<typeof LoanType>;

export type LoanResponseType = z.infer<typeof LoanResponseType>