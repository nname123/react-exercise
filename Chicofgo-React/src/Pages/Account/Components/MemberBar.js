import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  BsPerson,
  BsPencil,
  BsCreditCard2Back,
  BsGeoAlt,
} from 'react-icons/bs';
import { IconContext } from 'react-icons';

function MemberBar() {
  return (
    <Col
      sm={12}
      className="chicofgo_gray mt-4 px-0 py-2 d-flex justify-content-center"
    >
      <IconContext.Provider value={{ className: 'icon chicofgo_brown_font ' }}>
        <Link
          to="/member"
          className="px-md-2 m-md-2 mx-1 text-nowrap text-decoration-none  chicofgo_brown_font chicofgo-font-700"
        >
          <BsPerson />
          &ensp;我的帳號
        </Link>

        <Link
          to="/member/password"
          className="px-md-2 m-md-2 mx-1 text-nowrap text-decoration-none  chicofgo_brown_font chicofgo-font-700"
        >
          <BsPencil />
          &ensp;修改密碼
        </Link>
        <Link
          to="/member/creditcard"
          className="px-md-2 m-md-2 mx-1 text-nowrap 
            text-decoration-none  chicofgo_brown_font chicofgo-font-700"
        >
          <BsCreditCard2Back />
          &ensp;信用卡
        </Link>
        <Link
          to="/member/address"
          className="px-md-2 m-md-2 mx-1 text-nowrap text-decoration-none  chicofgo_brown_font chicofgo-font-700"
        >
          <BsGeoAlt />
          &ensp;配送資訊
        </Link>
      </IconContext.Provider>
    </Col>
  );
}

export default MemberBar;
