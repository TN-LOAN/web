export const calculateLoanAmount = (salary: number, debtexpenses: number): number => {
    const loanAmount = ((salary * 0.4) - debtexpenses) * 150;
    return loanAmount > 0 ? loanAmount : 0; 
  };
  