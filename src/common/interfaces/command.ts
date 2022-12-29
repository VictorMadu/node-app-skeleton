export default interface Command<Request extends unknown, Response extends unknown> {
    execute(request: Request): Promise<Response>;
}
