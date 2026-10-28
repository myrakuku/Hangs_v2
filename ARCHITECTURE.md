# 實瀚科技 HANGS TECHNOLOGY — 網站系統架構文件

> 本文件說明 `hangs_v2` 專案的整體架構、頁面分佈、設計概念，以及 `src/components` 與 `src/lib` 內每個檔案的職責。

---

## 1. 專案概覽

| 項目 | 內容 |
|---|---|
| 框架 | Next.js 16（App Router、Turbopack 建置） |
| UI 層 | React 19（`"use client"` 元件 + Server Components 混用） |
| 樣式 | Tailwind CSS v4（`@import "tailwindcss"` + `@theme` 設計 token） |
| 語言 | TypeScript（嚴格型別） |
| 圖示 | lucide-react |
| 部署 | 靜態匯出（`output: "export"`），前台採 SSG 全靜態 + SEO |

專案把「前台公開網站」與「內部管理後台」分離成獨立的 **route group**，各自擁有自己的 root layout 與樣式入口，共用 `src/lib` 的資料與工具函式。

---

## 2. 網頁架構分佈（Route Groups）

App Router 使用三個 route group（括號不會影響 URL）：

### 2.1 `(public)` — 前台公開網站

Root layout：`src/app/(public)/layout.tsx`（import `./globals.css`、`SiteShell`）

| 路由 | 檔案 | 說明 |
|---|---|---|
| `/` | `(public)/page.tsx` | 首頁（`<Home />`） |
| `/services` | `(public)/services/page.tsx` | 服務總覽 |
| `/services/[category]` | `(public)/services/[category]/page.tsx` | 服務分類頁（level 1） |
| `/services/[category]/[service]` | `(public)/services/[category]/[service]/page.tsx` | 服務詳情頁（level 2） |
| `/solutions/[audience]` | `(public)/solutions/[audience]/page.tsx` | 解決方案頁（sme / solo / enterprise） |
| `/choose-service` | `(public)/choose-service/page.tsx` | 「選擇我們的服務」互動頁 |
| `/cases` | `(public)/cases/page.tsx` | 真實案例列表（部落格形式） |
| `/cases/[slug]` | `(public)/cases/[slug]/page.tsx` | 真實案例詳情 |

### 2.2 `(admin)` — 內部管理後台

Root layout：`src/app/(admin)/layout.tsx`（import `../globals.css`，即 `src/app/globals.css`）
內層 layout：`src/app/(admin)/admin/layout.tsx`（Sidebar + TopBar 殼層）

| 路由 | 說明 |
|---|---|
| `/admin` | Dashboard 儀表板（統計卡 + 最新資訊/近期申請/開發項目） |
| `/admin/apply/all`、`/admin/apply/pending`、`/admin/apply/processed` | 申請列表（全部 / 新申請 / 處理中） |
| `/admin/accounts` | 帳目（Quotation / Invoice / Receipt） |
| `/admin/devlist`、`/admin/devlist/[id]` | 開發列表與專案詳情 |
| `/admin/intros`、`/admin/intros/new` | 服務介紹管理 |
| `/admin/cases`、`/admin/cases/new` | 真實案例管理 |
| `/admin/solutions` | 解決方案管理 |
| `/admin/news` | 最新資訊管理 |
| `/admin/pain-points` | 痛點管理 |
| `/admin/regions` | 區域管理 |
| `/admin/tags` | Tag 管理 |

### 2.3 `(login)` — 登入頁

| 路由 | 檔案 | 說明 |
|---|---|---|
| `/admin/login` | `(login)/admin/login/page.tsx` | 管理後台登入（目前為前端模擬驗證，無 API） |

### 2.4 根層級檔案（`src/app/`）

