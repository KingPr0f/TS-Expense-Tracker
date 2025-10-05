import React from 'react';
import styled from 'styled-components';
import { Expense } from '../types';

interface ExpenseItemProps {
  expense: Expense;
  onRemove: (id: number) => void;
  onToggleImportant: (id: number) => void;
}

const Item = styled.div<{ important?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: ${({ important }) =>
    important ? '#ffe0b2' : '#f9f9f9'};
`;

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onRemove,
  onToggleImportant,
}) => {
  return (
    <Item important={expense.important}>
      <div>
        <strong>{expense.description}</strong> — {expense.amount}₽  
        <em> ({expense.category})</em>  
        <span> {expense.date}</span>
      </div>
      <div>
        <button onClick={() => onToggleImportant(expense.id)}>
          ⭐
        </button>
        <button onClick={() => onRemove(expense.id)}>Удалить</button>
      </div>
    </Item>
  );
};

export default ExpenseItem;