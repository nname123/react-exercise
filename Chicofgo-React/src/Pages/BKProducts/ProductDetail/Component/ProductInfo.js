import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../Contexts/AuthContext';
import styles from './ProductInfo.module.scss';
import { FaShoppingCart, FaBookmark } from 'react-icons/fa';
import axios from 'axios';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Modal from '../../../ComponentShare/Modal';
import Btn from '../../../../Layout/Item/Btn/Btn';

const Productinfo = (props) => {
  const {
    title,
    content,
    price,
    productsCount,
    setProductsCount,
    type,
    place,
    product_package,
  } = props;
  const {
    info_contorl,
    spe_text,
    products_count,
    button_wrap,
    minus_style,
    input_style,
    plus_style,
    collect_cart,
    btn_collect,
    btn_cart,
    title_box,
    content_box,
    box,
    o_box,
    p_box,
  } = styles;

  const location = useLocation();
  const { userid } = useAuth();
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  //設置彈跳訊息
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userLike, setUserLike] = useState([]);
  const [checkLike, setCheckLike] = useState(false);
  const [btnContext, setBtnContext] = useState('未加入收藏');
  const [modalCase, setModalCase] = useState(false);

  useEffect(() => {
    if (productsCount < 1) {
      setProductsCount(1);
    }
  });

  //加入購物車
  async function sendCart() {
    const urlArray = location.pathname.split('/');
    const id = parseInt(urlArray[urlArray.length - 1]);
    console.log(id);
    try {
      let response = await axios.post(
        'http://localhost:3001/api/products/sendCart',
        {
          cartProductId: id,
          cartUserId: userid,
          cartPrice: price,
          cartQuantity: productsCount,
        }
      );
      if (response.data.result === 'ok') {
        setModalCase(true);
        setModalContent('成功加入購物車');
        setIsOpen(true);
      } else if (response.data.result === 'been added') {
        setModalCase(true);
        setModalContent('已加入過購物車囉，看看其他商品吧。');
        setIsOpen(true);
      } else {
        setModalCase(true);
        setModalContent('加入失敗');
        setIsOpen(true);
      }
      // .then((res) => {
      // });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className={`${info_contorl} d-flex flex-column`}>
        <div className={`${title_box}`}>
          <h3>{title}</h3>
        </div>
        <div className={`${content_box}`}>
          {/* <p className="mt-2">{content}</p> */}
          <pre>{content}</pre>
        </div>

        <h4 className="d-flex mt-2">
          價格:<div className="mx-3">{price}</div>
        </h4>
        <h4 className="mt-3 d-flex">
          <div className="d-flex align-items-center">類別:</div>
          <div className="mx-2">{type}</div>
          <div className={`${o_box} d-flex align-items-center`}>產地:</div>
          <div className="mx-2">{place}</div>
        </h4>
        <div className={`${p_box} d-flex align-items-center`}>
          <h4>包裝:</h4>
          <div className="mx-2">
            {product_package === null ? (
              <h4>其他</h4>
            ) : (
              <h4>{product_package}</h4>
            )}
          </div>
        </div>

        <div className="mt-5 d-flex">
          <div className={`${box}`}>
            <h4>總計:{price * productsCount} 元</h4>
            <div className={`${products_count} mt-3`}>
              <h4>數量</h4>
              <div className={`${button_wrap} d-flex align-items-center`}>
                <button
                  className={`${minus_style}`}
                  value={productsCount}
                  onClick={(e) => {
                    setProductsCount(productsCount - 1);
                  }}
                ></button>
                <input
                  type="text"
                  className={`${input_style}`}
                  value={productsCount}
                  onChange={(e) => {
                    setProductsCount(e.target.value);
                  }}
                />
                <button
                  className={`${plus_style}`}
                  value={productsCount}
                  onClick={(e) => {
                    setProductsCount(productsCount + 1);
                  }}
                ></button>
              </div>
            </div>
          </div>

          <button
            className={`${btn_cart} d-flex align-items-center justify-content-center`}
            onClick={() => {
              if (isLoggedIn) {
                sendCart();
              } else {
                setModalContent('請先登入');
                setIsOpen(true);
              }
            }}
          >
            <FaShoppingCart className="mx-2" />
            加入購物車
          </button>
        </div>
        <div
          className={`${collect_cart} d-flex align-items-center justify-content-between mt-3`}
        >
          {/* <button
            className={`${btn_collect} d-flex align-items-center justify-content-center`}
          >
            <FaBookmark className="mx-2" />
            加入收藏
          </button> */}
        </div>
      </div>
      {modalCase ? (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <h4 style={{ color: 'rgb(73, 67, 61)', padding: '24px 36px' }}>
            {modalContent}
          </h4>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: 'rgb(73, 67, 61)',

              padding: '24px 36px',
              textAlign: 'center',
            }}
          >
            <h4>{modalContent}</h4>
            <Btn
              style={{
                width: '75px',
                fontSize: '14px',
                marginTop: '12px',
              }}
              onClick={() => {
                navigate('/login');
              }}
            >
              確定
            </Btn>
          </Link>
        </Modal>
      )}
    </div>
  );
};

export default Productinfo;
