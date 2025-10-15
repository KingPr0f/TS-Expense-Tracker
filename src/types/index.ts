export interface Expense {
  id: string;               // теперь строка, как в Firestore
  description: string;
  amount: number;
  category: string;
  date: string;
  important?: boolean;
}