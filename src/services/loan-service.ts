import { LoanResponseType, LoanType } from '@/types/schema/loan';
import { LoanFormType } from '@/types/schema/loan';
import { ApiService } from './api-service';

class LoanService extends ApiService {
  public async getLoans(data:LoanFormType): Promise<LoanResponseType[]> {
    
    const url = '/loan/recommend';
    return this.post(url, data)
      .then((response) => {
        return response.data.data as unknown as LoanResponseType[];
      })
      .catch(this.throwError);
  }
}

export const loanService = new LoanService();