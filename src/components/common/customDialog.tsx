import React from 'react';


import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';

import {  LoanResponseType } from '@/types/schema/loan';
import { ScrollArea } from '@/components/common/scroll';

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
          <ScrollArea className="h-[300px]">

            <p>{loanData.loan.provider}</p>
            <p>{loanData.loan.product}</p>
            <p>งวดผ่อนชำระต่อเดือน: {loanData.installment}</p>
            <p>อัตราดอกเบี้ยเฉลี่ย 3 ปี: {loanData.loan.interest_rate_average}</p>
            <p>อัตราดอกเบี้ยในแต่ละปี: {loanData.loan.interest_rate_detail}</p>
            <p>ประเภทของสินเชื่อ: {loanData.loan.loan_type}</p>
            <p>Collateral: {loanData.loan.collateral}</p>
            <p>เงื่อนไขหลักประกัน: {loanData.loan.collateral_condition}</p>
            <p>คุณสมบัติของผู้กู้ที่มีผลต่ออัตราดอกเบี้ย: {loanData.loan.qualification}</p>
            <p>เงื่อนไขการใช้สินเชื่อควบคู่กับผลิตภัณฑ์อื่น: {loanData.loan.relevant_product_condition}</p>
            <p>เงื่อนไขผลิตภัณฑ์: {loanData.loan.product_condition}</p>
            <p>อายุผู้กู้ขั้นต่ำ: {loanData.loan.age_minimum}</p>
            <p>อายุผู้กู้ขั้นสูงสุด: {loanData.loan.age_maximum}</p>
            <p>รายได้ขั้นต่ำ: {loanData.loan.employee_income_minimum}</p>
            <p>รายได้ผู้ประกอบอาชีพอิสระ: {loanData.loan.freelance_income_minimum}</p>
            <p>เงื่อนไขในการสมัคร:{loanData.loan.register_condition}</p>
            <p>วงเงินสินเชื่อขั้นต่ำ: {loanData.loan.credit_minimum}</p>
            <p>วงเงินสินเชื่อสูงสุด: {loanData.loan.credit_maximum}</p>
            <p>อัตราส่วนเงินให้สินเชื่อต่อมูลค่าหลักประกัน (LTV ratio): {loanData.loan.ltv_radio_detail}</p>
            <p>ระยะเวลาการกู้ยืม:{loanData.loan.period_maximum}</p>
            <p>ค่าธรรมเนียมกรณีขอยกเลิกประกันชีวิตคุ้มครองวงเงินสินเชื่อ (MRTA): {loanData.loan.mrta_detail}</p>
            <p>ค่าสำรวจและประเมินหลักประกันโดยผู้ประเมินภายในและผู้ประเมินภายนอก: {loanData.loan.fee}</p>


            <p>{loanData.loan.period_minimum}</p>
            <p>{loanData.loan.period_age_maximum}</p>
            <p>{loanData.loan.mrta}</p>
            <p>{loanData.loan.payment_fee}</p>
            <p>{loanData.loan.product_website}</p>

          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
