// lib/mockData.ts
import type {
  SolutionItem,
  CaseItem,
  NewsItem,
  ApplyItem,
  AccountRow,
  DevProject,
  TagGroup,
  SolCatalogItem,
  CalendarEvent,
  NoteItem,
  IntroItem,
  PainPointItem,
  RegionItem,
} from "./types";

export const solutions: SolutionItem[] = [
  {
    id: "demo-s1",
    title: "流程自動化方案",
    description: null,
    regionId: "cmvsf93242839rdch",
    painPointIds: [],
    createdAt: "2027-10-25T06:59:40.291Z",
    updatedAt: "2027-10-25T06:59:40.291Z",
  },
  {
    id: "demo-s2",
    title: "客戶資料管理系統",
    description: "集中管理客戶聯絡記錄、報價跟進及合約檔案，方便團隊協作。",
    regionId: "cmvsf93242839rdch",
    painPointIds: ["demo-p1"],
    createdAt: "2027-10-25T07:10:12.114Z",
    updatedAt: "2027-10-25T07:10:12.114Z",
  },
  {
    id: "demo-s3",
    title: "自動報價生成工具",
    description: "根據服務項目自動計算價格，一鍵導出PDF報價單。",
    regionId: "cmvsf93242839rdch",
    painPointIds: ["demo-p1", "demo-p2"],
    createdAt: "2027-10-25T07:15:33.782Z",
    updatedAt: "2027-10-25T07:15:33.782Z",
  },
  {
    id: "demo-s4",
    title: "員工排班及工時系統",
    description: "協助中小企業處理輪班、加班記錄，自動產出工時表。",
    regionId: "cmvsf93242839rdch",
    painPointIds: ["demo-p1"],
    createdAt: "2027-10-25T07:22:45.201Z",
    updatedAt: "2027-10-25T07:22:45.201Z",
  },
  {
    id: "demo-s5",
    title: "WhatsApp自動回覆機械人",
    description: "設定常見問題回覆，下班時間都可以自動回覆客戶查詢。",
    regionId: "cmvsf93242839rdch",
    painPointIds: [],
    createdAt: "2027-10-25T07:28:19.556Z",
    updatedAt: "2027-10-25T07:28:19.556Z",
  },
  {
    id: "demo-s6",
    title: "網站表單接單系統",
    description: "網站查詢表單直接存入後台，即時推送通知給負責同事。",
    regionId: "cmvsf93242839rdch",
    painPointIds: ["demo-p3"],
    createdAt: "2027-10-25T07:35:08.441Z",
    updatedAt: "2027-10-25T07:35:08.441Z",
  },
];

