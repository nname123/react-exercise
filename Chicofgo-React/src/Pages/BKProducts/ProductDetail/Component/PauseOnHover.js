import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, Link } from 'react-router-dom';

import Card1 from '../../Component/Card1';
import Card2 from '../../Component/Card2';
import Card3 from '../../Component/Card3';
import Card4 from '../../Component/Card4';
import Card5 from '../../Component/Card5';
import Card6 from '../../Component/Card6';
import Card7 from '../../Component/Card7';
import './PauseOnHover.scss';

export default class PauseOnHover extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    };

    return (
      <div className="container">
        <div className="t_color">
          <h2>推薦商品</h2>
          <Slider {...settings}>
            <div>
              <Link
                to="/product_detail/7"
                style={{ textDecoration: 'none', color: 'rgb(161, 113, 98)' }}
              >
                <Card1 />
              </Link>
            </div>
            <div>
              <Link
                to="/product_detail/14"
                style={{ textDecoration: 'none', color: 'rgb(161, 113, 98)' }}
              >
                <Card2 />
              </Link>
            </div>
            <div>
              <Link
                to="/product_detail/9"
                style={{ textDecoration: 'none', color: 'rgb(161, 113, 98)' }}
              >
                <Card3 />
              </Link>
            </div>
            <div>
              <Link
                to="/product_detail/24"
                style={{ textDecoration: 'none', color: 'rgb(161, 113, 98)' }}
              >
                <Card4 />
              </Link>
            </div>
            <div>
              <Link
                to="/product_detail/104"
                style={{ textDecoration: 'none', color: 'rgb(161, 113, 98)' }}
              >
                <Card5 />
              </Link>
            </div>
            <div>
              <Link
                to="/product_detail/78"
                style={{ textDecoration: 'none', color: 'rgb(161, 113, 98)' }}
              >
                <Card6 />
              </Link>
            </div>
            <div>
              <Link
                to="/product_detail/13"
                style={{ textDecoration: 'none', color: 'rgb(161, 113, 98)' }}
              >
                <Card7 />
              </Link>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
