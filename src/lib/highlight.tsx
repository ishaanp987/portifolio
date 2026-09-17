export function highlightPhrase(text: string, phrase: string) {
  if (!phrase) return text;
  const index = text.toLowerCase().indexOf(phrase.toLowerCase());
  if (index === -1) return text;
  const end = index + phrase.length;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-accent">{text.slice(index, end)}</span>
      {text.slice(end)}
    </>
  );
}
