import { Offers } from "@/types/Data/offers";
import { getData } from "../apiBase";

export const getOffers = () => getData<Offers>(`/offers`);