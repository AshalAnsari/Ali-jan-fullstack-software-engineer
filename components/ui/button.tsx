import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "h-11 px-5 bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "h-11 px-5 border border-border-strong bg-surface/60 text-foreground hover:border-foreground/30 hover:bg-surface-hover",
  ghost: "h-9 px-1 text-foreground hover:text-primary",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  /** Arrow style: "right" for internal navigation, "external" for off-site. */
  icon?: "right" | "external" | "none";
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({
  href,
  variant = "primary",
  icon = "right",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && <ButtonArrow external={icon === "external"} />}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {content}
        {href.startsWith("http") && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}

/** Arrow that slides on hover — the site's one consistent micro-interaction. */
export function ButtonArrow({ external = false, className }: { external?: boolean; className?: string }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span aria-hidden className={cn("relative inline-flex size-4 overflow-hidden", className)}>
      <Icon
        className={cn(
          "absolute inset-0 size-4 transition-transform duration-500 ease-out-expo",
          external
            ? "group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4"
            : "group-hover/btn:translate-x-4",
        )}
      />
      <Icon
        className={cn(
          "absolute inset-0 size-4 transition-transform duration-500 ease-out-expo",
          external
            ? "-translate-x-4 translate-y-4 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
            : "-translate-x-4 group-hover/btn:translate-x-0",
        )}
      />
    </span>
  );
}
