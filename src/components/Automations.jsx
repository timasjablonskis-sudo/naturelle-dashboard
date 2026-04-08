import { useState } from "react";

const TIERS = [
  { id:"starter", name:"Growth System",    tagline:"24/7 AI front desk. Every call, every message, every lead.",                      setup:497,  monthly:297,  color:"#00e5a0", badge:"ENTRY",       addonIdxs:[0] },
  { id:"growth",  name:"Retention Pro",   tagline:"Growth System + recover the revenue you're already losing.",             setup:997,  monthly:597,  color:"#7c6fff", badge:"POPULAR",     addonIdxs:[0,1,2,3], recommended:true },
  { id:"os",      name:"Med Spa OS",        tagline:"Every automation. The complete front-office stack.",          setup:1497, monthly:997,  color:"#f5a623", badge:"FULL STACK",   addonIdxs:[0,1,2,3,4,5,6] },
  { id:"custom",  name:"Build Your Own",   tagline:"Mix and match. Pay for exactly what you need.",               setup:null, monthly:null, color:"#e040fb", badge:"CUSTOM" },
];

const ENGINES = [
  { id:"omni",  name:"Omni-Channel Concierge",  icon:"💬", iconBg:"#0d2a1e", accent:"#00e5a0", typeBg:"#0d1f15", typeColor:"#00e5a0", type:"TEXT-BASED AI",  triggers:"748", desc:"Unified inbox — IG, FB, Chat, Email, SMS. Every channel, one AI brain.",              skills:["Instant Lead Response","AI Qualification Engine","Missed Call Text-Back","In-Conversation Booking"] },
  { id:"voice", name:"Omni Voice Receptionist", icon:"📞", iconBg:"#1a1030", accent:"#7c6fff", typeBg:"#150f2a", typeColor:"#7c6fff", type:"VOICE-BASED AI", triggers:"132", desc:"24/7 phone handling — answers calls, qualifies leads, books appointments live.", skills:["Voice Qualification","In-Call Booking","Smart Hand-off"] },
];

const ADDONS = [
  { id:"reminders", icon:"🔔", name:"Smart Reminder Suite",       desc:'"Confirmation Required" logic — alerts staff if no confirmation within X hours',                       runs:"203", channels:["Text","Voice"], addonPrice:79,  campaign:false },
  { id:"reengage",  icon:"♻️", name:"Lead Re-engagement",         desc:"Monitors for ghosted leads — auto-triggers follow-up sequences to restart booking conversations",       runs:"84",  channels:["Text"],         addonPrice:99,  campaign:false },
  { id:"noshow",    icon:"🚫", name:"No-Show Recovery",           desc:"CRM trigger on no-show status — instant SMS or voice outreach to reschedule",                          runs:"47",  channels:["Text","Voice"], addonPrice:89,  campaign:false },
  { id:"reviews",   icon:"⭐", name:"Review Generation",          desc:"Post-appointment SMS triggers for Google/Yelp reviews",                                                 runs:"156", channels:["Text"],         addonPrice:79,  campaign:false },
  { id:"cycle",     icon:"💉", name:"Treatment Cycle Automation",  desc:'The "Botox Clock" — auto-recall at 4-week, 3-month, and 6-month intervals',                           runs:"94",  channels:["Text"],         addonPrice:109, campaign:false },
  { id:"dbreact",   icon:"💤", name:"Database Reactivation",      desc:"Campaign mode across text or voice — re-engages patients inactive 90+ days",                          runs:"12",  channels:["Text","Voice"], addonPrice:0,   campaign:true, campaignPrice:399, campaignNote:"Per campaign run — not a monthly charge" },
  { id:"rep",       icon:"🛡", name:"Reputation Response Engine",  desc:"Independent watchdog — monitors and responds to all Google reviews 24/7",                             runs:"156", channels:[],               addonPrice:119, campaign:false,
    details:[
      { label:"Positive Filter", color:"#00e5a0", bg:"#0a1f17", text:"4-5★ → auto thank-you response optimized for SEO" },
      { label:"Negative Shield", color:"#ff6b6b", bg:"#1f0a0a", text:"<3★ → professional holding response + instant owner SMS alert" },
    ]
  },
];

