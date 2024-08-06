import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/button';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { useLoanFormStore } from '@/libs/loanFormStore';
import TestCard from '@/components/test/test-card';
import { ScrollArea } from '@/components/common/scroll';
import { Separator } from '@/components/common/separator';
import { Info } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import { cn } from '@/libs/utils';
import { useCompareStore } from '@/libs/compareStore';
import { Checkbox } from '@/components/common/checkbox';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { calculateLoanAmount } from '@/libs/calculateLoanAmount';
import { useGetLoan } from '@/hooks/loan-hook';
import { LoanFormSchema, LoanResponseType ,LoanType} from '@/types/schema/loan';
import { CheckIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select';

function ProductPage() {
  const { formData, setFormData } = useLoanFormStore();
  const { mutate, data } = useGetLoan();
  const { setSelectedItems } = useCompareStore();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    dateOfBirth: formData.dateOfBirth,
    salary: formData.salary,
    debtexpenses: formData.debtexpenses,
    loanPeriod: formData.loanPeriod,
    loanAmount: formData.loanAmount
  });

  useEffect(() => {
    if (LoanFormSchema.safeParse(formData).success) {
      mutate(formData);
    }
  }, [formData]);

  useEffect(() => {
    const newLoanAmount = calculateLoanAmount(editedData.salary, editedData.debtexpenses);
    setEditedData((prev) => ({ ...prev, loanAmount: newLoanAmount }));
  }, [editedData.salary, editedData.debtexpenses]);

  const parsedData = LoanResponseType.safeParse(data);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const [selectNormalSet, setSelectedNormalSet] = useState(true);
  const [selectDecorateSet, setSelectedDecorateSet] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [selectedCards, setSelectedCards] = useState<{ data: any}[]>([]); 
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [selectedDetail, setSelectedDetail] = useState<{ data: any } | null>(null); 
  const [selectedData , setSelectedData] = useState<LoanType[]>();
  const [mrta, setMrta] = useState("all");

  useEffect(() => {
    if(selectNormalSet && selectDecorateSet && parsedData.success && parsedData.data){
      setSelectedData(parsedData.data.normal_loan.concat(parsedData.data.decorate_loan));
    }else if(selectDecorateSet && parsedData.success && parsedData.data){
      setSelectedData(parsedData.data.decorate_loan);
    }else if(selectNormalSet  && parsedData.success && parsedData.data){
      setSelectedData(parsedData.data.normal_loan);
    }else{
      setSelectedData([]);
    }
  }, [selectNormalSet,selectDecorateSet,parsedData.success,parsedData.data]);

  const handleCheckboxChange = (data: any) => {
    const isAlreadySelected = selectedCards.some(card => card.data.loan.id === data.loan.id);

    if (isAlreadySelected) {
      setSelectedCards(selectedCards.filter((card) => card.data.loan.id !== data.loan.id));
    } else if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, { data,}]);
    }
  };

  const handleCardClick = (data: any) => {
    setSelectedDetail(data);
    setDialogOpen(true);
  };

  const handleCompare = () => {
    setSelectedItems(selectedCards);
    setIsComparing(false); 
  };

  const handleCancelCompare = () => {
    setIsComparing(false); 
    setSelectedCards([]);  
  };

  const handleMrtaChange = (value: string) => {
    setMrta(value);
  }

  return (
    <PageLayout className="bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mx-6 md:mx-10">
          {/* Left Panel */}
          <div className="bg-white p-8 rounded-l-lg">
            <div className="text-center">
              <div className='flex justify-center items-center'>
                <h1 className="text-2xl md:text-4xl font-bold mb-4">รายละเอียดกู้สินเชื่อ</h1>
                <EditOutlinedIcon 
                  className='mb-3 ml-2 cursor-pointer'
                  onClick={() => setEditMode(!editMode)}
                />
              </div>
              <p className="text-xl md:text-4xl">วงเงินกู้</p>
              <p className="text-4xl md:text-6xl font-bold text-primary mt-2">{editedData.loanAmount.toLocaleString()}</p>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-4 pt-4">
              หมายเหตุ: ผลการคำนวณนี้เป็นเพียงการคำนวณเบื้องต้นเท่านั้น
              การพิจารณาวงเงินสินเชื่ออาจมีการเปลี่ยนแปลงได้ตามข้อกำหนดของสถาบันการเงินที่ท่านเลือก
            </p>
            <div className="mt-9 space-y-4">
              {editMode ? (
                <div>
                  <label className="block mb-2">วัน/เดือน/ปีเกิด:</label>
                  <input
                    type="date"
                    value={editedData.dateOfBirth}
                    onChange={(e) => setEditedData({ ...editedData, dateOfBirth: e.target.value })}
                    className="border p-2 rounded mb-4"
                  />
                  <label className="block mb-2">รายได้ต่อเดือน:</label>
                  <input
                    type="number"
                    value={editedData.salary}
                    onChange={(e) => setEditedData({ ...editedData, salary: +e.target.value })}
                    className="border p-2 rounded mb-4"
                  />
                  <label className="block mb-2">ภาระหนี้สินต่อเดือน:</label>
                  <input
                    type="number"
                    value={editedData.debtexpenses}
                    onChange={(e) => setEditedData({ ...editedData, debtexpenses: +e.target.value })}
                    className="border p-2 rounded mb-4"
                  />
                  <label className="block mb-2">ระยะเวลากู้:</label>
                  <input
                    type="number"
                    value={editedData.loanPeriod}
                    onChange={(e) => setEditedData({ ...editedData, loanPeriod: +e.target.value })}
                    className="border p-2 rounded mb-4"
                  />
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button className='text-black' onClick={() => { 
                      setFormData({ ...formData, ...editedData });
                      setEditMode(false);
                    }}>
                      บันทึก
                    </Button>
                    <Button className='bg-gray-300 text-black hover:bg-gray-200' onClick={() => setEditMode(false)}>
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-9 space-y-4">
                  <p className="text-sm">อาชีพ:</p>
                  <p>{formData.career}</p>
                  <p className="text-sm">วัน/เดือน/ปีเกิด:</p>
                  <p>{formatDate(formData.dateOfBirth)}</p>
                  <p className="text-sm">รายได้ต่อเดือน:</p>
                  <p>{formData.salary.toLocaleString()} บาท</p>
                  <p className="text-sm">ภาระหนี้สินต่อเดือน:</p>
                  <p>{formData.debtexpenses.toLocaleString()} บาท</p>
                  <p className="text-sm">ระยะเวลากู้:</p>
                  <p>{formData.loanPeriod} ปี</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-[#d6efe4] p-6 rounded-r-lg">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">สินเชื่อแนะนำ</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2 items-center">
                <Button 
                  className={cn('rounded-2xl px-4 py-2 text-black hover:bg-[#359f75]', selectNormalSet  && 'bg-[#359f75] text-black')} 
                  onClick={() => {
                     if(selectNormalSet && !selectDecorateSet){
                      
                     }else{
                      setSelectedNormalSet(
                        selectNormalSet ? false : true
                      )
                     }
                  }}
                >
                  {selectNormalSet && <CheckIcon className="w-5 h-5" />}
                  สินเชื่อทั่วไป
                </Button>
                <Button 
                  className={cn('rounded-2xl px-4 py-2 text-black hover:bg-[#359f75]', selectDecorateSet  && 'bg-[#359f75] text-black')} 
                  onClick={() => {
                
                    if(!selectNormalSet && selectDecorateSet){
                      
                    }else{
                      setSelectedDecorateSet(
                        selectDecorateSet ? false : true
                      )
                    }
                  }}
                >
                  {selectDecorateSet && <CheckIcon className="w-5 h-5" />}
                  สินเชื่อบ้านพร้อมการต่อเติม
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Info className="w-5 h-5 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="p-4 bg-white rounded shadow">
                    <p>ทั่วไป คือ</p>
                    <p>110% คือ</p>
                  </PopoverContent>
                </Popover>
              </div>
              {isComparing ? (
                <div className="flex space-x-2 justify-end w-full">
                  <Link to={selectedCards.length >= 2 ? "/compare" : "#"}>
                    <Button 
                      className="rounded-2xl bg-primary px-4 py-2 text-black" 
                      onClick={handleCompare}
                      disabled={selectedCards.length < 2}
                    >
                      เสร็จสิ้น
                    </Button>
                  </Link>
                  <Button 
                    className="rounded-2xl bg-gray-300 hover:bg-gray-200 px-4 py-2 text-black" 
                    onClick={handleCancelCompare}
                  >
                    ยกเลิก
                  </Button>
                </div>
              ) : (
                <Button 
                  className="rounded-2xl bg-primary px-4 py-2 text-black" 
                  onClick={() => setIsComparing(true)}
                >
                  เปรียบเทียบ
                </Button>
              )}
            </div>

            <Separator className="my-4 bg-black" />
            {parsedData.success && parsedData.data && parsedData.data.normal_loan.length > 0 ? (
              <>
     <div className='flex gap-2 items-center mb-4'>
                <p className="text-gray-600">{`ผลการค้นหา ${selectedData?.length} ผลิตภัณฑ์`}</p>
   <div className='flex items-center'>
    <div className='mr-1'>MRTA</div>
    <Select  value={mrta} onValueChange={handleMrtaChange}>
      <SelectTrigger className="w-24 bg-white justify-center" >
        <SelectValue placeholder="โปรดเลือก" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          <SelectItem value="do">ทำ </SelectItem>
          <SelectItem value="dont">ไม่ทำ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
   </div>
     </div>
                <ScrollArea className="h-[300px] md:h-[500px]">
                  <div className="space-y-4 mx-auto w-[80%] md:w-[80%]">
                    {selectedData && selectedData.filter((data)=>{
                      if(mrta === "all"){
                        return data;
                      }else if(mrta === "do" && data.loan.mrta === true){
                        return data;
                      }else if(mrta === "dont" && data.loan.mrta === false){
                        return data;
                      }
                    }).map((data, index) => (
                      <div key={index} className="relative">
                        {isComparing && (
                          <Checkbox
                            className={cn('absolute top-1/2 left-[-25px] transform -translate-y-1/2 border-black')}
                            checked={selectedCards.some(card => card.data.loan.id === data.loan.id)}
                            onCheckedChange={() => handleCheckboxChange(data, )}
                            disabled={!selectedCards.some(card => card.data.loan.id === data.loan.id) && selectedCards.length >= 2}
                          />
                        )}
                        <TestCard 
                          title={data.loan.product} 
                          provider={data.loan.provider}
                          onClick={() => handleCardClick(data)} 
                          interestRate={data.loan.interest_rate_average}
                          loanAmountProduct={data.loan.credit_maximum}
                          loanPeriodProduct={data.loan.period_maximum}
                          isRed={data.loan.period_maximum < formData.loanPeriod} 
                          installment={data.installment}
                          mrta={data.loan.mrta}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <p className="mb-4 text-gray-600 flex justify-center">ไม่มีผลิตภัณฑ์ที่ค้นหา</p>
            )}
          </div>
        </div>
      </div>

      {selectedDetail && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDetail.data.loan.product}</DialogTitle>
            </DialogHeader>
            <div>{selectedDetail.data.loan.product}</div>
            <div className='flex justify-center'>
              <Button className='rounded-2xl text-black w-36'>สนใจ</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}

export default ProductPage;
