export const calculateMonthlyInstallment = (installment: number, interestRate: number): string => {
    const monthlyInstallment = (installment * (interestRate / 100) * 30 / 365).toLocaleString();
    return monthlyInstallment;
  };
  