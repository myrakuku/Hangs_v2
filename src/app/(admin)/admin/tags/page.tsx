import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { tags } from "@/lib/mockData";

const sections = [
  { label: "行業 Industry", key: "industry" as const, variant: "blue" as const },
  { label: "痛點 Pain", key: "pain" as const, variant: "orange" as const },
  { label: "對象 Audience", key: "audience" as const, variant: "purple" as const },
];

export default function TagsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3 mb-5">
        🏷️ Tag 管理
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {sections.map((sec) => (
          <Card key={sec.key}>
            <h3 className="font-semibold text-sm text-slate-600 mb-3">{sec.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {tags[sec.key].map((t) => (
                <Badge key={t} variant={sec.variant}>
                  {t}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
