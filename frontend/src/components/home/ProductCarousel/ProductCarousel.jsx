import React from 'react';
import { Link } from 'react-router-dom';

import item1 from '@/assets/extracted/image7_2_63.jpg';
import item2 from '@/assets/extracted/image6_2_63.jpg';
import item3 from '@/assets/extracted/image8_2_63.jpg';
import item4 from '@/assets/extracted/image9_2_63.jpg';
import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';

import './ProductCarousel.css';

const PRODUCTS = [
  {
    id: 4,
    image: item1,
    name: 'EMBROIDERED SEERSUCKER SHIRT',
    price: '$ 99',
    category: 'NEW IN / SHIRTS'
  },
  {
    id: 5,
    image: item2,
    name: 'CASUAL OVERSIZED LINEN BLAZER',
    price: '$ 149',
    category: 'NEW IN / JACKETS'
  },
  {
    id: 6,
    image: item3,
    name: 'RELAXED COTTON DRAWSTRING TROUSERS',
    price: '$ 89',
    category: 'NEW IN / PANTS'
  },
  {
    id: 7,
    image: item4,
    name: 'CLASSIC LEATHER STRAP SANDALS',
    price: '$ 120',
    category: 'NEW IN / ACCESSORIES'
  },
  {
    id: 8,
    image: item1,
    name: 'TEXTURED CAMP COLLAR SHIRT',
    price: '$ 79',
    category: 'NEW IN / SHIRTS'
  },
  {
    id: 9,
    image: item2,
    name: 'RELAXED LINEN TROUSERS',
    price: '$ 110',
    category: 'NEW IN / PANTS'
  }
];

export default function ProductCarousel({ carouselRef }) {
  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -330, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 330, behavior: 'smooth' });
    }
  };

  return (
    <section className="carousel-section" id="new">
      <div className="carousel-header">
        <h2 className="section-title">
          NEW THIS WEEK <span>(50)</span>
        </h2>
        <div className="carousel-nav">
          <button className="carousel-nav-btn btn-left" onClick={handleScrollLeft} aria-label="Scroll carousel left">
            <img src={arrowLeft} alt="" />
          </button>
          <button className="carousel-nav-btn btn-right" onClick={handleScrollRight} aria-label="Scroll carousel right">
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>

      <div className="carousel-container" ref={carouselRef}>
        {PRODUCTS.map((prod) => (
          <Link to={`/collections/${prod.id}`} className="product-card-link" key={prod.id}>
            <div className="product-card">
              <div className="product-img-container">
                <img src={prod.image} alt={prod.name} className="product-img" />
              </div>
              <div className="product-info">
                <div className="product-meta">
                  <span className="product-category">{prod.category}</span>
                  <span className="product-price">{prod.price}</span>
                </div>
                <h3 className="product-name">{prod.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

