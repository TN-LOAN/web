import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { loanService } from '@/services/loan-service';

export const useGetLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => loanService.getLoans(),
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

export const useTest = () =>
  useQuery({
    queryKey: ['test'],
    queryFn: () => loanService.getLoans(),
  });
