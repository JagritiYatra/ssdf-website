import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-8", className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          light ? "text-white" : "text-navy-800"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "w-20 h-1 rounded-full mb-4",
          centered && "mx-auto",
          "bg-golden-400"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl",
            centered && "mx-auto",
            light ? "text-navy-200" : "text-navy-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
