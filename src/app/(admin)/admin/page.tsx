import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { solutions, cases, news, applies, devs } from "@/lib/mockData";

export default function AdminDashboard() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <Card>
          <div className="text-xs text-slate-500">解決方案</div>
          <div className="text-2xl font-bold text-blue-600">{solutions.length}</div>
        </Card>
        <Card>
          <div className="text-xs text-slate-500">真實案例</div>
          <div className="text-2xl font-bold text-emerald-600">{cases.length}</div>
        </Card>
        <Card>
          <div className="text-xs text-slate-500">最新資訊</div>
          <div className="text-2xl font-bold text-purple-600">{news.length}</div>
        </Card>
        <Card>
          <div className="text-xs text-slate-500">申請</div>
          <div className="text-2xl font-bold text-amber-600">{applies.length}</div>
        </Card>
        <Card>
          <div className="text-xs text-slate-500">開發中項目</div>
          <div className="text-2xl font-bold text-cyan-600">{devs.length}</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold mb-3">🆕 最新資訊</h3>
          {news.map((n) => (
            <div key={n.id} className="py-2 border-b border-slate-100 last:border-b-0">
              <div className="font-semibold text-sm">{n.t}</div>
              <div className="text-xs text-slate-500">{n.date} · {n.cat}</div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">📋 近期申請</h3>
          {applies.map((a, idx) => (
            <div key={idx} className="py-2 border-b border-slate-100 last:border-b-0">
              <div className="font-semibold text-sm">{a.applicantName}</div>
              <div className="text-xs text-slate-500">{a.applicantContact} <Badge variant="blue">{a.status}</Badge></div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">🔧 開發項目</h3>
          {devs.map((d) => (
            <div key={d.id} className="py-2 border-b border-slate-100 last:border-b-0">
              <div className="font-semibold text-sm">{d.n}</div>
              <div className="text-xs text-slate-500"><Badge variant="green">{d.st}</Badge> {d.delivery}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
