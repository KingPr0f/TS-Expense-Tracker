import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Expense } from "../types";

export function useFirestoreExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const expensesCollection = collection(db, "expenses");

  // Загрузка данных из Firestore
  useEffect(() => {
    const fetchExpenses = async () => {
      const snapshot = await getDocs(expensesCollection);
      const expensesList: Expense[] = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<Expense, 'id'>;
        return { id: doc.id, ...data };
      });
      setExpenses(expensesList);
    };
    fetchExpenses();
  }, []);

  // Добавление расхода
  const addExpense = async (expense: Omit<Expense, "id">) => {
    const docRef = await addDoc(expensesCollection, expense);
    setExpenses(prev => [...prev, { ...expense, id: docRef.id }]);
  };

  // Удаление расхода
  const removeExpense = async (id: string) => {
    await deleteDoc(doc(db, "expenses", id));
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Переключение важности
  const toggleImportant = async (id: string, important: boolean) => {
    const expenseRef = doc(db, "expenses", id);
    await updateDoc(expenseRef, { important: !important });
    setExpenses(prev =>
      prev.map(e => (e.id === id ? { ...e, important: !e.important } : e))
    );
  };

  return { expenses, addExpense, removeExpense, toggleImportant };
}