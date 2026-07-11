 import { getData } from "../apiBase";
import { City } from "@/types/Data/cities";
import { singleCity } from "@/types/Data/cityDetails";
 
 export const getCities = () => getData<City>(`/cities`);
 

 export const getCityBySlug = (slug: string) =>
   getData<singleCity>(`/cities/${slug}`);
 