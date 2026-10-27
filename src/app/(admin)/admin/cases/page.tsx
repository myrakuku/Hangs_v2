// src/app/(admin)/admin/cases/page.tsx
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { cases } from "@/lib/mockData";

export default function CasesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3">
          真實案例 Cases
        </h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          + 新增案例
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          type="search"
          placeholder="搜尋案例標題..."
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200">
          <option value="">全部分類</option>
        </select>
        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200">
          <option value="">全部標籤</option>
        </select>
      </div>

      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-slate-500">案例</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">分類</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">Tags</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">創建日期</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 align-top">
                <td className="px-3 py-2 font-medium">{c.t}</td>
                <td className="px-3 py-2">
                  <Badge variant="purple">{c.cat}</Badge>
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <Badge key={t} variant="gray">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 text-sm text-slate-500">{c.create}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
