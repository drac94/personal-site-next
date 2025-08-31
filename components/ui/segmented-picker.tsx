import * as React from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  title?: string;
  options: Option[];
  name: string;
  selectedValue: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SegmentedPicker({
  name,
  onChange,
  options,
  selectedValue,
  title,
}: Props) {
  return (
    <div className="space-y-2">
      {title && <h3 className="text-slate-700 text-lg font-normal">{title}</h3>}

      <div
        className="grid items-center rounded-[9px] bg-gray-500/10 p-0.5"
        style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
      >
        {options.map((option) => (
          <label key={option.value} className="relative flex">
            <input
              name={name}
              type="radio"
              className="peer sr-only"
              defaultChecked={option.value === selectedValue}
              onChange={onChange}
              value={option.value}
            />
            <span
              className="
                flex-1 select-none rounded-md px-2 py-1 text-center text-[13px] font-medium capitalize
                transition-all duration-200 ease-out
                peer-checked:bg-white peer-checked:shadow-[0_3px_1px_0_rgba(0,0,0,0.04),0_3px_8px_0_rgba(0,0,0,0.12)]
                peer-checked:ring-1 peer-checked:ring-black/10
                peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500
                motion-safe:active:scale-[0.98]
              "
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
