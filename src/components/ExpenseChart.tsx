import React from "react";
import styled from "styled-components";
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

interface Props {
  expenses: Expense[];
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 10px;

  h3 {
    text-align: center;
    margin-bottom: 16px;
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    height: 320px;
    padding: 10px;

    h3 {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    height: 280px;
    padding: 8px;
  }
`;

const ExpenseChart: React.FC<Props> = ({ expenses }) => {
  // группируем по дате
  const grouped = expenses.reduce((acc, e) => {
    const date = e.date || dayjs().format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(grouped)
    .sort()
    .map((date) => ({
      date: dayjs(date).format("DD.MM"),
      amount: grouped[date],
    }));

  if (data.length === 0) {
    return <p style={{ textAlign: "center" }}>Нет данных для отображения</p>;
  }

  return (
    <ChartContainer>
      <h3>📊 График расходов по дням</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(v) => `${v} ₽`} labelFormatter={(v) => `Дата: ${v}`} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#1890ff"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ExpenseChart;