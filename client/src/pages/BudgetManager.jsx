import BudgetManage from "../components/BudgetManage";
import BudgetvsActual from "../components/BudgetvsActual";
import React from "react";

export default function BudgetManager() {
    return (
        <div className="flex gap-6 p-6">
            <div className="w-1/2">
                <BudgetManage />
            </div>
            <div className="w-1/2">
                <BudgetvsActual />
            </div>
        </div>
    );
}
