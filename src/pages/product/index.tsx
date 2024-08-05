import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/common/button';
import { Checkbox } from '@/components/common/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover';
import { ScrollArea } from '@/components/common/scroll';
import { Separator } from '@/components/common/separator';
import TestCard from '@/components/test/test-card';
import { useGetLoan } from '@/hooks/loan-hook';
import { calculateLoanAmount } from '@/libs/calculateLoanAmount';
import { useCompareStore } from '@/libs/compareStore';
import { useLoanFormStore } from '@/libs/loanFormStore';
import { cn } from '@/libs/utils';

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
    loanAmount: formData.loanAmount,
  });

  useEffect(() => {
    mutate(formData);
  }, [formData]);

  useEffect(() => {
    const newLoanAmount = calculateLoanAmount(editedData.salary, editedData.debtexpenses);
    setEditedData((prev) => ({ ...prev, loanAmount: newLoanAmount }));
  }, [editedData.salary, editedData.debtexpenses]);
  const [tempEditedData, setTempEditedData] = useState(editedData);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const [selectedDataSet, setSelectedDataSet] = useState('ทั่วไป');
  const [isComparing, setIsComparing] = useState(false);
  const [selectedCards, setSelectedCards] = useState<{ title: string; details: string; dataSet: string }[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<{ title: string; details: string } | null>(null);

  const handleCheckboxChange = (data: any, dataSet: string) => {
    const isAlreadySelected = selectedCards.some((card) => card.title === data.loan.id);

    if (isAlreadySelected) {
      setSelectedCards(selectedCards.filter((card) => card.title !== data.loan.id));
    } else if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, { title: data.loan.id, details: 'eieei', dataSet }]);
    }
  };

  const handleCardClick = (data: { title: string; details: string }) => {
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

  const handleSave = () => {
    const newLoanAmount = calculateLoanAmount(tempEditedData.salary, tempEditedData.debtexpenses);
    setEditedData({ ...tempEditedData, loanAmount: newLoanAmount });
    setFormData({ ...formData, ...tempEditedData, loanAmount: newLoanAmount });
    setEditMode(false);
  };

  return (
    <PageLayout className="bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="mx-6 grid grid-cols-1 gap-0 md:mx-10 md:grid-cols-3">
          {/* Left Panel */}
          <div className="rounded-l-lg bg-white p-8 md:col-span-1">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <h1 className="mb-4 text-2xl font-bold md:text-4xl">รายละเอียดกู้สินเชื่อ</h1>
                <EditOutlinedIcon className="mb-3 ml-2 cursor-pointer" onClick={() => setEditMode(!editMode)} />
              </div>
              <p className="text-xl md:text-4xl">วงเงินกู้</p>
              <p className="mt-2 text-4xl font-bold text-primary md:text-6xl">
                {editedData.loanAmount.toLocaleString()}
              </p>
            </div>
            <p className="mt-4 pt-4 text-xs text-gray-500 md:text-sm">
              หมายเหตุ: ผลการคำนวณนี้เป็นเพียงการคำนวณเบื้องต้นเท่านั้น
              การพิจารณาวงเงินสินเชื่ออาจมีการเปลี่ยนแปลงได้ตามข้อกำหนดของสถาบันการเงินที่ท่านเลือก
            </p>
            <div className="mt-9 space-y-4">
              {editMode ? (
                <div>
                  <label className="mb-2 block">วัน/เดือน/ปีเกิด:</label>
                  <input
                    type="date"
                    value={tempEditedData.dateOfBirth}
                    onChange={(e) => setTempEditedData({ ...tempEditedData, dateOfBirth: e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <label className="mb-2 block">รายได้ต่อเดือน:</label>
                  <input
                    type="number"
                    value={tempEditedData.salary}
                    onChange={(e) => setTempEditedData({ ...tempEditedData, salary: +e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <label className="mb-2 block">ภาระหนี้สินต่อเดือน:</label>
                  <input
                    type="number"
                    value={tempEditedData.debtexpenses}
                    onChange={(e) => setTempEditedData({ ...tempEditedData, debtexpenses: +e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <label className="mb-2 block">ระยะเวลากู้:</label>
                  <input
                    type="number"
                    value={tempEditedData.loanPeriod}
                    onChange={(e) => setTempEditedData({ ...tempEditedData, loanPeriod: +e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button className="text-black" onClick={handleSave}>
                      บันทึก
                    </Button>
                    <Button className="bg-gray-300 text-black hover:bg-gray-200" onClick={() => setEditMode(false)}>
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-9 space-y-4">
                  <p className="text-xl">อาชีพ: {formData.career}</p>
                  {/* <p>{formData.career}</p> */}
                  <p className="text-xl">วัน/เดือน/ปีเกิด: {formatDate(formData.dateOfBirth)}</p>
                  {/* <p>{formatDate(formData.dateOfBirth)}</p> */}
                  <p className="text-xl">รายได้ต่อเดือน: {formData.salary.toLocaleString()} บาท</p>
                  {/* <p>{formData.salary.toLocaleString()} บาท</p> */}
                  <p className="text-xl">ภาระหนี้สินต่อเดือน: {formData.debtexpenses.toLocaleString()} บาท</p>
                  {/* <p>{formData.debtexpenses.toLocaleString()} บาท</p> */}
                  <p className="text-xl">ระยะเวลากู้: {formData.loanPeriod} ปี</p>
                  {/* <p>{formData.loanPeriod} ปี</p> */}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}

          <div className="rounded-r-lg bg-[#d6efe4] p-6 md:col-span-2">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-4xl">สินเชื่อแนะนำ</h2>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  className={cn(
                    'rounded-2xl px-4 py-2 text-black',
                    selectedDataSet === 'ทั่วไป' && 'bg-[#359f75] text-black',
                  )}
                  onClick={() => setSelectedDataSet('ทั่วไป')}
                >
                  ทั่วไป
                </Button>
                <Button
                  className={cn(
                    'rounded-2xl px-4 py-2 text-black',
                    selectedDataSet === '110%' && 'bg-[#359f75] text-black',
                  )}
                  onClick={() => setSelectedDataSet('110%')}
                >
                  110%
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Info className="h-5 w-5 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="rounded bg-white p-4 shadow">
                    <p>
                      110% คือ ให้กู้กรณีเพื่อจัดหาที่อยู่อาศัย รวมถึงกรณีกู้เพิ่มเติมเพื่อซื้อเฟอร์นิเจอร์ ตกแต่งบ้าน
                      หรือสิ่งจำเป็นอื่นในการเข้าอยู่อาศัย
                      และกรณีกู้เพิ่มเติมเพื่อเป็นค่าเบี้ยประกันชีวิตเพื่อประกันสินเชื่อ
                      และ/หรือเป็นค่าเบี้ยประกันอัคคีภัย รวมกันสูงสุดไม่เกินร้อยละ 110
                      ของราคาซื้อขายหรือราคาประเมินหลักทรัพย์แล้วแต่ราคาใดที่ต่ำกว่า
                    </p>
                  </PopoverContent>
                </Popover>
              </div>

              {isComparing ? (
                <div className="flex w-full justify-end space-x-2">
                  <Link to={selectedCards.length >= 2 ? '/compare' : '#'}>
                    <Button
                      className="rounded-2xl bg-primary px-4 py-2 text-black"
                      onClick={handleCompare}
                      disabled={selectedCards.length < 2}
                    >
                      เสร็จสิ้น
                    </Button>
                  </Link>
                  <Button
                    className="rounded-2xl bg-gray-300 px-4 py-2 text-black hover:bg-gray-200"
                    onClick={handleCancelCompare}
                  >
                    ยกเลิก
                  </Button>
                </div>
              ) : (
                <Button className="rounded-2xl bg-primary px-4 py-2 text-black" onClick={() => setIsComparing(true)}>
                  เปรียบเทียบ
                </Button>
              )}
            </div>

            <Separator className="my-4 bg-black" />
            {data && data.length > 0 ? (
              <>
                <p className="mb-4 text-gray-600">{`ผลการค้นหา ${data.length} ผลิตภัณฑ์`}</p>
                <ScrollArea className="h-[300px] md:h-[500px]">
                  <div className="mx-auto w-[80%] space-y-4 md:w-[80%]">
                    {data.map((data, index) => (
                      <div key={index} className="relative">
                        {isComparing && (
                          <Checkbox
                            className={cn('absolute left-[-25px] top-1/2 -translate-y-1/2 transform border-black')}
                            checked={selectedCards.some((card) => card.title === data.loan.id)}
                            onCheckedChange={() => handleCheckboxChange(data, selectedDataSet)}
                            disabled={
                              !selectedCards.some((card) => card.title === data.loan.id) && selectedCards.length >= 2
                            }
                          />
                        )}
                        <TestCard
                          title={data.loan.product}
                          onClick={() => handleCardClick({ details: 'eiei', title: data.loan.id })}
                          interestRate={data.loan.interest_rate_average}
                          loanAmountProduct={data.loan.credit_maximum}
                          loanPeriodProduct={data.loan.period_maximum}
                          isRed={data.loan.period_maximum < formData.loanPeriod}
                          installment={data.installment}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <p className="mb-4 flex justify-center text-gray-600">ไม่มีผลิตภัณฑ์ที่ค้นหา</p>
            )}
          </div>
        </div>
      </div>

      {selectedDetail && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDetail.title}</DialogTitle>
            </DialogHeader>
            <div>{selectedDetail.details}</div>
            <div className="flex justify-center">
              <Button className="w-36 rounded-2xl text-black">สนใจ</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}

export default ProductPage;
