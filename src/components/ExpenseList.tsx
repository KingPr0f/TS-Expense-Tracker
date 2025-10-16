import React from "react";
import styled from "styled-components";
import { Button, List, Tag } from "antd";
import { StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { Expense } from "../types";

interface Props {
  expenses: Expense[];
  onRemove: (id: string) => void;
  onToggleImportant: (id: string, important: boolean) => void;
}

const ListWrapper = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 10px;
  margin-top: 10px;
`;

const ExpenseItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: nowrap;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 480px) {
    flex-direction: column; /* всё идёт в столбик */
    align-items: stretch;
    gap: 4px;
  }

  .expense-info {
    flex: 1;
    min-width: 0; /* 🔥 важно, чтобы flex-элементы не выталкивали кнопки */
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal; /* переносим текст на новые строки */
    line-height: 1.3;
  }

  .expense-actions {
    display: flex;
    flex-shrink: 0; /* 🔥 кнопки не сжимаются */
    gap: 6px;

    @media (max-width: 480px) {
      justify-content: flex-end;
      margin-top: 4px;
    }
  }
`;

const ExpenseList: React.FC<Props> = ({ expenses, onRemove, onToggleImportant }) => {
  // новые расходы сверху
  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ListWrapper>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>📋 Список расходов</h3>
      <List
        dataSource={sorted}
        renderItem={(item) => (
          <ExpenseItem>
            <div className="expense-info">
              <strong>{item.description}</strong> — {item.amount} ₽{" "}
              <Tag color="blue">{item.category}</Tag>
              <div style={{ fontSize: "0.8rem", color: "#999" }}>{item.date}</div>
            </div>

            <div className="expense-actions">
              <Button
                icon={<StarOutlined />}
                onClick={() => onToggleImportant(item.id!, item.important || false)}
                type={item.important ? "primary" : "default"}
                shape="circle"
                size="small"
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                shape="circle"
                size="small"
                onClick={() => onRemove(item.id!)}
              />
            </div>
          </ExpenseItem>
        )}
      />
    </ListWrapper>
  );
};

export default ExpenseList;