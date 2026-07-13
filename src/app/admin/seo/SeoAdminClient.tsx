"use client";

import { useEffect, useState } from "react";
import { FileSearch, Loader2, Pencil, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

type SeoPage = {
  path: string;
  title: string;
  description: string;
  updatedAt: string | null;
  isOverride: boolean;
};

const EMPTY = { path: "", title: "", description: "" };

export default function SeoAdminClient() {
  const [pages, setPages] = useState<SeoPage[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/seo", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load SEO pages");
      setPages(data.pages || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load SEO pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const save = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save SEO metadata");
      setPages((current) => {
        const rest = current.filter((page) => page.path !== data.page.path);
        return [...rest, data.page].sort((a, b) => a.path.localeCompare(b.path));
      });
      setForm(EMPTY);
      toast.success("SEO metadata saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save SEO metadata");
    } finally {
      setSaving(false);
    }
  };

  const reset = async (path: string) => {
    try {
      const response = await fetch(`/api/admin/seo?path=${encodeURIComponent(path)}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to reset metadata");
      toast.success("Custom metadata removed; the page default will be used.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to reset metadata");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><FileSearch className="size-6 text-[#D4AF37]" /> SEO Manager</h1>
        <p className="mt-1 text-sm text-muted-foreground">Edit a page&apos;s meta title and description, or add any website path. Reset restores its built-in default.</p>
      </div>
      <section className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4"><Plus className="size-4 text-[#D4AF37]" /><h2 className="font-semibold">Add or update metadata</h2></div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Page path" value={form.path} placeholder="/services/seo" onChange={(path) => setForm({ ...form, path })} />
          <Field label={`Meta title (${form.title.length}/70)`} value={form.title} placeholder="Primary keyword | Brand" onChange={(title) => setForm({ ...form, title })} />
          <div className="md:col-span-2 space-y-1.5"><label className="text-sm font-medium">Meta description ({form.description.length}/170)</label><textarea value={form.description} maxLength={170} onChange={(event) => setForm({ ...form, description: event.target.value })} className="w-full min-h-24 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Clear benefit-led description for search results." /></div>
        </div>
        <button onClick={() => void save()} disabled={saving} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] text-black font-semibold disabled:opacity-50">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save metadata</button>
      </section>
      <section className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border"><h2 className="font-semibold">Managed pages</h2><button onClick={() => void load()} className="p-2 rounded-md hover:bg-muted" aria-label="Refresh"><RotateCcw className="size-4" /></button></div>
        {loading ? <div className="p-10 flex justify-center"><Loader2 className="size-6 animate-spin text-[#D4AF37]" /></div> : <div className="divide-y divide-border">{pages.map((page) => <div key={page.path} className="p-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="min-w-0"><p className="font-mono text-xs text-[#D4AF37]">{page.path}</p><h3 className="mt-1 font-semibold text-sm">{page.title}</h3><p className="mt-1 text-sm text-muted-foreground line-clamp-2">{page.description}</p></div><div className="shrink-0 flex gap-2"><button onClick={() => setForm({ path: page.path, title: page.title, description: page.description })} className="inline-flex items-center gap-1 px-3 py-2 text-xs rounded-md border border-border hover:bg-muted"><Pencil className="size-3.5" /> Edit</button>{page.isOverride && <button onClick={() => void reset(page.path)} className="inline-flex items-center gap-1 px-3 py-2 text-xs rounded-md border border-destructive/30 text-destructive hover:bg-destructive/10"><Trash2 className="size-3.5" /> Reset</button>}</div></div>)}</div>}
      </section>
    </div>
  );
}

function Field({ label, value, placeholder, onChange }: { label: string; value: string; placeholder: string; onChange: (value: string) => void }) {
  return <div className="space-y-1.5"><label className="text-sm font-medium">{label}</label><input value={value} maxLength={label.startsWith("Meta title") ? 70 : 180} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" /></div>;
}
