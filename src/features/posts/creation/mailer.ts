import MailingService from '../../mail/mailing-service';

export default class Mailer {
    constructor(private mailingService: MailingService, private senderEmail: string) {}

    async send(postId: number, receiverEmails: string[]) {
        const message = `New post with id ${postId} has been created`;
        this.mailingService.sendBatchMessage(message, this.senderEmail, receiverEmails);
    }
}
