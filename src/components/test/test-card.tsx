import { cn } from '@/libs/utils';
import { calculateMonthlyInstallment } from '@/libs/calculateInstallment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../common/card';

type TestCardProps = {
  title: string;
  onClick?: () => void;
  interestRate: number;
  loanAmountProduct: number;
  loanPeriodProduct: number;
  isRed?: boolean;
  installment: number;
};

export default function TestCard({ title, onClick, interestRate, loanAmountProduct, loanPeriodProduct, isRed = false, installment,}: TestCardProps) {
  const monthlyInstallment = calculateMonthlyInstallment(installment, interestRate);
  return (
    <Card className={cn('cursor-pointer transition-colors duration-300 hover:bg-primary/10')} onClick={onClick}>
      <CardHeader className='font-bold'>
        สินเชื่อ {title}
        <CardDescription>This is a test card</CardDescription>
      </CardHeader>

      <CardContent>
      <p>อัตราดอกเบี้ย: {interestRate}%</p>
      <p>วงเงินกู้: {loanAmountProduct.toLocaleString()} บาท</p>
      <p className={`text-sm ${isRed ? 'text-red-500' : ''}`}>ระยะเวลากู้: {loanPeriodProduct} ปี</p>

      </CardContent>
      <CardFooter>
      <p>งวดผ่อนต่อเดือน: {monthlyInstallment} บาท</p>
      </CardFooter>
    </Card>
  );
}
