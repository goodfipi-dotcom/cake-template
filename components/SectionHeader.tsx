import { CORAL, DARK } from "@/lib/config";

interface Props {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  titleSize?: "md" | "lg";
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  titleSize = "lg",
}: Props) {
  const alignClass = align === "center" ? "text-center" : "";
  const titleClass =
    titleSize === "lg"
      ? "text-3xl md:text-5xl font-bold"
      : "text-3xl md:text-4xl font-bold leading-tight";

  return (
    <div className={alignClass}>
      <div
        className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
        style={{ color: CORAL }}
      >
        {badge}
      </div>
      <h2 className={titleClass} style={{ color: DARK }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-stone-400 mt-3">{subtitle}</p>
      )}
    </div>
  );
}
