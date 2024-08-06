import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import { ScrollArea } from '@/components/common/scroll';
import { LoanType } from '@/types/schema/loan';

interface CustomDialogProps {
  loanData: LoanType;
}

const interestRateDetail = `ปีที่ 1 : 2.49%\nปีที่ 2 : 4.00%\nปีที่ 3 : 4.36%\nปีที่ 4 เป็นต้นไป : MRR-2.00%`;

const interestRates = interestRateDetail.split('\n').map((rate) => {
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
  const lines = detail
    .split('-')
    .map((line) => line.trim())
    .filter((line) => line !== '');

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

const CustomDialog: React.FC<CustomDialogProps> = ({ loanData }) => {
  const imagePath = '/src/assets/logo';

  const replaceProvider = (provider: string) => {
    //use switch case to replace provider name with image
    switch (provider) {
      case 'กรุงไทย':
        return `${imagePath}/KTB.png`;
      case 'กรุงเทพ':
        return `${imagePath}/BBL.png`;
      case 'กสิกรไทย':
        return `${imagePath}/KBANK.png`;
      case 'ยูโอบี':
        return `${imagePath}/UOB.png`;
      case 'กรุงศรีอยุธยา':
        return `${imagePath}/BAY.png`;
      case 'เมกะ สากลพาณิชย์':
        return `${imagePath}/Mega.png`;
      case 'ธอส.':
        return `${imagePath}/GHB.png`;
      case 'ทิสโก้':
        return `${imagePath}/TISCO.png`;
      case 'ออมสิน':
        return `${imagePath}/GSB.png`;
      case 'แลนด์ แอนด์ เฮ้าส์':
        return `${imagePath}/LH.png`;
      case 'บค. เวิลด์':
        return `${imagePath}/World.png`;
      case 'อินเดียนโอเวอร์ซีส์':
        return `${imagePath}/Indian.png`;
      case 'ไทยเครดิต':
        return `${imagePath}/TCR.png`;
      case 'บค. แคปปิตอล ลิ้งค์':
        return `${imagePath}/CApital Link.png`;
      case 'บง. แอ็ดวานซ์':
        return `${imagePath}/Advance.png`;
      case 'ทหารไทยธนชาต':
        return `${imagePath}/TTB.png`;
      case 'บค. เอสเบ':
        return `${imagePath}/SBEY.png`;
      case 'เกียรตินาคินภัทร':
        return `${imagePath}/KK.png`;
      case 'ธ.ก.ส.':
        return `${imagePath}/BAAC.png`;
      case 'ไอซีบีซี (ไทย)':
        return `${imagePath}/ICBC.png`;
      case 'ไทยพาณิชย์':
        return `${imagePath}/SCB.png`;
      default:
        return `${imagePath}/default.png`;
    }
  };

  const [internalEvaluator, externalEvaluator] = loanData.loan.fee.split('ผู้ประเมินภายนอก');
  return (
    <DialogContent className="h-3/4 bg-white sm:max-w-[675px]">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <img src={replaceProvider(loanData.loan.provider)} alt={loanData.loan.provider} className="h-10 w-10" />
          <DialogTitle className="text-xl">ธนาคาร {loanData.loan.provider}</DialogTitle>
        </div>
        <h2>{loanData.loan.product}</h2>
      </DialogHeader>
      <ScrollArea className="h-full">
        {/* ข้อมูลการผ่อนชำระ */}
        <div className="mb-4 space-y-1">
          <h3>ข้อมูลการผ่อนชำระ</h3>
          <p>
            งวดผ่อนชำระต่อเดือน: <span className=" ">{loanData.installment.toFixed(2)} บาท/เดือน</span>
          </p>
          <p>อัตราดอกเบี้ยเฉลี่ย 3 ปี: {loanData.loan.interest_rate_average}%</p>
          {/* <p>อัตราดอกเบี้ยในแต่ละปี: {loanData.loan.interest_rate_detail}</p> */}
          <div className="mb-4">
            <h3>อัตราดอกเบี้ยในแต่ละปี:</h3>
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
          <p>
            {loanData.loan.age_maximum == 10000 ? (
              <p>อายุผู้กู้: 20 ปีขึ้นไป</p>
            ) : (
              <>
                <p>
                  อายุผู้กู้: {loanData.loan.age_minimum} - {loanData.loan.age_maximum} ปี
                </p>
              </>
            )}
          </p>
          <p>รายได้ขั้นต่ำ: {loanData.loan.employee_income_minimum} บาท</p>
          <p>รายได้ผู้ประกอบอาชีพอิสระ: {loanData.loan.freelance_income_minimum} บาท</p>
          <p>
            เงื่อนไขในการสมัคร:
            <LoanLTVRatio detail={loanData.loan.register_condition} />
          </p>
        </div>

        {/* ข้อมูลเงื่อนไขเพิ่มเติม */}
        <div className="mb-4 space-y-1">
          <h3 className="font-bold">ข้อมูลวงเงินสินเชื่อ</h3>
          <p>วงเงินสินเชื่อขั้นต่ำ: {loanData.loan.credit_minimum} บาท</p>
          <p>
            {' '}
            วงเงินสินเชื่อสูงสุด:{' '}
            {loanData.loan.credit_maximum === 9999999999 ? 'ไม่จำกัดวงเงิน' : `${loanData.loan.credit_maximum} บาท`}
          </p>
          <p>
            อัตราส่วนเงินให้สินเชื่อต่อมูลค่าหลักประกัน (LTV ratio):
            <LoanLTVRatio detail={loanData.loan.ltv_radio_detail} />
          </p>
          <p>ระยะเวลาการกู้ยืม: {loanData.loan.period_maximum} ปี</p>
        </div>

        {/* ข้อมูลค่าธรรมเนียม */}
        <div className="mb-4 space-y-1">
          <h3 className="font-bold">ข้อมูลค่าธรรมเนียม</h3>
          <p>ค่าธรรมเนียม MRTA: {loanData.loan.mrta_detail}</p>
          <div>
            <p>ค่าสำรวจและประเมินหลักประกัน:</p>
            <div>{internalEvaluator.trim()}</div>
            <div>ผู้ประเมินภายนอก: {externalEvaluator.trim()}</div>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default CustomDialog;
