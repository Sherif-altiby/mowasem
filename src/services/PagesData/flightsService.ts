import { getData } from "../apiBase";
import { Airlines } from "@/types/Data/airlines";

export const getAirlines = () => getData<Airlines>(`/airLines`);