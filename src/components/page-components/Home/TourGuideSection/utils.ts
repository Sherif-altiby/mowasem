// ─── Utils ─────────────────────────────────────────────────────────────────

export function optimizeCloudinaryUrl(
  url: string,
  width: number,
  height: number
): string {
  if (!url?.includes("res.cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/c_fill,w_${width},h_${height},q_auto:good,f_auto/`
  );
}
