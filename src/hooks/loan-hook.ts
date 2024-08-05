import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LoanFormType } from '@/types/schema/loan';

import { loanService } from '@/services/loan-service';

export const useGetLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data:LoanFormType ) => loanService.getLoans(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['loans'],
      });
      toast.success('Get loan success', {
        description: 'You have successfully get loan',
      });
    },
    onError: (error) => {
      toast.error('Failed to get loans', {
        description: error.message,
      });
    },
  });
};

 
