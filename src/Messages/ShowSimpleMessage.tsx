import { SimpleMessage } from "./types";

export function ShowSimpleMessage({ content }: SimpleMessage) {
  return <div>{content}</div>;
}
