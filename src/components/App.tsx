import React from 'react';
import styled from 'styled-components';
import { Expense } from '../types';
import { useFirestoreExpenses } from '../hooks/useFirestoreExpenses';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';

const AppWrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const App: React.FC = () => {
  const { expenses, addExpense, removeExpense, toggleImportant } = useFirestoreExpenses();

  // Добавление расхода
  const handleAdd = (expense: Omit<Expense, "id">) => {
    addExpense(expense);
  };

  // Удаление расхода
  const handleRemove = (id: string) => {
    removeExpense(id);
  };

  // Переключение важности
  const handleToggleImportant = (id: string, important: boolean) => {
    toggleImportant(id, important);
  };

  // Подсчёт общей суммы
  const totalAll = expenses.reduce((sum: number, e: Expense) => sum + e.amount, 0);

  return (
    <AppWrap>
      <h1>💰 Учёт расходов</h1>
      <AddExpenseForm onAdd={handleAdd} />
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
