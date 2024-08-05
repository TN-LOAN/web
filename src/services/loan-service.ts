import { LoanResponseType } from '@/types/schema/loan';

import { ApiService } from './api-service';

class LoanService extends ApiService {
  public async getLoans(): Promise<LoanResponseType[]> {
    const mock = {
      AcceptTerms: true,
      Career: 'Software Engineer',
      DateOfBirth: '2004-02-01',
      DebtExpenses: 0,
      LoanAmount: 5000000,
      LoanPeriod: 30,
      Salary: 15000,
    };
    const url = '/loan/recommend';
    return this.post(url, mock)
      .then((response) => {
        return response.data.data as unknown as LoanResponseType[];
      })
      .catch(this.throwError);
  }
}

export const loanService = new LoanService();
