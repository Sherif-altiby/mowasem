"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createIcon = (L: any, isSelected: boolean) => {
  // Use a distinct bright color (e.g. red) for the selected pin so it stands out
  const color = isSelected ? "#ef4444" : "#3A2B80";

  return L.divIcon({
    html: `
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="
          width:44px;
          height:44px;
          border-radius:50%;
          background:${color};
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 6px 18px rgba(0,0,0,.25);
          transition:all .2s ease;
        ">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" 
            stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div style="
          width:0;
          height:0;
          border-left:8px solid transparent;
          border-right:8px solid transparent;
          border-top:10px solid ${color};
          margin-top:-1px;
        "></div>
      </div>
    `,
    className: "",
    iconSize: [44, 58],
    iconAnchor: [22, 58],
  });
};

export default function MapView({
  selectedBranch,
  onSelectBranch,
  branches,
}: {
  selectedBranch: Branch | null;
  onSelectBranch: (b: Branch) => void;
  branches: Branch[];
}) {
  const mapRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Record<string, any>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LRef = useRef<any>(null);

  // ===============================
  // INIT MAP
  // ===============================

  useEffect(() => {
    if (!mapRef.current) return;

    let mounted = true;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      if (!mounted || !mapRef.current) return;

      LRef.current = L;

      const map = L.map(mapRef.current, {
        center: [24.7136, 46.6753],
        zoom: 5,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap",
        }
      ).addTo(map);

      // ===============================
      // CREATE MARKERS
      // ===============================

      branches.forEach((branch) => {
        const lat = Number(branch.lat);
        const lng = Number(branch.lng);

        // ✅ حماية كاملة
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          console.warn("Invalid branch coords:", branch);
          return;
        }

        const marker = L.marker([lat, lng], {
          icon: createIcon(L, false),
        });

        marker.addTo(map);

        marker.on("click", () => {
          onSelectBranch(branch);
        });

        markersRef.current[branch.id] = marker;
      });

      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    };

    initMap();

    return () => {
      mounted = false;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      markersRef.current = {};
    };
  }, [onSelectBranch, branches]);

  // ===============================
  // HANDLE SELECTED BRANCH
  // ===============================

  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = LRef.current;

    if (!map || !L) return;

    // Reset all markers
    branches.forEach((branch) => {
      const marker = markersRef.current[branch.id];

      if (!marker) return;

      marker.setIcon(createIcon(L, false));
    });

    if (!selectedBranch) return;

    const lat = Number(selectedBranch.lat);
    const lng = Number(selectedBranch.lng);

    // ✅ حماية نهائية
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      console.warn("Selected branch has invalid coords:", selectedBranch);
      return;
    }

    const selectedMarker = markersRef.current[selectedBranch.id];

    if (selectedMarker) {
      selectedMarker.setIcon(createIcon(L, true));
    }

    map.flyTo([lat, lng], 12, {
      duration: 1.2,
    });
  }, [selectedBranch, branches]);

  return <div ref={mapRef} className="w-full h-full z-0" />;
}
