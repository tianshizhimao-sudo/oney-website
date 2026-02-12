import { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, PieChart, Pie, Cell } from "recharts";

const GREEN = "#2ECC85";
const GREEN_DARK = "#1FAD73";
const GREEN_GLOW = "rgba(46,204,133,0.15)";
const AMBER = "#F59E0B";
const PURPLE = "#8B5CF6";
const RED_SOFT = "#EF4444";
const DARK = "#0a0a0a";
const GRAY_DARK = "#1a1a1a";

const formatCurrency = (val) => {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  return `$${val.toFixed(0)}`;
};
const formatFull = (val) => `$${Math.round(val).toLocaleString()}`;

const SliderInput = ({ label, value, onChange, min, max, step, format, suffix = "", prefix = "" }) => (
  <div className="mb-5">
    <div className="flex justify-between items-center mb-1.5">
      <label style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</label>
      <span style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>{prefix}{format ? format(value) : value}{suffix}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: "100%", height: 6, borderRadius: 3, appearance: "none", cursor: "pointer",
        background: `linear-gradient(to right, ${GREEN} 0%, ${GREEN} ${((value - min) / (max - min)) * 100}%, #333 ${((value - min) / (max - min)) * 100}%, #333 100%)`,
      }}
    />
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555", marginTop: 2 }}>
      <span>{prefix}{format ? format(min) : min}{suffix}</span>
      <span>{prefix}{format ? format(max) : max}{suffix}</span>
    </div>
  </div>
);

const MetricCard = ({ label, value, sub, color = GREEN, icon }) => (
  <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: "18px 20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{label}</span>
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, color, letterSpacing: "-0.5px" }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{sub}</div>}
  </div>
);

const COLORS_PIE = [GREEN, GREEN_DARK, PURPLE, AMBER];

