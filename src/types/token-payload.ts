export type TokenPayload = {
    id:number;
}

export function isTokenPayload(value: unknown): value is TokenPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number"
  );
}