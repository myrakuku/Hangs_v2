'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { applies as initialApplies, ApplyItem } from "@/lib/mockData";
import { STATUS_OPTIONS, PAGE_SIZE, PROCESSING_STATUS } from "@/lib/constants";

export default function ApplyProcessedPage() {
  const [appList, setAppList] = useState<ApplyItem[]>(initialApplies);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredList = appList.filter(item => PROCESSING_STATUS.includes(item.status));
  const total = filteredList.length;
  const totalPage = Math.ceil(total / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageData = filteredList.slice(startIndex, startIndex + PAGE_SIZE);

  const getVariant = (status: string) => {
    const found = STATUS_OPTIONS.find(s => s.label === status);
    return found?.variant ?? "gray";
  };

  const changeStatus = (id: string, newStatus: string) => {
    setAppList(prev => prev.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
    setOpenDropdownId(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goNext = () => setCurrentPage(p => Math.min(totalPage, p + 1));
  const goPage = (n: number) => setCurrentPage(n);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          type="search"
          placeholder="搜尋申請人 / 案例標題..."
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200">
          <option value="">全部狀態</option>
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>

      <Card className="p-0 overflow-x-auto min-h-[75vh] flex flex-col">
        <div className="flex-grow">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-xs text-slate-500">申請人</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">聯絡方式</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">對應案例</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">痛點</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">狀態</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">備註</th>
                <th className="px-3 py-2 text-left text-xs text-slate-500">建立時間</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-2 font-medium">{item.applicantName}</td>
                  <td className="px-3 py-2">{item.applicantContact}</td>
                  <td className="px-3 py-2">
                    <div>{item.caseTitle}</div>
                    <div className="text-xs text-slate-400">{item.caseId}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1 max-w-[240px]">
                      {item.painPointsSnapshot?.map((p) => (
                        <Badge key={p.painPointId} variant="gray">
                          {p.title}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2 relative">
                    <button
                      onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
                      className="cursor-pointer"
                    >
                      <Badge variant={getVariant(item.status)}>{item.status}</Badge>
                    </button>
                    {openDropdownId === item.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-[9999] mt-1 bg-white border border-slate-200 shadow-xl rounded-lg py-1 min-w-[110px]"
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <button
                            key={opt.label}
                            onClick={() => changeStatus(item.id, opt.label)}
                            className="block w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-slate-600 max-w-[180px] truncate">
                    {item.note || "—"}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleString("zh-HK")}
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center text-slate-400">
                    暫無數據
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
