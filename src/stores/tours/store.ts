import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface I_ToursStore {
  selectedPackage: {
    id: string;
    name: string;
    price: string | number;
  };
  setSelectedPackage: (
    id: string,
    name: string,
    price: string | number,
  ) => void;
}

export const useToursStore = create<I_ToursStore>()(
  devtools((set) => ({
    selectedPackage: {
      id: "",
      name: "",
      price: "",
    },
    setSelectedPackage: (id: string, name: string, price: string | number) =>
      set({ selectedPackage: { id, name, price } }),
  })),
);
