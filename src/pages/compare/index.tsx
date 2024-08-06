import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';

import CustomDialog from '@/components/common/customDialog';
import { Dialog, DialogTrigger } from '@/components/common/dialog';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import LoanChart from '@/components/common/pie-chart';
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
  totalLoanWithInterest: number;
  interest: number;
  // amountLoanMaxClass: string;
  // interestRateClass: string;
  // installmentClass: string;
  // totalLoanWithInterestClass: string;
  // interestClass: string
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  amount,
  amountLoanMax,
  interestRate,
  duration,
  monthlyPayment,
  backgroundColor = 'white',
  data,
  interest,
  totalLoanWithInterest,
}) => {
  return (
    <>
      <div className="m-4 flex flex-col items-start rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 w-full text-center text-2xl font-bold">
          <h2 className="mb-4">{title}</h2>
          <div className="mb-2 text-xl">ยอดผ่อน / เดือน</div>
          <div className="mb-2 text-3xl font-bold text-green-500">
            {Number(monthlyPayment.toFixed(2)).toLocaleString()} บาท
          </div>
        </div>

        <div className="mb-4 grid w-full grid-cols-4">
          <div className="col-span-2 border-r-2">
            <div className="mb-2 text-left text-lg">ยอดเงินกู้ของคุณ</div>
            <div className="mb-4 text-left text-lg font-bold">{Number(amount).toLocaleString()} บาท</div>
            <div className="mb-2 text-left text-lg">ยอดเงินกู้สูงสุด</div>
            <div className="mb-4 text-left text-lg font-bold">{Number(amountLoanMax).toLocaleString()} บาท</div>
            <div className="mb-2 text-lg">อัตราดอกเบี้ยต่อปี</div>
            <div className="mb-4 text-left text-lg font-bold">{interestRate}%</div>
            <div className="mb-2 text-lg">ระยะเวลาผ่อน(ปี)</div>
            <div className="mb-4 text-lg font-bold">{duration} ปี</div>
            <div className="mb-2 text-lg">ดอกเบี้ยรวม</div>
            <div className="mb-4 text-left text-lg font-bold">{Number(interest.toFixed(2)).toLocaleString()} บาท</div>
            <div className="mb-2 text-lg">ยอดสินเชื่อรวมดอกเบี้ย</div>
            <div className="mb-4 text-left text-lg font-bold">
              {Number(totalLoanWithInterest.toFixed(2)).toLocaleString()} บาท
            </div>
          </div>

          <div className="col-span-2 mb-4 w-full justify-self-end">
            <LoanChart totalLoanWithInterest={totalLoanWithInterest} interest={interest} />
          </div>
        </div>

        <div className="hide-in-pdf flex w-full justify-center">
          <Dialog>
            <DialogTrigger className="hover:text-blue-700">รายละเอียดเพิ่มเติม</DialogTrigger>
            {data && <CustomDialog loanData={data} />}
          </Dialog>
        </div>

        <div className="hide-in-pdf flex w-full justify-center">
          <a href={data.loan.product_website} target="_blank">
            <button className="rounded-lg bg-green-500 px-6 py-2 font-bold text-white hover:bg-green-700">สนใจ</button>
          </a>
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
        {data && data.length > 0 ? (
          <>
            <div className="container relative mt-6 flex w-full items-center justify-center">
              <h1 className="text-center text-3xl font-bold">เปรียบเทียบสินเชื่อ</h1>
              <button
                onClick={downloadPDF}
                className="absolute right-20 top-0 rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
              >
                ดาวน์โหลดรายการเปรียบเทียบ
              </button>
            </div>
            <div className="container mx-auto py-10">
              <div className="flex w-full" id="comparison-cards">
                {data.map((item, index) => {
                  // // Determine max and min credit_maximum values
                  // const maxCredit = Math.max(...data.map(d => d.data.loan.credit_maximum));
                  // const minCredit = Math.min(...data.map(d => d.data.loan.credit_maximum));
                  // const creditMax = item.data.loan.credit_maximum;

                  // // Determine max and min interest_rate_average values
                  // const maxInterestRate = Math.max(...data.map(d => d.data.loan.interest_rate_average));
                  // const minInterestRate = Math.min(...data.map(d => d.data.loan.interest_rate_average));
                  // const interestRate = item.data.loan.interest_rate_average;

                  // // Determine max and min installment values
                  // const maxInstallment = Math.max(...data.map(d => d.data.installment));
                  // const minInstallment = Math.min(...data.map(d => d.data.installment));
                  const installment = item.data.installment;

                  const totalLoanWithInterest = installment * form.loanPeriod * 12;
                  const interest = totalLoanWithInterest - form.loanAmount;

                  // // Determine max and min totalLoanWithInterest values
                  // const maxTotalLoanWithInterest = Math.max(...data.map(d => d.data.installment * form.loanPeriod * 12));
                  // const minTotalLoanWithInterest = Math.min(...data.map(d => d.data.installment * form.loanPeriod * 12));

                  // // Determine max and min Interest values
                  // const maxInterest = Math.max(...data.map(d => (d.data.installment * form.loanPeriod * 12) - form.loanAmount));
                  // const minInterest = Math.min(...data.map(d => (d.data.installment * form.loanPeriod * 12) - form.loanAmount));

                  return (
                    <div key={index} className="w-1/2">
                      <ComparisonCard
                        data={item.data}
                        title={item.data.loan.product}
                        amount={form.loanAmount}
                        amountLoanMin={item.data.loan.credit_minimum.toString()}
                        amountLoanMax={item.data.loan.credit_maximum.toString()}
                        interestRate={item.data.loan.interest_rate_average.toString()}
                        duration={form.loanPeriod}
                        monthlyPayment={item.data.installment}
                        totalLoanWithInterest={totalLoanWithInterest}
                        interest={interest}
                        totalInterest="xxx"
                        totalAmount="xxx"
                        // backgroundColor={index === 1 ? "#CAF6E3" : "white"}
                        // Applying conditional text color
                        // amountLoanMaxClass={
                        //   creditMax === maxCredit ? 'mb-2 text-left text-lg font-bold text-green-500 bg-green-200 rounded-md px-2 py-1 ' : creditMax === minCredit ? 'mb-2 text-left text-lg font-bold text-red-500 bg-red-100 rounded-md px-2 py-1 ' : 'mb-2 text-left text-lg font-bold text-gray-500 bg-gray-200 rounded-md px-2 py-1 '
                        // }
                        // interestRateClass={
                        //   interestRate === maxInterestRate ? 'mb-2 text-left text-lg font-bold text-red-500 bg-red-100 rounded-md px-2 py-1  ' : interestRate === minInterestRate ? 'mb-2 text-left text-lg font-bold text-green-500 bg-green-200 rounded-md px-2 py-1 ' : 'mb-2 text-left text-lg font-bold text-gray-500 bg-gray-200 rounded-md px-2 py-1 '
                        // }
                        // installmentClass={
                        //   installment === maxInstallment ? 'mb-2 text-3xl font-bold text-red-500 bg-red-100 rounded-md px-2 py-5' : installment === minInstallment ? 'mb-2 text-3xl font-bold text-green-500 bg-green-200 rounded-md px-2 py-5 ' : 'mb-2 text-left text-lg font-bold text-gray-500 bg-gray-200 rounded-md px-2 py-5 '
                        // }
                        // totalLoanWithInterestClass={
                        //   totalLoanWithInterest === maxTotalLoanWithInterest ? 'mb-2 text-lg font-bold text-red-500 bg-red-100 rounded-md px-2 py-1' : totalLoanWithInterest === minTotalLoanWithInterest ? 'mb-2 text-lg font-bold text-green-500 bg-green-200 rounded-md px-2 py-1 ' : 'mb-2 text-left text-lg font-bold text-gray-500 bg-gray-200 rounded-md px-2 py-1 '
                        // }
                        // interestClass={
                        //   Interest === maxInterest ? 'mb-2 text-lg font-bold text-red-500 bg-red-100 rounded-md px-2 py-1' : Interest === minInterest ? 'mb-2 text-lg font-bold text-green-500 bg-green-200 rounded-md px-2 py-1 ' : 'mb-2 text-left text-lg font-bold text-gray-500 bg-gray-200 rounded-md px-2 py-1 '
                        // }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <p className="mb-4 mt-4 text-2xl font-bold text-gray-600">ไม่มีผลิตภัณฑ์ที่เปรียบเทียบ</p>
          </div>
        )}
      </PageLayout>
    </>
  );
};

export default ComparePage;
