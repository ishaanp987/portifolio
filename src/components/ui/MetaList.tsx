type MetaListProps = {
  items: Array<{ label: string; value?: string | string[] | null }>;
};

export function MetaList({ items }: MetaListProps) {
  const visible = items.filter((item) => {
    if (Array.isArray(item.value)) return item.value.length > 0;
    return Boolean(item.value && String(item.value).trim());
  });

  if (visible.length === 0) return null;

  return (
    <dl className="grid gap-2.5">
      {visible.map((item) => (
        <div key={item.label} className="meta-pair">
          <dt className="meta-key">{item.label}</dt>
          <dd className="meta-val">
            {Array.isArray(item.value) ? item.value.join(" / ") : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