| 檔案 | 說明 |
|---|---|
| `globals.css` | **後台** Tailwind 入口（admin/login 共用，含 admin 色票 `@theme`） |
| `opengraph-image.tsx` | 動態 OG 分享圖 |
| `robots.ts` | robots.txt（依 `NEXT_PUBLIC_SITE_URL` 生成） |
| `sitemap.ts` | 動態 sitemap.xml（首頁/服務/解決方案/選擇服務/案例） |

---

## 3. Design Concept 設計概念

### 3.1 兩套視覺系統

專案刻意分成「前台」與「後台」兩套 Tailwind theme（各自一個 `globals.css` + `@theme`），因為兩者定位不同：

**前台（品牌行銷型）**
- 主色 `navy #162144`（深藍，沉穩專業）、品牌綠 `green #009c6f`、點綴 `lime #a9ce47`
- 中性色：`ink #202d40`、`muted #6d7580`、`line #e8ece9`、`surface #f6f8f6`
- 字型：Noto Sans TC（思源黑體）
- 視覺語言：大量 `radial-gradient` 柔光背景、圓角卡片（`rounded-2xl`）、細邊框（`#e1e9d8` 系）、綠/灰階配色、微動效（卡片 hover 上移、`after:` 漸層線展開、`group-open:` 展開態）
- 排版：大標題 `clamp()` 流體字級、`section-label`（Arial 大寫字距標籤）、`mini-label`

**後台（工具型）**
- 深藍漸層 sidebar `#0a1f33 → #0d3b66`、accent `#1a936f`、背景 `#f4f6f9`
- 字型：Segoe UI / system-ui / Noto Sans TC
- 視覺語言：簡潔資料表、狀態 `Badge`（8 色）、白色 `Card` 容器、表格 sticky header

### 3.2 Tailwind v4 設計 token 架構

前台 `@theme`（`src/app/(public)/globals.css`）：
```css
@theme {
  --color-navy: #162144;  --color-green: #009c6f;
  --color-green-dark: #007f5b;  --color-lime: #a9ce47;
  --color-ink: #202d40;  --color-muted: #6d7580;
  --color-line: #e8ece9;  --color-surface: #f6f8f6;
  --font-sans: 'Noto Sans TC', ...;
  --animate-appear / -workspace-enter / -chip-float / -modal-enter;
}
```

後台 `@theme`（`src/app/globals.css`）：
```css
@theme {
  --color-admin-side-top: #0a1f33;  --color-admin-side-bottom: #0d3b66;
  --color-admin-primary: #0d3b66;  --color-admin-accent: #1a936f;
  --color-admin-bg: #f4f6f9;  --font-sans: 'Segoe UI', ...;
}
```

### 3.3 樣式策略（重要）

- 前台已全面改為 **inline Tailwind utilities**，僅保留少量「寫不到」的 CSS（`@keyframes`、`::selection`、`:focus-visible`、`summary::-webkit-details-marker`、基礎 reset）在 `(public)/globals.css` 的 `@layer base`。
- 5 段非標準 breakpoint 以 arbitrary variant 表示：`min-[1500px]:`、`max-[1100px]:`、`max-[900px]:`、`max-[700px]:`、`max-[370px]:`。
- 共用 class 字串集中在 `src/lib/ui.ts`（見 §5.10），避免重複 inline。

---

## 4. `src/components` 詳細說明

### 前台元件

