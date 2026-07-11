export function extractImageUrl(image: { url: string; alt: string } | string) {
  if (image) {
    if (typeof image === "string") {
      return image;
    }
    return image.url;
  }
  return;
}

export function extractImageAlt(image: { url: string; alt: string } | string) {
  if (typeof image === "string") {
    return "";
  }
  return image.alt;
}
