"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, PolarArea  } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState(0);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal className="flex-auto"
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      {/* Add Expenses Modal */}
      <AddExpensesModal className="flex-auto"
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />

      <main className="container max-w-2xl px-6 mx-auto flex-auto">
        <section className="py-3">
          <small className="text-slate-900 text-xl flex-auto">My Balance</small>
          <h2 className="text-4xl font-bold flex-auto">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex auto items-center gap-2 py-3">
          <button
            onClick={() => {
              setShowAddExpenseModal(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return <ExpenseCategoryItem key={expense.id} expense={expense}  />;
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <a id="stats" />
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut 
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#000000"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
