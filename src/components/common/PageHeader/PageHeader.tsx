import React from "react";

export default function PageHeader({
  header,
  description,
}: {
  header: string;
  description: string;
}) {
  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold text-primary">{header}</h2>
      <p className="text-lg text-center">{description}</p>
    </section>
  );
}
