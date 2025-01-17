import React, { useState, useEffect, useRef } from 'react';
import '@/app/globals.css'; // Add your CSS here
import Image from "next/image";


interface CarouselProps {
  items: string[]; // List of items (e.g., image URLs or text)
  speed?: number; // Scrolling speed in milliseconds
}


const InfiniteCarousel: React.FC<CarouselProps> = ({ items, speed = 50 }) => {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      const scroll = () => {
        if (!isPaused && container) {
          container.scrollLeft += 1; // Increment scroll position
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0; // Reset to the start
          }
        }
      };
  
      const interval = setInterval(scroll, speed);
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, [isPaused, speed]);
  
    // Duplicate the items for infinite scrolling effect
    const duplicatedItems = [...items, ...items];
  
    return (
      <div
        className="carousel-container"
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)} // Pause scrolling on hover
        onMouseLeave={() => setIsPaused(false)} // Resume scrolling on mouse leave
      >
        <div className="carousel-content">
          {duplicatedItems.map((item, index) => (
            <div className="carousel-item" key={index}>
                <Image
                    src={item}
                    width={500}
                    height={500}
                    alt=''
                ></Image>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default InfiniteCarousel;
  