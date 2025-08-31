import * as React from "react";

type Props = { unit?: string } & React.InputHTMLAttributes<HTMLInputElement>;

function calculateBackgroundSize(
  min?: string | number,
  max?: string | number,
  value?: string | number | readonly string[]
) {
  const numericValue = Number(value ?? 0);
  const numericMin = Number(min ?? 0);
  const numericMax = Number(max ?? 100);
  if (Number.isNaN(numericValue) || numericMax === numericMin) return "0% 100%";
  return `${
    ((numericValue - numericMin) * 100) / (numericMax - numericMin)
  }% 100%`;
}

export function Slider({
  defaultValue,
  onChange,
  max,
  min,
  title,
  unit,
  value,
  ...props
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    target.style.backgroundSize = calculateBackgroundSize(
      target.min,
      target.max,
      target.value
    );
    onChange?.(e);
  };

  const backgroundSize = calculateBackgroundSize(
    min,
    max,
    value ?? defaultValue
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between text-slate-700 text-lg">
        <span>{title}</span>
        <span className="tabular-nums">
          {value ?? defaultValue}
          {unit}
        </span>
      </div>

      {/* Input */}
      <div className="my-2.5">
        <input
          {...props}
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          type="range"
          className={[
            // base track
            "w-full h-1 rounded-[2px] appearance-none outline-none mb-2.5",
            "bg-gray-500/20 bg-no-repeat",
            // webkit thumb
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-white",
            "[&::-webkit-slider-thumb]:transition-[box-shadow,background] [&::-webkit-slider-thumb]:duration-300",
            // default shadow
            "[&::-webkit-slider-thumb]:shadow-[0_6px_13px_0_rgba(0,0,0,0.12),_0_0.5px_4px_0_rgba(0,0,0,0.12)]",
            // hover shadow
            "[&::-webkit-slider-thumb:hover]:shadow-[0_6px_13px_0_rgba(0,0,0,0.24),_0_0.5px_4px_0_rgba(0,0,0,0.24)]",
            // webkit track
            "[&::-webkit-slider-runnable-track]:appearance-none",
            "[&::-webkit-slider-runnable-track]:bg-transparent",
            // moz thumb
            "[&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white",
            "[&::-moz-range-thumb]:shadow-[0_6px_13px_0_rgba(0,0,0,0.12),_0_0.5px_4px_0_rgba(0,0,0,0.12)]",
            "[&::-moz-range-thumb:hover]:shadow-[0_6px_13px_0_rgba(0,0,0,0.24),_0_0.5px_4px_0_rgba(0,0,0,0.24)]",
            "[&::-moz-range-track]:bg-transparent",
            // ms thumb/track (legacy)
            "[&::-ms-thumb]:h-7 [&::-ms-thumb]:w-7 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-white",
            "[&::-ms-thumb]:shadow-[0_6px_13px_0_rgba(0,0,0,0.12),_0_0.5px_4px_0_rgba(0,0,0,0.12)]",
            "[&::-ms-thumb:hover]:shadow-[0_6px_13px_0_rgba(0,0,0,0.24),_0_0.5px_4px_0_rgba(0,0,0,0.24)]",
            "[&::-ms-track]:bg-transparent",
            // focus
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
          ].join(" ")}
          // Progress fill (same trick as tu CSS original)
          style={{
            backgroundImage: "linear-gradient(#007aff, #007aff)",
            backgroundSize,
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-[rgba(60,60,67,0.6)]">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
