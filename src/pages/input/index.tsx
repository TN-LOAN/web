import { Button } from '@/components/common/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';
import { PageLayout } from '@/components/common/pagelayout';
import { Checkbox } from '@/components/common/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/common/select';
import { useStrictForm } from '@/hooks/form-hook';
import { LoanFormDefaultValues, LoanFormSchema } from '@/types/schema/loan';
import { Label } from '@/components/common/label';

function InputPage() {
  const form = useStrictForm(LoanFormSchema, LoanFormDefaultValues);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <PageLayout>
      <div className="text-center mt-4">
        <h1 className="text-4xl font-bold">คำนวณวงเงินกู้สินเชื่อบ้าน</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6 bg-white border border-black rounded-lg w-[1065px] h-[620px] mx-auto mt-2.5 grid grid-cols-2 gap-x-4 gap-y-6">
          <div className='w-full max-w-[343px] h-[45px] mx-auto'>
            <FormField
              control={form.control}
              name="career"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='color: rgb(190 24 93);'>อาชีพ *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`w-[343px] h-[45px] ${form.formState.errors.career ? 'border-red-500' : ''}`}>
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
                  <FormLabel>วันเกิด *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      placeholder="กรุณาเลือกวันเกิดของคุณ"
                      className={`w-[343px] h-[45px] ${form.formState.errors.dateOfBirth ? 'border-red-500' : ''}`}
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
                  <FormLabel>รายได้ต่อเดือน (บาท) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="กรุณากรอกรายได้ต่อเดือนของคุณ"
                      className={`w-[343px] h-[45px] ${form.formState.errors.salary ? 'border-red-500' : ''}`}
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
                  <FormLabel>ภาระหนี้สิ้นต่อเดือน (บาท) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="กรุณากรอกภาระหนี้สิ้น"
                      className={`w-[343px] h-[45px] ${form.formState.errors.debtexpenses ? 'border-red-500' : ''}`}
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
                  <FormLabel>ระยะเวลาในการกู้ (ปี) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="กรุณากรอกระยะเวลากู้ที่คุณต้องการ"
                      className={`w-[343px] h-[45px] ${form.formState.errors.loanPeriod ? 'border-red-500' : ''}`}
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
              className="col-span-2 mx-auto w-[301px] h-[70px] text-white"
              style={{ backgroundColor: '#1ECC83' }}
              disabled={!form.watch('acceptTerms')}
            >
              คำนวณ
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}

export default InputPage;
