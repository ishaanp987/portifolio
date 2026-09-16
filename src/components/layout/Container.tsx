type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  width?: "main" | "wide";
};

export function Container({ children, className, width = "main" }: ContainerProps) {
  const widthClass = width === "wide" ? "container-wide" : "container-main";
  return (
    <div className={[widthClass, className].filter(Boolean).join(" ")}>{children}</div>
  );
}
