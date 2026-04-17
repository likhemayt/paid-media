import { useState, useMemo } from 'react';
import { ChevronDown, Check, BookOpen, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLAN_DATA = [
  {
    id: 'day-1',
    date: "Monday, April 21",
    title: "Day 1 — Foundations & Meta Ads Setup",
    sub: "Understanding Paid Media basics + setting up accounts",
    theme: "blue",
    blocks: [
      {
        time: "Hour 1–2", type: "study", label: "Study",
        title: "Paid Media Foundations",
        items: ["What is Paid Media? (Paid vs Owned vs Earned)", "3 campaign goals: Awareness, Traffic, Conversions", "Key terms: CPM, CPC, CTR, ROAS, Conversion", "Watch: Meta Blueprint intro video (free)"]
      },
      {
        time: "Hour 3", type: "exec", label: "Execution",
        title: "Setup Task",
        items: ["Create a Meta Business Account at business.facebook.com", "Connect your Facebook Page", "Navigate Ads Manager — just explore, don't run anything yet", "Write down 3 things you noticed"]
      }
    ],
    checks: ["Understand what Paid Media is", "Know the 3 campaign goals", "Meta Business Account created"]
  },
  {
    id: 'day-2',
    date: "Tuesday, April 22",
    title: "Day 2 — Meta Ads (Campaign Structure)",
    sub: "Campaign → Ad Set → Ad + Build your first ad",
    theme: "green",
    blocks: [
      {
        time: "Hour 1–2", type: "study", label: "Study",
        title: "Meta Ads Structure",
        items: ["Campaign level: choose your objective (Traffic, Leads, Sales)", "Ad Set level: audience targeting, budget, schedule", "Ad level: image/video, headline, copy, CTA button", "Learn audience options: Location, Age, Interests, Behaviors"]
      },
      {
        time: "Hour 3", type: "exec", label: "Execution",
        title: "Build Your First Practice Ad",
        items: ["Create a Traffic Campaign in Ads Manager", "Set audience: Philippines, Age 18–35, Interests: Fashion or Food", "Budget: ₱200–₱300/day (don't publish yet)", "Write ad copy: Headline + Primary Text + choose a CTA", "Take a screenshot of your draft setup"]
      }
    ],
    checks: ["Understand Campaign → Ad Set → Ad structure", "Know how to set a target audience", "Draft ad created (not published)"]
  },
  {
    id: 'day-3',
    date: "Wednesday, April 23",
    title: "Day 3 — Google Ads Basics",
    sub: "Search campaigns + keyword targeting",
    theme: "amber",
    blocks: [
      {
        time: "Hour 1–2", type: "study", label: "Study",
        title: "Google Ads Introduction",
        items: ["Difference: Google (intent-based) vs Meta (interest-based)", "4 campaign types: Search, Display, YouTube, Shopping", "What are keywords? Match types: Broad, Phrase, Exact", "How Google decides which ad to show (Ad Rank + Quality Score)", "Watch: Google Skillshop — Search Ads intro (free at skillshop.google.com)"]
      },
      {
        time: "Hour 3", type: "exec", label: "Execution",
        title: "Build a Google Search Ad Draft",
        items: ["Create a Google Ads account at ads.google.com", "Start a new Search Campaign (goal: website traffic)", "Pick 5–10 keywords relevant to a product/service", "Write 3 headlines + 2 descriptions for your ad", "Set a sample budget (₱200/day) — don't publish yet"]
      }
    ],
    checks: ["Know the difference between Google and Meta ads", "Understand keyword match types", "Google Search Ad draft created"]
  },
  {
    id: 'day-4',
    date: "Thursday, April 24",
    title: "Day 4 — Metrics, Review & Practice Run",
    sub: "Read results + launch a small test ad",
    theme: "rose",
    blocks: [
      {
        time: "Hour 1–2", type: "study", label: "Study",
        title: "Reading & Analyzing Metrics",
        items: ["CTR — is your ad interesting enough to click?", "CPC — how much are you paying per click?", "ROAS — are you making money from your ad spend?", "Conversion Rate — are clicks turning into real actions?", "What to do when results are bad: test new creatives, adjust audience", "Study a sample ad report — spot what's working vs not"]
      },
      {
        time: "Hour 3", type: "exec", label: "Execution",
        title: "Launch & Observe",
        items: ["Publish your Meta practice ad with ₱200 budget (1 day only)", "Or if no budget: review a sample campaign result on YouTube", "After 6–12 hours: check Ads Manager for impressions, CTR, CPC", "Write a short summary: What did you learn? What would you change?", "Optional: take the Meta Blueprint quick quiz to test yourself"]
      }
    ],
    checks: ["Understand CTR, CPC, ROAS, Conversion Rate", "Launched or reviewed a real/sample campaign", "Written a personal learning summary"]
  }
];

const THEMES = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-900', badge: 'bg-blue-600', badgeText: 'text-white' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-900', badge: 'bg-emerald-600', badgeText: 'text-white' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-900', badge: 'bg-amber-600', badgeText: 'text-white' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-900', badge: 'bg-rose-500', badgeText: 'text-white' },
};

