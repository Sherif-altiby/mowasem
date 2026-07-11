"use client";

import React, { useState, useMemo } from "react";
import { useForm, useWatch, Control, FieldValues } from "react-hook-form";
import AutocompleteInput from "@/components/travel/components/AutocompleteInput";
import CustomDateInput from "@/components/ui/DatePicker";
import PassengersSelectInput from "@/components/travel/components/PassengersSelectInput";
import { T_formValues } from "@/types/travel-types";
import toast from "react-hot-toast";
import { LiaPlaneArrivalSolid, LiaPlaneDepartureSolid } from "react-icons/lia";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { Send, Phone } from "lucide-react";
import { GoPeople } from "react-icons/go";
import Image from "next/image";
import { getData } from "@/lib/api/client";
import { useGlobalSettings } from "@/hooks/apiHooks";

// Interface extending T_formValues to include the phone number from the new UI
interface FlightPageFormValues extends T_formValues {
  phone?: string;
}

// Minimal type for a flight offer returned by the API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlightOffer = Record<string, any>;

interface FlightsApiResponse {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type SearchStatus = "idle" | "loading" | "success" | "error" | string;

// Memoized FlightCard component to prevent unnecessary re-renders
const FlightCard = React.memo(({ flight }: { flight: FlightOffer }) => {
  const airline =
    flight.airline ||
    flight.legs?.[0]?.carriers?.[0]?.name ||
    "شركة الطيران";
  const price =
    flight.price?.formatted ||
    flight.price?.raw ||
    flight.priceFormatted ||
    "—";
  const duration =
    flight.legs?.[0]?.durationInMinutes ||
    flight.duration ||
    null;
  const stops =
    flight.legs?.[0]?.stopCount ?? flight.stops ?? null;
  const logoUrl =
    flight.legs?.[0]?.carriers?.[0]?.logoUrl ||
    flight.airlineLogo ||
    null;

  return (
    <div className="bg-card rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {logoUrl && (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
            <Image
              src={logoUrl}
              alt={airline}
              fill
              className="object-contain p-1"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-[#1A1A1A]">
            {airline}
          </span>
          {duration !== null && (
            <span className="text-sm text-gray-400">
              المدة: {Math.floor(duration / 60)}س {duration % 60}د
            </span>
          )}
          {stops !== null && (
            <span className="text-xs text-gray-400">
              {stops === 0 ? "رحلة مباشرة" : `${stops} توقف`}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-1">
        <span className="text-xl font-bold text-primary">
          {price}
        </span>
        <span className="text-xs text-gray-400">
          للشخص الواحد
        </span>
      </div>
    </div>
  );
});

FlightCard.displayName = "FlightCard";

const FlightBookForm = () => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [flightResults, setFlightResults] = useState<FlightOffer[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data: settings } = useGlobalSettings();

  const phoneNumber = useMemo(() => {
    const mainPhoneNumber =
      (settings?.data?.contactInfo?.phones?.[0]?.countryCode ?? "") +
      (settings?.data?.contactInfo?.phones?.[0]?.number ?? "");
    return mainPhoneNumber || "966";
  }, [settings]);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FlightPageFormValues>({
    defaultValues: {
      ticketType: "two-way",
      adults: 1,
      children: [],
      babies: 0,
      cabinClass: "ECONOMY",
      phone: "",
    },
  });

  const ticketType = useWatch({ control, name: "ticketType" });

  // Memoize return date field to prevent unnecessary re-renders
  const returnDateField = useMemo(() => (
    ticketType === "two-way" ? (
      <CustomDateInput<FlightPageFormValues>
        control={control}
        label="تاريخ العودة"
        name="returnDate"
        rules={{ required: "يرجى إدخال تاريخ العودة" }}
        errors={errors}
      />
    ) : (
      <div className="w-full h-full flex flex-col gap-2 opacity-50 cursor-not-allowed">
        <label className="text-sm md:text-2xl font-medium text-[#1A1A1A]">
          تاريخ العودة
        </label>
        <div className="border border-gray-300 bg-gray-50 rounded-xl h-[52px]"></div>
      </div>
    )
  ), [ticketType, control, errors]);

  // Memoize status UI components to prevent unnecessary re-renders
  const loadingState = useMemo(() => (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <span className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-primary text-lg font-medium">
        جاري البحث عن أفضل الرحلات...
      </p>
    </div>
  ), []);

  const errorState = useMemo(() => (
    <div className="flex flex-col items-center justify-center gap-3 py-12 bg-red-50 rounded-2xl border border-red-100">
      <p className="text-red-600 text-base font-medium text-center">
        {errorMsg}
      </p>
    </div>
  ), [errorMsg]);

  const emptyState = useMemo(() => (
    <div className="flex flex-col items-center justify-center gap-3 py-12 bg-gray-50 rounded-2xl border border-gray-100">
      <p className="text-gray-500 text-base font-medium text-center">
        لا توجد رحلات متاحة لهذا المسار في التاريخ المحدد.
      </p>
    </div>
  ), []);

  const onSubmit = async (data: FlightPageFormValues) => {
    const fmt = (d: Date | null | undefined) =>
      d ? d.toISOString().split("T")[0] : "";

    const allChildrenAges = [...data.children, ...Array(data.babies).fill(0)];

    const params = new URLSearchParams({
      fromId: data.departureCity || "",
      toId: data.arrivalCity || "",
      departDate: fmt(data.departureDate),
      adults: String(data.adults || 1),
      cabinClass: data.cabinClass || "ECONOMY",
      currency_code: "SAR",
    });

    if (data.ticketType === "two-way" && data.returnDate)
      params.set("returnDate", fmt(data.returnDate));
    if (allChildrenAges.length > 0)
      params.set("children_ages", allChildrenAges.join(","));

    setStatus("loading");
    setErrorMsg(null);

    try {
      const response = await getData<FlightsApiResponse>(
        `flights/search?${params.toString()}`,
      );

      if (response?.success) {
        // The API may return data.flightOffers or data directly as an array
        const offers = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.flightOffers)
            ? response.data.flightOffers
            : [];
        setFlightResults(offers);
        setStatus("success");
        setTimeout(() => {
          const el = document.getElementById("flight-results-section");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        setStatus("error");
        setErrorMsg("حدث خطأ أثناء البحث عن رحلات، حاول مرة أخرى!");
        toast.error("حدث خطأ أثناء البحث عن رحلات، حاول مرة أخرى!");
      }
    } catch {
      setStatus("error");
      setErrorMsg("حدث خطأ أثناء الاتصال بالخادم.");
      toast.error("حدث خطأ أثناء الاتصال بالخادم.");
    }
  };

  return (
    <section className="relative w-full mb-20 mt-8" dir="rtl">
      {/* Tabs placed uniquely outside overlapping the form */}
      <div className="flex items-center justify-start max-w-full pb-0 relative z-10">
        <button
          type="button"
          onClick={() => setValue("ticketType", "two-way")}
          className={`px-5 sm:px-8 py-3.5 rounded-tr-[16px] font-medium flex items-center gap-2 transition-all shadow-sm ${
            ticketType === "two-way"
              ? "bg-primary text-white"
              : "bg-[#E6E8ED] text-[#1A1A1A] hover:bg-gray-300 border-t border-x border-[#E6E8ED]"
          }`}
        >
          <div
            className={`p-1 border rounded-full ${
              ticketType === "two-way" ? "border-white" : "border-[#1A1A1A]"
            }`}
          >
            <ArrowLeftRight size={18} />
          </div>
          <span className="text-base sm:text-[28px]">مواسم</span>
        </button>
        <button
          type="button"
          onClick={() => setValue("ticketType", "one-way")}
          className={`px-5 sm:px-8 py-3.5 rounded-tl-[16px] font-medium flex items-center gap-2 transition-all shadow-sm ${
            ticketType === "one-way"
              ? "bg-primary text-white"
              : "bg-[#E6E8ED] text-[#1A1A1A] hover:bg-gray-300 border-t border-x border-[#E6E8ED]"
          }`}
        >
          <div
            className={`p-1 border rounded-full ${
              ticketType === "one-way" ? "border-white" : "border-[#1A1A1A]"
            }`}
          >
            <ArrowRight size={18} />
          </div>
          <span className="text-base sm:text-[28px]">ذهاب فقط</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full relative z-20">
        <div className="bg-card rounded-3xl rounded-tr-none px-4 py-6 sm:p-8 w-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/50 flex flex-col gap-6">
          {/* Row 1: Places */}
          <div className="flex flex-col md:flex-row items-end gap-3 md:gap-0 w-full relative">
            <div className="w-full md:w-1/2 md:pl-8">
              <AutocompleteInput<FlightPageFormValues>
                name="departureCity"
                label="المغادرة من"
                placeholder="محطة المغادرة"
                id="departure-city"
                icon={<LiaPlaneDepartureSolid size={20} />}
                errors={errors}
                control={control}
                rules={{ required: "يرجى اختيار مدينة المغادرة" }}
              />
            </div>

            {/* Swap Button Desktop */}
            <div className="hidden md:flex w-12 h-12 bg-card rounded-[8px] items-center justify-center z-10 cursor-pointer shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] hover:bg-gray-50 transition-all">
              <ArrowLeftRight size={22} className="text-primary" />
            </div>
            {/* Swap Button Mobile (Decorative) */}
            <div className="flex md:hidden w-10 h-10 bg-card rounded-[8px] items-center justify-center mx-auto cursor-pointer shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transform rotate-90 my-1">
              <ArrowLeftRight size={20} className="text-primary" />
            </div>

            <div className="w-full md:w-1/2 md:pr-8">
              <AutocompleteInput<FlightPageFormValues>
                name="arrivalCity"
                label="الوصول إلى"
                placeholder="محطة الوصول"
                id="arrival-city"
                icon={<LiaPlaneArrivalSolid size={20} />}
                errors={errors}
                control={control}
                rules={{ required: "يرجى اختيار مدينة الوصول" }}
              />
            </div>
          </div>

          {/* Row 2: Dates, Passengers & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-2 w-full items-start">
            <div className="w-full">
              <CustomDateInput<FlightPageFormValues>
                control={control}
                label="تاريخ المغادرة"
                name="departureDate"
                rules={{ required: "يرجى إدخال تاريخ المغادرة" }}
                errors={errors}
              />
            </div>

            <div className="w-full">
              {returnDateField}
            </div>

            <div className="w-full relative flex flex-col gap-2">
              <label className="text-sm md:text-2xl font-medium text-[#1A1A1A] flex items-center gap-2">
                <GoPeople size={20} />
                المسافرون
              </label>
              <PassengersSelectInput control={control as unknown as Control<FieldValues>} />
            </div>

            <div className="w-full flex items-end">
              <div className="w-full flex flex-col gap-2">
                <label className="text-xl font-semibold text-[#1A1A1A] flex items-center gap-2">
                  <Phone size={20} />
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="رقم الجوال"
                  dir="rtl"
                  className="w-full h-[52px] border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary bg-card transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-pointer w-full sm:w-[160px] lg:w-[180px] bg-primary text-white py-3 px-[32px] rounded-[50px] backdrop-blur-[20px] text-sm md:text-xl font-medium flex gap-2 items-center justify-center hover:bg-primary/90 shadow-md transition-all whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={25} />
              )}
              {status === "loading" ? "جاري البحث..." : "تأكيد الطلب"}
            </button>
            <button
              type="button"
              onClick={() => window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent("مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟")}`, "_blank")}
              className="cursor-pointer w-full sm:w-[160px] lg:w-[180px] bg-card border border-[#A4A5A6] text-primary py-3 px-[40px] rounded-[50px] backdrop-blur-[20px] text-sm md:text-xl font-medium flex gap-2 items-center justify-center hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap"
            >
              <Image
                src="/assets/Whatsapp.svg"
                alt="whatsapp"
                width={25}
                height={25}
              />
              تواصل واتساب
            </button>
          </div>
        </div>
      </form>

      {/* Flight Results Section */}
      {status !== "idle" && (
        <div id="flight-results-section" className="mt-12 w-full" dir="rtl">
          {status === "loading" && loadingState}

          {status === "error" && errorState}

          {status === "success" && flightResults.length === 0 && emptyState}

          {status === "success" && flightResults.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                نتائج البحث ({flightResults.length} رحلة)
              </h2>
              {flightResults.map((flight, idx) => (
                <FlightCard key={idx} flight={flight} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default FlightBookForm;
