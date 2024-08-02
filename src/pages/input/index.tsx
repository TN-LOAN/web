import { Button } from '@/components/common/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';
import { PageLayout } from '@/components/common/pagelayout';
import { Checkbox } from '@/components/common/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/common/select';
import { useStrictForm } from '@/hooks/form-hook';
import { LoanFormDefaultValues, LoanFormSchema, LoanFormType } from '@/types/schema/loan';
import { Label } from '@/components/common/label';
import Navbar from '@/components/common/navigation-bar';
import { useState } from 'react';
import { calculateLoanAmount } from '@/libs/calculateLoanAmount';
import { cn } from '@/libs/utils';
import { Link } from 'react-router-dom';


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
    <PageLayout className='bg-background'>
      <Navbar />
      <div className="text-center mt-4">
        <h1 className="text-4xl font-bold">คำนวณวงเงินกู้สินเชื่อบ้าน</h1>
      </div>
      <div  className='mb-20'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={cn("p-6 bg-white   w-[1065px] h-[620px] mx-auto mt-2.5 grid grid-cols-2 gap-x-4 gap-y-6", showLoanDetails ? "rounded-t-lg" : "rounded-lg")}>
            {/* Form fields */}
            <div className='w-full max-w-[343px] h-[45px] mx-auto'>
              <FormField
                control={form.control}
                name="career"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='color: rgb(190 24 93);'>อาชีพ <span className="text-destructive"> *</span></FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`w-[343px] h-[45px] ${form.formState.errors.career ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="กรุณาเลือกอาชีพของคุณ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>อาชีพ</SelectLabel>
                            <SelectItem value="office">พนักงานประจำ</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full max-w-[343px] h-[45px] mx-auto'>
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วันเกิด <span className="text-destructive"> *</span></FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        placeholder="กรุณาเลือกวันเกิดของคุณ"
                        className={`w-[343px] h-[45px] ${form.formState.errors.dateOfBirth ? 'border-destructive' : ''}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full max-w-[343px] h-[45px] mx-auto'>
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รายได้ต่อเดือน (บาท) <span className="text-destructive"> *</span></FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="กรุณากรอกรายได้ต่อเดือนของคุณ"
                        className={`w-[343px] h-[45px] ${form.formState.errors.salary ? 'border-destructive' : ''}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full max-w-[343px] h-[45px] mx-auto'>
              <FormField
                control={form.control}
                name="loanPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ระยะเวลาในการกู้ (ปี) <span className="text-destructive"> *</span></FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="กรุณากรอกระยะเวลากู้ที่คุณต้องการ"
                        className={`w-[343px] h-[45px] ${form.formState.errors.loanPeriod ? 'border-destructive' : ''}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full max-w-[343px] h-[45px] mx-auto'>
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
                        placeholder="กรุณากรอกภาระหนี้สิ้น"
                        className={`w-[343px] h-[45px] ${form.formState.errors.debtexpenses ? 'border-destructive' : ''}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full max-w-[343px] h-[45px] mx-auto'>
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วงเงินกู้ (บาท)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="กรุณากรอกวงเงินกู้ที่คุณต้องการ"
                        className="w-[343px] h-[45px]"
                      />
                    </FormControl>
                    <FormMessage />
                    {loanAmountError && <p className="text-destructive text-sm mt-2">{loanAmountError}</p>}
                  </FormItem>
                )}
              />
            </div>

            <div className='w-full max-w-[343px] h-[45px] mx-auto'>
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="terms">ฉันยอมรับ ข้อตกลงและเงื่อนไข</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="col-span-2 mx-auto w-[301px] h-[70px] mt-0 text-black text-2xl"
              style={{ backgroundColor: '#1ECC83' }}
              disabled={!form.watch('acceptTerms')}
            >
              คำนวณ
            </Button>
          </div>
        </form>
      </Form>

      {showLoanDetails && (
        <div className="text-center pt-0 p-20 bg-white w-[1065px] h-[600px] mx-auto rounded-b-lg">
          <h2 className="text-4xl font-bold">รายละเอียดกู้สินเชื่อ</h2>
          <p className="text-3xl mt-20">วงเงินกู้สูงสุด</p>
          <h3 className="text-5xl mt-20 text-primary font-bold">{calculatedLoanAmount?.toLocaleString()}</h3>
          <p className="text-red-500 text-lg mt-20">หมายเหตุ: วงเงินที่คำนวนนี้เป็นเพียงการคำนวนเบื้องต้นเท่านั้น</p>
          <Link to="/eiei">
          <Button
            className='col-span-2 mx-auto w-[301px] h-[70px] mt-20 text-black text-2xl'
          >ถัดไป</Button><link rel="" href="/eiei" />
          </Link>
        </div>
      )}
      </div>
    </PageLayout>
  );
}

export default InputPage;
