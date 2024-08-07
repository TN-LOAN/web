import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/button';
import { Checkbox } from '@/components/common/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/common/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';
import { Label } from '@/components/common/label';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { ScrollArea } from '@/components/common/scroll';
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
import { useLoanFormStore } from '@/libs/loanFormStore';
import { cn } from '@/libs/utils';
import { LoanFormSchema, LoanFormType } from '@/types/schema/loan';

function InputPage() {
  const navigate = useNavigate();
  const { formData, setFormData, resetFormData } = useLoanFormStore();
  const form = useStrictForm(LoanFormSchema, formData);
  const [loanAmountError, setLoanAmountError] = useState<string | null>(null);
  const [, setCalculatedLoanAmount] = useState<number | null>(null);

  useEffect(() => {
    resetFormData();
  }, [resetFormData]);

  const onSubmit = (data: LoanFormType) => {
    const salary = form.getValues('salary');
    const debtexpenses = form.getValues('debtexpenses');
    const inputLoanAmount = form.getValues('loanAmount');
    const dateOfBirthString = form.getValues('dateOfBirth');
    const loanPeriod = parseInt(form.getValues('loanPeriod') as unknown as string, 10);

    const dateOfBirth = new Date(dateOfBirthString);
    const yearOfBirth = dateOfBirth.getFullYear();

    if (isNaN(yearOfBirth)) {
      console.error('Invalid dateOfBirth:', dateOfBirthString);
      return; 
    }

    const ageLimit = 2024 - yearOfBirth + loanPeriod;
  
    const calculated = calculateLoanAmount(salary, debtexpenses, loanPeriod);
    setCalculatedLoanAmount(calculated);
  
    if (yearOfBirth < 1963 || yearOfBirth > 2005) {
      form.setError('dateOfBirth', {
        type: 'manual',
        message: 'อายุของคุณไม่อยู่ในเกณฑ์',
      });
      return;
    } else {
      form.clearErrors('dateOfBirth');
    }
  
    if (ageLimit > 70) {
      form.setError('loanPeriod', {
        type: 'manual',
        message: 'ระยะเวลาในการกู้ของคุณไม่อยู่ในเกณฑ์',
      });
      return;
    } else {
      form.clearErrors('loanPeriod');
    }
  
    if (inputLoanAmount > 0 && calculated < inputLoanAmount  && calculated > 0) {
      setLoanAmountError(`วงเงินกู้สูงสุดของคุณคือ ${calculated.toLocaleString()} บาท \nกรุณาปรับลดวงเงินกู้หรือเพิ่มระยะเวลากู้`);
  }
  
    else if ( salary*0.4 < debtexpenses) {
      setLoanAmountError(`เนื่องจากภาระหนี้สินของท่านเกิน 40% ของรายได้ จึงไม่สามารถคำนวณวงเงินให้ท่านได้`);
    } else {
      setLoanAmountError(null);
      setFormData(data);
      navigate('/product');
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
            <div className={cn('mx-auto mt-2.5 grid h-max w-11/12 grid-cols-2 gap-x-4 gap-y-6 bg-white p-6 rounded-md')}>
              {/* Form fields */}
              <div className="mx-auto h-[45px] w-full">
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
                            className={`h-[45px] w-full ${form.formState.errors.career ? 'border-destructive' : ''}`}
                          >
                            <SelectValue placeholder="กรุณาเลือกอาชีพของคุณ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>อาชีพ</SelectLabel>
                              <SelectItem value="พนักงานบริษัท">พนักงานบริษัท</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full">
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
                          className={`h-[45px] w-full ${form.formState.errors.debtexpenses ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="pt-1 text-xs text-gray-400 flex justify-end">
                  (รวมถึงสินเชื่อเพื่อการศึกษา, สินเชื่อรถยนต์, สินเชื่อส่วนบุคคล และอื่นๆ)
                </p>
              </div>

              <div className="mx-auto h-[45px] w-full mt-12 relative">
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
                          className={`h-[45px] w-full ${form.formState.errors.dateOfBirth ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className=" text-xs text-gray-400 right-0  top-20 absolute">
                  ยกตัวอย่างเช่น 01/08/1999
                </p>
              </div>

              <div className="mx-auto h-[45px] w-full mt-12">
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
                          className={`h-[45px] w-full ${form.formState.errors.loanPeriod ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full mt-12">
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
                          className={`h-[45px] w-full ${form.formState.errors.salary ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full mt-12">
                <FormField
                  control={form.control}
                  name="loanAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        วงเงินกู้ (บาท) <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="เช่น 1,000,000"
                          className={`h-[45px] w-full ${form.formState.errors.loanAmount ? 'border-destructive' : ''}`}
                        />
                      </FormControl>
                      <FormMessage />
                      {/* {loanAmountError && <p className="mt-2 text-sm text-destructive">{loanAmountError}</p>} */}
                    </FormItem>
                  )}
                />
              </div>

              <div className="mx-auto h-[45px] w-full mt-6">
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
                              <Button variant="link" className="p-0 text-blue-600">
                                ข้อตกลงและเงื่อนไข
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="min-w-[50%] bg-white">
                              <DialogHeader>
                                <DialogTitle className="text-xl">
                                  ข้อตกลงและเงื่อนไขการใช้บริการเว็บแอปพลิเคชันคำนวณวงเงินกู้สินเชื่อบ้าน
                                </DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="h-[450px] px-4">
                                <p>1. ขอบเขตการให้บริการ</p>
                                <p>
                                  1.1 เว็บแอปนี้ให้บริการการคำนวณวงเงินกู้สินเชื่อบ้านตามหลักเกณฑ์ของธนาคารแห่งประเทศไทย
                                  (ธปอ.) โดยคำนวณตามข้อมูลที่ผู้ใช้ป้อนเข้ามา
                                  และไม่ถือว่าเป็นคำแนะนำทางการเงินที่เป็นทางการ{' '}
                                </p>
                                <p>
                                  1.2
                                  การคำนวณในเว็บแอปนี้มีวัตถุประสงค์เพื่อให้ผู้ใช้ได้รับข้อมูลเบื้องต้นเกี่ยวกับวงเงินกู้สินเชื่อบ้านเท่านั้น
                                  ผู้ใช้ควรปรึกษากับที่ปรึกษาการเงินหรือธนาคารที่เกี่ยวข้องสำหรับข้อมูลที่ถูกต้องและเป็นปัจจุบัน
                                </p>
                                <p>2. ข้อมูลที่ต้องให้</p>
                                <p>2.1 ผู้ใช้จะต้องป้อนข้อมูลที่ถูกต้องและครบถ้วนตามที่กำหนดในเว็บแอป</p>
                                <p>
                                  2.2 ผู้ใช้มีหน้าที่รับผิดชอบต่อความถูกต้องของข้อมูลที่ป้อนเข้าในระบบ
                                  และจะต้องตรวจสอบข้อมูลดังกล่าวก่อนการใช้งาน
                                </p>
                                <p>3. ข้อจำกัดความรับผิดชอบ</p>
                                <p>
                                  3.1 เว็บแอปนี้อาจมีข้อผิดพลาดหรือข้อมูลที่ไม่เป็นปัจจุบัน
                                  โดยการคำนวณและการแสดงผลที่ได้จากการใช้เว็บแอปนี้อาจไม่ตรงกับข้อกำหนดหรือข้อเสนอจริงจากธนาคาร
                                </p>
                                <p>
                                  3.2 ผู้พัฒนาเว็บแอปจะไม่รับผิดชอบต่อความเสียหายใดๆ
                                  ที่เกิดจากการใช้ข้อมูลที่ได้จากเว็บแอปนี้
                                  รวมถึงแต่ไม่จำกัดเฉพาะความเสียหายทางการเงินหรือการสูญเสียทางธุรกิจ
                                </p>
                                <p>4. การเปลี่ยนแปลง</p>
                                <p>
                                  4.1
                                  ผู้พัฒนาสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดและเงื่อนไขนี้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                                  การเปลี่ยนแปลงจะมีผลทันทีเมื่อเผยแพร่บนเว็บไซต์
                                </p>
                                <p>5. ความเป็นส่วนตัว</p>
                                <p>
                                  5.1
                                  ข้อมูลที่ผู้ใช้ป้อนเข้าสู่ระบบจะถูกเก็บรักษาเป็นความลับและจะไม่ถูกเปิดเผยแก่บุคคลที่สาม
                                  นอกจากในกรณีที่จำเป็นต้องปฏิบัติตามกฎหมาย
                                </p>
                                <p>
                                  5.2
                                  ผู้ใช้ยอมรับว่าเว็บแอปอาจเก็บข้อมูลการใช้งานเพื่อปรับปรุงการให้บริการและประสบการณ์การใช้งาน
                                </p>
                                <p>6. การยกเลิกและการปิดการใช้งาน</p>
                                <p>
                                  6.1 ผู้พัฒนาสงวนสิทธิ์ในการยกเลิกหรือปิดการใช้งานเว็บแอปตามดุลยพินิจ
                                  โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                                </p>
                                <p>7. กฎหมายที่ใช้บังคับ</p>
                                <p>7.1 ข้อกำหนดและเงื่อนไขนี้จะถูกตีความและบังคับใช้ตามกฎหมายของราชอาณาจักรไทย</p>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {loanAmountError && (
                <div className="col-span-2 mx-auto text-center">
                  <p className="mt-2 text-lg text-destructive whitespace-pre-line ">{loanAmountError}</p>

                </div>
              )}


              <Button
                type="submit"
                className="col-span-2 mx-auto mt-0 h-[70px] w-[301px] text-2xl text-white bg-green-500 hover:bg-green-700"
                // style={{ backgroundColor: '#1ECC83' }}
                disabled={!form.watch('acceptTerms')}
              >
                ถัดไป
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default InputPage;
