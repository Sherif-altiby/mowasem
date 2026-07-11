import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import SectionButton from "../shared/SectionButton";
import BlogSwiper from "./BlogSwiper";

export default function BlogSection({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) {
  const blogs = data?.data?.data || [];

  return (
    <div className="  container  !pe-0 md:pe-auto">
      <SectionHeader title={title} desc={subtitle}  className="!pe-[25px] md:pe-auto"/>
      <BlogSwiper blogs={blogs} />
      {/* show more button */}
      <SectionButton href="/blogs" label="عرض جميع المقالات" />
    </div>
  );
}
