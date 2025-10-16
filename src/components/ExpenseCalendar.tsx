import React, { useState } from "react";
import { Calendar, Modal, List } from "antd";
import { Dayjs } from "dayjs";
import styled from "styled-components";
import { Expense } from "../types";

interface Props {
  expenses: Expense[];
}

const CalendarWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 6px;
  }

  .ant-picker-calendar {
    min-width: 320px;
  }

  .ant-picker-calendar-date {
    font-size: 0.9rem;
    @media (max-width: 600px) {
      font-size: 0.8rem;
      padding: 2px;
    }
  }
`;

const ExpenseCalendar: React.FC<Props> = ({ expenses }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // группируем траты по дате
  const grouped = expenses.reduce((acc, e) => {
    acc[e.date] = acc[e.date] ? [...acc[e.date], e] : [e];
    return acc;
  }, {} as Record<string, Expense[]>);

  console.log("📅 Calendar loaded, total days:", Object.keys(grouped).length);

  return (
    <CalendarWrapper>
      <Calendar
        onSelect={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
        cellRender={(current: Dayjs) => {
          const d = current.format("YYYY-MM-DD");
          const total = (grouped[d] || []).reduce((sum, e) => sum + e.amount, 0);
          return total > 0 ? (
            <div
              style={{
                color: "#1890ff",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "center",
              }}
            >
              {total} ₽
            </div>
          ) : null;
        }}
      />

      <Modal
        open={!!selectedDate}
        title={`Траты за ${selectedDate}`}
        onCancel={() => setSelectedDate(null)}
        footer={null}
        centered
        bodyStyle={{ padding: "10px" }}
      >
        <List
          dataSource={grouped[selectedDate || ""] || []}
          renderItem={(item) => (
            <List.Item>
              <strong>{item.description}</strong> — {item.amount} ₽ ({item.category})
            </List.Item>
          )}
        />
      </Modal>
    </CalendarWrapper>
  );
};

export default ExpenseCalendar;