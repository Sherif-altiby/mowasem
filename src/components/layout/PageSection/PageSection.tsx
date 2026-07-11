const PageSection = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) => {
  return (
    <section className={`container mx-auto pt-4 mb-6! ${className}`} {...props}>
      {children}
    </section>
  );
};

export default PageSection;
