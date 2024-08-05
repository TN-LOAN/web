import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState } from 'react';

import CustomDialog from '@/components/common/customDialog';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';

interface ComparisonCardProps {
  title: string;
  amount: string;
  interestRate: string;
  duration: string;
  monthlyPayment: string;
  totalInterest: string;
  totalAmount: string;
  backgroundColor?: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  amount,
  interestRate,
  duration,
  monthlyPayment,
  totalInterest,
  totalAmount,
  backgroundColor = 'white',
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="m-4 flex w-1/2 flex-col items-start rounded-lg p-6 shadow-lg" style={{ backgroundColor }}>
      <div className="mb-4 w-full text-center text-2xl font-bold">
        <h2>{title}</h2>
      </div>

      <div className="mb-2 text-left text-lg">ยอดเงินกู้</div>
      <div className="mb-4 text-left text-lg font-semibold">{amount} บาท</div>
      <div className="mb-2 text-lg">ดอกเบี้ยต่อปี</div>
      <div className="mb-4 text-lg font-semibold">{interestRate}%</div>
      <div className="mb-2 text-lg">ระยะเวลาผ่อน(ปี)</div>
      <div className="mb-4 text-lg font-semibold">{duration} ปี</div>
      <div className="mb-2 text-lg">ยอดผ่อนต่อเดือน</div>
      <div className="mb-4 text-lg font-semibold">{monthlyPayment} บาท</div>
      <div className="mb-2 text-lg">ดอกเบี้ยรวม</div>
      <div className="mb-4 text-lg font-semibold">{totalInterest} บาท</div>
      <div className="mb-2 text-lg">ยอดสินเชื่อรวมดอกเบี้ย</div>
      <div className="mb-4 text-lg font-semibold">{totalAmount} บาท</div>

      <div className="hide-in-pdf flex w-full justify-end">
        <button className="mb-4 text-blue-500 underline" onClick={handleOpenDialog}>
          รายละเอียดเพิ่มเติม
        </button>

        <CustomDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          title={title}
          bankName="XYZ Bank"
          loanAmount={amount}
          interestRate={interestRate.toString()}
        />
      </div>

      <div className="hide-in-pdf flex w-full justify-center">
        <button className="rounded-lg bg-green-500 px-6 py-2 font-bold text-black">สนใจ</button>
      </div>
    </div>
  );
};

const ComparisonPage: React.FC = () => {
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
    <PageLayout>
      <Navbar />
      <div className="mb-6 mt-6 flex w-full justify-end px-10">
        <button onClick={downloadPDF} className="rounded-lg bg-green-500 px-4 py-2 font-bold text-black">
          ดาวน์โหลด
        </button>
      </div>
      <div className="container mx-auto py-10">
        <h1 className="mb-10 text-center text-3xl font-bold">เปรียบเทียบสินเชื่อ</h1>
        <div id="comparison-cards" className="flex w-full justify-center">
          <ComparisonCard
            title="สินเชื่อ A"
            amount="1,000,000"
            interestRate="3"
            duration="3"
            monthlyPayment="xxx"
            totalInterest="xxx"
            totalAmount="xxx"
          />
          <ComparisonCard
            title="สินเชื่อ B"
            amount="1,500,000"
            interestRate="4"
            duration="4"
            monthlyPayment="xxx"
            totalInterest="xxx"
            totalAmount="xxx"
            backgroundColor="#CAF6E3"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ComparisonPage;
