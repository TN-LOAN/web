import { useState } from 'react';
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

function ProductPage() {
  const { formData } = useLoanFormStore();
  const { setSelectedItems } = useCompareStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const mockDataSet1 = Array.from({ length: 10 }).map((_, index) => ({
    title: `ทั่วไป Card ${index}`,
    details: `Details of ทั่วไป ${index}`, 
  }));

  const mockDataSet2 = Array.from({ length: 7 }).map((_, index) => ({
    title: `110% Card ${index}`,
    details: `Details of 110% ${index}`, 
  }));

  const [selectedDataSet, setSelectedDataSet] = useState('ทั่วไป');
  const [isComparing, setIsComparing] = useState(false);
  const [selectedCards, setSelectedCards] = useState<{ title: string; details: string; dataSet: string }[]>([]); 
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [selectedDetail, setSelectedDetail] = useState<{ title: string; details: string } | null>(null); 

  const mockData = selectedDataSet === 'ทั่วไป' ? mockDataSet1 : mockDataSet2;

  const handleCheckboxChange = (item: { title: string; details: string }, dataSet: string) => {
    const isAlreadySelected = selectedCards.some(card => card.title === item.title);

    if (isAlreadySelected) {
      setSelectedCards(selectedCards.filter((card) => card.title !== item.title));
    } else if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, { ...item, dataSet }]);
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

  return (
    <PageLayout className="bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6 md:mx-10">
          {/* Left Panel */}
          <div className="bg-white p-8 rounded-lg">
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">รายละเอียดกู้สินเชื่อ</h1>
              <p className="text-xl md:text-4xl">วงเงินกู้</p>
              <p className="text-4xl md:text-6xl font-bold text-primary mt-2">{formData.loanAmount.toLocaleString()}</p>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-4 pt-4">
              หมายเหตุ: ผลการคำนวณนี้เป็นเพียงการคำนวณเบื้องต้นเท่านั้น
              การพิจารณาวงเงินสินเชื่ออาจมีการเปลี่ยนแปลงได้ตามข้อกำหนดของสถาบันการเงินที่ท่านเลือก
            </p>
            <div className="mt-9 space-y-4">
              <div>
                <p className="text-sm">อาชีพ:</p>
                <p>{formData.career}</p>
              </div>

              <div>
                <p className="text-sm">วัน/เดือน/ปีเกิด:</p>
                <p>{formatDate(formData.dateOfBirth)}</p>
              </div>

              <div>
                <p className="text-sm">รายได้ต่อเดือน:</p>
                <p>{formData.salary.toLocaleString()} บาท</p>
              </div>

              <div>
                <p className="text-sm">ภาระหนี้สินต่อเดือน:</p>
                <p>{formData.debtexpenses.toLocaleString()} บาท</p>
              </div>

              <div>
                <p className="text-sm">ระยะเวลากู้:</p>
                <p>{formData.loanPeriod} ปี</p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-[#d6efe4] p-6 rounded-lg">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">สินเชื่อแนะนำ</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2 items-center">
                <Button 
                  className={cn('rounded-2xl px-4 py-2 text-black', selectedDataSet === 'ทั่วไป' && 'bg-[#359f75] text-black')} 
                  onClick={() => setSelectedDataSet('ทั่วไป')}
                >
                  ทั่วไป
                </Button>
                <Button 
                  className={cn('rounded-2xl px-4 py-2 text-black', selectedDataSet === '110%' && 'bg-[#359f75] text-black')} 
                  onClick={() => setSelectedDataSet('110%')}
                >
                  110%
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
                    className="rounded-2xl bg-red-500 hover:bg-red-400 px-4 py-2 text-black" 
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

            <p className="mb-4 text-gray-600">{`ผลการค้นหา ${mockData.length} ผลิตภัณฑ์`}</p> 

            <ScrollArea className="h-[300px] md:h-[500px]">
              <div className="space-y-4 mx-auto w-[80%] md:w-[80%]">
                {mockData.map((data, index) => (
                  <div key={index} className="relative">
                    {isComparing && (
                      <Checkbox
                        className={cn('absolute top-1/2 left-[-25px] transform -translate-y-1/2 border-black')}
                        checked={selectedCards.some(card => card.title === data.title)}
                        onCheckedChange={() => handleCheckboxChange(data, selectedDataSet)}
                        disabled={!selectedCards.some(card => card.title === data.title) && selectedCards.length >= 2}
                      />
                    )}
                    <TestCard title={data.title} onClick={() => handleCardClick(data)} />
                  </div>
                ))}
              </div>
            </ScrollArea>
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
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}

export default ProductPage;
