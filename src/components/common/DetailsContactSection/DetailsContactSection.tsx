import { FaWhatsapp } from "react-icons/fa6";
import { PiSnapchatLogoBold } from "react-icons/pi";
import { getGlobalSettings } from "@/services/PagesData/settingsService";
import { FiFacebook, FiInstagram, FiMail, FiPhone } from "react-icons/fi";

export default async function DetailsContactSection() {
  const settings = await getGlobalSettings().catch(() => null);
  const mainPhoneNumber =
    (settings?.data?.contactInfo?.phones?.[0]?.countryCode ?? "") +
    (settings?.data?.contactInfo?.phones?.[0]?.number ?? "");
  const mainEmail = settings?.data?.contactInfo?.emails?.[0]?.email ?? "";
  return (
    <div className="xl:col-span-1 h-fit bg-gradient-to-b from-secondary to-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">
        التواصل
      </h3>

      <div className="flex flex-col gap-3 sm:gap-4">
        {/* الهاتف */}
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-card rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow">
          <div className="bg-secondary p-2 rounded-full flex-shrink-0">
            <FiPhone className="text-primary text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-500">
              تواصل معنا عبر الواتساب
            </p>
            <p
              dir="ltr"
              className="font-semibold text-end text-primary text-xs sm:text-sm break-all"
            >
              {mainPhoneNumber}
            </p>
          </div>
        </div>

        {/* البريد الإلكتروني */}
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-card rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow">
          <div className="bg-secondary p-2 rounded-full flex-shrink-0">
            <FiMail className="text-primary text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-500">
              البريد الإلكتروني
            </p>
            <p className="font-semibold text-primary text-xs sm:text-sm break-all">
              {mainEmail}
            </p>
          </div>
        </div>

        {/* وسائل التواصل الاجتماعي */}
        <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            وسائل التواصل الاجتماعي
          </p>
          <div className="flex gap-2 sm:gap-3 justify-center">
            <a
              href={settings?.data?.socialMedia?.whatsApp?.url ?? "#"}
              className="bg-secondary p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <FiInstagram className="text-primary text-base sm:text-lg" />
            </a>
            <a
              href={settings?.data?.socialMedia?.facebook?.url ?? "#"}
              className="bg-secondary p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <FiFacebook className="text-primary text-base sm:text-lg" />
            </a>
            <a
              href={settings?.data?.socialMedia?.snapchat?.url ?? "#"}
              className="bg-secondary p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <PiSnapchatLogoBold className="text-primary text-base sm:text-lg" />
            </a>
          </div>
        </div>

        {/* زر التواصل */}
        <a
          href={`https://wa.me/${mainPhoneNumber}?text=${encodeURIComponent(
            "مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full gap-3 bg-green-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          تواصل عبر واتساب
          <FaWhatsapp className="w-6 h-6 text-white" />
        </a>
      </div>
    </div>
  );
}
