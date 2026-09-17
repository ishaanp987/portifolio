type DevNoteProps = {
  children: React.ReactNode;
};

export function DevNote({ children }: DevNoteProps) {
  if (process.env.NODE_ENV !== "development") return null;
  return <p className="dev-note">{children}</p>;
}
