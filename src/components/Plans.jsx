import { useState } from "react";
import { CreditCard } from "lucide-react";
import { cn } from "../lib/utils";

const CONTACT_EMAIL = 'timasjablonskis@gmail.com';

const TIERS = [
  { id:"starter", name:"Growth System",    tagline:"24/7 AI front desk. Every call, every message, every lead.",  setup:497,  monthly:297,  color:"#00e5a0", badge:"ENTRY",       addonIdxs:[0] },
  { id:"growth",  name:"Retention Pro",   tagline:"Growth System + recover the revenue you're already losing.",   setup:997,  monthly:597,  color:"#7c6fff", badge:"POPULAR",     addonIdxs:[0,1,2,3], recommended:true },
  { id:"os",      name:"Med Spa OS",      tagline:"Every automation. The complete front-office stack.",            setup:1497, monthly:997,  color:"#f5a623", badge:"FULL STACK",   addonIdxs:[0,1,2,3,4,5,6] },
  { id:"custom",  name:"Build Your Own",  tagline:"Mix and match. Pay for exactly what you need.",                setup:null, monthly:null, color:"#e040fb", badge:"CUSTOM" },
];

const ENGINES = [
  { id:"omni",  name:"Omni-Channel Concierge",  icon:"💬" },
  { id:"voice", name:"Omni Voice Receptionist", icon:"📞" },
];

const ADDONS = [
  { id:"reminders", icon:"🔔", name:"Smart Reminder Suite",       desc:'"Confirmation Required" logic — alerts staff if no confirmation within X hours',                       addonPrice:99,  campaign:false },
  { id:"reengage",  icon:"♻️", name:"Lead Re-engagement",         desc:"Monitors for ghosted leads — auto-triggers follow-up sequences to restart booking conversations",       addonPrice:149, campaign:false },
  { id:"noshow",    icon:"🚫", name:"No-Show Recovery",           desc:"CRM trigger on no-show status — instant SMS or voice outreach to reschedule",                          addonPrice:119, campaign:false },
  { id:"reviews",   icon:"⭐", name:"Review Generation",          desc:"Post-appointment SMS triggers for Google/Yelp reviews",                                                 addonPrice:99,  campaign:false },
  { id:"cycle",     icon:"💉", name:"Treatment Cycle Automation",  desc:'The "Botox Clock" — auto-recall at 4-week, 3-month, and 6-month intervals',                           addonPrice:159, campaign:false },
  { id:"dbreact",   icon:"💤", name:"Database Reactivation",      desc:"Campaign mode — re-engages patients inactive 90+ days",                                                addonPrice:0,   campaign:true, campaignPrice:399, campaignNote:"Per campaign run — not a monthly charge" },
  { id:"rep",       icon:"🛡", name:"Reputation Response Engine",  desc:"Independent watchdog — monitors and responds to all Google reviews 24/7",                             addonPrice:169, campaign:false },
];

const CUSTOM_FLOOR_MONTHLY = 297;
const CUSTOM_FLOOR_SETUP   = 497;

function calcCustom(selectedIds) {
  let monthly = CUSTOM_FLOOR_MONTHLY;
  let setup   = CUSTOM_FLOOR_SETUP;
  for (const id of selectedIds) {
    const a = ADDONS.find(x => x.id === id);
    if (a && !a.campaign) {
      monthly += a.addonPrice;
      setup += 50;
    }
  }
  return { monthly, setup };
}

function cheaperTierExists(monthly, selectedIds) {
  const sel = new Set(selectedIds);
  for (const t of TIERS.filter(x => x.id !== "custom")) {
    const tSet = new Set((t.addonIdxs || []).map(i => ADDONS[i].id));
    if ([...sel].every(id => tSet.has(id)) && t.monthly <= monthly) return t;
  }
  return null;
}

function exactMatchTier(selectedIds) {
  const sel = new Set(selectedIds);
  for (const t of TIERS.filter(x => x.id !== "custom")) {
    const tSet = new Set((t.addonIdxs || []).map(i => ADDONS[i].id));
    if (tSet.size === sel.size && [...tSet].every(id => sel.has(id))) return t;
  }
  return null;
}

function Toggle({ on }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-9 h-5 rounded-full border flex-shrink-0 transition-all duration-200",
        on ? "bg-primary/15 border-primary/40" : "bg-surface-1 border-white/10"
      )}
    >
      <div className={cn(
        "absolute top-[3px] w-3.5 h-3.5 rounded-full transition-all duration-200",
        on ? "left-[19px] bg-primary" : "left-[3px] bg-zinc-600"
      )} />
    </div>
  );
}

