"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageHandleComponentProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  placeholder?: string;
  unoptimized?: boolean;
  loading?: "eager" | "lazy";
  [key: string]: unknown;
}

const ImageHandleComponent = ({
  src,
  alt = "",
  width,
  height,
  className,
  sizes,
  fill = false,
  priority = false,
  placeholder = "/assets/placeholder.png",
  unoptimized = false,
  loading = "lazy",
  ...props
}: ImageHandleComponentProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src || placeholder);

  useEffect(() => {
    setImgSrc(src || placeholder);
  }, [src, placeholder]);

  return (
    <Image
  src={imgSrc}
  alt={alt}
  width={fill ? undefined : width}
  height={fill ? undefined : height}
  fill={fill}
  className={className}
  sizes={sizes}
  priority={priority}
  unoptimized={unoptimized}
  loading={priority ? undefined : loading}
  onError={() => {
    if (imgSrc !== placeholder) {
      setImgSrc(placeholder);
    }
  }}
  {...props}
/>
  );
};

export default ImageHandleComponent;
