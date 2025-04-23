'use client';
import { SlideshowProps } from '@/lib/interfaces';
import styles from './slideshow.module.css';
import { useEffect, useMemo, useState } from 'react';


export default function Slideshow({ images, duration = 54 }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = useMemo(() => images.length, [images]);
  const slideDuration = useMemo(() => duration / imageCount, [duration, imageCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, slideDuration * 1000);
    return () => clearInterval(interval);
  }, [slideDuration, imageCount]);

  return (
    <div className={styles.backgroundSlideshow}>
      {images.map((img, i) => (
        <div
          key={i}
          className={styles.slide}
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === currentIndex ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        />
      ))}
    </div>
  );
}

