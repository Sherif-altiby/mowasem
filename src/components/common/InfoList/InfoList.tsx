import React from "react";
import { BsAwardFill } from "react-icons/bs";
import { FaqDaum } from "@/types/Seo/FAQ";
import PageSection from "@/components/layout/PageSection/PageSection";

export default function InfoList({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: FaqDaum[];
}) {
  return (
    <PageSection>
      <div className="secondary-page-layout">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {title}
          </h1>
          <p className="text-lg text-center">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-4">
          {data.map((term, i) => (
            <div key={i} className="flex flex-col gap-4">
              <h1 className="text-lg lg:text-2xl text-primary font-bold flex items-center gap-2">
                <BsAwardFill className="w-5 h-5" />
                {term.title}
              </h1>
              <div className="text-sm text-gray-600 flex flex-col gap-4 p-4 rounded-xl bg-card border border-gray-100">
                {term.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
