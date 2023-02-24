import { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './BusinessSiderbar.module.scss';

function BusinessSiderbar() {
  return (
    <Col md={3} xs={12} className="chicofgo-font">
      <div className="text-center d-flex justify-content-center">
        <ul
          className={`list-unstyled w-75 d-flex flex-column ${style.BusinessUl}`}
        >
          <div className="bg-white">
            <li className="py-3 my-2 ">
              <Link
                to="/businessOrder"
                className={`${style.BusinessSiderbarLink}`}
              >
                訂單管理
              </Link>
            </li>
            <li className="py-3 my-2 ">
              <Link
                to="/BusinessProducts"
                className={`${style.BusinessSiderbarLink}`}
              >
                商品管理
              </Link>{' '}
            </li>
            <li className="py-3 my-2 ">
              <Link
                to="/BusinessProductsAdd"
                className={`${style.BusinessSiderbarLink}`}
              >
                新增商品
              </Link>
            </li>
            {/* <li className="py-3 my-2 ">
              <Link to="/" className={`${style.BusinessSiderbarLink}`}>
                賣場管理
              </Link>
            </li> */}
            {/* <li className="py-3 my-2 ">
              <Link
                to="/businessReview"
                className={`${style.BusinessSiderbarLink}`}
              >
                賣場評價
              </Link>
            </li> */}
            {/* <li className="py-3 my-2 ">
              <Link to="/businissCoupon" className={`${style.BusinessSiderbarLink}`}>
                優惠券
              </Link>
            </li> */}
          </div>
        </ul>
      </div>
    </Col>
  );
}

export default BusinessSiderbar;
