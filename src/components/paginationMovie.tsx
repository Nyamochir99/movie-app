"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationMovie({
  isDark,
  totalPages,
  currentPage,
  onPageChange,
}: {
  isDark: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <Pagination className={`my-10 ${isDark ? "text-white" : "text-black"}`}>
      <PaginationContent>
        {/* Өмнөх товч */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={`
              ${currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
              ${isDark ? "hover:bg-zinc-800 hover:text-white" : "hover:bg-zinc-100"}
            `}
          />
        </PaginationItem>

        {/* Хуудасны дугаарууд */}
        <div className="flex items-center gap-1">
          <AnimatePresence mode="popLayout">
            {pages.map((p) => (
              <motion.div
                key={p}
                layout // Байрлал солигдоход зөөлөн гулсуулна
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={p === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(p);
                    }}
                    className={`cursor-pointer ${
                      p === currentPage
                        ? isDark
                          ? "bg-white text-black"
                          : "bg-black text-white" // Идэвхтэй үеийн өнгө
                        : isDark
                          ? "hover:bg-zinc-800"
                          : "hover:bg-zinc-100" // Энгийн үеийн өнгө
                    }`}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {endPage < totalPages && (
          <PaginationEllipsis className={isDark ? "text-white" : ""} />
        )}

        {/* Дараах товч */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={`
              ${currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
              ${isDark ? "hover:bg-zinc-800 hover:text-white" : "hover:bg-zinc-100"}
            `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
