export type UserRole = "admin" | "sales" | "dev" | "lead";

export interface Solution {
  id: string;
  t: string;
  cat: string;
  kw: string;
  tags: string[];
  meta: string;
  pains: string[];
  sols: string[];
  val: string;
}

export interface CaseItem {
  id: string;
  t: string;
  cat: string;
  kw: string;
  tags: string[];
  meta: string;
  pains: string[];
  sols: string[];
  val: string;
  create: string,
}

export interface NewsItem {
  id: string;
  t: string;
  date: string;
  cat: string;
  st: "已發佈" | "草稿";
  tags: string[];
  meta: string;
}

export interface PainPointItem {
  id: string;
  title: string;
  description: string | null;
  regionId: string;
  createdAt: string;
  updatedAt: string;
}

export type PainPointSnapshotItem = {
  painPointId: string;
  title: string;
};

export interface SolutionItem {
  id: string;
  title: string;
  description: string | null;
  regionId: string;
  painPointIds: string[];
  createdAt: string;
  updatedAt: string;
}


export type ApplyItem = {
  id: string;
  applicantName: string;
  applicantContact: string;
  note: string;
  status: string;
  caseId: string;
  caseTitle: string;
  painPointsSnapshot: PainPointSnapshotItem[];
  createdAt: string;
  updatedAt: string;
};

export interface AccountRow {
  co: string;
  no: string;
  amt: number;
  st: string;
}

export interface DevPart {
  name: string;
  owner: string;
  deadline: string;
  done: boolean[];
  chk: string[];
  comments: { who: string; when: string; t: string }[];
}

export interface DevProject {
  id: number;
  n: string;
  c: string;
  st: string;
  delivery: string;
  warranty: string;
  link: string;
  parts: DevPart[];
  meetings: { date: string; text: string; parts: string[]; people: string[] }[];
}

export interface TagGroup {
  industry: string[];
  pain: string[];
  audience: string[];
}

export interface SolCatalogItem {
  n: string;
  p: number;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  noteId: number;
}

export interface NoteItem {
  id: number;
  title: string;
  content: string;
  eventId: number | null;
}

export interface IntroItem {
  id: string;
  title: string;
  content: string;
  regionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegionItem {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}


// Menu
export type MenuItem = { label: string; path: string };

export const ROLE_LABEL: Record<UserRole, string> = {
  admin: "Admin（全部權限）",
  sales: "Sales（開單＋申請＋開發狀態）",
  dev: "Dev 基本（只睇開發）",
  lead: "Dev Lead（分派＋AI）",
};
