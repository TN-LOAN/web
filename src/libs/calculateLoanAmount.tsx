export const calculateLoanAmount = (salary: number, debtexpenses: number, loanPeriod:number): number => {
    const loanAmount = ((salary * 0.4) - debtexpenses) * (loanPeriod*12);
    return loanAmount > 0 ? loanAmount : 0; 
  };
  