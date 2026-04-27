import React from "react";

export const Badge = ({ name, isDark }: { name: string; isDark: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center py-0.5 px-2.5 border rounded-full text-[12px] leading-4 ${isDark ? "border-[#27272a] text-[#fafafa]" : "border-[#E4E4E7] text-[#09090B]"}`}
    >
      {name}
    </div>
  );
};
