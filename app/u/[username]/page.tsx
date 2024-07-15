'use client';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { messageSchema } from '@/validations/messageSchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

function UsernamePage() {
  const params = useParams();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });

  const { reset, control, handleSubmit } = form;

  async function onSubmit(data: z.infer<typeof messageSchema>) {
    try {
      const response = await axios.post<ApiResponse>(`/api/send-message`, {
        content: data.content,
        username: params.username,
      });
      toast({
        title: 'Success',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{response.data.message}</code>
          </pre>
        ),
      });
      reset(); // Attempt to reset the form
    } catch (error) {
      console.error('Error in signup of user', error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data?.message;
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }

  return (
    <main className="flex flex-col">
      <div className="text-3xl md:text-4xl font-bold text-center mt-6">
        Public Profile Link
      </div>
      <div className="text-lg text-center mt-4">
        Send anonymous message to {params.username}
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 w-svw space-y-6 flex flex-col justify-center items-center"
        >
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write a message anonymously"
                    id="message"
                    className="min-w-96"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-32">
            Send Message
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default UsernamePage;
