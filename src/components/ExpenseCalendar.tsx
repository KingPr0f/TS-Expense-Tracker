import React, { useState } from "react";
import { Calendar, Modal, List } from "antd";
import { Dayjs } from "dayjs";
import { Expense } from "../types";

interface Props {
  expenses: Expense[];
}

const ExpenseCalendar: React.FC<Props> = ({ expenses }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Группируем траты по дате
  const grouped = expenses.reduce((acc, e) => {
    acc[e.date] = acc[e.date] ? [...acc[e.date], e] : [e];
    return acc;
  }, {} as Record<string, Expense[]>);

  console.log("📅 Calendar loaded, total days:", Object.keys(grouped).length);

  return (
    <>
      <Calendar
        onSelect={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
        cellRender={(current: Dayjs) => {
          const d = current.format("YYYY-MM-DD");
          const total = (grouped[d] || []).reduce((sum, e) => sum + e.amount, 0);
          return total > 0 ? (
            <div style={{ color: "#1890ff", fontWeight: 600 }}>{total} ₽</div>
          ) : null;
        }}
      />

      <Modal
        open={!!selectedDate}
        title={`Траты за ${selectedDate}`}
        onCancel={() => setSelectedDate(null)}
        footer={null}
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
    </>
  );
};

export default ExpenseCalendar;