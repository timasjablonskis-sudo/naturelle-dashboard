import { ArrowRight } from "lucide-react";
import { cn } from '../lib/utils';

const ENGINES = [
  {
    id:"omni",
    name:"Omni-Channel Concierge",
    icon:"💬",
    iconBg:"#0d2a1e",
    accent:"#00e5a0",
    typeBg:"#0d1f15",
    typeColor:"#00e5a0",
    type:"TEXT-BASED AI",
    triggers:"748",
    desc:"Unified inbox — IG, FB, Chat, Email, SMS. Every channel, one AI brain.",
    skills:["Instant Lead Response","AI Qualification Engine","Missed Call Text-Back","In-Conversation Booking"],
  },
  {
    id:"voice",
    name:"Omni Voice Receptionist",
    icon:"📞",
    iconBg:"#1a1030",
    accent:"#7c6fff",
    typeBg:"#150f2a",
    typeColor:"#7c6fff",
    type:"VOICE-BASED AI",
    triggers:"132",
    desc:"24/7 phone handling — answers calls, qualifies leads, books appointments live.",
    skills:["Voice Qualification","In-Call Booking","Smart Hand-off"],
  },
];

const ADDONS = [
  { id:"reminders", icon:"🔔", name:"Smart Reminder Suite",       desc:'"Confirmation Required" logic — alerts staff if no confirmation within X hours. No more silent no-shows.',        runs:"203", channels:["Text","Voice"],  color:"#00e5a0" },
  { id:"reengage",  icon:"♻️", name:"Lead Re-engagement",         desc:"Monitors for ghosted leads and auto-triggers follow-up sequences to restart the booking conversation.",           runs:"84",  channels:["Text"],          color:"#7c6fff" },
  { id:"noshow",    icon:"🚫", name:"No-Show Recovery",           desc:"CRM trigger on no-show status — instant SMS or voice outreach to reschedule before the slot goes cold.",          runs:"47",  channels:["Text","Voice"],  color:"#f472b6" },
  { id:"reviews",   icon:"⭐", name:"Review Generation",          desc:"Post-appointment SMS triggers for Google and Yelp reviews. Turns happy patients into public social proof.",       runs:"156", channels:["Text"],          color:"#f59e0b" },
  { id:"cycle",     icon:"💉", name:"Treatment Cycle Automation",  desc:'The "Botox Clock" — auto-recall at 4-week, 3-month, and 6-month intervals. Every patient comes back on schedule.',runs:"94",  channels:["Text"],          color:"#a78bfa" },
  { id:"dbreact",   icon:"💤", name:"Database Reactivation",      desc:"Campaign mode — re-engages patients inactive 90+ days. Dormant revenue on demand.",                             runs:"12",  channels:["Text","Voice"],  color:"#34d399", campaign:true },
  { id:"rep",       icon:"🛡", name:"Reputation Response Engine",  desc:"Independent watchdog — monitors and responds to all Google reviews 24/7. Negatives get a shield. Positives get amplified.", runs:"156", channels:[],    color:"#60a5fa",
    details:[
      { label:"Positive Filter", color:"#00e5a0", bg:"#0a1f17", text:"4–5★ → auto thank-you response optimized for SEO" },
      { label:"Negative Shield", color:"#ff6b6b", bg:"#1f0a0a", text:"<3★ → professional holding response + instant owner SMS alert" },
    ]
  },
];

function ChannelTag({ label }) {
  const isVoice = label === "Voice"
  return (
    <span className={cn(
      "text-[10px] font-medium px-1.5 py-0.5 rounded border font-mono",
      isVoice ? "bg-[#15102a] text-[#7c6fff] border-[#7c6fff]/20" : "bg-primary/10 text-primary border-primary/20"
    )}>{label}</span>
  )
}