export default function App() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 0: true });

  const toggleDay = (index: number) => {
    setOpenDays(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleCheck = (dayIndex: number, checkIndex: number) => {
    const key = `${dayIndex}-${checkIndex}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalChecks = useMemo(() => PLAN_DATA.reduce((acc, day) => acc + day.checks.length, 0), []);
  const completedChecks = useMemo(() => Object.values(checkedItems).filter(Boolean).length, [checkedItems]);
  const progressPercent = Math.round((completedChecks / totalChecks) * 100) || 0;

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8 font-sans text-neutral-900 pb-20">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header & Overall Progress */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Paid Media Mastery</h1>
            <p className="text-neutral-500 mt-1">4-Day Intensive Study Plan</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Overall Progress</p>
                <div className="text-2xl font-semibold mt-1 flex items-baseline gap-2">
                  {completedChecks} <span className="text-sm font-medium text-neutral-400">/ {totalChecks} tasks done</span>
                </div>
              </div>
              <div className="text-right flex items-center justify-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                {progressPercent}%
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex gap-2 h-2.5">
              {PLAN_DATA.map((day, i) => {
                const dayChecks = day.checks.map((_, j) => checkedItems[`${i}-${j}`]);
                const allDone = dayChecks.length > 0 && dayChecks.every(Boolean);
                const someDone = dayChecks.some(Boolean);
                
                let dotClass = "bg-neutral-100";
                if (allDone) dotClass = "bg-emerald-500";
                else if (someDone) dotClass = "bg-blue-500";

                return (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-full transition-colors duration-500 ${dotClass}`} 
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-4">
          {PLAN_DATA.map((day, i) => {
            const theme = THEMES[day.theme as keyof typeof THEMES];
            const isOpen = !!openDays[i];

            return (
              <div key={day.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                
                {/* Header */}
                <button 
                  onClick={() => toggleDay(i)}
                  className="w-full flex items-center gap-4 p-5 text-left focus:outline-none transition-colors hover:bg-neutral-50"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-inner ${theme.badge} ${theme.badgeText}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold truncate text-neutral-900">{day.title}</h2>
                    <p className="text-sm text-neutral-500 truncate mt-0.5">{day.sub}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 hidden sm:flex">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{day.date}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-neutral-400 ml-2"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                {/* Collapsible Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-neutral-100"
                    >
                      <div className={`p-5 sm:p-7 ${theme.bg}`}>
                        
                        {/* Timetable Blocks */}
                        <div className="space-y-8">
                          {day.blocks.map((block, bIdx) => (
                            <div key={bIdx} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                              <div className="sm:w-24 shrink-0 pt-0.5">
                                <span className={`text-sm font-semibold uppercase tracking-wider ${theme.text} opacity-75`}>
                                  {block.time}
                                </span>
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/60 shadow-sm">
                                    {block.type === 'study' ? <BookOpen size={12} /> : <PenTool size={12} />}
                                    {block.label}
                                  </span>
                                  <h3 className={`text-base font-bold ${theme.text}`}>{block.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                  {block.items.map((item, iIdx) => (
                                    <li key={iIdx} className="flex gap-3 text-[15px] leading-relaxed text-neutral-800">
                                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0 opacity-50" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Checklist */}
                        <div className="mt-8 pt-6 border-t border-black/5">
                          <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${theme.text} opacity-80`}>Daily Checklist</h4>
                          <div className="space-y-2">
                            {day.checks.map((check, cIdx) => {
                              const key = `${i}-${cIdx}`;
                              const isChecked = !!checkedItems[key];
                              
                              return (
                                <button
                                  key={cIdx}
                                  onClick={() => toggleCheck(i, cIdx)}
                                  className={`w-full group flex items-start gap-3 p-3 rounded-xl transition-all text-left border ${isChecked ? 'bg-white/80 border-transparent shadow-sm' : 'bg-white/40 border-black/5 hover:bg-white/60'}`}
                                >
                                  <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors border ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-neutral-300 text-transparent group-hover:border-emerald-400'}`}>
                                    <Check size={14} strokeWidth={3} />
                                  </div>
                                  <span className={`text-[15px] leading-snug transition-colors ${isChecked ? 'text-neutral-500 line-through' : 'text-neutral-800 font-medium'}`}>
                                    {check}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
