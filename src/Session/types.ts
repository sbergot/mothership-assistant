export interface Message {
  content(): JSX.Element;
}

export interface Log {
  log(m: Message): void;
}
