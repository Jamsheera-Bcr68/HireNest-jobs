import { useEffect, useState, type ReactNode, type FormEvent } from 'react';
import {
  MapPin, Mail, Phone, Pencil, FileDown, ShieldCheck, Send, Calendar,
  UserCheck, Award, User, Code2, Briefcase, GraduationCap, FileText, Plus,
  Download, Trash2, X, Github, Linkedin, Twitter, Globe, MessageCircle,
  BadgeCheck, Clock, XCircle, Building2, Eye, Check, Moon, Sun,
  ChevronDown, FileCheck, UploadCloud,
} from 'lucide-react';

/* ----------------------------- Types ----------------------------- */
type Skill = { id: string; skillName: string };
type Exp = { id: string; title: string; company: string; location?: string; startDate: string; endDate: string | null; current: boolean; description?: string };
type Edu = { id: string; degree: string; field?: string; institution: string; startDate: string; endDate?: string; grade?: string };
type ResumeItem = { id: string; fileName: string; fileSize: string; updatedAt: string; url: string };
type Profile = {
  name: string; title?: string; email: string; phone?: string; avatar?: string;
  address?: { place?: string; state?: string; country?: string };
  socialLinks?: Partial<Record<'gitHub' | 'linkedIn' | 'twitter' | 'portfolio' | 'youtube' | 'whatsapp', string>>;
  about?: string; skills: Skill[]; experience: Exp[]; education: Edu[]; resumes: ResumeItem[];
  applicationCount?: number; interviewsCount?: number; shortListedCount?: number; offeredCount?: number;
};

/* --------------------------- Dummy data --------------------------- */
const FULL: Profile = {
  name: 'Ashwin K. Nair',
  title: 'Full Stack Developer',
  email: 'ashwin.nair.dev@hirenest.io',
  phone: '+91 98472 10394',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  address: { place: 'Kochi', state: 'Kerala', country: 'India' },
  socialLinks: { gitHub: 'https://github.com/', linkedIn: 'https://linkedin.com/', twitter: 'https://twitter.com/', portfolio: 'https://example.com', whatsapp: 'https://wa.me/919847210394' },
  about: 'Product-minded Full Stack Engineer with 4+ years of experience building scalable React applications and reliable Node.js services. Focused on clean code, web performance and responsive design systems.',
  skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'SQL', 'REST APIs', 'Git', 'Tailwind CSS'].map((s, i) => ({ id: `s${i}`, skillName: s })),
  experience: [
    { id: 'e1', title: 'Senior Frontend Engineer', company: 'Inovora Cloud Labs', location: 'Kochi, Kerala (Hybrid)', startDate: '2022-04-01', endDate: null, current: true, description: 'Led the redesign of the B2B analytics portal in React, TypeScript and Tailwind. Cut bundle size by 38% with route splitting. Mentored 5 developers.' },
    { id: 'e2', title: 'Full Stack Developer', company: 'TechnoQuest Solutions', location: 'Thiruvananthapuram, Kerala', startDate: '2020-07-01', endDate: '2022-03-31', current: false, description: 'Built REST APIs in Node.js/Express with MongoDB and PostgreSQL. Delivered workflow tools used by 20,000+ monthly users.' },
  ],
  education: [{ id: 'd1', degree: 'Bachelor of Technology (B.Tech)', field: 'Computer Science & Engineering', institution: 'Cochin University of Science and Technology', startDate: '2016-08-01', endDate: '2020-05-30', grade: '8.7 CGPA' }],
  resumes: [
    { id: 'r1', fileName: 'Ashwin_Nair_FullStack_Resume_2025.pdf', fileSize: '248 KB', updatedAt: '2025-02-14T08:30:00Z', url: '#' },
    { id: 'r2', fileName: 'Ashwin_Nair_Frontend_Resume.pdf', fileSize: '212 KB', updatedAt: '2024-11-02T08:30:00Z', url: '#' },
  ],
  applicationCount: 14, interviewsCount: 6, shortListedCount: 5, offeredCount: 2,
};
const EMPTY: Profile = { name: 'Rahul Varma', email: 'rahul.varma@hirenest.io', skills: [], experience: [], education: [], resumes: [] };
const PRESETS: Record<string, Profile> = { 'Full profile': FULL, 'Empty profile': EMPTY, 'Partial profile': { ...FULL, phone: undefined, avatar: undefined, socialLinks: { gitHub: 'https://github.com/' }, education: [], resumes: [], shortListedCount: undefined, offeredCount: undefined } };

