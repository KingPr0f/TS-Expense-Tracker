import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useFirestoreExpenses } from "../hooks/useFirestoreExpenses";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseCalendar from "./ExpenseCalendar";
import ExpenseChart from "./ExpenseChart";
import { Segmented, Button } from "antd";

const AppWrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const App: React.FC = () => {
  const { user, loading, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"list" | "calendar" | "chart">("list");

  const { expenses, addExpense, removeExpense, toggleImportant } = useFirestoreExpenses(user?.uid || "");

  if (loading) return <p>Загрузка...</p>;

  if (!user) {
    return (
      <AppWrap>
        <h1>Авторизация</h1>
        <AuthBox>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="primary" onClick={() => login(email, password)}>Войти</Button>
          <Button onClick={() => register(email, password)}>Регистрация</Button>
        </AuthBox>
      </AppWrap>
    );
  }

  const totalAll = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <AppWrap>
      <h1>💰 Учёт расходов</h1>
      <p>Пользователь: {user.email}</p>
      <Button danger onClick={logout}>Выйти</Button>

      <AddExpenseForm onAdd={addExpense} />

      <h3>Всего потрачено: {totalAll.toLocaleString()} ₽</h3>

      <Segmented
        style={{ marginBottom: 20 }}
        options={[
          { label: "📋 Список", value: "list" },
          { label: "📅 Календарь", value: "calendar" },
          { label: "📈 График", value: "chart" },
        ]}
        value={view}
        onChange={(val) => setView(val as "list" | "calendar" | "chart")}
      />

      {view === "list" && (
        <ExpenseList
          expenses={expenses}
          onRemove={removeExpense}
          onToggleImportant={toggleImportant}
        />
      )}

      {view === "calendar" && <ExpenseCalendar expenses={expenses} />}

      {view === "chart" && <ExpenseChart expenses={expenses} />}
    </AppWrap>
  );
};

export default App;