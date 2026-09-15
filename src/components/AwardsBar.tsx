export default function AwardsBar() {
  const items = [
    'Vanguard Food Awards 2025',
    'Lagos Food Festival Winner',
    'Best Nigerian Restaurant — TimeOut Lagos',
    'Pulse Nigeria Food Choice',
    'BellaNaija Top Restaurants',
    'Guardian Life Awards',
  ];

  return (
    <section className="bg-bone border-y border-ink/8 py-8 overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-[11px] font-medium tracking-[0.18em] uppercase text-mid/60 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-brand-red/40 rounded-full" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
