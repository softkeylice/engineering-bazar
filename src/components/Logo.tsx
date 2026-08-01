import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'light' | 'dark'; // 'dark' = navy/dark background context, 'light' = white/light background context
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  variant = 'dark'
}) => {
  // Generate 16 exact gear cogs around center (50, 50) to match the reference logo
  const numTeeth = 16;
  const outerR = 48;
  const innerR = 38.5;
  const toothTopWidthAngle = (2 * Math.PI) / (numTeeth * 2.8); // Top of tooth width
  const toothBaseWidthAngle = (2 * Math.PI) / (numTeeth * 2.1); // Base of tooth width

  let pathD = '';
  for (let i = 0; i < numTeeth; i++) {
    const centerAngle = (i * 2 * Math.PI) / numTeeth - Math.PI / 2;

    const aTop1 = centerAngle - toothTopWidthAngle / 2;
    const aTop2 = centerAngle + toothTopWidthAngle / 2;
    const aBase2 = centerAngle + toothBaseWidthAngle / 2;

    const nextCenterAngle = ((i + 1) * 2 * Math.PI) / numTeeth - Math.PI / 2;
    const nextABase1 = nextCenterAngle - toothBaseWidthAngle / 2;

    const x1 = 50 + outerR * Math.cos(aTop1);
    const y1 = 50 + outerR * Math.sin(aTop1);

    const x2 = 50 + outerR * Math.cos(aTop2);
    const y2 = 50 + outerR * Math.sin(aTop2);

    const x3 = 50 + innerR * Math.cos(aBase2);
    const y3 = 50 + innerR * Math.sin(aBase2);

    const x4 = 50 + innerR * Math.cos(nextABase1);
    const y4 = 50 + innerR * Math.sin(nextABase1);

    if (i === 0) {
      pathD += `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} L ${x4.toFixed(2)} ${y4.toFixed(2)} `;
    } else {
      pathD += `L ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} L ${x4.toFixed(2)} ${y4.toFixed(2)} `;
    }
  }
  pathD += 'Z';

  // Accurate Royal Industrial Blue matching uploaded logo image
  const primaryBlue = '#0A28A8';
  const accentGold = '#2E4BC7';

  return (
    <div className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="shrink-0 drop-shadow-xs"
        aria-label="Engineering Bazar Logo"
      >
        <defs>
          {/* Unique ID for clipping interior logo contents inside white circle */}
          <clipPath id="innerLogoCircleClip">
            <circle cx="50" cy="50" r="34" />
          </clipPath>
        </defs>

        {/* Outer Blue Gear Body with 16 Teeth */}
        <path d={pathD} fill={primaryBlue} />

        {/* Gear Inner Blue Base Disc */}
        <circle cx="50" cy="50" r="38.5" fill={primaryBlue} />

        {/* Gold Accent Ring */}
        <circle
          cx="50"
          cy="50"
          r="35.5"
          fill="none"
          stroke={accentGold}
          strokeWidth="1.8"
        />

        {/* Inner Circle clipped group with White Background and Factory Silhouette */}
        <g clipPath="url(#innerLogoCircleClip)">
          {/* Pure White Background inside circle */}
          <rect x="0" y="0" width="100" height="100" fill="#FFFFFF" />

          {/* Deep Blue Factory Silhouette */}
          <g fill={primaryBlue}>
            {/* Sawtooth Factory Roofs (3 peaks slanting up to right with vertical drop) */}
            <path d="M 16 63 L 23 55 L 23 63 L 30 50 L 30 63 L 37 46 L 37 63 Z" />

            {/* Connecting Factory Base */}
            <rect x="37" y="56" width="10" height="15" />

            {/* Main Twin Tall Chimneys (Center) */}
            <rect x="46.5" y="22" width="2.6" height="46" />
            <rect x="50.2" y="21" width="2.6" height="47" />

            {/* Middle Section Structure */}
            <rect x="53.5" y="49" width="5" height="19" />

            {/* Right Factory Building with 2 Small Chimney Stacks */}
            <rect x="58.5" y="39" width="8" height="29" />
            <rect x="59.8" y="34" width="2" height="6" />
            <rect x="63" y="35" width="2" height="5" />

            {/* Far Right Factory Wing */}
            <rect x="66.5" y="45" width="8" height="23" />

            {/* Solid Ground Base filling the bottom section of the circle */}
            <rect x="0" y="61" width="100" height="39" />
          </g>
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center font-black tracking-tight text-xl">
            <span className={variant === 'light' ? 'text-[#0A28A8]' : 'text-white'}>ENGINEERING</span>
            <span className="text-[#2E4BC7] ml-1">BAZAR</span>
          </div>
          <span className={`text-[8.5px] font-bold tracking-widest uppercase mt-0.5 ${
            variant === 'light' ? 'text-slate-500' : 'text-slate-300'
          }`}>
              INDUSTRIAL MARKETPLACE
          </span>
        </div>
      )}
    </div>
  );
};

