// lib/constants.ts
export const STATUS_OPTIONS = [
  { label: "申請中", variant: "gray" as const },
  { label: "報左價", variant: "blue" as const },
  { label: "開發中", variant: "orange" as const },
  { label: "已完成", variant: "green" as const },
  { label: "取消", variant: "red" as const },
];



export const PAGE_SIZE = 5;
export const INTRO_PAGE_SIZE = 8;
export const PAIN_POINT_PAGE_SIZE = 8;
export const SOLUTION_PAGE_SIZE = 8;
export const REGION_PAGE_SIZE = 8;


export const ALL_STATUSES = STATUS_OPTIONS.map(s => s.label);
export const PENDING_STATUS = ["申請中"];
export const PROCESSING_STATUS = ["報左價", "開發中"];
