import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';

import CustomDialog from '@/components/common/customDialog';
import { Dialog, DialogTrigger } from '@/components/common/dialog';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { useCompareStore } from '@/libs/compareStore';
import { useLoanFormStore } from '@/libs/loanFormStore';
import { LoanResponseType, LoanType } from '@/types/schema/loan';

interface ComparisonCardProps {
  title: string;
  amount: number;
  amountLoanMin: string;
  amountLoanMax: string;
  interestRate: string;
  duration: number;
  monthlyPayment: number;
  totalInterest: string;
  totalAmount: string;
  backgroundColor?: string;
  data: LoanType;
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
  data,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const totalLoanWithInterest = monthlyPayment * duration * 12;
  const Interest = totalLoanWithInterest - amount;
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  

  return (
    <>
      <div className="m-4 flex flex-col items-start rounded-lg p-6 shadow-lg" style={{ backgroundColor }}>
        <div className="mb-4 w-full text-center text-2xl font-bold">
          <h2 className="mb-4">{title}</h2>
          <div className="mb-2 text-xl">ยอดผ่อน / เดือน</div>
          <div className="mb-4 text-3xl font-bold text-primary">{monthlyPayment.toFixed(2)} บาท</div>
        </div>
        <div></div>

        <div className="mb-2 text-left text-lg">ยอดเงินกู้ของคุณ</div>
        <div className="mb-4 text-left text-lg font-semibold">{amount.toFixed(2)} บาท</div>
        <div className="mb-2 text-left text-lg">ยอดเงินกู้ของสินเชื่อ</div>
        <div className="mb-4 text-left text-lg font-semibold">
          {amountLoanMin} บาท - {amountLoanMax} บาท
        </div>
        <div className="mb-2 text-lg">อัตราดอกเบี้ยต่อปี</div>
        <div className="mb-4 text-lg font-semibold">{interestRate}%</div>
        <div className="mb-2 text-lg">ระยะเวลาผ่อน(ปี)</div>
        <div className="mb-4 text-lg font-semibold">{duration} ปี</div>
        <div className="mb-2 text-lg">ดอกเบี้ยรวม</div>
        <div className="mb-4 text-lg font-semibold">{Interest.toFixed(2)} บาท</div>
        <div className="mb-2 text-lg">ยอดสินเชื่อรวมดอกเบี้ย</div>
        <div className="mb-4 text-lg font-semibold">{totalLoanWithInterest.toFixed(2)} บาท</div>

        <div className="hide-in-pdf flex w-full justify-end underline text-blue-500 ">
          <Dialog>
            <DialogTrigger className='hover:text-blue-700'>รายละเอียดเพิ่มเติม</DialogTrigger>
            {data && <CustomDialog loanData={data} />}
          </Dialog>
        </div>

        <div className="hide-in-pdf flex w-full justify-center">
          <button className="rounded-lg bg-green-500 px-6 py-2 font-bold text-black">สนใจ</button>
        </div>
      </div>
    </>
  );
};

const ComparePage: React.FC = () => {
  const { selectedItems } = useCompareStore();
  const [data, setData] = useState(selectedItems);
  const { formData } = useLoanFormStore();
  const [form, setForm] = useState(formData);

  const downloadPDF = () => {
    const input = document.getElementById('comparison-cards');

    document.querySelectorAll('.hide-in-pdf').forEach((element) => {
      element.classList.add('hidden');
    });

    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

// Create a new jsPDF instance with landscape orientation
const pdf = new jsPDF('landscape', 'mm', 'a4');

// Define the A4 page size in mm for landscape orientation
const pageWidth = 297; // A4 width in mm
const pageHeight = 210; // A4 height in mm

// Calculate image dimensions
const imgWidth = pageWidth; // Set image width to page width
let imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate proportional height

// Adjust the image height to fit the page if it exceeds the page height
if (imgHeight > pageHeight) {
    // Scale down the image to fit the page height
    imgHeight = (canvas.height * pageHeight) / canvas.width;
}

// Add the image to the PDF
pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

// Save the PDF
pdf.save('document.pdf');

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
        <div className="container relative mt-6 flex w-full items-center justify-center">
          <h1 className="text-center text-3xl font-bold">เปรียบเทียบสินเชื่อ</h1>
          <button
            onClick={downloadPDF}
            className="absolute right-20 top-0 rounded-lg bg-green-500 px-4 py-2 font-bold text-black hover:bg-green-700"
          >
            ดาวน์โหลด
          </button>
        </div>
        <div className="container mx-auto py-10">
          <div className="flex w-full" id="comparison-cards">
            {data && data.length > 0 ? (
              <>
                {data.map((data, index) => (
                  <div key={index}  className="w-1/2">
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
                      backgroundColor={index == 1 ? '#CAF6E3' : 'white'}
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
              <p className="mb-4 flex justify-center text-gray-600">ไม่มีผลิตภัณฑ์ที่ค้นหา</p>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default ComparePage;
