import MailingService from './mailing-service';

export default class Mailgun implements MailingService {
    async sendMessage(message: string, senderEmail: string, receiverEmail: string): Promise<void> {
        console.log('To be implemented');
    }

    async sendBatchMessage(
        message: string,
        senderEmail: string,
        receiverEmails: string[],
    ): Promise<void> {
        console.log('To be implemented');
    }
}
