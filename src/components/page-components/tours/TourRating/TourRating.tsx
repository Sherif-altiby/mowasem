import { Star, StarHalf } from "lucide-react";

interface Rating {
  average?: number;
  count?: number;
}

const TourRating = ({ rating }: { rating?: Rating }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-row gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const ratingValue = rating?.average || 0;
          if (ratingValue >= index + 1) {
            return (
              <Star
                key={index}
                className="w-3 h-3 md:w-6 md:h-6"
                fill="#FEBF4C"
                stroke="none"
              />
            );
          } else if (ratingValue > index) {
            return (
              <div
                key={index}
                className="relative w-3 h-3 md:w-6 md:h-6 rotate-y-180"
              >
                <Star
                  className="absolute inset-0 w-3 h-3 md:w-6 md:h-6"
                  fill="#D1D5DB"
                  stroke="none"
                />
                <StarHalf
                  className="absolute inset-0 w-3 h-3 md:w-6 md:h-6 text-[#FEBF4C]"
                  fill="#FEBF4C"
                  stroke="none"
                />
              </div>
            );
          } else {
            return (
              <Star
                key={index}
                className="w-3 h-3 md:w-6 md:h-6"
                fill="#D1D5DB"
                stroke="none"
              />
            );
          }
        })}
      </div>
      <span className="text-[10px] md:text-[24px] text-[#575859]">
        {rating?.average} نجوم ({rating?.count} تقييم)
      </span>
    </div>
  );
};

export default TourRating;
