import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  narrow: "max-w-[880px]",
  default: "max-w-[1280px]",
  wide: "max-w-[1600px]",
};

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-10", sizes[size], className)} {...props} />;
}
