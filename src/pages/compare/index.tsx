import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';

import CustomDialog from '@/components/common/customDialog';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { useCompareStore } from '@/libs/compareStore';
import { useLoanFormStore } from '@/libs/loanFormStore';
import { LoanResponseType, LoanType } from '@/types/schema/loan';

interface ComparisonCardProps {
  title: string;
  amount: number;
  amountLoanMin: string,
  amountLoanMax: string,
  interestRate: string;
  duration:number;
  monthlyPayment: number;
  totalInterest: string;
  totalAmount: string;
  backgroundColor?: string;
  data: LoanType
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  amount,
  amountLoanMin,
  amountLoanMax,
  interestRate,
  duration,
  monthlyPayment,
  backgroundColor = 'white',
  data
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const totalLoanWithInterest = monthlyPayment * duration * 12
  const Interest = totalLoanWithInterest - amount
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    
    <>
      <div className="m-4 flex  flex-col items-start rounded-lg p-6 shadow-lg" style={{ backgroundColor }}>
      <div className="mb-4 w-full text-center text-2xl font-bold">
        <h2 className='mb-4 '>{title}</h2>
        <div className="mb-2 text-xl">ยอดผ่อน / เดือน</div>
        <div className="mb-4 text-3xl font-bold text-primary">{monthlyPayment.toFixed(2)} บาท</div>
      </div>
      <div>

      </div>

      <div className="mb-2 text-left text-lg">ยอดเงินกู้ของคุณ</div>
      <div className="mb-4 text-left text-lg font-semibold">{amount.toFixed(2)} บาท</div>
      <div className="mb-2 text-left text-lg">ยอดเงินกู้ของสินเชื่อ</div>
      <div className="mb-4 text-left text-lg font-semibold">{amountLoanMin} บาท - {amountLoanMax} บาท</div>
      <div className="mb-2 text-lg">อัตราดอกเบี้ยต่อปี</div>
      <div className="mb-4 text-lg font-semibold">{interestRate}%</div>
      <div className="mb-2 text-lg">ระยะเวลาผ่อน(ปี)</div>
      <div className="mb-4 text-lg font-semibold">{duration} ปี</div>
      <div className="mb-2 text-lg">ดอกเบี้ยรวม</div>
      <div className="mb-4 text-lg font-semibold">{Interest.toFixed(2)} บาท</div>
      <div className="mb-2 text-lg">ยอดสินเชื่อรวมดอกเบี้ย</div>
      <div className="mb-4 text-lg font-semibold">{totalLoanWithInterest.toFixed(2)} บาท</div>

      <div className="hide-in-pdf flex w-full justify-end">
        <button className="mb-4 text-blue-500 underline" onClick={handleOpenDialog}>
          รายละเอียดเพิ่มเติม
        </button>

        <CustomDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          loanData={data}
        />
      </div>  

      <div className="hide-in-pdf flex w-full justify-center">
        <button className="rounded-lg bg-green-500 px-6 py-2 font-bold text-black">สนใจ</button>
      </div>
    </div>
    </>
  );
};

const ComparePage: React.FC = () => {
  const { selectedItems} = useCompareStore();
  const [data, setData] = useState(selectedItems)
  const { formData} = useLoanFormStore();
  const [form, setForm] = useState(formData)
  


  const downloadPDF = () => {
    const input = document.getElementById('comparison-cards');

    document.querySelectorAll('.hide-in-pdf').forEach((element) => {
      element.classList.add('hidden');
    });

    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape', 'mm', 'a4');
          const imgWidth = 297;

          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('comparison.pdf');

          document.querySelectorAll('.hide-in-pdf').forEach((element) => {
            element.classList.remove('hidden');
          });
        })
        .catch((error) => {
          console.error('Error capturing the canvas:', error);
        });
    } else {
      console.error('Element with id "comparison-cards" not found');
    }
  };
  return (
    <>
    
    <PageLayout>
      <Navbar />
      <div className="container flex items-center relative justify-center mt-6 w-full  ">
      <h1 className=" text-center text-3xl font-bold">เปรียบเทียบสินเชื่อ</h1>
        <button onClick={downloadPDF} className="absolute right-20 top-0  rounded-lg bg-green-500 px-4 py-2 font-bold text-black hover:bg-green-700 ">
          ดาวน์โหลด
        </button>
      </div>
      <div className="container mx-auto py-10">
        <div className='flex w-full'> 
      { data && data.length > 0 ? (
        <>
        {data.map((data, index) => (
        <div key={index} id="comparison-cards" className="w-1/2 ">
          <ComparisonCard
            data={data.data}
            title={data.data.loan.product}
            amount={form.loanAmount}
            amountLoanMin={data.data.loan.credit_minimum.toString()}
            amountLoanMax={data.data.loan.credit_maximum.toString()}
            interestRate={data.data.loan.interest_rate_average.toString()}
            duration={form.loanPeriod}
            monthlyPayment={data.data.installment}
            totalInterest="xxx"
            totalAmount="xxx"
            backgroundColor={index == 1 ?"#CAF6E3": "white" }

          />
          {/* <ComparisonCard
            title={data.data.loan.product}
            amount="1,500,000"
            interestRate="4"
            duration="4"
            monthlyPayment="xxx"
            totalInterest="xxx"
            totalAmount="xxx"
            backgroundColor="#CAF6E3"
          /> */}
        </div>
          ))}
          </>
        ) : (
          <p className="mb-4 text-gray-600 flex justify-center">ไม่มีผลิตภัณฑ์ที่ค้นหา</p>
      )}
          </div>
          
      </div>
    </PageLayout>
  </>
  );
};

export default ComparePage;
