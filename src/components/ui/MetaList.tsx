import { isRealValue, publicItems } from "@/lib/content";

type MetaListProps = {
  items: Array<{ label: string; value?: string | string[] | null }>;
};

export function MetaList({ items }: MetaListProps) {
  const visible = items.flatMap((item) => {
    if (Array.isArray(item.value)) {
      const values = publicItems(item.value);
      return values.length > 0 ? [{ label: item.label, value: values.join(" / ") }] : [];
    }
    const value = isRealValue(item.value) ? item.value.trim() : "";
    return value ? [{ label: item.label, value }] : [];
  });

  if (visible.length === 0) return null;

  return (
    <dl className="grid gap-2.5">
      {visible.map((item) => (
        <div key={item.label} className="meta-pair">
          <dt className="meta-key">{item.label}</dt>
          <dd className="meta-val">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
