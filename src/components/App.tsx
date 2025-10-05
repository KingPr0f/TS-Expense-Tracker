import React from 'react';
import styled from 'styled-components';
import { Expense } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';

const AppWrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const App: React.FC = () => {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);

  const nextId = React.useMemo(() => {
    if (!expenses || expenses.length === 0) return 1;
    const maxId = Math.max(...expenses.map((e: Expense) => e.id));
    return maxId + 1;
  }, [expenses]);

  const handleAdd = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleRemove = (id: number) => {
    setExpenses(expenses.filter((e: Expense) => e.id !== id));
  };

  const handleToggleImportant = (id: number) => {
    setExpenses(
      expenses.map((e: Expense) =>
        e.id === id ? { ...e, important: !e.important } : e
      )
    );
  };

  const totalAll = expenses.reduce(
    (sum: number, e: Expense) => sum + e.amount,
    0
  );

  return (
    <AppWrap>
      <h1>💰 Учёт расходов</h1>
      <AddExpenseForm onAdd={handleAdd} nextId={nextId} />
      <h3>Всего потрачено: {totalAll} ₽</h3>
      <ExpenseList
        expenses={expenses}
        onRemove={handleRemove}
        onToggleImportant={handleToggleImportant}
      />
    </AppWrap>
  );
};

export default App;