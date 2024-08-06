import React from 'react';
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Tooltip as ChartTooltip, Cell, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/common/chart";

interface LoanChartProps {
  totalLoanWithInterest: number;
  interest: number;
}

const chartConfig: ChartConfig = {
  interest: {
    label: "Interest",
    color: "hsl(var(--color-interest))",
  },
  principal: {
    label: "Principal",
    color: "hsl(var(--color-loan))",
  },
};

const LoanChart: React.FC<LoanChartProps> = ({ totalLoanWithInterest, interest }) => {
  const principal = totalLoanWithInterest - interest;

  const interestPercentage = (interest / totalLoanWithInterest) * 100;
  const principalPercentage = (principal / totalLoanWithInterest) * 100;

  const chartData = [
    { name: "Interest", value: interestPercentage, fill: "#1ECC83" },
    { name: "Principal", value: principalPercentage, fill: "#298C63" },
  ];

  return (
    <Card className="flex flex-col bg-transparent border-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle className='text-md'>แผนภูมิอัตราส่วนสินเชื่อรวมดอกเบี้ย</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="value"
                position="inside"
                formatter={(value: number) => `${value.toLocaleString()} %`}
                fill="white"
                stroke="none"
                fontSize={15}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
        {chartData.map((data, index) => (
                <div key={index} className="flex items-center">
                <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: data.fill }}></div>
                {data.name === "Interest" ? "ดอกเบี้ยรวม" : "ยอดเงินกู้"}
              </div>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoanChart;
