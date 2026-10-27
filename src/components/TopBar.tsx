"use client";
import { ROLE_LABEL } from "@/lib/types";
import type { UserRole } from "@/lib/types";

export default function TopBar({
  role,
  setRole,
  onMenuClick,
}: {
  role: UserRole;
  setRole: (r: UserRole) => void;
  onMenuClick: () => void;
}) {
  const roles: UserRole[] = ["admin", "sales", "dev", "lead"];
  return (
    <header className="sticky top-0 h-14 bg-white border-b border-slate-200 flex items-center px-4 z-30">
      <button onClick={onMenuClick} className="md:hidden mr-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex gap-1">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              role === r ? "bg-emerald-600 text-white" : "bg-transparent text-slate-500"
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span className="text-sm text-slate-600 hidden sm:block">{ROLE_LABEL[role]}</span>
        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">A</div>
      </div>
    </header>
  );
}
