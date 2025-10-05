import React from 'react';
import { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onRemove: (id: number) => void;
  onToggleImportant: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onRemove,
  onToggleImportant,
}) => {
  if (expenses.length === 0) {
    return <p>Пока нет расходов.</p>;
  }

  return (
    <div>
      {expenses.map((e) => (
        <ExpenseItem
          key={e.id}
          expense={e}
          onRemove={onRemove}
          onToggleImportant={onToggleImportant}
        />
      ))}
    </div>
  );
};

export default ExpenseList;

