"use client";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AnimatedDiv from "@/components/common/AnimatedWrapper/AnimatedWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BlogCard from "@/components/ui/BlogCard/BlogCard";

const navBtnBase = `
  hidden md:flex items-center justify-center
  absolute top-1/2 -translate-y-1/2 z-20
  w-11 h-11 rounded-full
  bg-primary border border-transparent text-white
  transition-all cursor-pointer
  [&.swiper-button-disabled]:bg-transparent
  [&.swiper-button-disabled]:border-[#676768]
  [&.swiper-button-disabled]:text-[#676768]
  [&.swiper-button-disabled]:cursor-not-allowed
`;

interface RelatedBlogItem {
  _id: string;
  title: string;
  slug: string;
  imageCover?: string;
  timeToRead?: string | number;
  createdAt?: string;
  publishedAt?: string;
  alt?: string;
}

const BlogSwiperClient = ({ data }: { data: RelatedBlogItem[] }) => {
  return (
    // relative container — buttons position against this
    <div className="relative w-full">
      {/* overflow-hidden ONLY around the swiper track, never around the buttons */}
      <div className="overflow-hidden md:mx-12">
        <AnimatedDiv
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            y: { type: "spring", stiffness: 300, damping: 20 },
            scale: { type: "spring", stiffness: 300, damping: 20 },
          }}
          viewport={{ once: true, margin: "-60px", amount: 0.3 }}
          className="py-2 px-2"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            className="py-4!"
            navigation={{
              nextEl: ".custom-related-next",
              prevEl: ".custom-related-prev",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.15,
                spaceBetween: 14,
                pagination: { enabled: true },
                navigation: { enabled: false },
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                pagination: { enabled: false },
                navigation: { enabled: true },
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
                pagination: { enabled: false },
                navigation: { enabled: true },
              },
            }}
          >
            {data.map((c) => (
              <SwiperSlide key={c._id} className="h-auto!">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(0,0,0,0.14)] border border-[#D9D9D9]">
                  <BlogCard
                    image={c?.imageCover || "/assets/placeholder.png"}
                    imageAlt={c.alt || c.title}
                    date={c.createdAt || c.publishedAt || ""}
                    readTime={c.timeToRead || 0}
                    title={c.title}
                    onReadMore={() => {}}
                    href={`/blogs/${c.slug}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedDiv>
      </div>

      {/* Buttons are direct children of the relative wrapper — never inside overflow-hidden */}
      <button
        aria-label="الشريحة التالية"
        className={`custom-related-next ${navBtnBase} right-0`}
      >
        <IoIosArrowForward size={22} />
      </button>
      <button
        aria-label="الشريحة السابقة"
        className={`custom-related-prev ${navBtnBase} left-0`}
      >
        <IoIosArrowBack size={22} />
      </button>
    </div>
  );
};

export default BlogSwiperClient;
