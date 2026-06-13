import React, { useRef } from 'react';
import Hero from '../components/home/Hero';
import ProductCarousel from '../components/home/ProductCarousel';
import Collections from '../components/home/Collections';
import Approach from '../components/home/Approach';
import AestheticGrid from '../components/home/AestheticGrid';

export default function HomePage() {
  const carouselRef = useRef(null);

  return (
    <>
      <Hero />
      <ProductCarousel carouselRef={carouselRef} />
      <Collections />
      <Approach />
      <AestheticGrid />
    </>
  );
}
