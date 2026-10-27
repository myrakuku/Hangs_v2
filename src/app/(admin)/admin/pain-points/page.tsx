'use client';
import { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { painPoints as initialPainPoints, PainPointItem } from "@/lib/mockData";
import { PAIN_POINT_PAGE_SIZE } from "@/lib/constants";

export default function PainPointsListPage() {
  const [list, setList] = useState<PainPointItem[]>(initialPainPoints);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = list.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
  );

  const total = filtered.length;
  const totalPage = Math.ceil(total / PAIN_POINT_PAGE_SIZE);
  const start = (currentPage - 1) * PAIN_POINT_PAGE_SIZE;
  const pageData = filtered.slice(start, start + PAIN_POINT_PAGE_SIZE);

  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goNext = () => setCurrentPage(p => Math.min(totalPage, p + 1));
  const goPage = (n: number) => setCurrentPage(n);

  const handleDelete = (id: string) => {
    if (!confirm("確認刪除呢個痛點？")) return;
    setList(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3">
          📌 痛點管理
        </h2>
        <Link
          href="/admin/pain-points/new"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + 新增痛點
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="搜尋標題 / 描述..."
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <Card className="p-0 overflow-x-auto min-h-[70vh] flex flex-col">
        <div className="flex-grow">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-xs text-slate-500">標題</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">描述</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">Region ID</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">建立時間</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">更新時間</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-2 font-medium">{item.title}</td>
                  <td className="px-3 py-2 max-w-[300px] text-slate-600 truncate">
                    {item.description ?? "—"}
                  </td>
                  <td className="px-3 py-2 text-slate-500 font-mono text-xs">
                    {item.regionId}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleString("zh-HK")}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-500">
                    {new Date(item.updatedAt).toLocaleString("zh-HK")}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/pain-points/${item.id}`}
                        className="text-emerald-600 hover:underline"
                      >
                        編輯
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-slate-400">
                    暫無痛點資料
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 mt-auto">
          <div className="text-sm text-slate-500">
            共 {total} 條，第 {currentPage} / {totalPage || 1} 頁
          </div>
          <div className="flex gap-2">
            <button
              onClick={goPrev}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              上一頁
            </button>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  p === currentPage
                    ? "bg-emerald-500 text-white"
                    : "border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={goNext}
              disabled={currentPage >= totalPage}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              下一頁
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
