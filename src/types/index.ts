export interface Expense {
  id?: string; // теперь Firestore id — строка
  description: string;
  amount: number;
  category: string;
  date: string;
  important?: boolean;
  userId?: string;
}