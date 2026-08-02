import React from "react";
import logo from "../assets/images/Logo.jpg";

export const Logo = ({
  className = "",
  size = 40,
  showText = false,
  variant = "dark",
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 min-w-0 ${className}`}>
      <img
        src={logo}
        alt="Engineering Bazar Logo"
        width={size}
        height={size}
        className="object-contain shrink-0"
      />

      {showText && (
        <div className="flex flex-col leading-none min-w-0">
          <div className="flex items-center font-black tracking-tight text-sm sm:text-lg lg:text-xl whitespace-nowrap">
            <span className={variant === "light" ? "text-[#0A28A8]" : "text-white"}>
              ENGINEERING
            </span>
            <span className="text-[#2E4BC7] ml-1">BAZAR</span>
          </div>

          <span
            className={`text-[7px] sm:text-[8.5px] font-bold tracking-widest uppercase mt-0.5 truncate ${
              variant === "light" ? "text-slate-500" : "text-slate-300"
            }`}
          >
            INDUSTRIAL MARKETPLACE
          </span>
        </div>
      )}
    </div>
  );
};