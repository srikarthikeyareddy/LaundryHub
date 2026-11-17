'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shirt, User, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginStudent, loginAsStaff, demoStaff, loadingUsers } = useAuth();
  const [roleTab, setRoleTab] = useState<'STUDENT' | 'STAFF'>('STUDENT');
  const [registration, setRegistration] = useState('RA2311003011798');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (roleTab === 'STUDENT') {
        await loginStudent(registration.trim().toUpperCase(), password);
        router.replace('/student');
      } else {
        const selected = staffId || String(demoStaff[0]?.id ?? '');
        if (!selected) throw new Error('Staff accounts are unavailable. Check that the backend is running.');
        loginAsStaff(selected);
        router.replace('/staff');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fc] grid lg:grid-cols-[1fr_1.05fr] text-slate-900">
      <section className="hidden lg:flex flex-col justify-between bg-[#112c64] text-white p-14 xl:p-20 relative overflow-hidden">
        <div aria-hidden="true" className="absolute w-[520px] h-[520px] rounded-full border-[80px] border-white/5 -right-64 top-32" />
        <div className="relative flex items-center gap-3"><div className="rounded-xl bg-white/15 p-3"><Shirt size={24} /></div><span className="text-2xl font-bold tracking-tight">LaundryHub<span className="text-blue-300">.</span></span></div>
        <div className="relative max-w-md py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-400/10 border border-blue-300/20 px-3 py-1.5 text-xs text-blue-200 mb-7"><Sparkles size={14} /> A little less laundry. A little more life.</div>
          <h1 className="text-5xl xl:text-6xl font-semibold leading-[1.12] tracking-tight">Fresh clothes.<br /><span className="text-blue-300">Clear schedule.</span></h1>
          <p className="text-blue-100/75 mt-6 text-base leading-relaxed">Your hostel laundry, all in one place. Place an order, follow its progress, and know when it’s ready.</p>
          <div className="mt-9 space-y-4 text-sm text-blue-100">{['Hostel-approved laundry rates', 'Track every order from wash to pickup', 'Your personal student dashboard'].map(text => <p key={text} className="flex gap-3 items-center"><CheckCircle2 size={17} className="text-blue-300" />{text}</p>)}</div>
        </div>
        <p className="relative text-xs text-blue-200/60">HOSTEL LAUNDRY MANAGEMENT SYSTEM</p>
      </section>

      <section className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="lg:hidden flex items-center gap-2 text-blue-700 font-bold mb-10"><Shirt size={25} />LaundryHub</div>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-blue-600 mb-3">Your laundry, simplified</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome back.</h2>
          <p className="text-slate-500 mt-3 mb-8">Sign in to manage your hostel laundry.</p>

          <div className="flex p-1.5 bg-slate-200/60 rounded-xl mb-7" aria-label="Account type">
            {(['STUDENT', 'STAFF'] as const).map(role => <button key={role} type="button" aria-pressed={roleTab === role} disabled={busy} onClick={() => { setRoleTab(role); setError(''); setPassword(''); }} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition ${roleTab === role ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>{role === 'STUDENT' ? <User size={16} /> : <ShieldCheck size={16} />}{role === 'STUDENT' ? 'Student' : 'Staff demo'}</button>)}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {roleTab === 'STUDENT' ? <div>
              <label htmlFor="registration" className="block text-sm font-semibold mb-2">Registration number</label>
              <input id="registration" name="username" autoComplete="username" required maxLength={40} value={registration} onChange={e => setRegistration(e.target.value)} spellCheck={false} autoCapitalize="characters" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div> : <div>
              <label htmlFor="staff" className="block text-sm font-semibold mb-2">Staff account</label>
              <select id="staff" value={staffId || String(demoStaff[0]?.id ?? '')} onChange={e => setStaffId(e.target.value)} disabled={loadingUsers} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm">{demoStaff.length === 0 && <option value="">Loading accounts…</option>}{demoStaff.map(staff => <option key={staff.id} value={String(staff.id)}>{staff.name} · {staff.staffType}</option>)}</select>
            </div>}

            {roleTab === 'STUDENT' && <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative"><Lock size={17} className="absolute left-4 top-4 text-slate-400" /><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required maxLength={72} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-500">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            </div>}

            {error && <p role="alert" className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</p>}
            <button type="submit" disabled={busy || (roleTab === 'STAFF' && loadingUsers)} className="w-full flex items-center justify-center gap-3 rounded-xl bg-blue-600 text-white py-3.5 text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60">{busy ? 'Signing in…' : roleTab === 'STUDENT' ? 'Sign in to your dashboard' : 'Open staff demo'}<ArrowRight size={17} /></button>
          </form>

          <aside className="mt-7 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm">
            <p className="text-blue-900 font-semibold">{roleTab === 'STUDENT' ? 'Your demo account' : 'Staff demonstration'}</p>
            {roleTab === 'STUDENT' ? <><p className="text-slate-600 mt-2">Sri Karthikeya</p><p className="font-mono text-xs text-slate-600 mt-1">RA2311003011798</p><p className="text-slate-600 mt-2">Demo password: <code className="font-semibold text-blue-800">WashWise@123</code></p></> : <p className="text-slate-600 mt-2">Choose a seeded staff profile to explore laundry operations. This demo does not require a staff password.</p>}
          </aside>
          <p className="text-center text-xs text-slate-400 mt-8">LaundryHub · Made for a better hostel day</p>
        </div>
      </section>
    </main>
  );
}
