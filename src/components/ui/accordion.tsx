"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function AccordionItem({
  id,
  title,
  children,
  isOpen,
  onToggle,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all",
        isOpen ? "border-[#dd0e1c]/40 ring-1 ring-[#dd0e1c]/20" : "hover:border-gray-300",
        className
      )}
    >
      <button
        type="button"
        id={`header-${id}`}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-900 transition-colors hover:text-[#dd0e1c]"
      >
        <span className="text-base sm:text-lg pr-4 font-bold">{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180 text-[#dd0e1c]"
          )}
        />
      </button>
      {isOpen && (
        <div
          id={`panel-${id}`}
          role="region"
          aria-labelledby={`header-${id}`}
          className="px-5 pb-5 text-sm sm:text-base leading-relaxed text-gray-600 border-t border-gray-100 pt-3"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({
  items,
  allowMultiple = false,
}: {
  items: { id: string; question: string; answer: string }[];
  allowMultiple?: boolean;
}) {
  const [openIds, setOpenIds] = React.useState<string[]>([items[0]?.id || ""]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.question}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
        >
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
}
