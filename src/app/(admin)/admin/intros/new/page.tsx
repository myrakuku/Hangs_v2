'use client';
import { useState } from 'react';
type WorkflowItem = {
  title: string;
  text: string;
};
type FaqItem = {
  question: string;
  answer: string;
};
type ServiceDetailForm = {
  slug: string;
  title: string;
  english: string;
  tagline: string;
  intro: string;
  problem: string;
  benefits: string[];
  capabilities: string[];
  workflow: WorkflowItem[];
  fit: string[];
  faqs: FaqItem[];
};
const emptyWorkflow: WorkflowItem = { title: '', text: '' };
const emptyFaq: FaqItem = { question: '', answer: '' };
export default function NewServiceIntroPage() {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState<ServiceDetailForm>({
    slug: '',
    title: '',
    english: '',
    tagline: '',
    intro: '',
    problem: '',
    benefits: [''],
    capabilities: [''],
    workflow: [{ ...emptyWorkflow }],
    fit: [''],
    faqs: [{ ...emptyFaq }],
  });
  // 你原來的 catalog 定義，這頁只拿分類下拉
  const categories = [
    { slug: 'ai-applications', title: 'AI 應用與知識助手' },
    { slug: 'workflow-integration', title: '工作流程與系統串接' },
    { slug: 'cloud-devops', title: '雲端、DevOps 與技術維運' },
    { slug: 'security', title: '資訊安全檢測與防禦' },
    { slug: 'digital-platforms', title: '客製系統與數位平台' },
    { slug: 'training', title: '實作培訓與技術轉移' },
  ];
  function handleChange<K extends keyof ServiceDetailForm>(key: K, value: ServiceDetailForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  // 簡單陣列項目更新器（字串陣列：benefits / capabilities / fit）
  function updateStringArray(field: 'benefits' | 'capabilities' | 'fit', idx: number, val: string) {
    const arr = [...form[field]];
    arr[idx] = val;
    handleChange(field, arr);
  }
  function addStringItem(field: 'benefits' | 'capabilities' | 'fit') {
    handleChange(field, [...form[field], '']);
  }
  function removeStringItem(field: 'benefits' | 'capabilities' | 'fit', idx: number) {
    const arr = form[field].filter((_, i) => i !== idx);
    handleChange(field, arr.length ? arr : ['']);
  }
  // workflow
  function updateWorkflow(idx: number, key: keyof WorkflowItem, val: string) {
    const wf = [...form.workflow];
    wf[idx] = { ...wf[idx], [key]: val };
    handleChange('workflow', wf);
  }
  function addWorkflow() {
    handleChange('workflow', [...form.workflow, { ...emptyWorkflow }]);
  }
  function removeWorkflow(idx: number) {
    const wf = form.workflow.filter((_, i) => i !== idx);
    handleChange('workflow', wf.length ? wf : [{ ...emptyWorkflow }]);
  }
  // faqs
  function updateFaq(idx: number, key: keyof FaqItem, val: string) {
    const faqs = [...form.faqs];
    faqs[idx] = { ...faqs[idx], [key]: val };
    handleChange('faqs', faqs);
  }
  function addFaq() {
    handleChange('faqs', [...form.faqs, { ...emptyFaq }]);
  }
  function removeFaq(idx: number) {
    const faqs = form.faqs.filter((_, i) => i !== idx);
    handleChange('faqs', faqs.length ? faqs : [{ ...emptyFaq }]);
  }
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    const payload = {
      categorySlug: selectedCategorySlug,
      service: form,
    };
    try {
      // 👉 替換成你的 POST API route: /api/catalog/services
      const res = await fetch('/api/catalog/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '儲存失敗');
      setMessage(`✅ 成功新增：${form.title}`);
      // reset form
      setForm({
        slug: '',
        title: '',
        english: '',
        tagline: '',
        intro: '',
        problem: '',
        benefits: [''],
        capabilities: [''],
        workflow: [{ ...emptyWorkflow }],
        fit: [''],
        faqs: [{ ...emptyFaq }],
      });
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">新增服務介紹（ServiceDetail）</h1>
      <form onSubmit={onSubmit} className="space-y-6 rounded-lg bg-white border border-gray-300 p-6 shadow-sm">
        {/* 分類選擇 */}
        <div>
          <label className="mb-2 block font-medium">所屬分類 *</label>
          <select
            value={selectedCategorySlug}
            onChange={(e) => setSelectedCategorySlug(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="">-- 選擇分類 --</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        {/* 基礎欄位 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              required
              placeholder="例如 ai-chatbot"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">title 標題 *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">english</label>
            <input
              type="text"
              value={form.english}
              onChange={(e) => handleChange('english', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block font-medium">intro 簡介</label>
          <textarea
            value={form.intro}
            onChange={(e) => handleChange('intro', e.target.value)}
            rows={3}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-2 block font-medium">problem 解決痛點</label>
          <textarea
            value={form.problem}
            onChange={(e) => handleChange('problem', e.target.value)}
            rows={2}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        {/* benefits */}
        <fieldset className="rounded border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <legend className="font-medium">benefits 好處清單</legend>
            <button
              type="button"
              onClick={() => addStringItem('benefits')}
              className="text-sm text-blue-600"
            >
              + 新增項目
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {form.benefits.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => updateStringArray('benefits', idx, e.target.value)}
                  className="flex-1 rounded border border-gray-300 px-3 py-1.5"
                />
                <button
                  type="button"
                  onClick={() => removeStringItem('benefits', idx)}
                  className="text-red-500"
                >
                  刪
                </button>
              </div>
            ))}
          </div>
        </fieldset>
        {/* capabilities */}
        <fieldset className="rounded border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <legend className="font-medium">capabilities 服務內容</legend>
            <button
              type="button"
              onClick={() => addStringItem('capabilities')}
              className="text-sm text-blue-600"
            >
              + 新增項目
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {form.capabilities.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => updateStringArray('capabilities', idx, e.target.value)}
                  className="flex-1 rounded border border-gray-300 px-3 py-1.5"
                />
                <button
                  type="button"
                  onClick={() => removeStringItem('capabilities', idx)}
                  className="text-red-500"
                >
                  刪
                </button>
              </div>
            ))}
          </div>
        </fieldset>
        {/* fit */}
        <fieldset className="rounded border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <legend className="font-medium">fit 適合對象</legend>
            <button
              type="button"
              onClick={() => addStringItem('fit')}
              className="text-sm text-blue-600"
            >
              + 新增項目
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {form.fit.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => updateStringArray('fit', idx, e.target.value)}
                  className="flex-1 rounded border border-gray-300 px-3 py-1.5"
                />
                <button
                  type="button"
                  onClick={() => removeStringItem('fit', idx)}
                  className="text-red-500"
                >
                  刪
                </button>
              </div>
            ))}
          </div>
        </fieldset>
        {/* workflow */}
        <fieldset className="rounded border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <legend className="font-medium">workflow 導入流程</legend>
            <button type="button" onClick={addWorkflow} className="text-sm text-blue-600">
              + 新增流程步驟
            </button>
          </div>
          <div className="mt-3 space-y-4">
            {form.workflow.map((wf, idx) => (
              <div key={idx} className="space-y-2 rounded bg-slate-50 p-3">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">步驟 {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeWorkflow(idx)}
                    className="text-red-500 text-sm"
                  >
                    刪除
                  </button>
                </div>
                <input
                  placeholder="title"
                  value={wf.title}
                  onChange={(e) => updateWorkflow(idx, 'title', e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5"
                />
                <textarea
                  placeholder="text"
                  value={wf.text}
                  onChange={(e) => updateWorkflow(idx, 'text', e.target.value)}
                  rows={2}
                  className="w-full rounded border border-gray-300 px-3 py-1.5"
                />
              </div>
            ))}
          </div>
        </fieldset>
        {/* faqs */}
        <fieldset className="rounded border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <legend className="font-medium">faqs 常見問題</legend>
            <button type="button" onClick={addFaq} className="text-sm text-blue-600">
              + 新增 FAQ
            </button>
          </div>
          <div className="mt-3 space-y-4">
            {form.faqs.map((faq, idx) => (
              <div key={idx} className="space-y-2 rounded bg-slate-50 p-3">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">FAQ {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="text-red-500 text-sm"
                  >
                    刪除
                  </button>
                </div>
                <input
                  placeholder="question"
                  value={faq.question}
                  onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-1.5"
                />
                <textarea
                  placeholder="answer"
                  value={faq.answer}
                  onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                  rows={3}
                  className="w-full rounded border border-gray-300 px-3 py-1.5"
                />
              </div>
            ))}
          </div>
        </fieldset>
        {message && <div className="rounded bg-slate-100 p-3">{message}</div>}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting || !selectedCategorySlug}
            className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
          >
            {submitting ? '儲存中...' : '儲存新增服務'}
          </button>
        </div>
      </form>
    </div>
  );
}
