import { LuSearchX } from "react-icons/lu";

const SearchNotFound = () => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-12 text-center min-h-87.5">
      <LuSearchX size={70} className="mb-8" />
      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
        لا توجد وجهات مطابقة!
      </h3>
      <p className="text-lg text-gray-500 max-w-sm mx-auto">
        عذراً، لم نتمكن من العثور على أي وجهة تطابق بحثك. يرجى تجربة كلمات بحث
        مختلفة.
      </p>
    </div>
  );
};

export default SearchNotFound;
