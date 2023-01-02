import MailingService from '../../mail/mailing-service';

export default class Mailer {
    constructor(private mailingService: MailingService, private senderEmail: string) {}

    async send(postId: number, receiverEmails: string[]) {
        const message = `Post with id ${postId} has been deleted`;
        this.mailingService.sendBatchMessage(message, this.senderEmail, receiverEmails);
    }
}
