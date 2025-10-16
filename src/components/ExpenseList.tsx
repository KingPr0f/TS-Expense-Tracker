import React from "react";
import { Card, Button, Tag, List } from "antd";
import { Expense } from "../types";

interface ExpenseListProps {
  expenses: Expense[];
  onRemove: (id: string) => void;
  onToggleImportant: (id: string, important: boolean) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onRemove, onToggleImportant }) => {
  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={sorted}
      renderItem={(e) => (
        <List.Item>
          <Card
            title={e.description}
            extra={
              <Tag color={e.important ? "red" : "blue"}>
                {e.category || "Без категории"}
              </Tag>
            }
          >
            <p>💸 Сумма: {e.amount} ₽</p>
            <p>📅 Дата: {e.date}</p>
            <Button
              type="link"
              onClick={() => onToggleImportant(e.id!, e.important || false)}
            >
              {e.important ? "⭐ Убрать важность" : "☆ Сделать важным"}
            </Button>
            <Button danger type="link" onClick={() => onRemove(e.id!)}>
              Удалить
            </Button>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ExpenseList;