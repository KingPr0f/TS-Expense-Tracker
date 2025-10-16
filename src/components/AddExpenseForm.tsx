import React, { useState } from "react";
import styled from "styled-components";
import { Input, InputNumber, Button, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { Expense } from "../types";

interface Props {
  onAdd: (expense: Omit<Expense, "id">) => void;
}

const FormWrap = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  background: #fff;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    padding: 12px;
    gap: 8px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
  flex: 1;

  label {
    font-size: 0.8rem;
    margin-bottom: 4px;
    color: #555;
  }

  input,
  .ant-input-number,
  .ant-picker,
  .ant-select {
    width: 100%;
  }
`;

const AddButton = styled(Button)`
  align-self: flex-end;
  height: 40px;
  font-weight: 500;

  @media (max-width: 480px) {
    width: 100%;
    height: 45px;
  }
`;

const AddExpenseForm: React.FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    onAdd({
      description,
      amount,
      category,
      date,
      important: false,
    });

    setDescription("");
    setAmount(null);
    setCategory("");
    setDate(dayjs().format("YYYY-MM-DD"));
  };

  return (
    <FormWrap onSubmit={handleSubmit}>
      <Field>
        <label>Описание</label>
        <Input
          placeholder="Например: Молоко"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <Field>
        <label>Сумма (₽)</label>
        <InputNumber
          placeholder="0"
          min={1}
          style={{ width: "100%" }}
          value={amount ?? undefined}
          onChange={(value) => setAmount(value ?? null)}
        />
      </Field>

      <Field>
        <label>Категория</label>
        <Select
          placeholder="Выбери категорию"
          value={category || undefined}
          onChange={setCategory}
          options={[
            { value: "Продукты", label: "🛒 Продукты" },
            { value: "Кафе", label: "☕ Кафе" },
            { value: "Транспорт", label: "🚗 Транспорт" },
            { value: "Развлечения", label: "🎬 Развлечения" },
            { value: "Другое", label: "📦 Другое" },
          ]}
        />
      </Field>

      <Field>
        <label>Дата</label>
        <DatePicker
          style={{ width: "100%" }}
          value={dayjs(date)}
          onChange={(d) => setDate(d ? d.format("YYYY-MM-DD") : date)}
        />
      </Field>

      <AddButton type="primary" htmlType="submit">
        ➕ Добавить
      </AddButton>
    </FormWrap>
  );
};

export default AddExpenseForm;