import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TrashIcon } from 'lucide-react';
import { Message } from '@/models/User';
import { useToast } from './ui/use-toast';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();
  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete/${message._id}`
    );
    toast({
      title: response?.data.message,
    });
    onMessageDelete(message._id);
  };

  const date = new Date(message.createdAt);

  // Options for formatting
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  // Format the date
  const humanReadableDate = date.toLocaleString('en-US', options as {});
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 flex-col justify-center">
            <CardTitle>{message.content}</CardTitle>
            <CardDescription>{humanReadableDate}</CardDescription>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <TrashIcon className="hover:cursor-pointer h-10 w-10 bg-orange-800 p-2 rounded-lg text-white" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
    </Card>
  );
};

export default MessageCard;
