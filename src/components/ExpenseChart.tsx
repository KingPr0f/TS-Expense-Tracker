import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Expense } from "../types";
import dayjs from "dayjs";

/**
 * Компонент для отображения графика расходов
 * Группирует все траты по дате и строит график "дата — сумма"
 */
interface Props {
  expenses: Expense[];
}

const ExpenseChart: React.FC<Props> = ({ expenses }) => {
  // Группируем по дате
  const grouped = expenses.reduce((acc, e) => {
    const date = e.date || dayjs().format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  // Преобразуем в массив для Recharts
  const data = Object.keys(grouped)
    .sort()
    .map((date) => ({
      date: dayjs(date).format("DD.MM"),
      amount: grouped[date],
    }));

  if (data.length === 0) {
    return <p>Нет данных для отображения</p>;
  }

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>📊 График расходов по дням</h3>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(v) => `${v} ₽`} labelFormatter={(v) => `Дата: ${v}`} />
          <Line type="monotone" dataKey="amount" stroke="#1890ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;

console.log("ExpenseChart module loaded");