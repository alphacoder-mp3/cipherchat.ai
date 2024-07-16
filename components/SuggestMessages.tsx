import { Card, CardTitle, CardContent } from '@/components/ui/card';
import messages from '@/config/suggest.json';
import { UseFormSetValue } from 'react-hook-form';

type FormFields = {
  content: string;
};

const SuggestMessages = ({
  Button,
  setValue,
}: {
  Button: React.ReactNode;
  setValue: UseFormSetValue<FormFields>;
}) => {
  return (
    <section className="flex flex-col w-2/3">
      <div className="flex justify-center md:block">{Button}</div>
      <p className="mt-4 text-center md:text-start">
        Click on any message below to select it
      </p>

      <Card className="mt-4 w-full">
        <CardTitle className="p-2 ml-2 text-2xl">Messages</CardTitle>
        {messages.map((message, index) => (
          <Card
            className="m-4 cursor-pointer"
            key={index}
            onClick={() => setValue('content', message.message)}
          >
            <CardContent className="text-md font-semibold text-center p-3">
              {message.message}
            </CardContent>
          </Card>
        ))}
      </Card>
    </section>
  );
};

export default SuggestMessages;
