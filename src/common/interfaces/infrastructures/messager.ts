export default interface Messager {
    sendMessage(message: string, destination: string): Promise<boolean>;
}
