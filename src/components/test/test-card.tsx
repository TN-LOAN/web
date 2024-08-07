import { HammerIcon, HouseIcon } from 'lucide-react';
import React, { useState } from 'react';

import CustomDialog from '@/components/common/customDialog';
import { cn } from '@/libs/utils';
import { LoanType } from '@/types/schema/loan';

import { Button } from '../common/button';
import { Card, CardContent, CardFooter, CardHeader } from '../common/card';
import { Dialog, DialogTrigger } from '../common/dialog';

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
  data: LoanType;
  isSelected: boolean;
  isComparing: boolean;
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
  data,
  isSelected,
  isComparing
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
    <>
      <Card className={cn(`transition-colors duration-300 ${isSelected ? 'border-2 border-emerald-400 bg-green-100' : 'bg-white'} ${isComparing && 'cursor-pointer'} `)} onClick={onClick}>
        <CardHeader className="font-bold">
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <img src={replaceProvider(provider)} alt={provider} className="h-10 w-10" />
              <div className="text-lg">{provider}</div>
            </div>
            <div>
              {data.loan.ltv_radio_detail.includes('110%') ? (
                <HammerIcon className="h-7 w-7" />
              ) : (
                <HouseIcon className="h-7 w-7" />
              )}
            </div>
          </div>
          <br />
          สินเชื่อ {title}
        </CardHeader>

        <CardContent className="text-lg">
          <div className="text-xl font-bold text-black">
            งวดผ่อนต่อเดือน:{' '}
            <span className="rounded-md bg-green-100 px-2 py-1 text-green-500">
              {Number(installment.toFixed(2)).toLocaleString()}
            </span>{' '}
            บาท{' '}
          </div>
          <div>อัตราดอกเบี้ยเฉลี่ย 3 ปี: {interestRate}%</div>
          <div>ประเภทสินเชื่อ: {loan_type}</div>
          <div>
            วงเงินกู้สูงสุด:{' '}
            {loanAmountProduct.toLocaleString() === '9,999,999,999'
              ? 'ไม่จำกัดวงเงิน'
              : loanAmountProduct.toLocaleString() + ' บาท'}{' '}
          </div>
          <div className="flex items-center justify-between">
            <div className={`${isRed ? 'text-red-500' : ''}`}>ระยะเวลากู้สูงสุด: {loanPeriodProduct} ปี</div>

            <div className="ml-auto w-fit rounded-lg bg-secondary px-4 py-1 text-end">
              MRTA: {mrta ? 'ต้องมีการสมัคร' : 'ไม่ต้องมีการสมัคร'}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'link'} className="text-lg">
                รายละเอียด
              </Button>
            </DialogTrigger>
            {data && <CustomDialog loanData={data.loan && data} />}
          </Dialog>
          <a href={data.loan.product_website} target="_blank">
            <Button className="w-full text-lg">สนใจ</Button>
          </a>
        </CardFooter>
      </Card>
    </>
  );
}
