const InformationCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="h-full flex gap-8 overflow-hidden p-6 rounded-[24px] bg-card shadow-[0_2px_8px_-1px_rgba(0,0,0,0.17)] flex-col w-full min-h-55">
      <div className="flex flex-col items-start gap-6 h-full">
        <div className="flex items-center gap-[17px]">
          <div className="bg-[#F2F2F7] w-fit p-2 rounded-[16px]">{icon}</div>
          <h3 className="text-xl md:text-2xl font-semibold text-[#000619]">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-[#1E2024] font-medium text-lg md:text-xl leading-[29.25px]">
        {desc}
      </p>
    </div>
  );
};

export default InformationCard;