| 檔案 | 職責 |
|---|---|
| `site-shell.tsx` | **網站殼層**。`SiteShell`（Provider，掛載 header/footer/諮詢 modal）、`Header`（sticky 導覽列：解決方案 dropdown + 服務 mega menu + 手機選單 + 真實案例連結）、`Footer`、`ServicesMegaMenu`（服務下拉）、`ConsultButton`（預約諮詢按鈕）、`useConsultation`（開關諮詢表單的 context hook） |
| `shared-ui.tsx` | **共用 UI 原語**。`Brand`（logo，`compact` 版供 footer）、`Modal`（可及性 `<dialog>`，含 `::backdrop`、`[open]` 動畫、ESC/點擊外層關閉）、`Consultation`（諮詢表單：申請人/聯絡/規模/服務/訊息 + 提交後摘要）、`useHydrated`（hydration 同步 hook） |
| `home.tsx` | **首頁**。Hero（標題+highlight underline+CTA）、互動工作台 `WorkflowVisual`（切換 sme/solo/enterprise 的流程示意 + 浮動 chip）、信任條、五大服務卡（`nth-child` 配色 + `after` 漸層線）、三大 featured（AI / 自動化 / 雲端）、差異化 why、about + 架構圖、process、FAQ、CTA、服務詳情 `Modal` |
| `page-blocks.tsx` | **跨頁共用區塊**。`Eyebrow`（section 標籤）、`PageHeading`（標題+引言）、`Breadcrumbs`、`PageSchema`（JSON-LD schema 注入）、`PageFAQ`（`<details>` 手風琴）、`PageCTA`（CTA + 諮詢前準備清單）、`PageProcess`（四步流程）、`RelatedSolutions`（相關方案連結） |
| `category-page.tsx` | **服務分類頁（level 1）**。Hero + 分類 icon + 服務卡網格 + 交付方式 + 流程 |
| `service-detail-page.tsx` | **服務詳情頁（level 2）**。詳情 Hero + 效益/能力/工作流/適用對象 |
| `solution-page.tsx` | **解決方案頁**。Hero + 承諾條 + `WorkflowVisual`（工作台示意）+ 三大支柱 + `ScenarioDiagram`（案例圖）+ 技術轉移 + 流程 + 合作模式 + 技術棧 + FAQ + CTA |
| `choose-service.tsx` | **「選擇服務」互動頁**。勾選式卡片 + sticky 摘要面板（已選 chip + 數量 + 送出 CTA） |
| `catalog-icons.ts` | **服務分類 icon 對照表**（`brain/workflow/cloud/shield/code/training` → lucide 圖示） |

### 後台元件

| 檔案 | 職責 |
|---|---|
| `Badge.tsx` | 狀態標籤，8 色 variant（blue/green/orange/purple/gray/cyan/amber/red） |
| `Card.tsx` | 白色卡片容器（`bg-white border rounded-xl p-4`） |
| `TopBar.tsx` | 後台頂欄（角色切換按鈕 + 角色說明 + avatar，`"use client"`） |

> 註：後台 Sidebar 直接寫在 `(admin)/admin/layout.tsx` 內（`menuGroups` 陣列 + lucide 圖示），未拆成獨立元件。

---

## 5. `src/lib` 詳細說明

