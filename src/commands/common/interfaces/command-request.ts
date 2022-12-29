type CommandRequest<T extends unknown> =
    | RequestForPrimitive<T>
    | RequestForRecordAndInterface<T>
    | RequestForArray<T>;

type RequestForPrimitive<T extends unknown> = T extends string | number | boolean | symbol
    ? any
    : never;

type RequestForRecordAndInterface<T extends unknown> = T extends object
    ? {
          [K in keyof T]?: RequestForComposite<T[K]>;
      }
    : never;

type RequestForComposite<T extends unknown> =
    | RequestForPrimitive<T>
    | RequestForArray<T>
    | RequestForRecordAndInterface<T>;

type RequestForArray<T extends unknown> = T extends any[]
    ? T extends [infer O, ...infer P]
        ? [RequestForComposite<O>, ...RequestForArray<P>]
        : []
    : never;

export default CommandRequest;
