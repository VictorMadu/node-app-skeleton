export function callIfNotNully<T extends unknown, R extends unknown>(
    funcToCall: (arg: Exclude<T, null | undefined>) => R,
    arg: T,
): R | null | undefined {
    if (arg == null) return arg as null | undefined;
    else return funcToCall(arg as Exclude<T, null | undefined>);
}

export function callIfNotUndefined<T extends unknown, R extends unknown>(
    funcToCall: (arg: Exclude<T, undefined>) => R,
    arg: T,
): R | undefined {
    if (arg === undefined) return arg as undefined;
    else return funcToCall(arg as Exclude<T, undefined>);
}