export const cases: Omit<CaseItem, "type">[] = [
  {
    id: "c1",
    t: "教育中心（補習社）管理系統",
    cat: "教育",
    kw: "補習社管理系統",
    tags: ["教育", "排堂計糧亂", "中小企"],
    meta: "補習社最頭痛：客戶係家長、對象係小朋友，排堂計糧又亂、帳目未整合。",
    pains: ["客戶同服務對象分離", "學生同名問題", "排堂計糧靠人手", "帳目未整合"],
    sols: ["網上報名與支付", "導師管理（課表／點名）", "家長管理（帳戶／訂單）", "學校與學生管理", "申請與公告", "行政管理", "帳目與內容"],
    val: "行政時間慳 60%",
    create: "2026‑10‑01 14:00:20",
  },
  {
    id: "c2",
    t: "導師任務分派系統",
    cat: "教育",
    kw: "導師任務分派系統",
    tags: ["教育", "排班混亂", "中小企"],
    meta: "教育公司要外派導師去唔同學校，任務分派、搶 Job、考勤、計薪全靠 WhatsApp 同 Excel。",
    pains: ["任務分派靠人手", "搶 Job 混亂", "申請批核冇系統", "考勤難追", "計薪繁瑣"],
    sols: ["任務創建", "搶 Job 申請", "考勤與 WhatsApp 提醒", "計薪（時數×時薪）", "報表", "學校與行政"],
    val: "計薪快 5 倍",
    create: "2026‑04‑01 09:00:00",
  },
  {
    id: "c3",
    t: "裝修工程管理系統",
    cat: "裝修",
    kw: "裝修工程管理系統",
    tags: ["裝修工程", "三方溝通唔同步", "企業團隊"],
    meta: "裝修公司同時處理多個項目，設計圖散落、器材亂、帳目唔清。",
    pains: ["項目會議進度靠人記", "三方溝通唔同步", "設計圖檔散落", "任務分派靠人手", "器材管理混亂"],
    sols: ["會議與項目管理", "項目經理系統", "設計師管理（3D圖）", "客戶管理", "器材管理", "銷售與帳目"],
    val: "協調時間慳 70%",
    create: "2026‑10‑01 11:30:20",
  },
  {
    id: "c4",
    t: "五金店電商系統",
    cat: "零售",
    kw: "五金電商系統",
    tags: ["零售", "庫存唔同步", "中小企"],
    meta: "傳統五金舖要上網，最大障礙係網上同門市兩盤數點同步。",
    pains: ["冇網上銷售", "庫存唔同步", "冇會員制度", "訂單靠人手", "送貨冇系統"],
    sols: ["網上商店", "庫存管理", "銷售與訂單", "網上支付", "會員分級", "送貨模組", "社交媒體整合", "報表"],
    val: "庫存 100% 同步",
    create: "2026‑08‑15 12:44:15",
  },
  {
    id: "c5",
    t: "印刷公司 CRM／行銷系統",
    cat: "製造",
    kw: "CRM 客戶管理系統",
    tags: ["製造", "推廣靠人手", "中小企"],
    meta: "印刷公司生意靠留得住熟客、捉得住新客，但推廣、跟進全靠人手。",
    pains: ["客戶資料散亂", "冇會員制度", "推廣靠人手", "銷售跟進靠人記", "任務分派亂"],
    sols: ["客戶管理 CRM", "會員系統", "廣播系統（群發/排程）", "銷售線索管理", "銷售活動管理", "任務分派"],
    val: "推廣 100% 自動化",
    create: "2026‑10‑01",
  },
  {
    id: "c6",
    t: "活動項目管理系統",
    cat: "服務",
    kw: "活動項目管理系統",
    tags: ["服務業", "三方溝通唔同步", "企業團隊"],
    meta: "活動公司同時搞緊多場活動，進度靠人記、物資亂、帳目唔清。",
    pains: ["每場活動進度靠人記", "三方溝通唔同步", "物料／設計散落", "任務分派靠人手", "帳目未整合"],
    sols: ["會議與項目管理", "項目經理系統", "設計師管理（物料）", "客戶管理", "物資管理", "銷售與帳目"],
    val: "協調時間慳 70%",
    create: "2026‑10‑01",
  },
  {
    id: "c7",
    t: "期權數據自動化小程式",
    cat: "金融",
    kw: "自動化小程式",
    tags: ["金融／保險", "人手重複", "一人公司"],
    meta: "期權交易每日都要人手 check 到期日，重複又易漏。小程式每日自動爬取。",
    pains: ["每日重複人手 check", "容易漏", "佔用大量時間", "舊電腦限制"],
    sols: ["每日自動爬取到期日", "朝早 7:00 自動啟動", "輕量設計，舊電腦都行到"],
    val: "每日慳 2–3 小時",
    create: "2026‑10‑01",
  },
  {
    id: "c8",
    t: "會計系統（三個實例）",
    cat: "教育",
    kw: "會計系統",
    tags: ["教育", "帳目未整合", "中小企"],
    meta: "教育中心／教育機構／IT 公司三種會計自動化實例。",
    pains: ["開單靠人手", "出糧計 MPF 易錯", "報價對數報稅繁瑣"],
    sols: ["課程開單自動化", "出糧 + MPF + 小冊子", "報價、對數、報稅自動化"],
    val: "開單慳 80%",
    create: "2026‑10‑01",
  },
];

export const news: Omit<NewsItem, "type">[] = [
  {
    id: "n1",
    t: "AI 最新趨勢：本地模型 vs 雲端",
    date: "2026-10-11",
    cat: "科技",
    st: "已發佈",
    tags: ["科技／IT", "資料唔知真假", "中小企"],
    meta: "本地部署 AI 成本低、私隱高、可離線，逐步成為中小企首選…",
  },
  {
    id: "n2",
    t: "中小企數碼轉型 2026 觀察",
    date: "2026-10-09",
    cat: "時事",
    st: "草稿",
    tags: ["科技／IT", "人手重複", "中小企"],
    meta: "人手流程仍然係中小企最大痛點，自動化需求持續上升…",
  },
  {
    id: "n3",
    t: "WhatsApp 自動化開單實戰",
    date: "2026-10-01",
    cat: "自動化",
    st: "已發佈",
    tags: ["科技／IT", "人手重複", "一人公司"],
    meta: "一句指令開報價、發票、收據，同步上網站…",
  },
];

