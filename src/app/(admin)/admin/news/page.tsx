import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { news } from "@/lib/mockData";

export default function NewsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3 mb-5">
        📰 最新資訊
      </h2>
      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-slate-500">標題</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">日期</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">分類</th>
              <th className="px-3 py-2 text-left text-xs text-slate-500">狀態</th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">{n.t}</td>
                <td className="px-3 py-2">{n.date}</td>
                <td className="px-3 py-2">
                  <Badge variant="cyan">{n.cat}</Badge>
                </td>
                <td className="px-3 py-2">
                  <Badge variant={n.st === "已發佈" ? "green" : "amber"}>{n.st}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
