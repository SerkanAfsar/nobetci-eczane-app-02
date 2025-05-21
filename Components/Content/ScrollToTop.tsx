"use client";

import useScrolled from "@/Hooks/useScrolled";
import { cn } from "@/lib/utils";
import { CircleArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const { isScrolled } = useScrolled(undefined);
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className={cn(
        "bg-primary fixed right-2 bottom-2 hidden size-10 cursor-pointer items-center justify-center rounded-full text-white transition-all md:right-4 md:bottom-4",
        isScrolled && "animate-fadeIn flex",
      )}
    >
      <CircleArrowUp size={30} />
    </div>
  );
}
