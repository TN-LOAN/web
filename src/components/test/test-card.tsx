import { cn } from '@/libs/utils';

import { Button } from '../common/button';
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

  return (
    <Card className={cn('cursor-pointer transition-colors duration-300 hover:bg-primary/10')} onClick={onClick}>
      <CardHeader className="font-bold">
        <div className="flex items-center gap-2">
          <img src={replaceProvider(provider)} alt={provider} className="h-10 w-10" />
          <div className="text-lg">{provider}</div>
        </div>
        <br />
        สินเชื่อ {title}
      </CardHeader>

      <CardContent className="text-lg">
        <p className="text-xl font-bold text-black">
          งวดผ่อนต่อเดือน:{' '}
          <span className="rounded-md bg-green-100 px-2 py-1 text-green-500">{Number(installment).toFixed(2)}</span> บาท{' '}
        </p>
        <p>อัตราดอกเบี้ย: {interestRate}%</p>
        <p>ประเภทสินเชื่อ: {loan_type}</p>
        <p>วงเงินกู้: {loanAmountProduct.toLocaleString()} บาท</p>
        <p className={`${isRed ? 'text-red-500' : ''}`}>ระยะเวลากู้: {loanPeriodProduct} ปี</p>

        <p>Mrta {mrta ? 'มี' : 'ไม่มี'}</p>
      </CardContent>
      <CardFooter>
        <Button>รายละเอียด</Button>
      </CardFooter>
    </Card>
  );
}
