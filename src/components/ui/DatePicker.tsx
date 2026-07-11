import "react-datepicker/dist/react-datepicker.css";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import { SlCalender } from "react-icons/sl";

type CustomDateInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  className?: string;
  label?: React.ReactNode;
  rules?: { required: string | boolean };
  errors?: FieldErrors<T>;
};

export default function CustomDateInput<T extends FieldValues>({
  name,
  control,
  className,
  label,
  rules,
  errors,
}: CustomDateInputProps<T>) {
  return (
    <div className={`${label ? "flex flex-col gap-2" : ""} ${className || ""}`}>
      {label && (
        <label className="text-sm md:text-2xl font-medium text-[#1A1A1A] flex items-center gap-2">
          <SlCalender size={18} />
          {label}
        </label>
      )}

      <div className="relative border border-gray-300 bg-card rounded-xl">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              onBlur={field.onBlur}
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/MM/yyyy"
              className="w-full bg-card rounded-xl py-3 px-3 text-right focus:outline-none h-[52px]"
              calendarClassName="!font-sans"
            />
          )}
        />

        <SlCalender
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858687] pointer-events-none"
        />
      </div>

      {errors?.[name] && (
        <p className="text-red-500 text-xs font-medium">
          {errors?.[name]?.message as string}
        </p>
      )}
    </div>
  );
}
