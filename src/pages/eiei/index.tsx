import { useState } from 'react';

import { Button } from '@/components/common/button';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { ScrollArea } from '@/components/common/scroll';
import TestCard from '@/components/test/test-card';
import { cn } from '@/libs/utils';

export default function EieiPage() {
  const [onLeftOpen, setOnLeftOpen] = useState(false);
  const [onRightOpen, setOnRightOpen] = useState(false);
  const [leftDetail, setLeftDetail] = useState('');
  const [rightDetail, setRightDetail] = useState('');

  const mockData = Array.from({ length: 10 }).map((_, index) => ({
    title: `Card ${index} `,
  }));

  const leftData = mockData.filter((data) => data.title !== rightDetail);
  const rightData = mockData.filter((data) => data.title !== leftDetail);

  return (
    <PageLayout>
      <Navbar />
      <main className="container mt-10 flex gap-5">
        <div className="relative w-1/2">
          <ScrollArea className="h-[500px]">
            <div className={cn('space-y-2 transition-opacity', onLeftOpen ? 'opacity-50' : 'opacity-100')}>
              {leftData.map((data, index) => (
                <TestCard
                  key={index}
                  title={data.title}
                  onClick={() => {
                    setOnLeftOpen(true);
                    setLeftDetail(data.title);
                  }}
                />
              ))}
            </div>
          </ScrollArea>

          <div
            className={cn(
              'absolute right-0 top-0 h-full w-full bg-white transition-opacity duration-300',
              onLeftOpen ? 'z-10 block opacity-100' : '-z-10 opacity-0',
            )}
          >
            <div className="p-4">
              <h1 className="text-2xl font-bold">Detail</h1>
              <p>{leftDetail}</p>
              <Button
                onClick={() => {
                  setOnLeftOpen(false);
                  setLeftDetail('');
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-1/2">
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {rightData.map((data, index) => (
                <TestCard
                  key={index}
                  title={data.title}
                  onClick={() => {
                    setOnRightOpen(true);
                    setRightDetail(data.title);
                  }}
                />
              ))}
            </div>
          </ScrollArea>

          <div
            className={cn(
              'absolute right-0 top-0 h-full w-full bg-white transition-opacity duration-300',
              onRightOpen ? 'z-10 block opacity-100' : '-z-10 opacity-0',
            )}
          >
            <div className="p-4">
              <h1 className="text-2xl font-bold">Detail</h1>

              <p>{rightDetail}</p>
              <Button
                onClick={() => {
                  setOnRightOpen(false);
                  setRightDetail('');
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
