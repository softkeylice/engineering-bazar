import React from "react";
import logo from "../assets/images/Logo.jpg";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 46,
  showText = false,
  variant = "light",
}) => {
  const inkColor = variant === "light" ? "#0F1B3D" : "#F5F6F8";
  const accentColor = variant === "light" ? "#1E40D6" : "#6D8DFF";
  const taglineColor = variant === "light" ? "#5B6472" : "#9AA3B5";

  return (
    <div className={`inline-flex items-center gap-3 min-w-0 ${className}`}>
      <img
        src={logo}
        alt="Engineering Bazar Logo"
        width={size}
        height={size}
        className="object-contain shrink-0"
      />

      {showText && (
        <div className="flex flex-col leading-none min-w-0">
          <div className="flex items-center whitespace-nowrap">
            <span
              className="font-bold text-[19px] sm:text-[22px] lg:text-[25px] tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif", color: inkColor }}
            >
              ENGINEERING
            </span>

            <span
              className="ml-1 font-bold text-[19px] sm:text-[22px] lg:text-[25px] tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif", color: accentColor }}
            >
              BAZAR
            </span>
          </div>

          <span
            className="mt-1 text-[8px] sm:text-[9px] font-semibold tracking-[0.28em] uppercase"
            style={{ color: taglineColor }}
          >
            INDUSTRIAL MARKETPLACE
          </span>
        </div>
      )}
    </div>
  );
};