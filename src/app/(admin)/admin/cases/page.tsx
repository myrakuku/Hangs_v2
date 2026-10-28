// src/app/(admin)/admin/cases/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { cases } from '@/lib/cases';
import type { CaseStudy } from '@/lib/cases';

export default function CasesAdminPage() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const allCategories = Array.from(new Set(cases.map(item => item.category))).sort();
  const allTags = Array.from(new Set(cases.flatMap(item => item.tags))).sort();

  const filtered: CaseStudy[] = cases.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(search.toLowerCase());
    const catMatch = filterCategory ? item.category === filterCategory : true;
    const tagMatch = filterTag ? item.tags.includes(filterTag) : true;
    return titleMatch && catMatch && tagMatch;
  });

  async function handleDelete(slug: string) {
    if (!confirm('確定要刪除這個案例？')) return;
    try {
      const res = await fetch(`/api/cases?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        alert('已刪除，請重新整理頁面');
      } else {
        alert('刪除失敗');
      }
    } catch (err) {
      alert('刪除請求發生錯誤');
    }
  }

  return (
    <div className="mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-800 border-l-4 border-[#009c6f] pl-3">
            真實案例 Cases
          </h2>
          <Link
            href="/admin/cases/new"
            className="inline-flex items-center gap-1 bg-[#009c6f] hover:bg-[#00875f] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + 新增案例
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <input
            type="search"
            placeholder="搜尋案例標題..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#009c6f] focus:border-[#009c6f]"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm py-2 focus:outline-none focus:ring-1 focus:ring-[#009c6f] focus:border-[#009c6f]"
          >
            <option value="">全部分類</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm py-2 focus:outline-none focus:ring-1 focus:ring-[#009c6f] focus:border-[#009c6f]"
          >
            <option value="">全部標籤</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <Card className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs text-slate-500">案例標題</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">分類</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">Tags</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">日期</th>
                <th className="px-3 py-2 text-center text-xs text-slate-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-slate-400">沒有符合條件的案例</td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.slug} className="border-b border-slate-100 align-top">
                    <td className="px-3 py-2 font-medium">
                      <Link href={`/admin/cases/${item.slug}/edit`} className="text-slate-800 hover:text-[#009c6f]">
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant="purple">{item.category}</Badge>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {item.tags.map((t, i) => (
                          <Badge key={i} variant="gray">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-500">{item.date}</td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/cases/${item.slug}/edit`}
                          className="p-1.5 text-slate-500 hover:text-[#009c6f]"
                          title="編輯"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.slug)}
                          className="p-1.5 text-slate-500 hover:text-red-500"
                          title="刪除"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
  );
}
