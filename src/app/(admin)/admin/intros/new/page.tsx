'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

type Section = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
};

type Result = {
  label: string;
  value: string;
  note: string;
};

type CaseForm = {
  slug: string;
  title: string;
  category: string;
  english: string;
  summary: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  lead: string;
  sections: Section[];
  result: Result;
};

const emptySection: Section = {
  heading: '',
  paragraphs: [''],
  bullets: [''],
};

const initialForm: CaseForm = {
  slug: '',
  title: '',
  category: '',
  english: '',
  summary: '',
  excerpt: '',
  date: new Date().toISOString().split('T')[0],
  readTime: '',
  tags: [],
  lead: '',
  sections: [{ ...emptySection }],
  result: {
    label: '',
    value: '',
    note: '',
  },
};

export default function NewCasePage() {
  const router = useRouter();
  const [form, setForm] = useState<CaseForm>(initialForm);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof CaseForm>(key: K, value: CaseForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // Tags
  const addTag = () => {
    const t = tagInput.trim();
    if (!t || form.tags.includes(t)) return;
    update('tags', [...form.tags, t]);
    setTagInput('');
  };
  const removeTag = (idx: number) => {
    update('tags', form.tags.filter((_, i) => i !== idx));
  };

  // Sections
  const addSection = () => {
    update('sections', [...form.sections, { ...emptySection }]);
  };
  const removeSection = (sIdx: number) => {
    if (form.sections.length <= 1) return;
    update('sections', form.sections.filter((_, i) => i !== sIdx));
  };
  const updateSectionHeading = (sIdx: number, val: string) => {
    const next = [...form.sections];
    next[sIdx].heading = val;
    update('sections', next);
  };
  // Paragraph
  const updatePara = (sIdx: number, pIdx: number, val: string) => {
    const next = [...form.sections];
    next[sIdx].paragraphs[pIdx] = val;
    update('sections', next);
  };
  const addPara = (sIdx: number) => {
    const next = [...form.sections];
    next[sIdx].paragraphs.push('');
    update('sections', next);
  };
  const removePara = (sIdx: number, pIdx: number) => {
    const next = [...form.sections];
    if (next[sIdx].paragraphs.length <= 1) return;
    next[sIdx].paragraphs = next[sIdx].paragraphs.filter((_, i) => i !== pIdx);
    update('sections', next);
  };
  // Bullet
  const updateBullet = (sIdx: number, bIdx: number, val: string) => {
    const next = [...form.sections];
    next[sIdx].bullets[bIdx] = val;
    update('sections', next);
  };
  const addBullet = (sIdx: number) => {
    const next = [...form.sections];
    next[sIdx].bullets.push('');
    update('sections', next);
  };
  const removeBullet = (sIdx: number, bIdx: number) => {
    const next = [...form.sections];
    if (next[sIdx].bullets.length <= 1) return;
    next[sIdx].bullets = next[sIdx].bullets.filter((_, i) => i !== bIdx);
    update('sections', next);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      router.push('/admin/cases');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('儲存失敗');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} /> 返回案例列表
          </button>
          <h1 className="text-xl font-bold text-slate-800">新增案例</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-6 shadow-sm">
          {/* 基礎欄位 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Slug</span>
              <input
                required
                value={form.slug}
                onChange={(e) => update('slug', e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
                placeholder="tutoring-centre-management"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">分類 category</span>
              <input
                required
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
                placeholder="教育"
              />
            </label>
          </div>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">標題 title</span>
            <input
              required
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
              placeholder="補習社數碼轉型：排堂、計糧、帳目一次過整合"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">英文標題 english</span>
            <input
              required
              value={form.english}
              onChange={(e) => update('english', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
              placeholder="TUTORING CENTRE MANAGEMENT"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">摘要 summary</span>
            <textarea
              required
              rows={2}
              value={form.summary}
              onChange={(e) => update('summary', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">簡介 excerpt</span>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => update('excerpt', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">發布日期 date</span>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">閱讀時間 readTime</span>
              <input
                required
                value={form.readTime}
                onChange={(e) => update('readTime', e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
                placeholder="6 分鐘"
              />
            </label>
          </div>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Lead 開頭導文</span>
            <textarea
              required
              rows={3}
              value={form.lead}
              onChange={(e) => update('lead', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
            />
          </label>

          {/* Tags */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Tags</span>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded bg-[#f0f7f3] px-2 py-1 text-xs text-[#007c59]">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)} className="hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none focus:ring-1 focus:ring-[#009c6f]"
                placeholder="輸入標籤，Enter 新增"
              />
              <button type="button" onClick={addTag} className="rounded-lg bg-[#009c6f] px-3 py-2 text-sm text-white">新增</button>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">章節 sections</h2>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"
              >
                <Plus size={14} /> 新增章節
              </button>
            </div>

            {form.sections.map((sec, sIdx) => (
              <div key={sIdx} className="rounded-lg border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">章節 #{sIdx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeSection(sIdx)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <label className="block space-y-1">
                  <span className="text-xs text-slate-600">Heading 標題</span>
                  <input
                    value={sec.heading}
                    onChange={(e) => updateSectionHeading(sIdx, e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="背景：客戶是家長，服務對象是小朋友"
                  />
                </label>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">段落 paragraphs</span>
                    <button type="button" onClick={() => addPara(sIdx)} className="text-xs text-[#009c6f]">+ 段落</button>
                  </div>
                  {sec.paragraphs.map((p, pIdx) => (
                    <div key={pIdx} className="flex gap-2">
                      <textarea
                        rows={2}
                        value={p}
                        onChange={(e) => updatePara(sIdx, pIdx, e.target.value)}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removePara(sIdx, pIdx)}
                        className="self-start text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">項目 bullets</span>
                    <button type="button" onClick={() => addBullet(sIdx)} className="text-xs text-[#009c6f]">+ 項目</button>
                  </div>
                  {sec.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2">
                      <input
                        value={b}
                        onChange={(e) => updateBullet(sIdx, bIdx, e.target.value)}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeBullet(sIdx, bIdx)}
                        className="self-start text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Result 成效 */}
          <div className="space-y-3 border-t border-gray-100 pt-6">
            <h2 className="font-semibold text-slate-800">成果 result</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">label</span>
                <input
                  value={form.result.label}
                  onChange={(e) => update('result', { ...form.result, label: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="整體成效"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-slate-700">value</span>
                <input
                  value={form.result.value}
                  onChange={(e) => update('result', { ...form.result, value: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="行政時間慳 60%"
                />
              </label>
            </div>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">note 備註</span>
              <textarea
                rows={2}
                value={form.result.note}
                onChange={(e) => update('result', { ...form.result, note: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-slate-200 px-5 py-2 text-sm hover:bg-slate-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#009c6f] px-5 py-2 text-sm text-white disabled:opacity-60"
            >
              {saving ? '儲存中…' : '儲存案例'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
