import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import SectionButton from "../shared/SectionButton";
import ReviewSwiper from "./ReviewSwiper";

export default function ReviewSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="main-page-section container">
      <SectionHeader title={title} desc={subtitle} />

      {/* Swiper wrapper needs to be relative so arrow buttons are positioned correctly */}
      <div className="relative my-4 md:my-8">
        <ReviewSwiper />
      </div>

      <SectionButton href="/reviews" label="عرض جميع التقييمات" />
    </div>
  );
}
