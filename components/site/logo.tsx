import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/growthlab-logo.webp"
      alt="GrowthLab · Bridging Education & Industry"
      width={560}
      height={187}
      priority
      // w-auto is always applied so a caller passing only a height can't stretch it
      className={cn("h-9 w-auto sm:h-10", className)}
    />
  );
}
