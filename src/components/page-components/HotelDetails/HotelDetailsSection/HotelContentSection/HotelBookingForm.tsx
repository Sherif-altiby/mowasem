"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller, useController, Control } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSearchAlt, BiCalendarEvent } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";

type HotelFormValues = {
  checkin: Date | null;
  checkout: Date | null;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
};

const HotelGuestsInput = ({
  control,
}: {
  control: Control<HotelFormValues>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { field: roomsField } = useController({ control, name: "rooms" });
  const { field: adultsField } = useController({ control, name: "adults" });
  const { field: childrenField } = useController({ control, name: "children" });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const summary = `${roomsField.value} غرفة، ${adultsField.value} بالغين، ${childrenField.value} طفل`;

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="text-[15px] font-medium text-[#1A1A1A] mb-2 block text-right">
        عدد الضيوف
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#f8f9fa] border border-transparent hover:border-gray-200 transition-colors rounded-[14px] px-4 py-3.5 text-right flex items-center justify-between focus:outline-none h-[52px]"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <GoPeople size={20} className="text-[#858687] shrink-0" />
          <span className="text-[#1A1A1A] text-sm font-medium truncate">
            {summary}
          </span>
        </div>
        <MdOutlineKeyboardArrowDown
          size={20}
          className={`shrink-0 transition-transform duration-200 text-[#858687] ml-2 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          dir="rtl"
          className="absolute z-50 top-full mt-2 w-full min-w-[280px] right-0 bg-card border border-gray-200 rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col gap-4"
        >
          <CounterRow
            label="الغرف"
            value={roomsField.value}
            onDecrement={() =>
              roomsField.onChange(Math.max(1, roomsField.value - 1))
            }
            onIncrement={() =>
              roomsField.onChange(Math.min(9, roomsField.value + 1))
            }
            canDecrement={roomsField.value > 1}
            canIncrement={roomsField.value < 9}
          />
          <div className="h-px bg-gray-100" />
          <CounterRow
            label="البالغون"
            sublabel="12 سنة أو أكثر"
            value={adultsField.value}
            onDecrement={() =>
              adultsField.onChange(Math.max(1, adultsField.value - 1))
            }
            onIncrement={() =>
              adultsField.onChange(Math.min(9, adultsField.value + 1))
            }
            canDecrement={adultsField.value > 1}
            canIncrement={adultsField.value < 9}
          />
          <div className="h-px bg-gray-100" />
          <CounterRow
            label="الأطفال"
            sublabel="أقل من 12 سنة"
            value={childrenField.value}
            onDecrement={() =>
              childrenField.onChange(Math.max(0, childrenField.value - 1))
            }
            onIncrement={() =>
              childrenField.onChange(Math.min(9, childrenField.value + 1))
            }
            canDecrement={childrenField.value > 0}
            canIncrement={childrenField.value < 9}
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 mt-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
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
  sublabel?: string;
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
      <p className="text-sm font-bold text-[#1A1A1A]">{label}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrement}
        disabled={!canDecrement}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 transition-colors"
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
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 transition-colors"
      >
        <FiPlus size={14} />
      </button>
    </div>
  </div>
);

export default function HotelBookingForm() {
  const { control, handleSubmit } = useForm<HotelFormValues>({
    defaultValues: {
      checkin: new Date(),
      checkout: new Date(new Date().setDate(new Date().getDate() + 3)),
      nights: 3,
      rooms: 1,
      adults: 2,
      children: 0,
    },
  });

  const onSubmit = (data: HotelFormValues) => {
    console.log("Booking Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-[24px] drop-shadow-[0_1px_7.3px_rgba(0,0,0,0.09)] p-4 md:p-6 mb-10 w-full flex flex-col lg:flex-row items-end gap-3 lg:gap-4 relative z-10"
      dir="rtl"
    >
      {/* Check In */}
      <div className="w-full lg:flex-1 relative">
        <label className="text-[15px] font-medium text-[#1A1A1A] mb-2 block text-right">
          تسجيل الوصول
        </label>
        <div className="relative border border-transparent hover:border-gray-200 transition-colors rounded-[14px] bg-[#f8f9fa] h-[52px]">
          <Controller<HotelFormValues, "checkin">
            name="checkin"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText="تاريخ الدخول"
                dateFormat="EEEE, d MMMM"
                className="w-full bg-transparent rounded-[14px] py-3.5 pr-10 pl-3 text-sm font-medium text-[#1A1A1A] text-right focus:outline-none"
              />
            )}
          />
          <BiCalendarEvent
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858687] pointer-events-none"
          />
        </div>
      </div>

      {/* Check Out */}
      <div className="w-full lg:flex-1 relative">
        <label className="text-[15px] font-medium text-[#1A1A1A] mb-2 block text-right">
          تسجيل المغادرة
        </label>
        <div className="relative border border-transparent hover:border-gray-200 transition-colors rounded-[14px] bg-[#f8f9fa] h-[52px]">
          <Controller<HotelFormValues, "checkout">
            name="checkout"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText="تاريخ الخروج"
                dateFormat="EEEE, d MMMM"
                className="w-full bg-transparent rounded-[14px] py-3.5 pr-10 pl-3 text-sm font-medium text-[#1A1A1A] text-right focus:outline-none"
              />
            )}
          />
          <BiCalendarEvent
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858687] pointer-events-none"
          />
        </div>
      </div>

      {/* Nights */}
      <div className="w-full lg:flex-[0.8] relative">
        <label className="text-[15px] font-medium text-[#1A1A1A] mb-2 block text-right">
          عدد الليالي
        </label>
        <div className="relative border border-transparent hover:border-gray-200 transition-colors rounded-[14px] bg-[#f8f9fa] h-[52px]">
          <Controller<HotelFormValues, "nights">
            name="nights"
            control={control}
            render={({ field }) => (
              <select
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full bg-transparent rounded-[14px] py-3.5 px-4 text-sm font-medium text-[#1A1A1A] text-right appearance-none focus:outline-none h-full"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} ليالي
                  </option>
                ))}
              </select>
            )}
          />
          <MdOutlineKeyboardArrowDown
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858687] pointer-events-none"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="w-full lg:flex-[1.2]">
        <HotelGuestsInput control={control} />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full lg:w-[130px] bg-primary text-white px-6 py-3.5 rounded-[14px] font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors h-[52px] shadow-sm shrink-0"
      >
        <span className="text-base">بحث</span>
        <BiSearchAlt className="w-[18px] h-[18px]" />
      </button>
    </form>
  );
}