export default function Plans() {
  const [activeTier, setActiveTier] = useState("growth");
  const [customSel,  setCustomSel]  = useState(new Set());

  function toggleAddon(id) {
    setCustomSel(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selArr     = [...customSel];
  const custom     = calcCustom(selArr);
  const cheaper    = activeTier === "custom" ? cheaperTierExists(custom.monthly, selArr) : null;
  const exactMatch = activeTier === "custom" ? exactMatchTier(selArr) : null;
  const activeT    = TIERS.find(t => t.id === activeTier);

  const TierCards = TIERS.map(t => {
    const sel = activeTier === t.id;
    const c   = t.color;
    let priceEl;
    if (t.id === "custom") {
      priceEl = selArr.length > 0
        ? (
          <div className="flex items-baseline gap-1 mt-2.5">
            <span className={cn("text-lg font-bold", sel ? "" : "text-zinc-600")} style={{ color: sel ? c : undefined }}>${custom.monthly}</span>
            <span className="text-[10px] text-zinc-500 font-sans">/mo</span>
            <span className="text-[10px] text-zinc-700 ml-1 font-sans">+ ${custom.setup} setup</span>
          </div>
        )
        : (
          <div className="mt-2.5 text-[10px] font-sans" style={{ color: sel ? c + '80' : undefined }}>
            <span className={sel ? "" : "text-zinc-600"}>From ${CUSTOM_FLOOR_MONTHLY}/mo + add-ons</span>
          </div>
        );
    } else {
      priceEl = (
        <div className="flex items-baseline gap-1 mt-2.5">
          <span className={cn("text-lg font-bold", sel ? "" : "text-zinc-600")} style={{ color: sel ? c : undefined }}>${t.monthly}</span>
          <span className="text-[10px] text-zinc-500 font-sans">/mo</span>
          <span className="text-[10px] text-zinc-700 ml-1 font-sans">+ ${t.setup} setup</span>
        </div>
      );
    }
    return (
      <div
        key={t.id}
        role="radio"
        aria-checked={sel}
        tabIndex={sel ? 0 : -1}
        className={cn(
          "rounded-xl p-4 cursor-pointer relative overflow-hidden transition-all duration-200 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          sel ? "bg-surface-1" : "bg-surface-1/60 hover:bg-surface-1/80"
        )}
        style={{ borderColor: sel ? `${c}60` : 'rgba(255,255,255,0.1)' }}
        onClick={() => setActiveTier(t.id)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTier(t.id); } }}
      >
        {sel && (
          <div className="absolute top-0 left-0 right-0 h-0.5"
               style={{ background: `linear-gradient(90deg,${c},transparent)` }} />
        )}
        <div className="absolute top-2 right-2">
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                style={{ color: c, background: `${c}15`, border: `0.5px solid ${c}30` }}>
            {t.id === "custom" ? "✦ " + t.badge : t.badge}
          </span>
        </div>
        <div className={cn("text-[11px] font-bold mb-1 pr-14", sel ? "text-primary" : "text-zinc-600")}>{t.name}</div>
        <div className="text-[10px] text-zinc-500 leading-snug font-sans">{t.tagline}</div>
        {priceEl}
      </div>
    );
  });

  const CustomRows = ADDONS.map(a => {
    const on = customSel.has(a.id);
    const priceLabel = a.campaign ? `$${a.campaignPrice} / run` : `+$${a.addonPrice}/mo`;
    return (
      <div
        key={a.id}
        role="switch"
        aria-checked={on}
        aria-label={a.name}
        tabIndex={0}
        className={cn(
          "rounded-xl p-3.5 flex items-start gap-3 relative overflow-hidden mb-2 cursor-pointer border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          on ? "bg-surface-1 border-white/15" : "bg-surface-1 border-white/[0.06] hover:border-white/10"
        )}
        onClick={() => toggleAddon(a.id)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAddon(a.id); } }}
      >
        <Toggle on={on} />
        <div
          aria-hidden="true"
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0",
            on ? "bg-primary/10" : "bg-white/[0.03]"
          )}
        >{a.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className={cn("text-xs font-semibold", on ? "text-[#d0ead8]" : "text-zinc-500")}>{a.name}</span>
            {a.campaign && (
              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(245,166,35,0.1)', color: '#f5a623', border: '0.5px solid rgba(245,166,35,0.2)' }}>
                CAMPAIGN
              </span>
            )}
          </div>
          <div className={cn("text-[11px] leading-snug font-sans", on ? "text-zinc-400" : "text-zinc-600")}>{a.desc}</div>
          {a.campaign && <div className="text-[10px] text-zinc-600 mt-1 font-sans italic">Per-run charge, not monthly</div>}
        </div>
        <div className={cn("text-xs font-semibold flex-shrink-0 ml-2", on ? "text-primary" : "text-zinc-600")}>{priceLabel}</div>
      </div>
    );
  });

  const CustomSummary = selArr.length > 0 && (
    <div className="bg-surface-1 border border-white/15 rounded-xl p-5 mt-4">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-bold text-white">Your Custom Plan</span>
        <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
              style={{ color: '#e040fb', background: 'rgba(224,64,251,0.1)', border: '0.5px solid rgba(224,64,251,0.2)' }}>
          ✦ CUSTOM
        </span>
      </div>
      <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06] text-[11px] font-sans">
        <span className="text-zinc-600">Core Systems (always included)</span>
        <span className="text-zinc-400">${CUSTOM_FLOOR_MONTHLY}/mo</span>
      </div>
      {selArr.filter(id => !ADDONS.find(x => x.id === id)?.campaign).map(id => {
        const a = ADDONS.find(x => x.id === id);
        return (
          <div key={id} className="flex justify-between items-center py-1.5 border-b border-white/[0.06] text-[11px] font-sans">
            <span className="text-zinc-400">{a.icon} {a.name}</span>
            <span className="text-white">+${a.addonPrice}/mo</span>
          </div>
        );
      })}
      {selArr.filter(id => ADDONS.find(x => x.id === id)?.campaign).map(id => {
        const a = ADDONS.find(x => x.id === id);
        return (
          <div key={id} className="flex justify-between items-center py-1.5 border-b border-white/[0.06] text-[11px] font-sans">
            <span className="text-amber-700">{a.icon} {a.name}</span>
            <span className="text-amber-600">${a.campaignPrice} / run</span>
          </div>
        );
      })}
      <div className="flex justify-between items-baseline py-2 border-t border-white/15 mt-1">
        <span className="text-sm font-bold text-white">Monthly total</span>
        <span className="text-[22px] font-bold" style={{ color: '#e040fb' }}>
          ${custom.monthly}<span className="text-[11px] font-normal text-zinc-500">/mo</span>
        </span>
      </div>
      <div className="flex justify-between pb-2">
        <span className="text-[11px] text-zinc-600 font-sans">One-time setup</span>
        <span className="text-xs text-zinc-400">${custom.setup}</span>
      </div>
      {cheaper
        ? (
          <div className="rounded-lg px-3 py-2 text-[11px] font-sans leading-relaxed mt-2"
               style={{ background: '#0e1a10', border: '0.5px solid #2a5030' }}>
            <span className="text-primary font-semibold">💡 Better deal:</span>{' '}
            <strong className="text-white">{cheaper.name}</strong> covers everything you picked for{' '}
            <strong className="text-primary">${cheaper.monthly}/mo</strong>.{' '}
            <button
              onClick={() => setActiveTier(cheaper.id)}
              className="bg-transparent text-primary text-[10px] px-2 py-0.5 rounded cursor-pointer font-mono ml-1 border border-primary/30"
            >
              Switch →
            </button>
          </div>
        )
        : exactMatch
          ? (
            <div className="rounded-lg px-3 py-2 text-[11px] font-sans leading-relaxed mt-2"
                 style={{ background: '#0e1a10', border: '0.5px solid #2a5030' }}>
              <span className="text-primary font-semibold">ℹ️ Exact match:</span> This is identical to the{' '}
              <strong className="text-white">{exactMatch.name}</strong> plan.
            </div>
          )
          : (
            <div className="rounded-lg px-3 py-2 text-[11px] font-sans leading-relaxed mt-2"
                 style={{ background: '#140a20', border: '0.5px solid #3a1850' }}>
              <span className="font-semibold" style={{ color: '#e040fb' }}>✦ Unique combo</span> — no standard plan matches this. Custom pricing applies.
            </div>
          )
      }
      <button
        type="button"
        className="w-full py-3 rounded-xl bg-primary text-[#030f07] text-sm font-bold font-mono tracking-wide mt-3 hover:opacity-90 transition-opacity cursor-pointer border-0"
        onClick={() => window.open(`mailto:${CONTACT_EMAIL}?subject=AdScale Labs — Custom Plan Inquiry`, '_blank')}
      >
        Book a Call — Lock In This Plan →
      </button>
    </div>
  );

  const StandardCTA = activeTier !== "custom" && activeT && (
    <div className="mt-5">
      <button
        type="button"
        className="w-full py-3 rounded-xl bg-primary text-[#030f07] text-sm font-bold font-mono tracking-wide mt-3 hover:opacity-90 transition-opacity cursor-pointer border-0"
        onClick={() => window.open(`mailto:${CONTACT_EMAIL}?subject=AdScale Labs — ${activeT.name} Plan Inquiry`, '_blank')}
      >
        Book a Call — Get Started with {activeT.name} →
      </button>
    </div>
  );

  return (
    <div className="pb-20">

      {/* Header */}
      <div className="px-5 pt-6 mb-5">
        <div className="flex items-center gap-2.5 mb-1.5">
          <CreditCard size={16} className="text-primary" />
          <span className="font-mono text-[10px] font-semibold tracking-widest text-primary/70 uppercase">Plans & Pricing</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Choose Your Stack</h1>
        <p className="text-xs text-zinc-500 mt-1 font-sans">
          Every plan includes both Core Systems. Add what you need, skip what you don't.
        </p>
      </div>

      {/* Tier cards */}
      <div className="px-5 mb-5">
        <h2 className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase mb-2.5 flex items-center gap-2">
          Select a plan
        </h2>
        <div role="radiogroup" aria-label="Select a plan" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {TierCards}
        </div>
      </div>

      {/* Core Systems — always included */}
      <div className="px-5 mb-5">
        <h2 className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase mb-2.5 flex items-center gap-2">
          Always included in every plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ENGINES.map(e => (
            <div key={e.id} className="bg-surface-1 border border-white/[0.05] rounded-lg px-4 py-3 flex items-center gap-2.5">
              <span className="text-lg">{e.icon}</span>
              <span className="text-xs font-semibold text-zinc-400 font-sans">{e.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom builder OR standard add-ons summary */}
      {activeTier === "custom" ? (
        <div className="px-5 mb-5">
          <h2 className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase mb-2.5 flex items-center gap-2">
            Build Your Plan
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                  style={{ color: '#e040fb', background: 'rgba(224,64,251,0.1)', border: '0.5px solid rgba(224,64,251,0.2)' }}>
              ✦ CUSTOM PRICING
            </span>
          </h2>
          <div className="bg-surface-1 border border-white/10 rounded-lg px-4 py-3 mb-4">
            <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-1.5">Floor price — always included</div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500 font-sans"><span aria-hidden="true">💬 </span>Concierge + <span aria-hidden="true">📞 </span>Voice Receptionist</span>
              <span className="text-sm font-bold text-primary">
                ${CUSTOM_FLOOR_MONTHLY}<span className="text-[10px] text-zinc-600 font-normal">/mo + ${CUSTOM_FLOOR_SETUP} setup</span>
              </span>
            </div>
          </div>
          <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-2">Toggle the automations you want</div>
          {CustomRows}
          {CustomSummary}
          {!selArr.length && (
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-primary text-[#030f07] text-sm font-bold font-mono tracking-wide mt-3 hover:opacity-90 transition-opacity cursor-pointer border-0"
              onClick={() => window.open(`mailto:${CONTACT_EMAIL}?subject=AdScale Labs — Custom Plan Inquiry`, '_blank')}
            >
              Book a Call — We'll Build Your Plan →
            </button>
          )}
        </div>
      ) : (
        <div className="px-5 mb-5">
          {activeT && (
            <div className="rounded-xl p-4 border" style={{ background: '#0a1510', borderColor: `${activeT.color}30` }}>
              <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-2">
                What's included in {activeT.name}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ENGINES.map(e => (
                  <span key={e.id} className="text-[11px] px-2.5 py-1 rounded-md bg-surface-1 text-zinc-400 border border-white/[0.06] font-sans">
                    {e.icon} {e.name}
                  </span>
                ))}
                {(activeT.addonIdxs || []).map(i => (
                  <span key={ADDONS[i].id} className="text-[11px] px-2.5 py-1 rounded-md bg-surface-1 text-zinc-400 border border-white/[0.06] font-sans">
                    {ADDONS[i].icon} {ADDONS[i].name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {StandardCTA}
        </div>
      )}
    </div>
  );
}
