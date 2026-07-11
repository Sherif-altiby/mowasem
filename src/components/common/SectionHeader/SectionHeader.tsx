import AnimatedDiv from "@/components/common/AnimatedWrapper/AnimatedWrapper";

// Fixed circle icon — always rendered, no props needed
const CircleIcon = () => (
  <svg
    className="w-5 h-5 mx-auto"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
  </svg>
);

// Decorative divider with fixed circle center
const DecorativeDivider = () => (
  <div className="flex items-center justify-center gap-3 text-primary">
    <div className="relative flex items-center gap-1">
      <div className="h-px w-10 sm:w-16 bg-current opacity-20 rounded-full" />
      <div className="h-px w-4 sm:w-6 bg-current opacity-50 rounded-full" />
      <div className="h-1 w-1 rounded-full bg-current opacity-60" />
    </div>

    <CircleIcon />

    <div className="relative flex items-center gap-1">
      <div className="h-1 w-1 rounded-full bg-current opacity-60" />
      <div className="h-px w-4 sm:w-6 bg-current opacity-50 rounded-full" />
      <div className="h-px w-10 sm:w-16 bg-current opacity-20 rounded-full" />
    </div>
  </div>
);

const TAG_CLASSES = "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight";

const renderTitle = (titleTag: string, title: string) => {
  const props = { className: TAG_CLASSES };
  switch (titleTag) {
    case "h1": return <h1 {...props}>{title}</h1>;
    case "h3": return <h3 {...props}>{title}</h3>;
    case "h4": return <h4 {...props}>{title}</h4>;
    case "h5": return <h5 {...props}>{title}</h5>;
    case "h6": return <h6 {...props}>{title}</h6>;
    default:   return <h2 {...props}>{title}</h2>;
  }
};

const SectionHeader = ({
  title,
  titleTag = "h2",
  desc,
  color,
  className,
}: {
  title: string;
  titleTag?: string;
  desc?: string | React.ReactNode;
  color?: string;
  className?: string;
}) => {
  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "power2.out" }}
      className={`${color ? color : "text-foreground"} text-center px-1 sm:px-0 ${className ?? ""}`}
    >
      {/* Decorative divider with circle icon — always shown */}
      <div className="mb-4 w-fit mx-auto">
        <DecorativeDivider />
      </div>

      {/* Title */}
      {renderTitle(titleTag, title)}

      {/* Gradient underline — always shown */}
      <div className="flex justify-center mt-3 mb-5">
        <div
          className="h-[3px] w-14 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, currentColor 40%, currentColor 60%, transparent 100%)",
            opacity: 0.55,
          }}
        />
      </div>

      {/* Description */}
      {desc && typeof desc === "string" ? (
        <p className="text-base text-[#8f8485] sm:text-lg md:text-xl w-full sm:w-[85%] md:w-[80%] mx-auto font-medium">
          {desc}
        </p>
      ) : (
        desc
      )}
    </AnimatedDiv>
  );
};

export default SectionHeader;