import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CheckIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/common/button';
import { Checkbox } from '@/components/common/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { ScrollArea } from '@/components/common/scroll';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select';
import { Separator } from '@/components/common/separator';
import TestCard from '@/components/test/test-card';
import { useGetLoan } from '@/hooks/loan-hook';
import { calculateLoanAmount } from '@/libs/calculateLoanAmount';
import { useCompareStore } from '@/libs/compareStore';
import { useLoanFormStore } from '@/libs/loanFormStore';
import { cn } from '@/libs/utils';
import { LoanFormSchema, LoanResponseType, LoanType } from '@/types/schema/loan';

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
    if (LoanFormSchema.safeParse(formData).success) {
      mutate(formData);
    }
  }, [formData]);

  useEffect(() => {
    const newLoanAmount = calculateLoanAmount(editedData.salary, editedData.debtexpenses, editedData.loanPeriod);
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
  const [selectedCards, setSelectedCards] = useState<{ data: any }[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<{ data: any } | null>(null);
  const [selectedData, setSelectedData] = useState<LoanType[]>();
  const [mrta, setMrta] = useState('all');
  const [sort, setSort] = useState('installment');

  useEffect(() => {
    if (selectNormalSet && selectDecorateSet && parsedData.success && parsedData.data) {
      setSelectedData(parsedData.data.normal_loan.concat(parsedData.data.decorate_loan));
    } else if (selectDecorateSet && parsedData.success && parsedData.data) {
      setSelectedData(parsedData.data.decorate_loan);
    } else if (selectNormalSet && parsedData.success && parsedData.data) {
      setSelectedData(parsedData.data.normal_loan);
    } else {
      setSelectedData([]);
    }
  }, [selectNormalSet, selectDecorateSet, parsedData.success, parsedData.data]);

  const handleCheckboxChange = (data: any) => {
    const isAlreadySelected = selectedCards.some((card) => card.data.loan.id === data.loan.id);

    if (isAlreadySelected) {
      setSelectedCards(selectedCards.filter((card) => card.data.loan.id !== data.loan.id));
    } else if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, { data }]);
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
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handleSort = (data: any) => {
    if (sort === 'installment') {
      return data.installment;
    } else if (sort === 'interest') {
      return data.loan.interest_rate_average;
    } else if (sort === 'credit') {
      return data.loan.credit_maximum;
    } else if (sort === 'period') {
      return data.loan.period_maximum;
    }
  };

  let filterData =
    selectedData &&
    selectedData.filter((data) => {
      if (mrta === 'all') {
        return data;
      } else if (mrta === 'do' && data.loan.mrta === true) {
        return data;
      } else if (mrta === 'dont' && data.loan.mrta === false) {
        return data;
      }
    });

  let sortedData = filterData && filterData.sort((a, b) => handleSort(a) - handleSort(b));

  return (
    <PageLayout className="bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="mx-6 grid grid-cols-1 gap-0 md:mx-10 md:grid-cols-3">
          {/* Left Panel */}
          <div className="rounded-l-lg bg-white p-8">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <h1 className="mb-4 text-2xl font-semibold md:text-4xl">รายละเอียดกู้สินเชื่อ</h1>
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
                    value={editedData.dateOfBirth}
                    onChange={(e) => setEditedData({ ...editedData, dateOfBirth: e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <label className="mb-2 block">รายได้ต่อเดือน:</label>
                  <input
                    type="number"
                    value={editedData.salary}
                    onChange={(e) => setEditedData({ ...editedData, salary: +e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <label className="mb-2 block">ภาระหนี้สินต่อเดือน:</label>
                  <input
                    type="number"
                    value={editedData.debtexpenses}
                    onChange={(e) => setEditedData({ ...editedData, debtexpenses: +e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <label className="mb-2 block">ระยะเวลากู้:</label>
                  <input
                    type="number"
                    value={editedData.loanPeriod}
                    onChange={(e) => setEditedData({ ...editedData, loanPeriod: +e.target.value })}
                    className="mb-4 rounded border p-2"
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      className="text-black"
                      onClick={() => {
                        setFormData({ ...formData, ...editedData });
                        setEditMode(false);
                      }}
                    >
                      บันทึก
                    </Button>
                    <Button className="bg-gray-300 text-black hover:bg-gray-200" onClick={() => setEditMode(false)}>
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
          <div className="col-span-2 rounded-r-lg bg-[#d6efe4] p-6">
            <h2 className="mb-4 text-center text-2xl font-semibold md:text-4xl">สินเชื่อแนะนำ</h2>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  className={cn(
                    'rounded-2xl px-4 py-2 text-black hover:bg-[#359f75]',
                    selectNormalSet && 'bg-[#359f75] text-black',
                  )}
                  onClick={() => {
                    if (selectNormalSet && !selectDecorateSet) {
                    } else {
                      setSelectedNormalSet(selectNormalSet ? false : true);
                    }
                  }}
                >
                  {selectNormalSet && <CheckIcon className="h-5 w-5" />}
                  สินเชื่อทั่วไป
                </Button>
                <Button
                  className={cn(
                    'rounded-2xl px-4 py-2 text-black hover:bg-[#359f75]',
                    selectDecorateSet && 'bg-[#359f75] text-black',
                  )}
                  onClick={() => {
                    if (!selectNormalSet && selectDecorateSet) {
                    } else {
                      setSelectedDecorateSet(selectDecorateSet ? false : true);
                    }
                  }}
                >
                  {selectDecorateSet && <CheckIcon className="h-5 w-5" />}
                  สินเชื่อบ้านพร้อมการต่อเติม
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Info className="h-5 w-5 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="rounded bg-white p-4 shadow">
                    <p>
                      ให้กู้กรณีเพื่อจัดหาที่อยู่อาศัย รวมถึงกรณีกู้เพิ่มเติมเพื่อซื้อเฟอร์นิเจอร์ ตกแต่งบ้าน
                      หรือสิ่งจำเป็นอื่นในการเข้าอยู่อาศัย
                      และกรณีกู้เพิ่มเติมเพื่อเป็นค่าเบี้ยประกันชีวิตเพื่อประกันสินเชื่อ
                      และ/หรือเป็นค่าเบี้ยประกันอัคคีภัย รวมกันสูงสุดไม่เกินร้อยละ 110
                      ของราคาซื้อขายหรือราคาประเมินหลักทรัพย์แล้วแต่ราคาใดที่ต่ำกว่า
                    </p>
                    <p className="... italic">*ทั้งนี้ เป็นไปตามเกณฑ์การพิจารณาที่ธนาคารกำหนด</p>
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
            {parsedData.success && parsedData.data && parsedData.data.normal_loan.length > 0 ? (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <p className="text-gray-600">{`ผลการค้นหา ${
                    selectedData &&
                    selectedData.filter((data) => {
                      if (mrta === 'all') {
                        return data;
                      } else if (mrta === 'do' && data.loan.mrta === true) {
                        return data;
                      } else if (mrta === 'dont' && data.loan.mrta === false) {
                        return data;
                      }
                    }).length
                  } ผลิตภัณฑ์`}</p>
                  <div className="flex items-center">
                    <div className="mr-1">MRTA</div>
                    <Select value={mrta} onValueChange={handleMrtaChange}>
                      <SelectTrigger className="w-24 justify-center bg-white">
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
                  <div className="flex items-center">
                    <div className="mr-1">จัดเรียงตาม</div>
                    <Select value={sort} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-36 justify-center bg-white">
                        <SelectValue placeholder="โปรดเลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="installment">งวดผ่อนต่อเดือน</SelectItem>
                          <SelectItem value="interest">อัตราดอกเบี้ย </SelectItem>
                          <SelectItem value="credit">วงเงินกู้</SelectItem>
                          <SelectItem value="period">ระยะเวลากู้</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <ScrollArea className="h-[300px] md:h-[500px]">
                  <div className="mx-auto w-[80%] space-y-4 md:w-[80%]">
                    {sortedData &&
                      sortedData.map((data, index) => (
                        <div key={index} className="relative">
                          {isComparing && (
                            <Checkbox
                              className={cn('absolute left-[-25px] top-1/2 -translate-y-1/2 transform border-black')}
                              checked={selectedCards.some((card) => card.data.loan.id === data.loan.id)}
                              onCheckedChange={() => handleCheckboxChange(data)}
                              disabled={
                                !selectedCards.some((card) => card.data.loan.id === data.loan.id) &&
                                selectedCards.length >= 2
                              }
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
                            loan_type={data.loan.loan_type}
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
              <DialogTitle>{selectedDetail.data.loan.product}</DialogTitle>
            </DialogHeader>
            <div>{selectedDetail.data.loan.product}</div>
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
