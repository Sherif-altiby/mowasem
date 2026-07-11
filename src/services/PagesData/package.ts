import { Package } from "@/types/Data/ss";
import { getData } from "../apiBase";

export const getPackages = () => getData<Package>(`/packages`);