type CompanyStatus = 'verified' | 'in_review' | 'rejected' | 'suspended';
const STATUS: Record<CompanyStatus, { label: string; cls: string; Icon: typeof BadgeCheck; text: string }> = {
  verified: { label: 'Verified', Icon: BadgeCheck, cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800', text: 'Registration documents and tax credentials were verified by HireNest Trust & Safety.' },
  in_review: { label: 'In review', Icon: Clock, cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800', text: 'Your submission is being audited. Reviews usually finish within 1–2 business days.' },
  rejected: { label: 'Rejected', Icon: XCircle, cls: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800', text: 'The uploaded certificate did not match the CIN on the MCA portal. Upload an up-to-date certificate with the official seal.' },
  suspended: { label: 'Suspended', Icon: Clock, cls: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800', text: 'Registration is frozen pending annual GST and tax filing verification.' },
};

/* --------------------------- Helpers --------------------------- */
const card = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900';
const h2 = 'flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white';
const ghostBtn = 'inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';
const primaryBtn = 'inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:from-fuchsia-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900';
const iconBtn = 'rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 dark:hover:bg-slate-800';
const year = (d?: string | null) => (d ? new Date(d).getFullYear() : '');
const initials = (n: string) => n.trim().split(/\s+/).map((p, i, a) => (i === 0 || i === a.length - 1 ? p[0] : '')).join('').toUpperCase();

function Section({ icon, title, action, children }: { icon: ReactNode; title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className={card}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className={h2}><span className="text-fuchsia-600 dark:text-fuchsia-400">{icon}</span>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
const AddBtn = ({ onClick, label = 'Add' }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-fuchsia-600 hover:bg-fuchsia-50 dark:text-fuchsia-400 dark:hover:bg-fuchsia-950/40">
    <Plus size={14} /> {label}
  </button>
);
const Empty = ({ icon, title, hint, cta, onCta }: { icon: ReactNode; title: string; hint: string; cta?: string; onCta?: () => void }) => (
  <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center dark:border-slate-800">
    <div className="mx-auto mb-2 flex justify-center text-slate-400">{icon}</div>
    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</p>
    <p className="mx-auto mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">{hint}</p>
    {cta && <button onClick={onCta} className="mt-3 rounded-lg border border-fuchsia-200 bg-fuchsia-50 px-3 py-1.5 text-xs font-semibold text-fuchsia-600 hover:bg-fuchsia-100 dark:border-fuchsia-800 dark:bg-fuchsia-950/60 dark:text-fuchsia-400">{cta}</button>}
  </div>
);

/* ---------------------------- Sections ---------------------------- */
function Hero({ p, onEdit, onToast }: { p: Profile; onEdit: () => void; onToast: (m: string) => void }) {
  const [imgOk, setImgOk] = useState(true);
  const loc = [p.address?.place, p.address?.state, p.address?.country].filter(Boolean).join(', ');
  const socials = [
    ['gitHub', 'GitHub', Github], ['linkedIn', 'LinkedIn', Linkedin], ['twitter', 'Twitter', Twitter],
    ['portfolio', 'Portfolio', Globe], ['whatsapp', 'WhatsApp', MessageCircle],
  ] as const;
  const links = socials.filter(([k]) => p.socialLinks?.[k]);
  return (
    <section className={`${card} relative overflow-hidden`}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <div className="relative shrink-0">
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 ring-4 ring-slate-100 sm:h-24 sm:w-24 dark:bg-slate-800 dark:ring-slate-800/80">
              {p.avatar && imgOk ? (
                <img src={p.avatar} alt={p.name} onError={() => setImgOk(false)} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-600 to-purple-800 text-2xl font-bold text-white">{initials(p.name)}</div>
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" title="Active" />
          </div>
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">{p.name}</h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2 py-0.5 text-[11px] font-semibold text-fuchsia-700 dark:border-fuchsia-800/60 dark:bg-fuchsia-950/60 dark:text-fuchsia-300"><ShieldCheck size={12} /> Verified</span>
            </div>
            <p className={`text-sm ${p.title ? 'font-semibold text-slate-600 dark:text-slate-300' : 'italic text-slate-400'}`}>{p.title || 'Add your professional title'}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {loc && <span className="inline-flex items-center gap-1"><MapPin size={14} className="text-slate-400" />{loc}</span>}
              <span className="inline-flex min-w-0 items-center gap-1"><Mail size={14} className="shrink-0 text-slate-400" /><span className="truncate">{p.email}</span></span>
              {p.phone && <span className="inline-flex items-center gap-1"><Phone size={14} className="text-slate-400" />{p.phone}</span>}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2.5 border-t border-slate-100 pt-3 sm:w-auto sm:flex-col sm:border-0 sm:pt-0 dark:border-slate-800/70">
          <button onClick={onEdit} className={`${primaryBtn} flex-1 sm:flex-none`}><Pencil size={14} /> Edit profile</button>
          {p.resumes[0] && <button onClick={() => onToast(`Downloading ${p.resumes[0].fileName}`)} className={`${ghostBtn} flex-1 sm:flex-none`}><FileDown size={14} className="text-fuchsia-600" /> Download CV</button>}
        </div>
      </div>
      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800/80">
          {links.map(([k, label, Icon]) => (
            <a key={k} href={p.socialLinks![k]} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
              <Icon size={14} className="text-slate-500 dark:text-slate-400" /> {label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function Stats({ p }: { p: Profile }) {
  const items = [
    ['Applications', p.applicationCount, Send, 'text-fuchsia-500'], ['Interviews', p.interviewsCount, Calendar, 'text-purple-500'],
    ['Shortlisted', p.shortListedCount, UserCheck, 'text-indigo-500'], ['Offers', p.offeredCount, Award, 'text-emerald-500'],
  ] as const;
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {items.map(([label, val, Icon, c]) => (
        <div key={label} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-fuchsia-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-fuchsia-900/40">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">{label}<Icon size={14} className={c} /></div>
          <div className={`mt-1.5 text-xl font-bold tabular-nums ${val == null ? 'text-slate-300 dark:text-slate-600' : 'text-slate-900 dark:text-white'}`}>{val ?? '—'}</div>
        </div>
      ))}
    </section>
  );
}

function Timeline({ items }: { items: { id: string; dot: string; title: string; range: string; sub: ReactNode; body?: string }[] }) {
  return (
    <div>
      {items.map((it, i) => (
        <div key={it.id} className={`relative ml-1.5 pb-5 pl-5 sm:pl-6 ${i < items.length - 1 ? 'border-l-2 border-slate-200 dark:border-slate-800' : 'pb-0'}`}>
          <span className={`absolute -left-[6px] top-1.5 h-2.5 w-2.5 rounded-full ${it.dot}`} />
          <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{it.title}</h3>
            <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">{it.range}</span>
          </div>
          <div className="mt-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">{it.sub}</div>
          {it.body && <p className="mt-2 max-w-prose text-xs leading-relaxed text-slate-600 dark:text-slate-300">{it.body}</p>}
        </div>
      ))}
    </div>
  );
}

function Company() {
  const [status, setStatus] = useState<CompanyStatus>('verified');
  const [open, setOpen] = useState(false);
  const s = STATUS[status];
  const bad = status === 'rejected' || status === 'suspended';
  return (
    <section className={card}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-600 to-purple-600 text-white"><Building2 size={20} /></div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Company verification</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Inovora Cloud Labs Pvt Ltd · Kochi, Kerala</p>
          </div>
        </div>
        <span className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.cls}`}><s.Icon size={12} />{s.label}</span>
      </div>
      <div className={`mt-4 rounded-xl border p-3.5 text-xs leading-relaxed ${bad ? s.cls : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300'}`}>
        {s.text}
        {bad && <button className="mt-2 block rounded-lg bg-fuchsia-600 px-3 py-1.5 font-semibold text-white hover:bg-fuchsia-700">Reapply now</button>}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-200 bg-purple-100 text-purple-600 dark:border-purple-900/60 dark:bg-purple-950/80 dark:text-purple-400"><FileText size={16} /></div>
          <div className="min-w-0"><p className="truncate text-xs font-bold text-slate-900 dark:text-white">Certificate_of_Incorporation_MCA.pdf</p><p className="text-[11px] text-slate-500">Submitted 10 Jan 2024</p></div>
        </div>
        <button className={`${ghostBtn} px-2.5 py-1`}><Eye size={14} /><span className="hidden sm:inline">View</span></button>
      </div>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-3 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-700 hover:text-fuchsia-600 dark:border-slate-800 dark:text-slate-300">
        Verification history (3 attempts)<ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="mt-3 space-y-3 border-l-2 border-slate-200 pl-4 text-xs dark:border-slate-800">
          {[['Attempt 3 · Incorporation certificate', '18 Jan 2024 · Approved'], ['Attempt 2 · GSTIN', '12 Jan 2024 · Replaced'], ['Attempt 1 · Initial request', '10 Jan 2024 · Submitted']].map(([a, b]) => (
            <li key={a}><p className="font-bold text-slate-900 dark:text-white">{a}</p><p className="text-slate-500 dark:text-slate-400">{b}</p></li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed border-slate-200 pt-3 text-[11px] text-slate-400 dark:border-slate-800">
        Demo status:
        {(Object.keys(STATUS) as CompanyStatus[]).map((k) => (
          <button key={k} onClick={() => setStatus(k)} className={`rounded-md px-2 py-1 font-medium ${k === status ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{STATUS[k].label}</button>
        ))}
      </div>
    </section>
  );
}

function EditModal({ p, onClose, onSave }: { p: Profile; onClose: () => void; onSave: (n: Profile) => void }) {
  const [f, setF] = useState({ name: p.name, title: p.title ?? '', email: p.email, phone: p.phone ?? '', about: p.about ?? '', skills: p.skills.map((s) => s.skillName).join(', ') });
  const [err, setErr] = useState('');
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return setErr('Full name is required.');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address.');
    onSave({ ...p, name: f.name.trim(), title: f.title.trim() || undefined, email: f.email.trim(), phone: f.phone.trim() || undefined, about: f.about.trim() || undefined,
      skills: f.skills.split(',').map((s) => s.trim()).filter(Boolean).map((s, i) => ({ id: `n${i}`, skillName: s })) });
  };
  const input = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';
  const label = 'mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300';
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="edit-title" onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <h3 id="edit-title" className="text-base font-bold text-slate-900 dark:text-white">Edit profile</h3>
          <button onClick={onClose} aria-label="Close" className={iconBtn}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="space-y-4 overflow-y-auto p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className={label} htmlFor="n">Full name *</label><input id="n" className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
            <div><label className={label} htmlFor="t">Professional title</label><input id="t" className={input} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
            <div><label className={label} htmlFor="e">Email *</label><input id="e" type="email" className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
            <div><label className={label} htmlFor="p">Phone</label><input id="p" type="tel" className={input} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
          </div>
          <div><label className={label} htmlFor="a">Professional summary</label><textarea id="a" rows={4} className={input} value={f.about} onChange={(e) => setF({ ...f, about: e.target.value })} /></div>
          <div><label className={label} htmlFor="s">Skills (comma separated)</label><input id="s" className={input} value={f.skills} onChange={(e) => setF({ ...f, skills: e.target.value })} placeholder="React, TypeScript, Node.js" /></div>
          {err && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400">{err}</p>}
          <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button type="button" onClick={onClose} className={ghostBtn}>Cancel</button>
            <button type="submit" className={primaryBtn}><Check size={14} /> Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------ Page ------------------------------ */
export default function CandidateProfileDemo() {
  const [p, setP] = useState<Profile>(FULL);
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState('');
  const show = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500); };
  const del = (k: 'experience' | 'education' | 'resumes' | 'skills', id: string) => { setP({ ...p, [k]: (p[k] as { id: string }[]).filter((x) => x.id !== id) } as Profile); show('Removed'); };
  const range = (a: string, b?: string | null, cur?: boolean) => `${year(a)} — ${cur ? 'Present' : year(b) || 'Present'}`;

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        {/* Demo-only toolbar: remove in your app */}
        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
            <span className="text-sm font-bold text-fuchsia-600">HireNest · demo</span>
            <div className="flex items-center gap-2">
              <select onChange={(e) => setP(PRESETS[e.target.value])} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800" aria-label="Data preset">
                {Object.keys(PRESETS).map((k) => <option key={k}>{k}</option>)}
              </select>
              <button onClick={() => setDark(!dark)} aria-label="Toggle theme" className={`${iconBtn} border border-slate-200 dark:border-slate-700`}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-4xl space-y-5 px-4 py-6 sm:space-y-6 sm:py-8">
          <Hero p={p} onEdit={() => setModal(true)} onToast={show} />
          <Stats p={p} />

          <Section icon={<User size={16} />} title="Professional summary">
            {p.about ? <p className="max-w-prose text-sm leading-relaxed text-slate-600 dark:text-slate-300">{p.about}</p>
              : <Empty icon={<FileText size={24} />} title="No summary yet" hint="A short summary helps recruiters understand your goals." cta="Add summary" onCta={() => setModal(true)} />}
          </Section>

          <Section icon={<Code2 size={16} />} title="Skills" action={p.skills.length ? <span className="text-xs text-slate-400">{p.skills.length} listed</span> : <AddBtn onClick={() => setModal(true)} />}>
            {p.skills.length ? (
              <div className="flex flex-wrap gap-2">
                {p.skills.map((s) => (
                  <span key={s.id} className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 py-1.5 pl-3 pr-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />{s.skillName}
                    <button onClick={() => del('skills', s.id)} aria-label={`Remove ${s.skillName}`} className="rounded p-0.5 text-slate-400 hover:text-rose-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
            ) : <Empty icon={<Code2 size={24} />} title="No skills added" hint="Tag the languages and tools you work with." />}
          </Section>

          <Section icon={<Briefcase size={16} />} title="Work experience" action={<AddBtn onClick={() => show('Open Add Experience modal')} />}>
            {p.experience.length ? (
              <Timeline items={p.experience.map((x) => ({
                id: x.id, dot: x.current ? 'bg-fuchsia-600 ring-4 ring-fuchsia-100 dark:ring-fuchsia-950' : 'bg-slate-300 dark:bg-slate-700',
                title: x.title, range: range(x.startDate, x.endDate, x.current), body: x.description,
                sub: (<span className="flex flex-wrap items-center gap-x-2"><span className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">{x.company}</span>{x.location && <span>· {x.location}</span>}
                  <span className="ml-auto flex"><button aria-label="Edit" onClick={() => show('Open Edit Experience modal')} className={iconBtn}><Pencil size={14} /></button><button aria-label="Delete" onClick={() => del('experience', x.id)} className={`${iconBtn} hover:text-rose-500`}><Trash2 size={14} /></button></span></span>),
              }))} />
            ) : <Empty icon={<Briefcase size={24} />} title="No work experience listed" hint="Add roles, internships and the impact you made." cta="Add experience" onCta={() => show('Open Add Experience modal')} />}
          </Section>

          <Section icon={<GraduationCap size={16} />} title="Education" action={<AddBtn onClick={() => show('Open Add Education modal')} />}>
            {p.education.length ? (
              <Timeline items={p.education.map((x) => ({
                id: x.id, dot: 'bg-purple-600', title: x.degree, range: range(x.startDate, x.endDate), body: x.grade ? `Grade: ${x.grade}` : undefined,
                sub: (<span className="flex flex-wrap items-center gap-x-2"><span className="font-semibold text-purple-600 dark:text-purple-400">{x.institution}</span>{x.field && <span>· {x.field}</span>}
                  <span className="ml-auto flex"><button aria-label="Edit" onClick={() => show('Open Edit Education modal')} className={iconBtn}><Pencil size={14} /></button><button aria-label="Delete" onClick={() => del('education', x.id)} className={`${iconBtn} hover:text-rose-500`}><Trash2 size={14} /></button></span></span>),
              }))} />
            ) : <Empty icon={<GraduationCap size={24} />} title="No education added" hint="Add your degree, university or certifications." cta="Add education" onCta={() => show('Open Add Education modal')} />}
          </Section>

          <Section icon={<FileText size={16} />} title="Resumes & documents" action={<AddBtn label="Upload" onClick={() => show('Open file picker')} />}>
            {p.resumes.length ? (
              <div className="space-y-3">
                {p.resumes.map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 transition hover:border-fuchsia-300 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-fuchsia-800">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-fuchsia-200 bg-fuchsia-100 text-fuchsia-600 dark:border-fuchsia-900/60 dark:bg-fuchsia-950/80 dark:text-fuchsia-400"><FileCheck size={16} /></div>
                      <div className="min-w-0"><p className="truncate text-xs font-bold text-slate-900 dark:text-white">{r.fileName}</p><p className="text-[11px] text-slate-500 dark:text-slate-400">{r.fileSize} · Uploaded {new Date(r.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className={`${ghostBtn} px-3 py-1.5`}><Download size={14} /><span className="hidden sm:inline">View</span></a>
                      <button aria-label="Delete resume" onClick={() => del('resumes', r.id)} className={`${iconBtn} hover:text-rose-500`}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <Empty icon={<UploadCloud size={24} />} title="No resumes uploaded" hint="Upload a PDF or Word resume for recruiters." cta="Upload resume" onCta={() => show('Open file picker')} />}
          </Section>

          <Company />
        </main>

        {modal && <EditModal p={p} onClose={() => setModal(false)} onSave={(n) => { setP(n); setModal(false); show('Profile updated'); }} />}
        <div role="status" aria-live="polite" className={`pointer-events-none fixed inset-x-4 bottom-5 z-50 mx-auto w-fit max-w-full rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl transition-all duration-300 dark:bg-slate-100 dark:text-slate-900 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>{toast}</div>
      </div>
    </div>
  );
}