"use client";
import styles from "./slideshow.module.css";
import { SlideshowProps } from "@/lib/interfaces"



export default function Slideshow({ images, duration = 54 }: SlideshowProps) {
  const imageCount = images.length;
  const slideDuration = duration / imageCount;

  return (
    <div className={styles.backgroundSlideshow}>
      {images.map((img, index) => (
        <div
          key={index}
          className={styles.slide}
          style={{
            backgroundImage: `url(${img})`,
            animationDelay: `${index * slideDuration}s`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}
    </div>
  );
}


