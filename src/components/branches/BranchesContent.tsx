"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Clock,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  CheckCircle2,
  Map,
  List,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface Branch {
  id: string;
  name: string;
  address: string;
  hours: string;
  isOpen: boolean;
  image: string;
  country: string;
  lat: number;
  lng: number;
}

interface ApiBranch {
  id: string;
  _id: string;
  name: string;
  address: string;
  country: string;
  openTime: string;
  closeTime: string;
  timezone: string;
  isOpen: boolean;
  image: {
    url: string;
    publicId: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const mapApiBranchToBranch = (apiBranch: ApiBranch): Branch => {
  // Format hours from openTime and closeTime
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "م" : "ص";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  return {
    id: apiBranch.id,
    name: apiBranch.name,
    address: apiBranch.address,
    country: apiBranch.country,
    isOpen: apiBranch.isOpen,
    image: apiBranch.image.url,
    lat: apiBranch.location.lat,
    lng: apiBranch.location.lng,
    hours: `${formatTime(apiBranch.openTime)} - ${formatTime(apiBranch.closeTime)}`,
  };
};

export const branches: Branch[] = [
  {
    id: "1",
    name: "فرع الرياض",
    address: "حي المرسلات - طريق ابو بكر الصديق",
    hours: "9:00 ص - 11:00 م",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&h=80&fit=crop",
    country: "المملكة العربية السعودية",
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    id: "2",
    name: "فرع جدة",
    address: "حي الشرفية - طريق المدينة طالع",
    hours: "9:00 ص - 11:00 م",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=80&fit=crop",
    country: "المملكة العربية السعودية",
    lat: 21.4858,
    lng: 39.1925,
  },
  {
    id: "3",
    name: "فرع دبي - الأول",
    address: "حي الشرفية - طريق المدينة طالع",
    hours: "9:00 ص - 11:00 م",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&h=80&fit=crop",
    country: "الإمارات العربية المتحدة",
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: "4",
    name: "فرع دبي - الثاني",
    address: "حي الشرفية - طريق المدينة طالع",
    hours: "9:00 ص - 11:00 م",
    isOpen: false,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&h=80&fit=crop",
    country: "الإمارات العربية المتحدة",
    lat: 25.1972,
    lng: 55.2796,
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

const groupByCountry = (list: Branch[]) =>
  list.reduce<Record<string, Branch[]>>((acc, b) => {
    acc[b.country] = acc[b.country] ? [...acc[b.country], b] : [b];
    return acc;
  }, {});

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (v: number) => (v * Math.PI) / 180;

  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// ─────────────────────────────────────────────────────────────
// CARD
// ─────────────────────────────────────────────────────────────

function BranchCard({
  branch,
  isSelected,
  onClick,
}: {
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      dir="rtl"
      className={`w-full text-right flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 cursor-pointer group
        ${isSelected
          ? "bg-indigo-50 border border-indigo-200 shadow-sm"
          : "hover:bg-gray-50 border border-transparent"
        }`}
    >
      <div className="relative w-20 h-14 shrink-0 rounded-xl overflow-hidden">
        <Image
          src={branch.image}
          alt={branch.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${branch.isOpen
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-600"
              }`}
          >
            {branch.isOpen ? "مفتوح" : "مغلق"}
          </span>

          <h4
            className={`font-bold text-sm truncate transition-colors
              ${isSelected
                ? "text-indigo-700"
                : "text-gray-800 group-hover:text-indigo-600"
              }`}
          >
            {branch.name}
          </h4>
        </div>

        <p className="text-xs text-gray-500 truncate mb-1">
          {branch.address}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={11} />
          <span dir="ltr">{branch.hours}</span>
        </div>
      </div>

      <ChevronLeft
        size={16}
        className={`shrink-0 transition-all duration-200
          ${isSelected
            ? "text-indigo-500 -translate-x-0.5"
            : "text-gray-300 group-hover:text-gray-400"
          }`}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

type MobileView = "list" | "map";

interface BranchesContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  branchesData?: any;
}

export default function BranchesContent({ branchesData }: BranchesContentProps) {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const [mobileView, setMobileView] =
    useState<MobileView>("list");

  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  const [sortNearest, setSortNearest] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn(err);
      }
    );
  }, []);

  // ─────────────────────────────────────────────────────────

  // Map API data to Branch format if available, otherwise use hardcoded branches
  const branchesList = useMemo(() => {
    return branchesData?.data
      ? branchesData.data.map((apiBranch: ApiBranch) => mapApiBranchToBranch(apiBranch))
      : branches;
  }, [branchesData]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = branchesList.filter(
      (b: Branch) =>
        b.name.includes(q) ||
        b.address.includes(q) ||
        b.country.includes(q)
    );

    // المفتوحة فقط
    if (showOnlyOpen) {
      result = result.filter((b: Branch) => b.isOpen);
    }

    // الأقرب
    if (sortNearest && userLocation) {
      result = [...result].sort((a: Branch, b: Branch) => {
        const d1 = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          a.lat,
          a.lng
        );

        const d2 = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          b.lat,
          b.lng
        );

        return d1 - d2;
      });
    }

    return result;
  }, [search, showOnlyOpen, sortNearest, userLocation, branchesList]);

  const grouped = useMemo(
    () => groupByCountry(filtered),
    [filtered]
  );

  // ─────────────────────────────────────────────────────────

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch((prev) =>
      prev?.id === branch.id ? null : branch
    );

    setMobileView("map");
  };

  // ─────────────────────────────────────────────────────────
  // SIDEBAR
  // ─────────────────────────────────────────────────────────

  const sidebarContent = (
    <>
      {/* SEARCH */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن مدينة أو فرع.."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
            />
          </div>

          {/* FILTER BTN */}
          <div className="relative group shrink-0">
            <button
              className={`
                w-10 h-10 flex items-center justify-center rounded-xl
                border transition-all cursor-pointer
                ${showOnlyOpen || sortNearest
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600"
                }
              `}
            >
              <SlidersHorizontal size={16} />
            </button>

            {/* DROPDOWN */}
            <div
              className="
                absolute top-12 right-0 z-50
                w-52 rounded-2xl border border-gray-200
                bg-card shadow-xl p-2
                opacity-0 invisible
                group-hover:opacity-100
                group-hover:visible
                transition-all
              "
            >
              <button
                onClick={() =>
                  setShowOnlyOpen((p) => !p)
                }
                className={`
                  w-full text-right mb-2 px-3 py-2 rounded-xl text-sm transition
                  ${showOnlyOpen
                    ? "bg-indigo-50 text-indigo-700"
                    : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                عرض الفروع المفتوحة فقط
              </button>

              <button
                onClick={() =>
                  setSortNearest((p) => !p)
                }
                className={`
                  w-full text-right px-3 py-2 rounded-xl text-sm transition
                  ${sortNearest
                    ? "bg-indigo-50 text-indigo-700"
                    : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                ترتيب حسب الأقرب
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {Object.entries(grouped).length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            لا توجد نتائج مطابقة
          </div>
        ) : (
          Object.entries(grouped).map(
            ([country, countryBranches]) => (
              <div key={country}>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <h3 className="text-sm font-bold text-gray-700">
                    {country}
                  </h3>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                    {countryBranches.length}
                  </span>
                </div>

                <div className="space-y-1">
                  {countryBranches.map((branch) => (
                    <BranchCard
                      key={branch.id}
                      branch={branch}
                      isSelected={
                        selectedBranch?.id === branch.id
                      }
                      onClick={() =>
                        handleSelectBranch(branch)
                      }
                    />
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* FOOTER */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2">
        <CheckCircle2
          size={14}
          className="text-emerald-500"
        />

        <span className="text-xs text-gray-500">
          {filtered.length} فرع متاح
        </span>
      </div>
    </>
  );

  // ─────────────────────────────────────────────────────────
  // MAP
  // ─────────────────────────────────────────────────────────

  const mapContent = (
    <div className="relative w-full h-full">
      <MapView
        selectedBranch={selectedBranch}
        onSelectBranch={(b) =>
          setSelectedBranch((prev) =>
            prev?.id === b.id ? null : b
          )
        }
        branches={branchesList}
      />

      {selectedBranch && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xs sm:max-w-sm md:w-80 bg-card rounded-2xl shadow-2xl border border-gray-100 p-4 z-20">
          <div className="flex gap-3" dir="rtl">
            <Image
              src={selectedBranch.image}
              alt={selectedBranch.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-gray-800 text-sm">
                  {selectedBranch.name}
                </h4>

                <span className={`${selectedBranch.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} text-xs px-2 py-0.5 rounded-full font-medium`}>
                  {selectedBranch.isOpen
                    ? "مفتوح"
                    : "مغلق"}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                {selectedBranch.address}
              </p>

              <div className="flex items-center gap-1 text-xs text-indigo-600">
                <Clock size={11} />
                <span dir="ltr">
                  {selectedBranch.hours}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedBranch(null)}
            className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 text-xs transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────

  return (
    <>
      {/* MOBILE */}
      <div className="flex flex-col h-full w-full overflow-hidden bg-card md:hidden">
        <div className="flex border-b border-gray-100 bg-card shrink-0">
          <button
            onClick={() => setMobileView("list")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors
            ${mobileView === "list"
                ? "text-indigo-600 border-b-2 border-indigo-500"
                : "text-gray-500"
              }`}
          >
            <List size={16} />
            الفروع
          </button>

          <button
            onClick={() => setMobileView("map")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors
            ${mobileView === "map"
                ? "text-indigo-600 border-b-2 border-indigo-500"
                : "text-gray-500"
              }`}
          >
            <Map size={16} />
            الخريطة
          </button>
        </div>

        <div
          className={`flex flex-col flex-1 overflow-hidden ${mobileView === "list" ? "flex" : "hidden"
            }`}
        >
          {sidebarContent}
        </div>

        <div
          className={`flex-1 relative ${mobileView === "map" ? "flex" : "hidden"
            }`}
        >
          {mapContent}
        </div>
      </div>

      {/* TABLET */}
      <div className="hidden md:flex lg:hidden flex-col h-full w-full overflow-hidden bg-card">
        <aside
          className="flex flex-col border-b border-gray-100 shadow-sm bg-card"
          style={{ height: "45%" }}
        >
          {sidebarContent}
        </aside>

        <main className="flex-1 relative">
          {mapContent}
        </main>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex h-full w-full overflow-hidden bg-card">
        <aside className="w-[400px] shrink-0 flex flex-col border-l border-gray-100 shadow-xl z-10 bg-card">
          {sidebarContent}
        </aside>

        <main className="flex-1 relative">
          {mapContent}
        </main>
      </div>
    </>
  );
}
