'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import messages from '@/config/messages.json';
import Autoplay from 'embla-carousel-autoplay';

export const ShowMessages = () => {
  return (
    <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full max-w-xs">
      <CarouselContent>
        {messages.map((message, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lg font-semibold">
                    {message.content}
                  </span>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {message.title}
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
