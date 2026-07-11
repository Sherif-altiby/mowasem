// components/page-components/tour-guide/CountryPlaces.tsx
import CountryCities from "./components/CountryCities";
import CountryActivities from "./components/CountryActivities";
import CountryHotels from "./components/CountryHotels";
import CountryRestaurants from "./components/CountryRestaurants";

const CountryPlaces = ({ guides }: { guides: Record<string, unknown> }) => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CountryCities cities={guides.cities as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CountryActivities activities={guides.thingsToDo as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CountryHotels hotels={guides.hotels as any} country={(guides.country as any)?.name} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CountryRestaurants restaurants={guides.restaurants as any} />
    </div>
  );
};

export default CountryPlaces;