export const painPoints: PainPointItem[] = [
  {
    id: "demo-p1",
    title: "人手不足，請人困難",
    description: null,
    regionId: "dfdfdfdf",
    createdAt: "2027-10-25T06:59:40.291Z",
    updatedAt: "2027-10-25T06:59:40.291Z",
  },
];


export const applies: ApplyItem[] = [
  {
    id: "cmvow1xar001rqwaazrcxjrh",
    applicantName: "Lovely Tour Company Limited",
    applicantContact: "tour@lovely.com.hk",
    note: "UML 圖需求",
    status: "報左價",
    caseId: "demo-c1",
    caseTitle: "示範案例：茶餐廳轉型",
    painPointsSnapshot: [
      {
        painPointId: "demo-p1",
        title: "人手不足，請人困難"
      },
      {
        painPointId: "demo-p2",
        title: "成本控制唔到"
      }
    ],
    createdAt: "2026-10-26T06:41:28.274Z",
    updatedAt: "2026-10-26T06:44:08.362Z"
  },
  {
    id: "cmvow1xar001rqwaazrcxjrh-02",
    applicantName: "Nexus Technologies (HK) Ltd",
    applicantContact: "https://staging.nexus.com",
    note: "程式除錯需求",
    status: "開發中",
    caseId: "demo-c2",
    caseTitle: "示範案例：科技公司系統優化",
    painPointsSnapshot: [
      {
        painPointId: "demo-p3",
        title: "系統經常 Crash"
      }
    ],
    createdAt: "2026-10-26T07:10:00.274Z",
    updatedAt: "2026-10-26T07:12:10.362Z"
  },
  {
    id: "cmvow1xar001rqwaazrcxjrh-03",
    applicantName: "德昌五金有限公司",
    applicantContact: "info@takcheong-metal.com",
    note: "初步查詢",
    status: "申請中",
    caseId: "demo-c3",
    caseTitle: "示範案例：五金行數碼化",
    painPointsSnapshot: [
      {
        painPointId: "demo-p4",
        title: "存貨管理混亂"
      }
    ],
    createdAt: "2026-10-26T07:20:00.274Z",
    updatedAt: "2026-10-26T07:21:00.362Z"
  },
  {
    id: "cmvow1xar001rqwaazrcxjrh-04",
    applicantName: "Eddie（Walk‑in）",
    applicantContact: "eddie@example.com",
    note: "潛在客戶跟進",
    status: "申請中",
    caseId: "demo-c4",
    caseTitle: "示範案例：小店營運自動化",
    painPointsSnapshot: [
      {
        painPointId: "demo-p5",
        title: "落單流程慢"
      }
    ],
    createdAt: "2026-10-26T07:30:00.274Z",
    updatedAt: "2026-10-26T07:31:00.362Z"
  }
];

export const accounts: { quo: AccountRow[]; inv: AccountRow[]; rec: AccountRow[] } = {
  quo: [
    { co: "HANGS", no: "HANGSQN‑001", amt: 283000, st: "已報" },
    { co: "ITE", no: "ITEQN‑001", amt: 93600, st: "已報" },
    { co: "ITEC", no: "ITECQN‑001", amt: 20100, st: "已報" },
  ],
  inv: [
    { co: "ITE", no: "ITE‑0101", amt: 32930, st: "待收" },
    { co: "ITEC", no: "ITEC‑0101", amt: 20100, st: "待收" },
    { co: "HANGS", no: "HANGSINV‑0101", amt: 283000, st: "待收" },
  ],
  rec: [
    { co: "ITE", no: "ITEREC‑001", amt: 93600, st: "已收" },
    { co: "ITEC", no: "ITECREC‑001", amt: 20100, st: "已收" },
    { co: "HANGS", no: "HANGSREC‑001", amt: 283000, st: "已收" },
  ],
};

export const tags: TagGroup = {
  industry: ["教育", "金融／保險", "零售", "製造", "裝修工程", "服務業", "科技／IT"],
  pain: ["網站慢", "文件填表煩", "報價慢", "人手重複", "資料唔知真假", "排堂計糧亂", "排班混亂", "三方溝通唔同步", "庫存唔同步", "推廣靠人手", "帳目未整合", "開會冇記低重點"],
  audience: ["一人公司", "中小企", "企業團隊"],
};

