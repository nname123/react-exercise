import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ThisCard from './ThisCard';

const MoreCard = (props) => {
  const { amount, product_id = [] } = props;
  // amount 必選 product_id 可不寫
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    adaptiveHeight: true,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          // centerMode: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const total = product_id.length || amount;
  const cards = [];
  for (let i = 0; i < total; i++) {
    let productIds = product_id[i] || i + 1;
    cards.push(
      <div key={i} className="py-3 px-md-1">
        <ThisCard product_id={productIds} />
      </div>
    );
  }

  return (
    <div className="container">
      <Slider {...settings}>{cards}</Slider>
    </div>
  );
};

export default MoreCard;
