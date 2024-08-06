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
  mrta?: boolean;
  provider: string;
  loan_type: string;
};

export default function ProductCard({
  mrta,
  title,
  onClick,
  interestRate,
  loanAmountProduct,
  loanPeriodProduct,
  isRed = false,
  installment,
  provider,
  loan_type,
}: TestCardProps) {
  return (
    <Card className={cn('cursor-pointer transition-colors duration-300 hover:bg-primary/10')} onClick={onClick}>
      <CardHeader className="font-bold">
        {provider}
        <br />
        สินเชื่อ {title}
      </CardHeader>

      <CardContent>
        <p className="text-xl font-bold text-black">
          งวดผ่อนต่อเดือน:{' '}
          <span className="rounded-md bg-green-100 px-2 py-1 text-green-500">{Number(installment).toFixed(2)}</span> บาท{' '}
        </p>
        <p>อัตราดอกเบี้ย: {interestRate}%</p>
        <p>ประเภทสินเชื่อ: {loan_type}</p>
        <p>วงเงินกู้: {loanAmountProduct.toLocaleString()} บาท</p>
        <p className={`text-sm ${isRed ? 'text-red-500' : ''}`}>ระยะเวลากู้: {loanPeriodProduct} ปี</p>

        <p>Mrta {mrta ? 'มี' : 'ไม่มี'}</p>
      </CardContent>
      <CardFooter>
        <p className="text-blue-500 underline hover:text-blue-800">รายละเอียด</p>
      </CardFooter>
    </Card>
  );
}