| 檔案 | 職責 |
|---|---|
| `site.ts` | **公司資訊與前台基本資料**。`company`（名稱/英文名/描述）、`siteUrl`（讀 `NEXT_PUBLIC_SITE_URL`）、`services`（首頁五大服務，供 hero/choose-service 使用）、`faqs`（前台常見問題） |
| `service-catalog.ts` | **前台服務目錄**。`ServiceCategory`（6 大分類，各含 `ServiceDetail[]`）、`categories` 完整資料、`getCategory()` / `getService()` helper |
| `solutions.ts` | **解決方案內容**。`Solution` 型別 + `solutions`（sme / solo / enterprise 三受眾的完整長文內容：承諾、工作流、支柱、案例、技術轉移、流程、合作模式、技術棧、FAQ、CTA） |
| `cases.ts` | **前台真實案例**。`CaseStudy` 型別 + `cases`（3 個部落格式案例：補習社/裝修/五金店）、`getCase()` |
| `choose-service.ts` | **「選擇服務」分組選項**。`ChooseOption` / `ChooseGroup` 型別 + `chooseGroups`（依 `site.ts` 的 5 大服務分組，對應到 service-catalog 的 slug）+ `allOptions` |
| `constants.ts` | **後台常數**。`STATUS_OPTIONS`（申請中/報左價/開發中/已完成/取消）、分頁大小、`ALL_STATUSES`、`PENDING_STATUS`、`PROCESSING_STATUS` |
| `metadata.ts` | **SEO metadata helper**。`pageMetadata(title, description, path)` 回傳完整 `Metadata`（title/description/canonical/OpenGraph/Twitter/OG image） |
| `types.ts` | **後台共用型別**。`UserRole`、`Solution`、`CaseItem`、`NewsItem`、`PainPointItem`、`PainPointSnapshotItem`、`SolutionItem`、`ApplyItem`、`AccountRow`、`DevPart`/`DevProject`、`TagGroup`、`SolCatalogItem`、`CalendarEvent`、`NoteItem`、`IntroItem`、`RegionItem`、`MenuItem`、`ROLE_LABEL` |
| `mockData.ts` | **後台模擬資料**。`solutions`/`cases`/`news`/`applies`/`accounts`/`tags`/`devs`/`solCatalog`/`events`/`notes`/`intros`/`painPoints`/`regions` 等陣列，並 **re-export** 來自 `types.ts` 的型別 |
| `ui.ts` | **前台共用 Tailwind class 常數**。`containerClass`/`sectionClass`/`buttonClass`/`buttonPrimaryClass`/`buttonSecondaryClass`/`buttonNavyClass`/`textLinkClass`/`sectionLabelClass`/`miniLabelClass`/`onlineDotClass`/`iconButtonClass` |
| `utils.ts` | **`cn()`**（`clsx` + `tailwind-merge`），合併/去重 class，供後台元件與導覽 active 態使用 |

---

## 6. 資料流與關聯

```
site.ts (公司 + 五大服務 + FAQ)
    ├─→ home.tsx (首頁服務卡)
    └─→ choose-service.ts (分組選項)
             └─→ service-catalog.ts (分類/服務 slug 對應)
                      └─→ category-page / service-detail-page

solutions.ts (sme/solo/enterprise 內容)
    └─→ solution-page.tsx

cases.ts (3 個案例)
    └─→ cases/page + cases/[slug]

types.ts (後台型別) ──re-export──→ mockData.ts (後台資料)
    └─→ admin/* 各頁面
```

前台資料集中在 `lib/*.ts` 的靜態內容；後台目前以 `mockData.ts` 模擬（未接資料庫/API）。`constants.ts` 提供後台列表的分頁與狀態定義。

---

## 7. SEO 與靜態匯出

- **SSG 全靜態**：前台所有動態路由（`[category]`、`[service]`、`[audience]`、`[slug]`）用 `generateStaticParams` 預先產生，`dynamicParams = false`。
- **每頁 metadata**：透過 `pageMetadata()` 統一 title/description/canonical/OG/Twitter。
- **JSON-LD schema**：`PageSchema`（前台服務/方案頁）、案例頁的 `Article` + `BreadcrumbList` schema 直接注入 `<script type="application/ld+json">`。
- **`sitemap.ts`** 動態生成 sitemap（含案例頁）；**`robots.ts`** 依 `NEXT_PUBLIC_SITE_URL` 生成。
- **`opengraph-image.tsx`** 動態 OG 圖。

---

## 8. 技術細節與注意事項

- **兩個 Tailwind 入口**：`src/app/globals.css`（admin/login）與 `src/app/(public)/globals.css`（前台），各有獨立 `@theme`，避免色票互相污染。
- **`after:content-['']` 的坑**：在單引號 JS 字串內，單引號會截斷字串，應改用 `after:content-[""]` 或 template literal。
- **非標準 breakpoint**：前台用 `min-[1500px]:` / `max-[1100px]:` / `max-[900px]:` / `max-[700px]:` / `max-[370px]:` 對應原 CSS 的 5 段 media query。
- **寫不到的 CSS**：keyframes、`::selection`、`:focus-visible`、`summary::-webkit-details-marker`、基礎 reset 保留在 `(public)/globals.css` 的 `@layer base`。
