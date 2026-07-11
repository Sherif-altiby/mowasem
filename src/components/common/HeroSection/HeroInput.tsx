import React from "react";

const HeroInput = ({
  icon,
  label,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-lg lg:text-2xl text-[#1A1A1A]">{label}</label>

      <div
        className="flex items-center rounded-2xl w-full p-3 px-4 gap-2 bg-[#F5F5F5]
      focus-within:border-primary/50
focus-within:ring
focus-within:ring-primary/50
  transition-all duration-200
      "
      >
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          className="min-w-[180px] border-none outline-none w-full text-sm lg:text-lg bg-[#F5F5F5] text-gray-900 placeholder:text-[#67686B]"
        />
      </div>
    </div>
  );
};

export default HeroInput;
