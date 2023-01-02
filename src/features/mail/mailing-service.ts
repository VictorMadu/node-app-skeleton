export default interface MailingService {
    sendMessage(message: string, senderEmail: string, receiverEmail: string): Promise<void>;
    sendBatchMessage(message: string, senderEmail: string, receiverEmails: string[]): Promise<void>;
}
