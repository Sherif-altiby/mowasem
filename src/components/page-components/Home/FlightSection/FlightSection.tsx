import Link from "next/link";
import React from "react";

export default function FlightSection({
  header,
  image,
  btnText,
}: {
  image: string;
  header: string;
  btnText: string;
}) {
  return (
    <>
      {image && header ? (
        <div
          className="bg-primary bg-no-repeat bg-center bg-cover h-[150px] md:h-[250px] lg:h-[300px] relative"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="relative z-10 container mx-auto flex flex-col h-full items-center justify-center gap-4 px-4 md:px-0">
            <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
              {header}{" "}
            </h1>
            <Link
              href="/flights"
              className="bg-card text-primary text-sm md:text-lg lg:text-xl py-2  px-4 rounded-full "
            >
              {btnText}{" "}
            </Link>
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        <div className="bg-gray-200 animate-pulse h-[150px] md:h-[250px] lg:h-[300px] relative">
          <div className="container mx-auto flex flex-col h-full items-center justify-center gap-4 px-4 md:px-0">
            <div className="h-8 md:h-10 lg:h-12 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
          </div>
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}
    </>
  );
}
