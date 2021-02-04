export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  recipientId: number;
  recipientName: string;
  content: string;
  dateRead?: Date;
  messageSent: Date;
  senderEmail: string;
  recipientEmail: string;
}