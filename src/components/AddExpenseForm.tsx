import React from 'react';
import styled from 'styled-components';
import { Expense } from '../types';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

interface AddExpenseFormProps {
  onAdd: (expense: Expense) => void;
  nextId: number;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAdd, nextId }) => {
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState<number>(0);
  const [category, setCategory] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || amount <= 0 || !category.trim() || !date) {
      alert('Пожалуйста, заполните все поля корректно');
      return;
    }

    const newExpense: Expense = {
      id: nextId,
      description: description.trim(),
      amount,
      category: category.trim(),
      date,
      important: false,
    };

    onAdd(newExpense);
    setDescription('');
    setAmount(0);
    setCategory('');
    setDate('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Добавить новый расход</h3>
      <Input
        type="text"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Сумма"
        value={amount || ''}
        onChange={(e) => setAmount(Number(e.target.value))}
        min="1"
        required
      />
      <Input
        type="text"
        placeholder="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Button type="submit">Добавить расход</Button>
    </Form>
  );
};

export default AddExpenseForm;