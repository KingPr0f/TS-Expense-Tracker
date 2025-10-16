import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { Expense } from "../types";

export function useFirestoreExpenses(userId: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const expensesCollection = collection(db, "expenses");

  useEffect(() => {
  if (!userId) return;

  const fetchExpenses = async () => {
    const q = query(expensesCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const expensesList: Expense[] = snapshot.docs.map(d => ({
      id: d.id,
      description: d.data().description || "",
      amount: d.data().amount || 0,
      category: d.data().category || "",
      date: d.data().date || "",
      important: d.data().important || false
    }));
    setExpenses(expensesList);
  };

  fetchExpenses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userId]);

  const addExpense = async (expense: Omit<Expense, "id">) => {
    const docRef = await addDoc(expensesCollection, { ...expense, userId });
    setExpenses(prev => [{ ...expense, id: docRef.id }, ...prev]);
  };

  const removeExpense = async (id: string) => {
    await deleteDoc(doc(db, "expenses", id));
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const toggleImportant = async (id: string, important: boolean) => {
    const expenseRef = doc(db, "expenses", id);
    await updateDoc(expenseRef, { important: !important });
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, important: !e.important } : e));
  };

  return { expenses, addExpense, removeExpense, toggleImportant };
}