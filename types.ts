export enum Sender {
  User = 'USER',
  Bot = 'BOT',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}