const CUSTOM_FLOOR_MONTHLY = 297;
const CUSTOM_FLOOR_SETUP   = 497;

function calcCustom(selectedIds) {
  let monthly = CUSTOM_FLOOR_MONTHLY;
  let setup   = CUSTOM_FLOOR_SETUP;
  for (const id of selectedIds) {
    const a = ADDONS.find(x => x.id === id);
    if (a && !a.campaign) monthly += a.addonPrice;
    setup += 50;
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

const s = {
  page:       { padding:"0 0 80px", fontFamily:"'JetBrains Mono', monospace", color:"#c8e8d4", fontSize:14 },
  px:         { paddingLeft:"1.25rem", paddingRight:"1.25rem" },
  label:      { fontSize:10, fontWeight:600, letterSpacing:"0.08em", color:"#2a5040", textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:8, fontFamily:"sans-serif" },
  tag:        (bg,color) => ({ fontSize:9, fontWeight:700, letterSpacing:"0.06em", padding:"2px 7px", borderRadius:3, textTransform:"uppercase", whiteSpace:"nowrap", background:bg, color }),
  statCard:   { background:"#0c1510", border:"0.5px solid #1a2e20", borderRadius:8, padding:"0.75rem 1rem" },
  engineCard: (accent) => ({ background:"#0e1512", border:`1px solid ${accent}30`, borderRadius:12, padding:"1.1rem 1.25rem", position:"relative", overflow:"hidden", marginBottom:10 }),
  skillChip:  { fontSize:11, color:"#8ab89e", background:"#0a1510", border:"0.5px solid #1a3028", borderRadius:6, padding:"5px 9px", display:"flex", alignItems:"center", gap:5, fontFamily:"sans-serif" },
  tierCard:   (sel, color) => ({ borderRadius:12, padding:"1rem 1.1rem", cursor:"pointer", position:"relative", overflow:"hidden", background: sel ? "#0c1810" : "#090d0b", border:`1px solid ${sel ? color+"60" : "#1a2520"}`, transition:"all 0.2s" }),
  addonRow:   (on) => ({ borderRadius:10, padding:"0.75rem 1rem", display:"flex", alignItems:"flex-start", gap:12, position:"relative", overflow:"hidden", marginBottom:7, background: on ? "#0c1810" : "#090d0b", border:`0.5px solid ${on ? "#1e3828" : "#131a15"}`, opacity: on ? 1 : 0.4 }),
  customRow:  (on) => ({ borderRadius:10, padding:"0.85rem 1rem", display:"flex", alignItems:"flex-start", gap:12, position:"relative", overflow:"hidden", marginBottom:7, cursor:"pointer", border:`0.5px solid ${on ? "#00e5a040" : "#1a2820"}`, background: on ? "#0e1f14" : "#0c1510", transition:"all 0.2s" }),
  toggle:     (on) => ({ width:36, height:20, borderRadius:10, background: on ? "#00e5a020" : "#0e1a12", border:`0.5px solid ${on ? "#00e5a060" : "#1a3020"}`, position:"relative", flexShrink:0, transition:"all 0.2s" }),
  knob:       (on) => ({ width:14, height:14, borderRadius:"50%", background: on ? "#00e5a0" : "#1e3028", position:"absolute", top:3, left: on ? 19 : 3, transition:"all 0.2s" }),
  cta:        { width:"100%", padding:"0.85rem", borderRadius:10, background:"#00e5a0", color:"#030f07", fontSize:13, fontWeight:700, border:"none", cursor:"pointer", letterSpacing:"0.03em", fontFamily:"monospace", marginTop:12 },
  summary:    { background:"#0a1510", border:"1px solid #1a3828", borderRadius:14, padding:"1.25rem", marginTop:"1rem" },
  lineItem:   { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:"0.5px solid #1a2820", fontSize:11, fontFamily:"sans-serif" },
  hint:       (bg, border) => ({ borderRadius:8, padding:"8px 12px", fontSize:11, fontFamily:"sans-serif", lineHeight:1.5, marginTop:8, background:bg, border:`0.5px solid ${border}` }),
  dot:        (color) => ({ width:5, height:5, borderRadius:"50%", background:color, display:"inline-block", animation:"pulse 2s infinite" }),
};

function Tag({ bg, color, children }) {
  return <span style={s.tag(bg, color)}>{children}</span>;
}

function ChannelTag({ label }) {
  const voice = label === "Voice";
  return <span style={{ fontSize:10, padding:"2px 7px", borderRadius:3, background: voice ? "#15102a" : "#0a1f17", color: voice ? "#7c6fff" : "#00e5a0", border:`0.5px solid ${voice ? "#7c6fff" : "#00e5a0"}30`, fontWeight:500 }}>{label}</span>;
}

function AddonDetails({ details, show }) {
  if (!details || !show) return null;
  return details.map(d => (
    <div key={d.label} style={{ borderRadius:5, padding:"4px 8px", display:"flex", alignItems:"center", gap:7, marginTop:5, background:d.bg, border:`0.5px solid ${d.color}20` }}>
      <span style={{ fontSize:9, fontWeight:700, color:d.color, letterSpacing:"0.05em", flexShrink:0 }}>{d.label}</span>
      <span style={{ fontSize:11, color:"#8ab89e", fontFamily:"sans-serif" }}>{d.text}</span>
    </div>
  ));
}

export default function Automations() {
  const [activeTier, setActiveTier]     = useState("growth");
  const [customSel,  setCustomSel]      = useState(new Set());

  function getIncluded() {
    if (activeTier === "custom") return customSel;
    const t = TIERS.find(x => x.id === activeTier);
    return new Set((t.addonIdxs || []).map(i => ADDONS[i].id));
  }

  function toggleAddon(id) {
    setCustomSel(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const included   = getIncluded();
  const selArr     = [...customSel];
  const custom     = calcCustom(selArr);
  const cheaper    = activeTier === "custom" ? cheaperTierExists(custom.monthly, selArr) : null;
  const exactMatch = activeTier === "custom" ? exactMatchTier(selArr) : null;
  const activeT    = TIERS.find(t => t.id === activeTier);
  const count      = included.size;

  // ── TIER CARDS ──────────────────────────────────────────────────
  const TierCards = TIERS.map(t => {
    const sel = activeTier === t.id;
    const c   = t.color;
    let priceEl;
    if (t.id === "custom") {
      priceEl = selArr.length > 0
        ? <div style={{ display:"flex", alignItems:"baseline", gap:4, marginTop:10 }}><span style={{ fontSize:18, fontWeight:700, color: sel ? c : "#3a5060" }}>${custom.monthly}</span><span style={{ fontSize:10, color:"#2a4050", fontFamily:"sans-serif" }}>/mo</span><span style={{ fontSize:10, color:"#1e3040", marginLeft:4, fontFamily:"sans-serif" }}>+ ${custom.setup} setup</span></div>
        : <div style={{ marginTop:10, fontSize:10, color: sel ? c+"80" : "#2a4050", fontFamily:"sans-serif" }}>From ${CUSTOM_FLOOR_MONTHLY}/mo + add-ons</div>;
    } else {
      priceEl = <div style={{ display:"flex", alignItems:"baseline", gap:4, marginTop:10 }}><span style={{ fontSize:18, fontWeight:700, color: sel ? c : "#3a5060" }}>${t.monthly}</span><span style={{ fontSize:10, color:"#2a4050", fontFamily:"sans-serif" }}>/mo</span><span style={{ fontSize:10, color:"#1e3040", marginLeft:4, fontFamily:"sans-serif" }}>+ ${t.setup} setup</span></div>;
    }
    return (
      <div key={t.id} style={s.tierCard(sel, c)} onClick={() => setActiveTier(t.id)}>
        {sel && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${c},transparent)` }} />}
        <div style={{ position:"absolute", top:8, right:8 }}>
          <Tag bg={t.id==="custom"?"#1a0820":t.id==="growth"?"#12102a":t.id==="os"?"#1f1608":"#0a1f17"} color={c}>{t.id==="custom"?"✦ "+t.badge:t.badge}</Tag>
        </div>
        <div style={{ fontSize:11, fontWeight:700, color: sel ? c : "#4a7a60", marginBottom:3, paddingRight:60 }}>{t.name}</div>
        <div style={{ fontSize:10, color:"#3a5a48", lineHeight:1.4, fontFamily:"sans-serif" }}>{t.tagline}</div>
        {priceEl}
      </div>
    );
  });

  // ── ENGINE CARDS ─────────────────────────────────────────────────
  const EngineCards = ENGINES.map(e => (
    <div key={e.id} style={s.engineCard(e.accent)}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${e.accent}80,transparent)` }} />
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:8, background:e.iconBg, border:`0.5px solid ${e.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{e.icon}</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:"#e8f5f0", marginBottom:2 }}>{e.name}</div>
            <div style={{ fontSize:11, color:"#4a7a60", fontFamily:"sans-serif" }}>{e.desc}</div>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0, marginLeft:10 }}>
          <Tag bg={e.typeBg} color={e.typeColor}>{e.type}</Tag>
          <span style={{ fontSize:9, fontWeight:600, letterSpacing:"0.06em", padding:"2px 7px", borderRadius:3, background:"#0a1f10", color:"#00e5a0", display:"flex", alignItems:"center", gap:4 }}>
            <span style={s.dot("#00e5a0")} />ALWAYS ON
          </span>
        </div>
      </div>
      <div style={{ borderTop:`0.5px solid ${e.accent}15`, paddingTop:10 }}>
        <div style={{ fontSize:10, color:"#3a6a50", marginBottom:7, letterSpacing:"0.05em", textTransform:"uppercase", fontWeight:500, fontFamily:"sans-serif" }}>Native Skills · {e.triggers} triggers</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5 }}>
          {e.skills.map(sk => (
            <div key={sk} style={s.skillChip}>
              <span style={{ width:4, height:4, borderRadius:"50%", background:e.accent, display:"inline-block", flexShrink:0 }} />{sk}
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  // ── STANDARD ADDON ROWS ──────────────────────────────────────────
  const StandardAddonRows = ADDONS.map(a => {
    const on = included.has(a.id);
    return (
      <div key={a.id} style={s.addonRow(on)}>
        {on && <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:"#00e5a0", borderRadius:"2px 0 0 2px" }} />}
        <div style={{ width:32, height:32, borderRadius:7, background: on ? "#0e1f14" : "#0a100c", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{a.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
            <span style={{ fontSize:12, fontWeight:600, color: on ? "#d0ead8" : "#4a6050" }}>{a.name}</span>
            {a.campaign && <Tag bg="#1f1608" color="#f5a623">CAMPAIGN</Tag>}
          </div>
          <div style={{ fontSize:11, color: on ? "#5a8a6a" : "#2a3a2e", lineHeight:1.4, fontFamily:"sans-serif" }}>{a.desc}</div>
          {a.campaign && on && <div style={{ fontSize:10, color:"#8a7040", marginTop:3, fontFamily:"sans-serif" }}>${a.campaignPrice} per campaign run — not a monthly charge</div>}
          <AddonDetails details={a.details} show={on} />
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0 }}>
          <div style={{ display:"flex", gap:4 }}>{a.channels.map(c => <ChannelTag key={c} label={c} />)}</div>
          <div style={{ fontSize:10, color: on ? "#3a7050" : "#1e3028" }}>{a.runs} runs</div>
        </div>
      </div>
    );
  });

  // ── CUSTOM BUILDER ───────────────────────────────────────────────
  const CustomRows = ADDONS.map(a => {
    const on = customSel.has(a.id);
    const priceLabel = a.campaign ? `$${a.campaignPrice} / run` : `+$${a.addonPrice}/mo`;
    return (
      <div key={a.id} style={s.customRow(on)} onClick={() => toggleAddon(a.id)}>
        <div style={s.toggle(on)}><div style={s.knob(on)} /></div>
        <div style={{ width:32, height:32, borderRadius:7, background: on ? "#0e1f14" : "#0a100c", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{a.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
            <span style={{ fontSize:12, fontWeight:600, color: on ? "#d0ead8" : "#5a7060" }}>{a.name}</span>
            {a.campaign && <Tag bg="#1f1608" color="#f5a623">CAMPAIGN</Tag>}
          </div>
          <div style={{ fontSize:11, color: on ? "#5a8a6a" : "#2a4030", lineHeight:1.4, fontFamily:"sans-serif" }}>{a.desc}</div>
          {a.campaign && <div style={{ fontSize:10, color:"#6a6040", marginTop:3, fontFamily:"sans-serif", fontStyle:"italic" }}>Per-run charge, not monthly</div>}
          <AddonDetails details={a.details} show={on} />
        </div>
        <div style={{ fontSize:12, fontWeight:600, color: on ? "#00e5a0" : "#2a5040", flexShrink:0, marginLeft:8 }}>{priceLabel}</div>
      </div>
    );
  });

  const CustomSummary = selArr.length > 0 && (
    <div style={s.summary}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#e0f0e8" }}>Your Custom Plan</span>
        <Tag bg="#1a0820" color="#e040fb">✦ CUSTOM</Tag>
      </div>
      <div style={s.lineItem}><span style={{ color:"#3a6050" }}>Core Systems (always included)</span><span style={{ color:"#5a8a6a" }}>${CUSTOM_FLOOR_MONTHLY}/mo</span></div>
      {selArr.filter(id => !ADDONS.find(x=>x.id===id)?.campaign).map(id => {
        const a = ADDONS.find(x=>x.id===id);
        return <div key={id} style={s.lineItem}><span style={{ color:"#5a8a6a" }}>{a.icon} {a.name}</span><span style={{ color:"#d0ead8" }}>+${a.addonPrice}/mo</span></div>;
      })}
      {selArr.filter(id => ADDONS.find(x=>x.id===id)?.campaign).map(id => {
        const a = ADDONS.find(x=>x.id===id);
        return <div key={id} style={s.lineItem}><span style={{ color:"#8a7040" }}>{a.icon} {a.name}</span><span style={{ color:"#a08040" }}>${a.campaignPrice} / run</span></div>;
      })}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"8px 0 2px", borderTop:"0.5px solid #1a3828", marginTop:4 }}>
        <span style={{ fontSize:13, fontWeight:700, color:"#e8f5f0" }}>Monthly total</span>
        <span style={{ fontSize:22, fontWeight:700, color:"#e040fb" }}>${custom.monthly}<span style={{ fontSize:11, fontWeight:400, color:"#5a7060" }}>/mo</span></span>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", paddingBottom:8 }}>
        <span style={{ fontSize:11, color:"#2a5040", fontFamily:"sans-serif" }}>One-time setup</span>
        <span style={{ fontSize:12, color:"#6a9070" }}>${custom.setup}</span>
      </div>
      {cheaper
        ? <div style={s.hint("#0e1a10","#2a5030")}><span style={{ color:"#00e5a0", fontWeight:600 }}>💡 Better deal:</span> <strong style={{ color:"#e8f5f0" }}>{cheaper.name}</strong> covers everything you picked for <strong style={{ color:"#00e5a0" }}>${cheaper.monthly}/mo</strong> — less than your custom ${custom.monthly}/mo. <button onClick={() => setActiveTier(cheaper.id)} style={{ background:"transparent", border:"0.5px solid #00e5a050", color:"#00e5a0", fontSize:10, padding:"2px 8px", borderRadius:4, cursor:"pointer", fontFamily:"monospace", marginLeft:4 }}>Switch →</button></div>
        : exactMatch
          ? <div style={s.hint("#0e1a10","#2a5030")}><span style={{ color:"#00e5a0", fontWeight:600 }}>ℹ️ Exact match:</span> This is identical to the <strong style={{ color:"#e8f5f0" }}>{exactMatch.name}</strong> plan.</div>
          : <div style={s.hint("#140a20","#3a1850")}><span style={{ color:"#e040fb", fontWeight:600 }}>✦ Unique combo</span> — no standard plan matches this. Custom pricing applies.</div>
      }
      <button style={s.cta} onClick={() => window.open('mailto:timasjablonskis@gmail.com?subject=AdScale Labs — Custom Plan Inquiry', '_blank')}>Book a Call — Lock In This Plan →</button>
    </div>
  );

  // ── LOCKED ADDONS HINT ───────────────────────────────────────────
  const lockedAddons = activeTier !== "custom" ? ADDONS.filter(a => !included.has(a.id)) : [];
  const nextTier = activeTier === "starter" ? TIERS[1] : activeTier === "growth" ? TIERS[2] : null;

  return (
    <div style={s.page}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>

      {/* Header */}
      <div style={{ ...s.px, paddingTop:"1.5rem" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:6 }}>
          <div>
            <h1 style={{ fontSize:26, fontWeight:700, color:"#e8f5f0", letterSpacing:"-0.02em", margin:0 }}>Automations</h1>
            <p style={{ fontSize:12, color:"#3a7050", marginTop:4, fontFamily:"sans-serif" }}>2 Core Systems · {count} Add-Ons · running 24/7</p>
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0, marginLeft:10 }}>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.06em", padding:"5px 10px", borderRadius:6, background:"#0a1f14", color:"#00e5a0", border:"0.5px solid #00e5a040", display:"flex", alignItems:"center", gap:5 }}>
              <span style={s.dot("#00e5a0")} />9 ACTIVE
            </div>
            <div style={{ fontSize:10, color:"#3a7050", padding:"5px 10px", borderRadius:6, background:"#0a1510", border:"0.5px solid #1a3020", fontFamily:"sans-serif" }}>1,632 triggers</div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, margin:"1rem 0" }}>
          {[["9","Active Systems"],["1,632","Total Triggers"],["846","Leads Captured"],["$385k","Revenue Attributed"]].map(([v,l]) => (
            <div key={l} style={s.statCard}><div style={{ fontSize:20, fontWeight:700, color:"#e8f5f0", marginBottom:2 }}>{v}</div><div style={{ fontSize:10, color:"#3a6050", fontFamily:"sans-serif" }}>{l}</div></div>
          ))}
        </div>
      </div>

      {/* Tier selector */}
      <div style={{ ...s.px, marginBottom:"1.25rem" }}>
        <div style={s.label}>Choose a plan — or build your own</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>{TierCards}</div>
      </div>

      {/* Core Systems */}
      <div style={{ ...s.px, marginBottom:"1.25rem" }}>
        <div style={s.label}>Core Systems <Tag bg="#0a1f14" color="#00e5a0">INCLUDED IN ALL PLANS</Tag></div>
        {EngineCards}
      </div>

      {/* Add-ons or Custom Builder */}
      <div style={{ ...s.px, marginBottom:"1.25rem" }}>
        {activeTier === "custom" ? (
          <>
            <div style={s.label}>Build Your Plan <Tag bg="#1a0820" color="#e040fb">✦ CUSTOM PRICING</Tag></div>
            <div style={{ background:"#0a1510", border:"0.5px solid #1a3020", borderRadius:10, padding:"0.85rem 1rem", marginBottom:"1rem" }}>
              <div style={{ fontSize:10, fontWeight:600, color:"#2a5040", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:5, fontFamily:"sans-serif" }}>Floor price — always included</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {ENGINES.map(e => <span key={e.id} style={{ fontSize:11, padding:"4px 10px", borderRadius:6, background:"#0e1f14", color:"#5a9a70", border:"0.5px solid #1e3828", fontFamily:"sans-serif" }}>{e.icon} {e.name}</span>)}
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:"#00e5a0" }}>${CUSTOM_FLOOR_MONTHLY}<span style={{ fontSize:10, fontWeight:400, color:"#2a5040" }}>/mo</span> <span style={{ fontSize:10, color:"#1e3028", fontFamily:"sans-serif" }}>+ ${CUSTOM_FLOOR_SETUP} setup</span></div>
              </div>
              <div style={{ fontSize:10, color:"#1e4030", marginTop:5, fontFamily:"sans-serif" }}>Same base as Tier 1 — both engines always require setup. Add-ons are charged on top.</div>
            </div>
            <div style={{ fontSize:10, fontWeight:600, color:"#2a5040", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8, fontFamily:"sans-serif" }}>Toggle the automations you want</div>
            {CustomRows}
            {CustomSummary}
          </>
        ) : (
          <>
            <div style={s.label}>Add-Ons <Tag bg={activeTier==="starter"?"#0a1f17":activeTier==="growth"?"#12102a":"#1f1608"} color={activeT.color}>{count}/{ADDONS.length} INCLUDED</Tag></div>
            {StandardAddonRows}
            {lockedAddons.length > 0 && nextTier && (
              <div style={{ background:"#0c1008", border:"0.5px solid #1a2815", borderRadius:10, padding:"0.9rem 1rem", marginTop:4 }}>
                <div style={{ fontSize:10, color:"#2a5030", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:6, fontFamily:"sans-serif" }}>Unlock {lockedAddons.length} more automation{lockedAddons.length>1?"s":""}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 }}>
                  {lockedAddons.map(a => <span key={a.id} style={{ fontSize:10, padding:"3px 9px", borderRadius:5, background:"#0a0f09", color:"#2a4030", border:"0.5px solid #141f10", fontFamily:"sans-serif" }}>{a.icon} {a.name}</span>)}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <button onClick={() => setActiveTier(nextTier.id)} style={{ fontSize:10, padding:"5px 12px", borderRadius:6, background:"#0a1510", color:nextTier.color, border:`0.5px solid ${nextTier.color}40`, cursor:"pointer", fontFamily:"monospace" }}>Upgrade to {nextTier.name}</button>
                  <button onClick={() => setActiveTier("custom")} style={{ fontSize:10, padding:"5px 12px", borderRadius:6, background:"#0a0810", color:"#e040fb", border:"0.5px solid #e040fb40", cursor:"pointer", fontFamily:"monospace" }}>✦ Build Your Own</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={s.px}>
        <div style={{ padding:"0.85rem 1rem", background:"#0a100c", border:"0.5px solid #141f15", borderRadius:10, display:"flex", alignItems:"center", gap:8 }}>
          <span>⚡</span>
          <span style={{ fontSize:11, color:"#3a6050", fontFamily:"sans-serif" }}>All systems run 24/7 without manual intervention. <span style={{ color:"#00e5a0" }}>1,632 actions taken this month</span> — 2 Core Systems + {count} Add-Ons on active plan.</span>
        </div>
      </div>
    </div>
  );
}
