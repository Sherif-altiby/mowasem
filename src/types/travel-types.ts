export type CabinClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

export type T_formValues = {
  ticketType: "one-way" | "two-way";
  departureCity: string;
  arrivalCity: string;
  departureDate: Date | null;
  returnDate: Date | null;
  adults: number;
  children: number[];
  babies: number;
  cabinClass: CabinClass;
};
