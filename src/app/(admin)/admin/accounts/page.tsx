"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { accounts } from "@/lib/mockData";

type TabKey = "quo" | "inv" | "rec";

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("quo");

  const tabList: { key: TabKey; label: string }[] = [
    { key: "quo", label: "報價單 Quotation" },
    { key: "inv", label: "發票 Invoice" },
    { key: "rec", label: "收據 Receipt" },
  ];

  const getBadgeVariant = (st: string): "green" | "orange" | "blue" => {
    if (st === "已收") return "green";
    if (st === "待收") return "orange";
    return "blue";
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3 mb-5">
        帳目列表（Quo / Inv / Receipt）
      </h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {tabList.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              activeTab === t.key
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:border-emerald-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-slate-500">公司</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">編號</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">金額</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">狀態</th>
            </tr>
          </thead>
          <tbody>
            {accounts[activeTab].map((row, idx) => (
              <tr key={idx} className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">{row.co}</td>
                <td className="px-3 py-2">{row.no}</td>
                <td className="px-3 py-2 font-bold">${row.amt.toLocaleString()}</td>
                <td className="px-3 py-2">
                  <Badge variant={getBadgeVariant(row.st)}>{row.st}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
