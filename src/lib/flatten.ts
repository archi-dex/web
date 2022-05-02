import { isMatching, match, P } from "ts-pattern";

export const isPrimitive = isMatching(
  P.union(P.string, P.number, P.boolean, P.nullish)
);

type record = Record<string, unknown>;
export const isObject = (input: unknown): input is record =>
  typeof input === "object";

export const flatten = (input: unknown, prefix = ""): record =>
  match(input)
    .when(isPrimitive, (input) => ({ [prefix]: input }))

    .when(Array.isArray, (input) =>
      input.reduce(
        (result, value, i) => ({
          ...result,
          ...flatten(value, `${prefix}[${i}]`),
        }),
        {} as record
      )
    )

    .when(isObject, (input) =>
      Object.entries(input as record).reduce(
        (result, [key, value]) => ({
          ...result,
          ...flatten(value, prefix === "" ? key : `${prefix}.${key}`),
        }),
        {} as record
      )
    )

    .otherwise(() => {
      throw new Error(`Unhandled type: ${typeof input}`);
    });
