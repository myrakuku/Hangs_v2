// src/app/(admin)/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 👉 僅前端模擬驗證，無 API
    await new Promise((r) => setTimeout(r, 600));
    if (form.email === "admin@hangstech.com" && form.password === "admin1234") {
      router.push("/admin");
      router.refresh();
    } else {
      setError("帳號或密碼錯誤");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 shadow-sm rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a936f] text-lg font-bold text-white mb-3">
              H
            </div>
            <h1 className="text-xl font-bold text-[#0d3b66]">Hangs Tech Admin</h1>
            <p className="text-sm text-slate-500 mt-1">管理後台登入</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded border border-red-200">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                電郵
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a936f]/40 focus:border-[#1a936f]"
                placeholder="admin@hangstech.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                密碼
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a936f]/40 focus:border-[#1a936f]"
                placeholder="admin1234"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#0d3b66] hover:bg-[#0a2d4d] text-white py-2.5 font-medium transition disabled:opacity-50"
            >
              {loading ? "登入中..." : "登入"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
