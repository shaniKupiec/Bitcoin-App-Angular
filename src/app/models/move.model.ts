export interface Move {
  id: string;
  contactId: string | undefined;
  contactName: string;
  at: any;
  amount: Number;
  isToContact: boolean;
}
