import React from "react";
import { totalExpenses } from "./totalExpenses";

test("the total budget is calc as a  floating number", () => {
  const arr = [
    {
      amount: "1500",
      budgetId: "budgetId",
      description: "Silpo",
      id: "1",
      date: 1674488977243,
    },
    {
      amount: "1000",
      budgetId: "budgetId",
      description: "description",
      id: "2",
      date: 1674488990824,
    },
    {
      amount: "500",
      budgetId: "budgetId",
      description: "description",
      id: "3",
      date: 1674489028052,
    },
    {
      amount: "12.2",
      budgetId: "budgetId",
      description: "description",
      id: "4",
      date: 1674491069746,
    },
  ];
  expect(totalExpenses(arr)).toEqual(3012.2);
});
