import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
  return (
    
    <div
    className="flex flex-col items-start rounded-lg shadow-lg p-6 m-4 w-1/2"
    style={{ backgroundColor }} // ใช้ inline style สำหรับ backgroundColor
  >
    <div className="text-2xl font-bold mb-4 text-center w-full">
      <h2 >{title}</h2>
    </div>

      <div className="text-lg mb-2 text-left">ยอดเงินกู้</div>
      <div className="text-lg font-semibold mb-4 text-left">{amount} บาท</div>
      <div className="text-lg mb-2">ดอกเบี้ยต่อปี</div>
      <div className="text-lg font-semibold mb-4">{interestRate}%</div>
      <div className="text-lg mb-2">ระยะเวลาผ่อน(ปี)</div>
      <div className="text-lg font-semibold mb-4">{duration} ปี</div>
      <div className="text-lg mb-2">ยอดผ่อนต่อเดือน</div>
      <div className="text-lg font-semibold mb-4">{monthlyPayment} บาท</div>
      <div className="text-lg mb-2">ดอกเบี้ยรวม</div>
      <div className="text-lg font-semibold mb-4">{totalInterest} บาท</div>
      <div className="text-lg mb-2">ยอดสินเชื่อรวมดอกเบี้ย</div>
      <div className="text-lg font-semibold mb-4">{totalAmount} บาท</div>
      <div className="flex justify-end w-full hide-in-pdf">
        <button className="text-blue-500 mb-4 underline">รายละเอียดเพิ่มเติม</button>
      </div>
      <div className=" flex justify-center w-full hide-in-pdf">
      <button className="bg-green-500 text-black font-bold py-2 px-6 rounded-lg ">สนใจ</button>
      </div>
    </div>
    
      
  );
};

const ComparisonPage: React.FC = () => {
    const downloadPDF = () => {
        const input = document.getElementById('comparison-cards');
        
        document.querySelectorAll('.hide-in-pdf').forEach(element => {
          element.classList.add('hidden');
        });
    
        if (input) {
          html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const imgWidth = 297;
            
            const imgHeight = canvas.height * imgWidth / canvas.width;
    
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('comparison.pdf');
    
            
            document.querySelectorAll('.hide-in-pdf').forEach(element => {
              element.classList.remove('hidden');
            });
          }).catch((error) => {
            console.error('Error capturing the canvas:', error);
          });
        } else {
          console.error('Element with id "comparison-cards" not found');
        }
      };
  return (
    <PageLayout>
      <Navbar />
      <div className="flex justify-end w-full px-10 mt-6 mb-6">
        <button onClick={downloadPDF} className="bg-green-500 text-black font-bold py-2 px-4 rounded-lg">ดาวน์โหลด</button>
      </div>
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">เปรียบเทียบสินเชื่อ</h1>
      <div id="comparison-cards" className="flex justify-center w-full">
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
