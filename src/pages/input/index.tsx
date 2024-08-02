import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/common/button';
import { Checkbox } from '@/components/common/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';
import { Label } from '@/components/common/label';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/common/select';
import { useStrictForm } from '@/hooks/form-hook';
import { calculateLoanAmount } from '@/libs/calculateLoanAmount';
import { cn } from '@/libs/utils';
import { LoanFormDefaultValues, LoanFormSchema, LoanFormType } from '@/types/schema/loan';
import { ScrollArea } from '@/components/common/scroll';

function InputPage() {
  const form = useStrictForm(LoanFormSchema, LoanFormDefaultValues);
  const [loanAmountError, setLoanAmountError] = useState<string | null>(null);
  const [showLoanDetails, setShowLoanDetails] = useState<boolean>(false);
  const [calculatedLoanAmount, setCalculatedLoanAmount] = useState<number | null>(null);


  const onSubmit = (data: LoanFormType) => {
    const salary = form.getValues('salary');
    const debtexpenses = form.getValues('debtexpenses');
    const inputLoanAmount = form.getValues('loanAmount');

    const calculated = calculateLoanAmount(salary, debtexpenses);
    setCalculatedLoanAmount(calculated);

    if (inputLoanAmount > 0 && calculated < inputLoanAmount) {
      setLoanAmountError(`วงเงินกู้สูงสุดของคุณคือ ${calculated.toLocaleString()} บาท`);
      setShowLoanDetails(false);
    } else {
      setLoanAmountError(null);
      setShowLoanDetails(true);
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
      console.log(data);
    }
  };

  return (
    <PageLayout className="bg-background">
      <Navbar />
      <div className="mt-4 text-center">
        <h1 className="text-4xl font-bold">คำนวณวงเงินกู้สินเชื่อบ้าน</h1>
      </div>
      <div className="mb-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div
              className={cn(
                'mx-auto mt-2.5 grid h-[620px] w-[1065px] grid-cols-2 gap-x-4 gap-y-6 bg-white p-6',
                showLoanDetails ? 'rounded-t-lg' : 'rounded-lg',
              )}
            >
              {/* Form fields */}
              <div className="mx-auto h-[45px] w-full max-w-[343px]">
                <FormField
                  control={form.control}
                  name="career"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="color: rgb(190 24 93;">
                        อาชีพ <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger
                            className={`h-[45px] w-[343px] ${form.formState.errors.career ? 'border-destructive' : ''}`}
                          >
                            <SelectValue placeholder="กรุณาเลือกอาชีพของคุณ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>อาชีพ</SelectLabel>
                              <SelectItem value="office">พนักงานบริษัท</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full max-w-[343px]">
                <FormField
                  control={form.control}
                  name="debtexpenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ภาระหนี้สิ้นต่อเดือน (บาท)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="เช่น 1,000"
                          className={`h-[45px] w-[343px] ${form.formState.errors.debtexpenses ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className='text-xs text-gray-400 pt-1'>(รวมถึงสินเชื่อเพื่อการศึกษา, สินเชื่อรถยนต์, สินเชื่อส่วนบุคคล และอื่นๆ)</p>
              </div>

              <div className="mx-auto h-[45px] w-full max-w-[343px]">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        วัน/เดือน/ปีเกิด <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          placeholder="กรุณาเลือกวันเกิดของคุณ"
                          className={`h-[45px] w-[343px] ${form.formState.errors.dateOfBirth ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full max-w-[343px]">
                <FormField
                  control={form.control}
                  name="loanPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        ระยะเวลาในการกู้ (ปี) <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="เช่น 10"
                          className={`h-[45px] w-[343px] ${form.formState.errors.loanPeriod ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full max-w-[343px]">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        รายได้ต่อเดือน (บาท) <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="เช่น 10,000"
                          className={`h-[45px] w-[343px] ${form.formState.errors.salary ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full max-w-[343px]">
                <FormField
                  control={form.control}
                  name="loanAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        วงเงินกู้ (บาท) <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="เช่น 1,000,000" className="h-[45px] w-[343px]" />
                      </FormControl>
                      <FormMessage />
                      {loanAmountError && <p className="mt-2 text-sm text-destructive">{loanAmountError}</p>}
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full max-w-[343px]">
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                          <Label htmlFor="terms">ฉันยอมรับ</Label>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="link" className='text-blue-600 p-0'>ข้อตกลงและเงื่อนไข</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[675px] bg-white ">
                              <DialogHeader>
                                <DialogTitle className='text-xl'>ข้อตกลงและเงื่อนไขการใช้บริการเว็บแอปพลิเคชันคำนวณวงเงินกู้สินเชื่อบ้าน</DialogTitle>
                                <ScrollArea className="h-[300px]">
                                <p>1. ขอบเขตการให้บริการ</p>
                                <p>1.1 เว็บแอปนี้ให้บริการการคำนวณวงเงินกู้สินเชื่อบ้านตามหลักเกณฑ์ของธนาคารแห่งประเทศไทย (ธปอ.) โดยคำนวณตามข้อมูลที่ผู้ใช้ป้อนเข้ามา และไม่ถือว่าเป็นคำแนะนำทางการเงินที่เป็นทางการ </p>
                                <p>1.2 การคำนวณในเว็บแอปนี้มีวัตถุประสงค์เพื่อให้ผู้ใช้ได้รับข้อมูลเบื้องต้นเกี่ยวกับวงเงินกู้สินเชื่อบ้านเท่านั้น ผู้ใช้ควรปรึกษากับที่ปรึกษาการเงินหรือธนาคารที่เกี่ยวข้องสำหรับข้อมูลที่ถูกต้องและเป็นปัจจุบัน</p>
                                <p>2. ข้อมูลที่ต้องให้</p>
                                <p>2.1 ผู้ใช้จะต้องป้อนข้อมูลที่ถูกต้องและครบถ้วนตามที่กำหนดในเว็บแอป</p>
                                <p>2.2 ผู้ใช้มีหน้าที่รับผิดชอบต่อความถูกต้องของข้อมูลที่ป้อนเข้าในระบบ และจะต้องตรวจสอบข้อมูลดังกล่าวก่อนการใช้งาน</p>
                                <p>3. ข้อจำกัดความรับผิดชอบ</p>
                                <p>3.1 เว็บแอปนี้อาจมีข้อผิดพลาดหรือข้อมูลที่ไม่เป็นปัจจุบัน โดยการคำนวณและการแสดงผลที่ได้จากการใช้เว็บแอปนี้อาจไม่ตรงกับข้อกำหนดหรือข้อเสนอจริงจากธนาคาร</p>
                                <p>3.2 ผู้พัฒนาเว็บแอปจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้ข้อมูลที่ได้จากเว็บแอปนี้ รวมถึงแต่ไม่จำกัดเฉพาะความเสียหายทางการเงินหรือการสูญเสียทางธุรกิจ</p>
                                <p>4. การเปลี่ยนแปลง</p>
                                <p>4.1 ผู้พัฒนาสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดและเงื่อนไขนี้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า การเปลี่ยนแปลงจะมีผลทันทีเมื่อเผยแพร่บนเว็บไซต์</p>
                                <p>5. ความเป็นส่วนตัว</p>
                                <p>5.1 ข้อมูลที่ผู้ใช้ป้อนเข้าสู่ระบบจะถูกเก็บรักษาเป็นความลับและจะไม่ถูกเปิดเผยแก่บุคคลที่สาม นอกจากในกรณีที่จำเป็นต้องปฏิบัติตามกฎหมาย</p>
                                <p>5.2 ผู้ใช้ยอมรับว่าเว็บแอปอาจเก็บข้อมูลการใช้งานเพื่อปรับปรุงการให้บริการและประสบการณ์การใช้งาน</p>
                                <p>6. การยกเลิกและการปิดการใช้งาน</p>
                                <p>6.1 ผู้พัฒนาสงวนสิทธิ์ในการยกเลิกหรือปิดการใช้งานเว็บแอปตามดุลยพินิจ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</p>
                                <p>7. กฎหมายที่ใช้บังคับ</p>
                                <p>7.1 ข้อกำหนดและเงื่อนไขนี้จะถูกตีความและบังคับใช้ตามกฎหมายของราชอาณาจักรไทย</p>
                                </ScrollArea>
                              </DialogHeader>

                            </DialogContent>
                          </Dialog>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="col-span-2 mx-auto mt-0 h-[70px] w-[301px] text-2xl text-black"
                style={{ backgroundColor: '#1ECC83' }}
                disabled={!form.watch('acceptTerms')}
              >
                คำนวณ
              </Button>
            </div>
          </form>
        </Form>

        {showLoanDetails && (
          <div className="mx-auto h-[600px] w-[1065px] rounded-b-lg bg-white p-20 pt-0 text-center">
            <h2 className="text-4xl font-bold">รายละเอียดกู้สินเชื่อ</h2>
            <p className="mt-12 text-3xl">วงเงินกู้สูงสุด</p>
            <h3 className="mt-12 text-5xl font-bold text-primary">{calculatedLoanAmount?.toLocaleString()}</h3>
            <p className="mt-12 text-lg text-gray-400">หมายเหตุ: วงเงินที่คำนวนนี้เป็นเพียงการคำนวนเบื้องต้นเท่านั้น</p>
            <Link to="/eiei">
              <Button className="col-span-2 mx-auto mt-20 h-[70px] w-[301px] text-2xl text-black">ถัดไป</Button>
              <link rel="" href="/eiei" />
            </Link>
          </div>
        )}

      </div>
    </PageLayout>
  );
}

export default InputPage;
