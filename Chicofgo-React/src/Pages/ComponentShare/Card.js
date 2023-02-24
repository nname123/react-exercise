import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import styles from './Card.module.scss';
// import testpic from '../../Img/ProductsTest/test.jpg';
import { v4 } from 'uuid';
import { FaShoppingCart, FaBookmark } from 'react-icons/fa';
import { useAuth } from '../../Contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Btn from '../../Layout/Item/Btn/Btn';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const { title, rating, price, id } = props;

  const {
    card_contorl,
    card_body,
    p_img_c,
    content,
    text_contorl,
    evaluate,
    keepshop,
    price_contorl,
    mark_contorl,
    cart_contorl,
    list_sendCart,
  } = styles;

  const { isLoggedIn } = useAuth();
  const { userid } = useAuth();

  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalCase, setModalCase] = useState(false);

  async function sendCart() {
    try {
      let response = await axios.post(
        'http://localhost:3001/api/products/sendCart',
        {
          cartProductId: id,
          cartUserId: userid,
          cartPrice: price,
          cartQuantity: 1,
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

  const numberRating = useMemo(() => {
    return Number.isNaN(parseInt(rating)) ? 1 : parseInt(rating);
  }, [rating]);

  return (
    <div className={`${card_contorl}`}>
      <div className={`${card_body} card`}>
        <div className={`${p_img_c} `}>
          <img
            src={`http://localhost:3001/api/images/productImg/coffee_${id}/coffee_${id}-1.png`}
            className="card-img-top"
            alt=""
          />
        </div>
        <div
          className={`${content} d-flex flex-column align-items-center mt-2`}
        >
          <div className={`${text_contorl}`}>
            {/* <p>【Maxim】KANU迷你美式咖啡(0.9gx100入/盒;附限定專屬贈品)</p> */}
            <p>{title}</p>
          </div>
          <div className={`${evaluate} d-flex justify-content-center mt-2`}>
            {new Array(numberRating).fill().map((star) => {
              return <p key={v4()}>⭐</p>;
            })}
          </div>
        </div>
        <div
          className={`${keepshop} card-img-bottom d-flex align-items-center `}
        >
          <div className={`${price_contorl} `}>${price}</div>
          {/* <div className={`${mark_contorl} `}>
            <FaBookmark />
          </div> */}
          <div
            className={`${cart_contorl} `}
            onClick={(e) => {
              e.stopPropagation(sendCart);
              if (isLoggedIn) {
                sendCart();
              } else {
                setModalContent('請先登入');
                setIsOpen(true);
              }
              console.log(123, id);
            }}
          >
            <FaShoppingCart />
          </div>
        </div>
      </div>
      {/* <div
        className={`${list_sendCart}`}
        onClick={(e) => {
          e.preventDefault();
          console.log(123);
        }}
      ></div> */}

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

export default Card;
