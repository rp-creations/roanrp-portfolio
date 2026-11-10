export default function SkillGroup({ group }) {
  return (
    <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-2">
        {group.label}
      </h3>
      <ul className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        {group.items.map((item, index) => (
          <li key={item} className="text-sm leading-relaxed text-ink-2">
            {item}
            {index < group.items.length - 1 ? ',' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}
