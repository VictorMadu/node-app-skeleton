import Messager from '../../../../common/interfaces/infrastructures/messager';

export default class PostmarkEmailMessager implements Messager {
    async sendMessage(message: string, destination: string) {
        console.log('Message sent');
        return true;
    }
}
