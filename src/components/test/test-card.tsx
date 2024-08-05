import { cn } from '@/libs/utils';
import { Card, CardContent, CardFooter, CardHeader } from '../common/card';

type TestCardProps = {
  title: string;
  provider: string;
  onClick?: () => void;
  interestRate: number;
  loanAmountProduct: number;
  loanPeriodProduct: number;
  isRed?: boolean;
  installment: number;
};

export default function ProductCard({ title, provider,onClick, interestRate, loanAmountProduct, loanPeriodProduct, isRed = false, installment,}: TestCardProps) {
  return (
    <Card className={cn('cursor-pointer transition-colors duration-300 hover:bg-primary/10')} onClick={onClick}>
      <CardHeader className='font-bold'>
        สินเชื่อ {title}
      </CardHeader>

      <CardContent>
      <p>ธนาคาร: {provider}</p>
      <p className='font-bold text-xl text-black'>งวดผ่อนต่อเดือน: {Number(installment).toFixed(2)} บาท </p>
      <p>อัตราดอกเบี้ย: {interestRate}%</p>
      <p>วงเงินกู้: {loanAmountProduct.toLocaleString()} บาท</p>
      <p className={`text-sm ${isRed ? 'text-red-500' : ''}`}>ระยะเวลากู้: {loanPeriodProduct} ปี</p>

      </CardContent>
      <CardFooter>
          <p className='text-blue-500 underline hover:text-blue-800'>รายละเอียด</p>
      </CardFooter>
    </Card>
  );
}
