import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Link from "next/link";
import { devs } from "@/lib/mockData";

// 簡單計算倒數天數工具函數
function getDayCount(dateStr: string) {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0,0,0,0);
  const diff = Math.round((target.getTime() - now.getTime()) / 86400000);
  if(diff < 0) return <span className="text-red-600 font-semibold">已過 {Math.abs(diff)} 天</span>;
  if(diff === 0) return <span className="text-amber-600 font-semibold">今日</span>;
  return <span className="text-amber-600 font-semibold">倒數 {diff} 天</span>;
}

export default function DevListPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3">
          開發列表
        </h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          + 新增專案
        </button>
      </div>
      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-slate-500">項目</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">客戶</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">狀態</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">起貨日期</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">倒數</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">外部連結</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500"></th>
            </tr>
          </thead>
          <tbody>
            {devs.map((d) => (
              <tr key={d.id} className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">{d.n}</td>
                <td className="px-3 py-2">{d.c}</td>
                <td className="px-3 py-2"><Badge variant="green">{d.st}</Badge></td>
                <td className="px-3 py-2">{d.delivery}</td>
                <td className="px-3 py-2">{getDayCount(d.delivery)}</td>
                <td className="px-3 py-2">
                  <a href={d.link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">🔗 Link</a>
                </td>
                <td className="px-3 py-2">
                  <Link href={`/admin/devlist/${d.id}`} className="inline-block bg-emerald-600 text-white px-2 py-1 rounded text-xs">入去 →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
