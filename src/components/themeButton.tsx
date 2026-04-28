import React, { useState } from "react";

export const ThemeButton = ({
  isDark,
  handleTheme,
}: {
  isDark: boolean;
  handleTheme: () => void;
}) => {
  return (
    <div
      onClick={handleTheme}
      className={`w-9 h-9 rounded-[10px] flex items-center justify-center border cursor-pointer shadow-sm border-[#E4E4E7]`}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clipPath="url(#clip0_789_2258)">
            <path
              d="M8.00004 1.3335V2.66683M8.00004 13.3335V14.6668M3.28671 3.28683L4.22671 4.22683M11.7734 11.7735L12.7134 12.7135M1.33337 8.00016H2.66671M13.3334 8.00016H14.6667M4.22671 11.7735L3.28671 12.7135M12.7134 3.28683L11.7734 4.22683M10.6667 8.00016C10.6667 9.47292 9.4728 10.6668 8.00004 10.6668C6.52728 10.6668 5.33337 9.47292 5.33337 8.00016C5.33337 6.5274 6.52728 5.3335 8.00004 5.3335C9.4728 5.3335 10.6667 6.5274 10.6667 8.00016Z"
              stroke="#FAFAFA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_789_2258">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 2C7.20435 2.79565 6.75736 3.87478 6.75736 5C6.75736 6.12522 7.20435 7.20435 8 8C8.79565 8.79565 9.87478 9.24264 11 9.24264C12.1252 9.24264 13.2044 8.79565 14 8C14 9.18669 13.6481 10.3467 12.9888 11.3334C12.3295 12.3201 11.3925 13.0892 10.2961 13.5433C9.19975 13.9974 7.99335 14.1162 6.82946 13.8847C5.66558 13.6532 4.59648 13.0818 3.75736 12.2426C2.91825 11.4035 2.3468 10.3344 2.11529 9.17054C1.88378 8.00666 2.0026 6.80026 2.45673 5.7039C2.91085 4.60754 3.67989 3.67047 4.66658 3.01118C5.65328 2.35189 6.81331 2 8 2Z"
            stroke="#FAFAFA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
