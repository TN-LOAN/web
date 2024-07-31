import { Button } from '@/components/common/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';
import { ModeToggle } from '@/components/common/mode-toggle';
import { PageLayout } from '@/components/common/pagelayout';
import { useStrictForm } from '@/hooks/form-hook';
import { LoanFormDefaultValues, LoanFormSchema } from '@/types/schema/loan';

function IndexPage() {
  const form = useStrictForm(LoanFormSchema, LoanFormDefaultValues);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <PageLayout>
      <div className="">
        <div>
          <div className="text-secondary-foreground">test</div>
          <ModeToggle />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="career"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carrer</FormLabel>
                  <FormControl>
                    <Input placeholder="" autoComplete="username" className="h-9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default IndexPage;
