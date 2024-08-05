import { cn } from '@/libs/utils';
import { Card, CardContent, CardFooter, CardHeader } from '../common/card';

type TestCardProps = {
  title: string;
  onClick?: () => void;
  interestRate: number;
  loanAmountProduct: number;
  loanPeriodProduct: number;
  isRed?: boolean;
  installment: number;
  provider: string;
  loan_type: string;
};

export default function ProductCard({ title,onClick, interestRate, loanAmountProduct, loanPeriodProduct, isRed = false, installment, provider, loan_type}: TestCardProps) {
  return (
    <Card className={cn('cursor-pointer transition-colors duration-300 hover:bg-primary/10')} onClick={onClick}>
      <CardHeader className='font-bold'>
        {provider}<br/>
        สินเชื่อ {title}
      </CardHeader>

      <CardContent>
      <p className='font-bold text-xl text-black'>งวดผ่อนต่อเดือน: <span className='text-green-500 bg-green-100 rounded-md py-1 px-2'>{Number(installment).toFixed(2)}</span> บาท </p>
      <p>อัตราดอกเบี้ย: {interestRate}%</p>
      <p>ประเภทสินเชื่อ: {loan_type}</p>
      <p>วงเงินกู้: {loanAmountProduct.toLocaleString()} บาท</p>
      <p className={`text-sm ${isRed ? 'text-red-500' : ''}`}>ระยะเวลากู้: {loanPeriodProduct} ปี</p>

      </CardContent>
      <CardFooter>
          <p className='text-blue-500 underline hover:text-blue-800'>รายละเอียด</p>
      </CardFooter>
    </Card>
  );
}
