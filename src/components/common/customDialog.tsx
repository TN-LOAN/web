import React from 'react';


import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import { ScrollArea } from '@/components/common/scroll';
import {  LoanResponseType } from '@/types/schema/loan';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  loanData: LoanResponseType;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, loanData }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[675px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{loanData.loan.product}</DialogTitle>
          {/* <ScrollArea className="h-[300px]">
            <p>Bank Name : {bankName}</p>
            <p>Loan Amount : {loanAmount}</p>
            <p>Interest rate : {interestRate}</p>
          </ScrollArea> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