export default function Automations({ onNavigate, simStats, simStarted }) {
  return (
    <div className="pb-20 text-sm">

      {/* Header */}
      <div className="px-5 pt-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-white tracking-tight">Automations</h1>
            <p className="text-zinc-500 text-xs mt-1 font-sans">2 Core Systems · 7 Add-Ons · running 24/7</p>
          </div>
          <div className="flex gap-1.5 items-center flex-shrink-0 ml-2.5">
            <div className="font-mono text-[10px] font-semibold tracking-widest px-2.5 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary flex items-center gap-1.5">
              {simStarted && <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />}
              9 ACTIVE
            </div>
            <div className="text-[10px] text-zinc-600 px-2.5 py-1.5 rounded-md bg-surface-1 border border-white/10 font-sans">1,632 triggers</div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[
            ["9", "Active Systems"],
            ["1,632", "Total Triggers"],
            [simStarted ? String(simStats.leads) : "846", "Leads Captured"],
            [simStarted ? '$' + simStats.revenue.toLocaleString() : "$385k", "Revenue Attributed"],
          ].map(([v, l]) => (
            <div key={l} className="bg-surface-1 border border-white/10 rounded-lg px-3 py-3">
              <div className="text-xl font-bold text-white mb-0.5">{v}</div>
              <div className="text-[10px] text-zinc-600 font-sans">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Systems */}
      <div className="px-5">
        <h2 className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-600 uppercase mb-2.5">
          Core Systems
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">INCLUDED IN ALL PLANS</span>
        </h2>
        {ENGINES.map(e => (
          <div key={e.id} className="rounded-xl p-4 border relative overflow-hidden mb-2.5"
               style={{ background: '#0e1512', borderColor: `${e.accent}30` }}>
            <div className="absolute top-0 left-0 right-0 h-0.5"
                 style={{ background: `linear-gradient(90deg,${e.accent}80,transparent)` }} />
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 border"
                     aria-hidden="true"
                     style={{ background: e.iconBg, borderColor: `${e.accent}30` }}>{e.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{e.name}</div>
                  <div className="text-[11px] text-zinc-500 font-sans">{e.desc}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2.5">
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                      style={{ background: e.typeBg, color: e.typeColor }}>{e.type}</span>
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />ALWAYS ON
                </span>
              </div>
            </div>
            <div className="border-t pt-2.5" style={{ borderColor: `${e.accent}15` }}>
              <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-1.5">Native Skills · {e.triggers} triggers</div>
              <div className="grid grid-cols-2 gap-1.5">
                {e.skills.map(sk => (
                  <div key={sk} className="text-[11px] text-zinc-400 bg-surface-1 border border-white/[0.08] rounded-md px-2.5 py-1.5 flex items-center gap-1.5 font-sans">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: e.accent }} />{sk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add-On Automations */}
      <div className="px-5">
        <h2 className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-600 uppercase mb-2.5">
          Add-On Automations
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">7 AVAILABLE</span>
        </h2>

        {ADDONS.map(a => (
          <div key={a.id} className="rounded-xl p-3.5 flex items-start gap-3 relative overflow-hidden mb-2 border"
               style={{ background: '#0c1810', borderColor: `${a.color}25` }}>
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l" style={{ background: a.color }} />
            <div className="w-8 h-8 rounded-lg border flex items-center justify-center text-base flex-shrink-0"
                 aria-hidden="true"
                 style={{ background: '#0a1510', borderColor: `${a.color}30` }}>{a.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-xs font-semibold text-[#d0ead8]">{a.name}</span>
                {a.campaign && (
                  <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(245,166,35,0.1)', color: '#f5a623', border: '0.5px solid rgba(245,166,35,0.2)' }}>CAMPAIGN</span>
                )}
              </div>
              <div className={cn("text-[11px] text-zinc-500 leading-relaxed font-sans", a.details ? "mb-2" : "")}>{a.desc}</div>
              {a.details && a.details.map(d => (
                <div key={d.label} className="rounded px-2 py-1 flex items-center gap-1.5 mt-1.5 border"
                     style={{ background: d.bg, borderColor: `${d.color}20` }}>
                  <span className="text-[9px] font-bold tracking-widest flex-shrink-0 font-mono" style={{ color: d.color }}>{d.label}</span>
                  <span className="text-[11px] text-zinc-400 font-sans">{d.text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div className="flex gap-1">
                {a.channels.map(c => <ChannelTag key={c} label={c} />)}
              </div>
              <div className="text-[10px] font-mono" style={{ color: `${a.color}90` }}>{a.runs} runs</div>
            </div>
          </div>
        ))}
      </div>

      {/* See Plans CTA */}
      <div className="px-5">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('plans')}
          className="w-full text-left p-4 bg-surface-1 border border-primary/25 rounded-xl flex items-center justify-between cursor-pointer hover:border-primary/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div>
            <div className="text-sm font-bold text-white mb-1">Ready to see what this costs?</div>
            <div className="text-[11px] text-zinc-500 font-sans">Pick a plan or build your own — mix and match only what you need.</div>
          </div>
          <div className="flex items-center gap-1.5 text-primary flex-shrink-0 ml-4" aria-hidden="true">
            <span className="text-[11px] font-bold font-mono">See Plans</span>
            <ArrowRight size={14} />
          </div>
        </button>
      </div>
    </div>
  );
}
