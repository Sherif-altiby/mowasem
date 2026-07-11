"use client";

import { CabinClass } from "@/types/travel-types";
import { Control, FieldValues, useController } from "react-hook-form";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const CABIN_CLASSES: { value: CabinClass; label: string; labelEn: string }[] = [
  { value: "ECONOMY", label: "الاقتصادية", labelEn: "Economy" },
  {
    value: "PREMIUM_ECONOMY",
    label: "اقتصادية مميزة",
    labelEn: "Premium Economy",
  },
  { value: "BUSINESS", label: "رجال الأعمال", labelEn: "Business" },
  { value: "FIRST", label: "الأولى", labelEn: "First" },
];

const MAX_TOTAL = 9;

interface Props {
  control: Control<FieldValues>; // Using FieldValues to avoid strict coupling
}

const PassengersSelectInput = ({ control }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { field: adultsField } = useController({
    control,
    name: "adults",
    defaultValue: 1,
  });
  const { field: childrenField } = useController({
    control,
    name: "children",
    defaultValue: [],
  });
  const { field: babiesField } = useController({
    control,
    name: "babies",
    defaultValue: 0,
  });
  const { field: cabinClassField } = useController({
    control,
    name: "cabinClass",
    defaultValue: "ECONOMY",
  });

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const adults = adultsField.value as number;
  const children = childrenField.value as number[];
  const babies = babiesField.value as number;
  const cabinClass = cabinClassField.value as CabinClass;

  const totalPassengers = adults + children.length + babies;

  const addChild = () => childrenField.onChange([...children, 5]);
  const removeLastChild = () => childrenField.onChange(children.slice(0, -1));

  const updateChildAge = (index: number, age: number) => {
    const updated = [...children];
    updated[index] = age;
    childrenField.onChange(updated);
  };

  const getSummary = () => {
    const parts: string[] = [`${adults} بالغ`];
    if (children.length > 0) parts.push(`${children.length} طفل`);
    if (babies > 0) parts.push(`${babies} رضيع`);
    const cabin =
      CABIN_CLASSES.find((c) => c.value === cabinClass)?.label ?? "";
    return `${parts.join(" · ")} · ${cabin}`;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        id="passengers-trigger"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full h-[52px] flex items-center gap-2 bg-card border border-gray-300 rounded-xl px-4 text-base text-[#1A1A1A] focus:outline-none relative transition-colors"
      >
        <span className="flex-1 text-start truncate text-sm">
          {getSummary()}
        </span>
        <MdOutlineKeyboardArrowDown
          size={20}
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          dir="rtl"
          className="absolute z-50 top-[110%] w-full min-w-[280px] sm:min-w-[320px] bg-card border border-gray-200 rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col gap-4"
        >
          {/* Cabin Class */}
          <div>
            <p className="text-sm font-bold text-gray-500 mb-2.5">
              درجة المقصورة
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CABIN_CLASSES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => cabinClassField.onChange(value)}
                  className={`py-2 px-2 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all duration-150 ${
                    cabinClass === value
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-card text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Adults */}
          <CounterRow
            label="البالغون"
            sublabel="12 سنة أو أكثر"
            value={adults}
            onDecrement={() => adultsField.onChange(Math.max(1, adults - 1))}
            onIncrement={() => adultsField.onChange(Math.min(9, adults + 1))}
            canDecrement={adults > 1}
            canIncrement={totalPassengers < MAX_TOTAL}
          />

          {/* Children */}
          <CounterRow
            label="الأطفال"
            sublabel="من 2 إلى 11 سنة"
            value={children.length}
            onDecrement={removeLastChild}
            onIncrement={addChild}
            canDecrement={children.length > 0}
            canIncrement={totalPassengers < MAX_TOTAL}
          />

          {/* Child age selectors */}
          {children.length > 0 && (
            <div className="flex flex-wrap gap-2 -mt-1 pr-1">
              {children.map((age, i) => (
                <div key={i} className="flex flex-col gap-1 w-full sm:w-[48%]">
                  <label className="text-[10px] text-gray-400 font-medium">
                    عمر الطفل {i + 1}
                  </label>
                  <select
                    value={age}
                    onChange={(e) => updateChildAge(i, Number(e.target.value))}
                    className="text-xs border border-gray-200 rounded-xl px-2 py-1.5 focus:outline-none focus:border-primary bg-gray-50 cursor-pointer w-full"
                  >
                    {Array.from({ length: 10 }, (_, j) => j + 2).map((a) => (
                      <option key={a} value={a}>
                        {a} سنوات
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Babies */}
          <CounterRow
            label="الرضع"
            sublabel="أقل من سنتين (في الحضن)"
            value={babies}
            onDecrement={() => babiesField.onChange(Math.max(0, babies - 1))}
            onIncrement={() => babiesField.onChange(babies + 1)}
            canDecrement={babies > 0}
            canIncrement={babies < adults && totalPassengers < MAX_TOTAL}
          />

          {/* Confirm */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 mt-1 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            تأكيد
          </button>
        </div>
      )}
    </div>
  );
};

interface CounterRowProps {
  label: string;
  sublabel: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  canDecrement: boolean;
  canIncrement: boolean;
}

const CounterRow = ({
  label,
  sublabel,
  value,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement,
}: CounterRowProps) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold text-[#1A1A1A]">{label}</p>
      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{sublabel}</p>
    </div>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrement}
        disabled={!canDecrement}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <FiMinus size={14} />
      </button>
      <span className="w-5 text-center font-bold text-[#1A1A1A] text-sm">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={!canIncrement}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <FiPlus size={14} />
      </button>
    </div>
  </div>
);

export default PassengersSelectInput;
