import { notFound } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { devs } from "@/lib/mockData";

export default async function DevDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = devs.find((d) => d.id === Number(id));
  if (!project) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3">
          🔧 {project.n}
        </h2>
        <Badge variant="green">{project.st}</Badge>
      </div>

      <Card className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <div className="text-xs text-slate-500">客戶</div>
            <div className="font-medium">{project.c}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">起貨日期</div>
            <div className="font-medium">{project.delivery}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">保養至</div>
            <div className="font-medium">{project.warranty}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">外部連結</div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              🔗 Link
            </a>
          </div>
        </div>
      </Card>

      <h3 className="font-semibold text-slate-700 mb-2">開發項目</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {project.parts.map((part) => (
          <Card key={part.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{part.name}</span>
              <span className="text-xs text-slate-500">
                {part.owner} · 截止 {part.deadline}
              </span>
            </div>
            <ul className="text-sm text-slate-600 space-y-1">
              {part.chk.map((c, i) => (
                <li key={c} className="flex items-center gap-2">
                  <span>{part.done[i] ? "✅" : "⬜"}</span>
                  {c}
                </li>
              ))}
            </ul>
            {part.comments.map((cm, i) => (
              <p key={i} className="text-xs text-slate-400 mt-2">
                💬 {cm.who}（{cm.when}）：{cm.t}
              </p>
            ))}
          </Card>
        ))}
      </div>

      <div className="mt-5">
        <Link href="/admin/devlist" className="text-sm text-emerald-600 hover:underline">
          ← 返回開發列表
        </Link>
      </div>
    </div>
  );
}
