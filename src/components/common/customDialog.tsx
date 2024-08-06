import React from 'react';


import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';

import {   LoanType } from '@/types/schema/loan';
import { ScrollArea } from '@/components/common/scroll';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  loanData: LoanType;
}

const interestRateDetail = `ปีที่ 1 : 2.49%\nปีที่ 2 : 4.00%\nปีที่ 3 : 4.36%\nปีที่ 4 เป็นต้นไป : MRR-2.00%`;

const interestRates = interestRateDetail.split('\n').map(rate => {
  const [year, rateValue] = rate.split(' : ');
  return { year, rateValue };
});

const LoanInterestRateTable: React.FC = () => {
  return (
    <table className="min-w-full border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">ปี</th>
          <th className="border border-gray-300 p-2">อัตราดอกเบี้ย</th>
        </tr>
      </thead>
      <tbody>
        {interestRates.map((rate, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{rate.year}</td>
            <td className="border border-gray-300 p-2">{rate.rateValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const LoanLTVRatio: React.FC<{ detail: string }> = ({ detail }) => {
    
    const lines = detail.split('-').map(line => line.trim()).filter(line => line !== '');
  
    return (
      <div>
       
        <ul className="list-disc pl-5">
          {lines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    );
  };

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, loanData }) => {
    
    if (!open) return null;

  

    
  return (
    <Dialog open={open} onOpenChange={onClose}>
  <DialogContent className="bg-white sm:max-w-[675px] h-3/4">
    <DialogHeader>
      <DialogTitle className="text-xl">ธนาคาร {loanData.loan.provider}</DialogTitle>
        <h2>{loanData.loan.product}</h2>
        </DialogHeader>
      <ScrollArea className="h-full">
        {/* ข้อมูลการผ่อนชำระ */}
        <div className="mb-4 space-y-1">
          <h3 className="font-bold">ข้อมูลการผ่อนชำระ</h3>
          <p>งวดผ่อนชำระต่อเดือน: <span className=' '>{loanData.installment.toFixed(2)} บาท/เดือน</span></p>
          <p>อัตราดอกเบี้ยเฉลี่ย 3 ปี: {loanData.loan.interest_rate_average}%</p>
          {/* <p>อัตราดอกเบี้ยในแต่ละปี: {loanData.loan.interest_rate_detail}</p> */}
          <div className="mb-4">
          <h3 >อัตราดอกเบี้ยในแต่ละปี:</h3>
          <LoanInterestRateTable />
        </div>
        </div>
        
        {/* ข้อมูลสินเชื่อ */}
        <div className="mb-4 space-y-1">
          <h3 className="font-bold">ข้อมูลผลิตภัณฑ์</h3>
          <p>ประเภทของสินเชื่อ: {loanData.loan.loan_type}</p>
          <p>เงื่อนไขหลักประกัน: {loanData.loan.collateral_condition}</p>
          <p>คุณสมบัติของผู้กู้: {loanData.loan.qualification}</p>
          <p>เงื่อนไขผลิตภัณฑ์: {loanData.loan.product_condition}</p>
          <p>{loanData.loan.age_maximum == 10000 ? (
            <p>อายุผู้กู้: 20 ปีขึ้นไป</p>
            ) : (
            <>
                <p>อายุผู้กู้: {loanData.loan.age_minimum} - {loanData.loan.age_maximum} ปี</p>
            
            </>
            )}</p>
          <p>รายได้ขั้นต่ำ: {loanData.loan.employee_income_minimum} บาท</p>
          <p>รายได้ผู้ประกอบอาชีพอิสระ: {loanData.loan.freelance_income_minimum} บาท</p>
          <p>เงื่อนไขในการสมัคร: 
          <LoanLTVRatio detail={loanData.loan.register_condition} /></p>
         
        </div>

        {/* ข้อมูลเงื่อนไขเพิ่มเติม */}
        <div className="mb-4 space-y-1">
          <h3 className="font-bold">ข้อมูลวงเงินสินเชื่อ</h3>
          <p>วงเงินสินเชื่อขั้นต่ำ: {loanData.loan.credit_minimum} บาท</p>
          <p> วงเงินสินเชื่อสูงสุด: {loanData.loan.credit_maximum === 9999999999 
    ? 'ไม่จำกัดวงเงิน' 
    : `${loanData.loan.credit_maximum} บาท`}</p>
          <p>อัตราส่วนเงินให้สินเชื่อต่อมูลค่าหลักประกัน (LTV ratio): 
          <LoanLTVRatio detail={loanData.loan.ltv_radio_detail} /></p>
          <p>ระยะเวลาการกู้ยืม: {loanData.loan.period_maximum} ปี</p>
        </div>

        {/* ข้อมูลค่าธรรมเนียม */}
        <div className="mb-4 space-y-1">
          <h3 className="font-bold">ข้อมูลค่าธรรมเนียม</h3>
          <p>ค่าธรรมเนียม MRTA: {loanData.loan.mrta_detail}</p>
          <p>ค่าสำรวจและประเมินหลักประกัน: {loanData.loan.fee}</p>
        </div>
      </ScrollArea>

  </DialogContent>
</Dialog>

  );
};

export default CustomDialog;