export const devs: DevProject[] = [
  {
    id: 1,
    n: "旅行社項目管理系統",
    c: "Lovely Tour",
    st: "Debug",
    delivery: "2026‑10‑25",
    warranty: "2027‑10‑25",
    link: "https://github.com/hangs/lovely‑tour",
    parts: [
      {
        name: "前端 UI",
        owner: "Aaron",
        deadline: "2026‑10‑18",
        done: [true, false],
        chk: ["登入頁", "響應式手機版"],
        comments: [{ who: "Aaron", when: "10‑11", t: "UI 俾客人試緊" }],
      },
      {
        name: "後端 API",
        owner: "Ken",
        deadline: "2026‑10‑22",
        done: [true, true, false],
        chk: ["JWT 登入", "報價 CRUD", "Receipt 轉開發中"],
        comments: [{ who: "Ken", when: "10‑11", t: "DB schema 定咗" }],
      },
    ],
    meetings: [{ date: "2026‑10‑12", text: "確認 UI 版型，客人要求加搜尋欄", parts: ["前端 UI"], people: ["Aaron", "Vincent"] }],
  },
  {
    id: 2,
    n: "企業官網 + SEO",
    c: "Nexus",
    st: "客人試緊",
    delivery: "2026‑10‑30",
    warranty: "2027‑10‑30",
    link: "https://staging.nexus.com",
    parts: [
      {
        name: "官網頁面",
        owner: "May",
        deadline: "2026‑10‑20",
        done: [true, true, true],
        chk: ["首頁", "服務頁", "聯絡頁"],
        comments: [],
      },
    ],
    meetings: [],
  },
];

export const solCatalog: SolCatalogItem[] = [
  { n: "網站開發 + SEO", p: 80000 },
  { n: "Development of Project Management System", p: 283000 },
  { n: "App 開發", p: 150000 },
  { n: "自動化流程（WhatsApp Bot）", p: 60000 },
  { n: "AI 方案（本地部署）", p: 120000 },
];

export const PEOPLE = ["Aaron", "Ken", "May", "Vincent", "Sammy"];

export const events: CalendarEvent[] = [
  { id: 1, title: "客戶會議（Lovely Tour）", date: "2026‑10‑15", time: "14:00", noteId: 1 },
  { id: 2, title: "交後端 API", date: "2026‑10‑22", time: "", noteId: 2 },
  { id: 3, title: "保養到期檢查", date: "2026‑11‑15", time: "", noteId: 3 },
];

export const notes: NoteItem[] = [
  { id: 1, title: "同 Lovely Tour 開會", content: "確認 UI 版型，加搜尋欄", eventId: 1 },
  { id: 2, title: "後端 API deadline", content: "10/22 前交，Ken 負責", eventId: 2 },
  { id: 3, title: "保養檢查", content: "每月例行檢查", eventId: 3 },
];

export const intros: IntroItem[] = [
  {
    id: "demo-i1",
    title: "顧問服務示範",
    content: "呢個係 demo 區域，用嚟親身試用成個流程。",
    regionId: "dfdfdfdf",
    createdAt: "2027-10-25T06:59:40.291Z",
    updatedAt: "2027-10-25T06:59:40.291Z",
  },
];

export const regions: RegionItem[] = [
  {
    id: "00rqgqykb7vwbp",
    name: "示範區域",
    slug: "service-demo",
    createdAt: "2027-10-25T06:59:40.291Z",
    updatedAt: "2027-10-25T06:59:40.291Z",
  },
];


// 角色菜單定義
export const NAV_MENU = {
  admin: [
    { label: "📊 Dashboard", path: "/" },
    { label: "📋 申請列表", path: "/applications" },
    { label: "💰 帳目（Quo/Inv/Rec）", path: "/accounts" },
    { label: "💡 解決方案", path: "/solutions" },
    { label: "🏆 真實案例", path: "/cases" },
    { label: "📰 最新資訊", path: "/news" },
    { label: "🔧 開發列表", path: "/devlist" },
    { label: "📅 日曆", path: "/calendar" },
    { label: "📝 記事簿", path: "/notes" },
    { label: "🏷️ Tag 管理", path: "/tags" },
  ],
  sales: [
    { label: "🛒 開單（揀方案）", path: "/sales" },
    { label: "📋 申請列表", path: "/applications" },
    { label: "🔧 開發列表", path: "/devlist" },
  ],
  dev: [{ label: "🔧 開發列表", path: "/devlist" }],
  lead: [{ label: "🔧 開發列表", path: "/devlist" }],
};

export const ROLE_LABEL: Record<string, string> = {
  admin: "Admin（全部權限）",
  sales: "Sales（開單＋申請＋開發狀態）",
  dev: "Dev 基本（只睇開發）",
  lead: "Dev Lead（分派＋AI）",
};
