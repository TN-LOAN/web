import React from 'react';


import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import { ScrollArea } from '@/components/common/scroll';

interface CustomDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  bankName: string;
  loanAmount: string;
  interestRate: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, title, bankName, loanAmount, interestRate }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[675px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <ScrollArea className="h-[300px]">
            <p>Bank Name : {bankName}</p>
            <p>Loan Amount : {loanAmount}</p>
            <p>Interest rate : {interestRate}</p>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