export default function OneyCoProjections() {
  // === LAYER 3: BROKERAGE (Craft — 30 client cap) ===
  const [maxClients] = useState(30);
  const [activeClientsY1, setActiveClientsY1] = useState(8);
  const [clientGrowthRate, setClientGrowthRate] = useState(60);
  const [avgDealSize, setAvgDealSize] = useState(750000);
  const [dealsPerClientPerYear, setDealsPerClientPerYear] = useState(1.5);
  const [upfrontRate, setUpfrontRate] = useState(0.6);
  const [trailRate, setTrailRate] = useState(0.15);
  const [aggregatorSplit, setAggregatorSplit] = useState(80);

  // === LAYER 2: MENTORSHIP (Industry) ===
  const [menteesY1, setMenteesY1] = useState(4);
  const [menteeGrowthRate, setMenteeGrowthRate] = useState(50);
  const [mentorshipFee, setMentorshipFee] = useState(5000);
  const [hourlyRate, setHourlyRate] = useState(275);
  const [adhocSessionsPerMonth, setAdhocSessionsPerMonth] = useState(4);
  // Future: course revenue
  const [courseRevenueY2, setCourseRevenueY2] = useState(5000);

  // === LAYER 1: IMPACT (Free tools — cost center) ===
  const [impactToolsCostY1, setImpactToolsCostY1] = useState(2000);

  // === EXPENSES ===
  const [monthlyOverhead, setMonthlyOverhead] = useState(3000);
  const [piInsurance, setPiInsurance] = useState(3000);
  const [marketingBudgetY1, setMarketingBudgetY1] = useState(1000);

  const [activeTab, setActiveTab] = useState("overview");

  const projections = useMemo(() => {
    const years = [];
    let cumulativeBook = 0;
    let cumulativeMentees = 0;

    for (let y = 0; y < 3; y++) {
      // --- Layer 3: Selective Brokerage (capped at 30 clients) ---
      const growthMult = 1 + clientGrowthRate / 100;
      const rawClients = activeClientsY1 * Math.pow(growthMult, y);
      const activeClients = Math.min(Math.round(rawClients), maxClients);
      const totalDeals = Math.round(activeClients * dealsPerClientPerYear);
      const totalSettlements = totalDeals * avgDealSize;

      const grossUpfront = totalSettlements * (upfrontRate / 100);
      const netUpfront = grossUpfront * (aggregatorSplit / 100);

      cumulativeBook += totalSettlements;
      const effectiveBook = cumulativeBook * 0.85;
      const grossTrail = effectiveBook * (trailRate / 100);
      const netTrail = grossTrail * (aggregatorSplit / 100);
      const brokerageRevenue = netUpfront + netTrail;

      // --- Layer 2: Mentorship & Courses ---
      const menteeGrowth = 1 + menteeGrowthRate / 100;
      const newMentees = Math.round(menteesY1 * Math.pow(menteeGrowth, y));
      cumulativeMentees += newMentees;
      const programRevenue = newMentees * mentorshipFee;
      const adhocRevenue = adhocSessionsPerMonth * hourlyRate * 12;
      const courseRevenue = y === 0 ? 0 : courseRevenueY2 * Math.pow(2, y - 1);
      const totalMentorship = programRevenue + adhocRevenue + courseRevenue;

      // --- Layer 1: Impact (cost center) ---
      const impactCost = impactToolsCostY1 * 12 * Math.pow(1.5, y);

      // --- Expenses ---
      const overhead = monthlyOverhead * 12 * (1 + y * 0.1);
      const marketing = marketingBudgetY1 * 12 * Math.pow(1.5, y);
      const totalExpenses = overhead + piInsurance + marketing + impactCost;

      const totalRevenue = brokerageRevenue + totalMentorship;
      const netProfit = totalRevenue - totalExpenses;

      // Mission fund: % of profit reinvested into Layer 1
      const missionFund = netProfit > 0 ? netProfit * 0.2 : 0;

      years.push({
        year: y + 1, label: `Year ${y + 1}`,
        activeClients, totalDeals, totalSettlements,
        netUpfront, netTrail, effectiveBook: effectiveBook, brokerageRevenue,
        newMentees, cumulativeMentees, programRevenue, adhocRevenue, courseRevenue, totalMentorship,
        impactCost, overhead, piInsurance: piInsurance, marketing, totalExpenses,
        totalRevenue, netProfit, missionFund,
        margin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
      });
    }
    return years;
  }, [activeClientsY1, clientGrowthRate, maxClients, avgDealSize, dealsPerClientPerYear,
    upfrontRate, trailRate, aggregatorSplit, menteesY1, menteeGrowthRate, mentorshipFee,
    hourlyRate, adhocSessionsPerMonth, courseRevenueY2, impactToolsCostY1,
    monthlyOverhead, piInsurance, marketingBudgetY1]);

  const chartData = projections.map((y) => ({
    name: y.label,
    "Upfront Comm.": Math.round(y.netUpfront),
    "Trail Comm.": Math.round(y.netTrail),
    "Mentorship": Math.round(y.totalMentorship),
    "Expenses": Math.round(y.totalExpenses),
    "Net Profit": Math.round(y.netProfit),
    "Total Revenue": Math.round(y.totalRevenue),
    "Mission Fund": Math.round(y.missionFund),
  }));

  const y3 = projections[2];
  const y3RevSplit = [
    { name: "Upfront Comm.", value: Math.round(y3.netUpfront) },
    { name: "Trail Comm.", value: Math.round(y3.netTrail) },
    { name: "Program Fees", value: Math.round(y3.programRevenue) },
    { name: "Ad-hoc + Courses", value: Math.round(y3.adhocRevenue + y3.courseRevenue) },
  ];

  // Monthly data
  const monthlyData = [];
  let runBook = 0;
  for (let m = 1; m <= 36; m++) {
    const y = Math.floor((m - 1) / 12);
    const growthMult = 1 + clientGrowthRate / 100;
    const rawClients = activeClientsY1 * Math.pow(growthMult, y + (m % 12) / 12);
    const clients = Math.min(rawClients, maxClients);
    const monthlyDeals = (clients * dealsPerClientPerYear) / 12;
    const settlements = monthlyDeals * avgDealSize;
    runBook += settlements;
    const effBook = runBook * 0.85;
    const mUp = settlements * (upfrontRate / 100) * (aggregatorSplit / 100);
    const mTrail = (effBook * (trailRate / 100) * (aggregatorSplit / 100)) / 12;
    const menteeG = 1 + menteeGrowthRate / 100;
    const mMentor = (menteesY1 * Math.pow(menteeG, y) * mentorshipFee) / 12;
    const mAdhoc = adhocSessionsPerMonth * hourlyRate;
    const mCourse = y === 0 ? 0 : (courseRevenueY2 * Math.pow(2, y - 1)) / 12;
    const mRev = mUp + mTrail + mMentor + mAdhoc + mCourse;
    const mExp = monthlyOverhead * (1 + y * 0.1) + piInsurance / 12 + marketingBudgetY1 * Math.pow(1.5, y) + impactToolsCostY1 * Math.pow(1.5, y);
    monthlyData.push({
      name: `M${m}`, month: m,
      Revenue: Math.round(mRev), Expenses: Math.round(mExp), Profit: Math.round(mRev - mExp),
      "Trail Book": Math.round(effBook), Clients: Math.round(clients),
    });
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "monthly", label: "Monthly", icon: "📈" },
    { id: "assumptions", label: "Assumptions", icon: "⚙️" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;
    return (
      <div style={{ background: GRAY_DARK, border: `1px solid ${GREEN}33`, borderRadius: 10, padding: 12, fontSize: 12 }}>
        <p style={{ fontWeight: 700, color: "#fff", marginBottom: 6 }}>{label}</p>
        {payload.map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span style={{ color: p.color || p.fill }}>{p.name}</span>
            <span style={{ fontFamily: "monospace", color: "#fff" }}>{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${DARK} 0%, ${GRAY_DARK} 50%, ${DARK} 100%)`, color: "#fff", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "32px 24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          {/* Oney Logo Mark */}
          <svg width="40" height="40" viewBox="0 0 100 100">
            <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2ECC85"/><stop offset="100%" stopColor="#1FAD73"/></linearGradient></defs>
            <g transform="translate(50,50)">
              <path d="M0-38A38 38 0 1 0 0-37.99" fill="none" stroke="url(#lg)" strokeWidth="8" strokeLinecap="round" strokeDasharray="227 12"/>
              <path d="M0-45L0-52" stroke="url(#lg)" strokeWidth="6" strokeLinecap="round"/>
            </g>
          </svg>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: GREEN, letterSpacing: -1, margin: 0, lineHeight: 1.1 }}>Oney & Co</h1>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", margin: 0 }}>3-Year Financial Projections · February 2026</p>
          </div>
        </div>
        {/* 3-Layer Model Banner */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {[
            { num: "1", label: "Impact", sub: "Free tools", color: GREEN },
            { num: "2", label: "Industry", sub: "Mentoring", color: PURPLE },
            { num: "3", label: "Craft", sub: "Brokerage", color: AMBER },
          ].map((l) => (
            <div key={l.num} style={{ flex: 1, background: `${l.color}11`, border: `1px solid ${l.color}33`, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, background: l.color, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: DARK, flexShrink: 0 }}>{l.num}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: l.color }}>{l.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{l.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ padding: "8px 24px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <MetricCard icon="💰" label="Year 3 Revenue" value={formatCurrency(y3.totalRevenue)} sub={`${y3.margin.toFixed(0)}% margin`} />
        <MetricCard icon="📈" label="Year 3 Profit" value={formatCurrency(y3.netProfit)} color={y3.netProfit > 0 ? GREEN : RED_SOFT} sub="After all expenses" />
        <MetricCard icon="🏦" label="Trail Book (Y3)" value={formatCurrency(y3.effectiveBook)} sub={`${y3.activeClients}/${maxClients} clients`} />
        <MetricCard icon="🌱" label="Mission Fund (Y3)" value={formatCurrency(y3.missionFund)} color={PURPLE} sub="20% of profit → Layer 1" />
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 24px", display: "flex", gap: 4, marginBottom: 16 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer",
              background: activeTab === t.id ? GREEN_GLOW : "transparent",
              color: activeTab === t.id ? GREEN : "#666",
              outline: activeTab === t.id ? `1px solid ${GREEN}44` : "none",
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "0 24px 40px" }}>
        {activeTab === "overview" && (
          <div>
            {/* Revenue Breakdown */}
            <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Revenue Breakdown by Year</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} tickFormatter={formatCurrency} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Upfront Comm." stackId="rev" fill={GREEN} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Trail Comm." stackId="rev" fill={GREEN_DARK} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Mentorship" stackId="rev" fill={PURPLE} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue vs Profit */}
            <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Revenue vs Profit vs Mission Fund</h3>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} tickFormatter={formatCurrency} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Total Revenue" fill={GREEN} opacity={0.25} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expenses" fill={RED_SOFT} opacity={0.25} radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="Net Profit" stroke={GREEN} strokeWidth={3} dot={{ r: 5, fill: GREEN }} />
                  <Line type="monotone" dataKey="Mission Fund" stroke={PURPLE} strokeWidth={2} strokeDasharray="6 3" dot={{ r: 4, fill: PURPLE }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Y3 Revenue Pie */}
            <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Year 3 Revenue Mix</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ResponsiveContainer width="50%" height={180}>
                  <PieChart>
                    <Pie data={y3RevSplit} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                      {y3RevSplit.map((_, i) => <Cell key={i} fill={COLORS_PIE[i]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
                  {y3RevSplit.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS_PIE[i], flexShrink: 0 }} />
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{item.name}</span>
                      <span style={{ fontFamily: "monospace", color: "#fff", marginLeft: "auto" }}>{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* P&L Table */}
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #222" }}>
              <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: GREEN_GLOW }}>
                    <th style={{ textAlign: "left", padding: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, fontSize: 11 }}>Metric</th>
                    {projections.map((y) => (
                      <th key={y.year} style={{ textAlign: "right", padding: 12, fontWeight: 700, color: GREEN, fontSize: 11 }}>Year {y.year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { section: "LAYER 3 — CRAFT (Brokerage)" },
                    { label: "Active Clients", key: "activeClients", fmt: (v) => `${v} / ${maxClients}` },
                    { label: "Total Deals", key: "totalDeals", fmt: (v) => v },
                    { label: "Total Settlements", key: "totalSettlements", fmt: formatFull },
                    { label: "Upfront Commission (net)", key: "netUpfront", fmt: formatFull },
                    { label: "Trail Commission (net)", key: "netTrail", fmt: formatFull },
                    { label: "Brokerage Revenue", key: "brokerageRevenue", fmt: formatFull, bold: true, color: GREEN },
                    { section: "LAYER 2 — INDUSTRY (Mentoring)" },
                    { label: "New Mentees", key: "newMentees", fmt: (v) => v },
                    { label: "Program Revenue", key: "programRevenue", fmt: formatFull },
                    { label: "Ad-hoc + Course Revenue", key: "adhocRevenue", fmt: (v, row) => formatFull(v + row.courseRevenue) },
                    { label: "Mentorship Revenue", key: "totalMentorship", fmt: formatFull, bold: true, color: PURPLE },
                    { section: "TOTALS" },
                    { label: "Total Revenue", key: "totalRevenue", fmt: formatFull, bold: true, color: GREEN },
                    { label: "Total Expenses", key: "totalExpenses", fmt: formatFull, color: RED_SOFT },
                    { label: "   incl. Layer 1 (Impact tools)", key: "impactCost", fmt: formatFull, color: "rgba(255,255,255,0.3)" },
                    { label: "Net Profit", key: "netProfit", fmt: formatFull, bold: true, color: GREEN },
                    { label: "Profit Margin", key: "margin", fmt: (v) => `${v.toFixed(1)}%` },
                    { label: "→ Mission Fund (20%)", key: "missionFund", fmt: formatFull, color: PURPLE },
                  ].map((row, i) => {
                    if (row.section) {
                      return (
                        <tr key={i}>
                          <td colSpan={4} style={{ padding: "14px 12px 6px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", borderTop: i > 0 ? "1px solid #333" : "none" }}>{row.section}</td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={i} style={{ background: i % 2 === 0 ? "rgba(26,26,26,0.5)" : "transparent" }}>
                        <td style={{ padding: "8px 12px", color: row.bold ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)", fontWeight: row.bold ? 700 : 400 }}>{row.label}</td>
                        {projections.map((y) => (
                          <td key={y.year} style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", fontWeight: row.bold ? 700 : 400, color: row.color || (row.bold ? "#fff" : "rgba(255,255,255,0.6)") }}>
                            {row.fmt.length === 2 ? row.fmt(y[row.key], y) : row.fmt(y[row.key])}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "monthly" && (
          <div>
            <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Monthly Revenue & Profit (36 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GREEN} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GREEN_DARK} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={GREEN_DARK} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 9 }} interval={5} />
                  <YAxis tick={{ fill: "#555", fontSize: 11 }} tickFormatter={formatCurrency} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="Revenue" stroke={GREEN} fill="url(#rg)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Profit" stroke={GREEN_DARK} fill="url(#pg)" strokeWidth={2} />
                  <Line type="monotone" dataKey="Expenses" stroke={RED_SOFT} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Cumulative Trail Book</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={AMBER} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={AMBER} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 9 }} interval={5} />
                    <YAxis tick={{ fill: "#555", fontSize: 10 }} tickFormatter={formatCurrency} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="Trail Book" stroke={AMBER} fill="url(#bg)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Active Clients (30 cap)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={PURPLE} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={PURPLE} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 9 }} interval={5} />
                    <YAxis tick={{ fill: "#555", fontSize: 10 }} domain={[0, 35]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="Clients" stroke={PURPLE} fill="url(#cg)" strokeWidth={2} />
                    {/* Cap reference line */}
                    <Line type="monotone" dataKey={() => 30} stroke={RED_SOFT} strokeWidth={1} strokeDasharray="6 4" dot={false} name="Cap (30)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div>
            {/* Layer 3 */}
            <div style={{ background: GRAY_DARK, border: `1px solid ${AMBER}33`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: AMBER, marginBottom: 16 }}>🏦 Layer 3 — Craft (Selective Brokerage)</h3>
              <div style={{ background: `${AMBER}11`, borderLeft: `3px solid ${AMBER}`, borderRadius: "0 8px 8px 0", padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                Capped at 30 clients max. Quality over volume. Mutual selection.
              </div>
              <SliderInput label="Active Clients (Year 1)" value={activeClientsY1} onChange={setActiveClientsY1} min={2} max={20} step={1} />
              <SliderInput label="Annual Client Growth" value={clientGrowthRate} onChange={setClientGrowthRate} min={0} max={100} step={10} suffix="%" />
              <SliderInput label="Avg Deal Size" value={avgDealSize} onChange={setAvgDealSize} min={200000} max={3000000} step={50000} prefix="$" format={(v) => (v / 1000).toFixed(0) + "K"} />
              <SliderInput label="Deals per Client / Year" value={dealsPerClientPerYear} onChange={setDealsPerClientPerYear} min={1} max={3} step={0.5} />
              <SliderInput label="Upfront Commission Rate" value={upfrontRate} onChange={setUpfrontRate} min={0.4} max={0.75} step={0.05} suffix="%" />
              <SliderInput label="Trail Rate (p.a.)" value={trailRate} onChange={setTrailRate} min={0.1} max={0.3} step={0.05} suffix="%" />
              <SliderInput label="Aggregator Split (your %)" value={aggregatorSplit} onChange={setAggregatorSplit} min={60} max={95} step={5} suffix="%" />
            </div>

            {/* Layer 2 */}
            <div style={{ background: GRAY_DARK, border: `1px solid ${PURPLE}33`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: PURPLE, marginBottom: 16 }}>🎓 Layer 2 — Industry (Mentoring & Courses)</h3>
              <SliderInput label="New Mentees (Year 1)" value={menteesY1} onChange={setMenteesY1} min={1} max={20} step={1} />
              <SliderInput label="Annual Mentee Growth" value={menteeGrowthRate} onChange={setMenteeGrowthRate} min={0} max={100} step={10} suffix="%" />
              <SliderInput label="Program Fee (per mentee)" value={mentorshipFee} onChange={setMentorshipFee} min={2000} max={15000} step={500} prefix="$" format={(v) => v.toLocaleString()} />
              <SliderInput label="Hourly Rate (ad-hoc)" value={hourlyRate} onChange={setHourlyRate} min={150} max={500} step={25} prefix="$" />
              <SliderInput label="Ad-hoc Sessions / Month" value={adhocSessionsPerMonth} onChange={setAdhocSessionsPerMonth} min={0} max={20} step={1} />
              <SliderInput label="Course Revenue (starts Y2)" value={courseRevenueY2} onChange={setCourseRevenueY2} min={0} max={30000} step={1000} prefix="$" format={(v) => v.toLocaleString()} />
            </div>

            {/* Layer 1 + Expenses */}
            <div style={{ background: GRAY_DARK, border: "1px solid #222", borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: GREEN, marginBottom: 16 }}>🌱 Layer 1 — Impact + Operating Costs</h3>
              <div style={{ background: GREEN_GLOW, borderLeft: `3px solid ${GREEN}`, borderRadius: "0 8px 8px 0", padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                Layer 1 is a cost centre — free tools & education. Funded by Layers 2 & 3 + 20% of profit.
              </div>
              <SliderInput label="Impact Tools (monthly)" value={impactToolsCostY1} onChange={setImpactToolsCostY1} min={500} max={5000} step={250} prefix="$" format={(v) => v.toLocaleString()} />
              <SliderInput label="Monthly Overhead" value={monthlyOverhead} onChange={setMonthlyOverhead} min={1000} max={10000} step={500} prefix="$" format={(v) => v.toLocaleString()} />
              <SliderInput label="PI Insurance (annual)" value={piInsurance} onChange={setPiInsurance} min={1000} max={10000} step={500} prefix="$" format={(v) => v.toLocaleString()} />
              <SliderInput label="Marketing / Month (Year 1)" value={marketingBudgetY1} onChange={setMarketingBudgetY1} min={0} max={5000} step={250} prefix="$" format={(v) => v.toLocaleString()} />
            </div>

            {/* Notes */}
            <div style={{ background: "rgba(26,26,26,0.5)", borderRadius: 12, padding: 16, fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.8 }}>
              <p style={{ fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Modelling Notes</p>
              <p>• Brokerage capped at 30 clients (per pitch deck: "quality over volume, mutual selection")</p>
              <p>• Commercial upfront: 0.4–0.7% of loan amount; trail: 0.15% p.a. (Australian market rates)</p>
              <p>• Trail book assumes 85% of settled loans remain active (conservative)</p>
              <p>• Mentorship pricing benchmarked against Mr Mentor, Accendo, Broker Essentials</p>
              <p>• Course revenue kicks in from Year 2 (scalable digital/group content)</p>
              <p>• 20% of net profit allocated to Mission Fund (Layer 1 reinvestment)</p>
              <p>• Expenses increase ~10% annually; marketing scales 50% annually</p>
              <p>• Impact tools cost grows 50% annually as free offerings expand</p>
              <p>• All figures exclude GST · Founder: Dong Mao, 8yrs Big 4 banking</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
