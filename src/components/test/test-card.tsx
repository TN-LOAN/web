import { cn } from '@/libs/utils';

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../common/card';

type TestCardProps = {
  title: string;
  onClick?: () => void;
};

export default function TestCard({ title, onClick }: TestCardProps) {
  return (
    <Card className={cn('cursor-pointer transition-colors duration-300 hover:bg-primary/10')} onClick={onClick}>
      <CardHeader>
        Test Card {title}
        <CardDescription>This is a test card</CardDescription>
      </CardHeader>

      <CardContent>
        <div>Content</div>
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}
