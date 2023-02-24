import React, { useEffect, useState, useMemo, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cardDetail } from '../../../Config/ProductConfig';
import Path from '../../../Layout/Item/Path/Path';
import styles from './ProductDetail.module.scss';
// import axios from 'axios';
import { BsFillReplyFill } from 'react-icons/bs';
import mainPic from '../../../Img/ProductsTest/test.jpg';
import PicRender from './Component/PicRender';
import ProductInfo from './Component/ProductInfo';
import Specification from './Component/Specification';
import OrtherWrap from './Component/OrtherSwiper';
import EvaluateArea from './Component/EvaluateArea';
import MessageArea from './Component/MessageArea';
import axios from 'axios';
import { useProduct } from '../../../Contexts/ProductProvider';
import { useMessage } from '../../../Contexts/MessageProvider';
import { useAuth } from '../../../Contexts/AuthContext';

const ProductDetail = () => {
  const { products, getProducts } = useProduct();
  const { message, getMessage } = useMessage();
  const { userid } = useAuth();

  useEffect(() => {
    // ---------------2/12新增 存入看過的產品---------------

    const existingData =
      JSON.parse(localStorage.getItem('productsViewed')) || [];
    const currentUserId = userid; // replace with actual user id

    const currentUserDataIndex = existingData.findIndex(
      (item) => item.userId === currentUserId
    );

    if (currentUserDataIndex === -1) {
      localStorage.removeItem('productsViewed');
      if (detail.id) {
        localStorage.setItem(
          'productsViewed',
          JSON.stringify([
            { userId: currentUserId, productsViewed: [detail.id] },
          ])
        );
      } else {
        localStorage.setItem(
          'productsViewed',
          JSON.stringify([{ userId: currentUserId, productsViewed: [] }])
        );
      }
    } else {
      const currentUserData = existingData[currentUserDataIndex];

      const isExisting = currentUserData.productsViewed.includes(detail.id);
      if (!isExisting && detail.id != null) {
        if (currentUserData.productsViewed.length >= 10) {
          currentUserData.productsViewed.shift();
        }
        currentUserData.productsViewed.push(detail.id);
      }
      existingData[currentUserDataIndex] = currentUserData;
      localStorage.setItem('productsViewed', JSON.stringify(existingData));
    }
    // ------------------------------

    // async function getMessage() {
    //   let response = await axios.get('http://localhost:3001/api/products');
    //   setMessage(response.data);
    // }

    // getMessage();
    if (products.length === 0) {
      getProducts();
    }
    if (message.length === 0) {
      getMessage();
    }
  }, []);

  const {
    detail_contorl,
    product_detail,
    product_box,
    left_picbox,
    detail_content,
    main_pic,
    btn_contorl,
    group_pic_box,
    group_pic,
    test,
    specification_box,
    orther_product,
    evaluate_area,
    path_box,
    path_over,
  } = styles;

  //商品數量
  const [productsCount, setProductsCount] = useState(1);

  // 載入指示的spinner動畫用的
  const [isLoading, setIsLoading] = useState(false);

  // x秒後自動關掉spinner(設定isLoading為false)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isLoading]);

  // bootstrap 的spinner
  const spinner = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );

  // const [detail, setDetail] = useState({});
  const location = useLocation();
  // useEffect(() => {
  //   const urlArray = location.pathname.split('/');
  //   const id = parseInt(urlArray[urlArray.length - 1]);

  //   setDetail(() => {
  //     return cardDetail.find((card) => card.id === id);
  //   });
  // }, []);
  useEffect(() => {
    setProductsCount(1);
    setIsLoading(true);
    getProducts();
  }, [location]);

  const detail = useMemo(() => {
    const urlArray = location.pathname.split('/');
    const id = parseInt(urlArray[urlArray.length - 1]);
    const outputData = products.find((card) => card.id === id);
    return outputData === undefined ? {} : outputData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const filteredMessage = useMemo(() => {
    const urlArray = location.pathname.split('/');
    const id = parseInt(urlArray[urlArray.length - 1]);
    return message.filter(
      (item) => parseInt(item.message_with_products_id) === id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <div className={`${test}`}>
      <div className="custom-container d-flex justify-content-center">
        <div className={`${detail_contorl}`}>
          <p className={`${path_box}`}>
            <Path
              pathObj={{ path: ['商品列表', `${detail.name}`] }}
              url={['/products']}
            />
          </p>

          <div className={`${btn_contorl} d-flex justify-content-end mb-3`}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button className="btn1 d-flex align-items-center justify-content-center ">
                <BsFillReplyFill />
                回商品列表
              </button>
            </Link>
          </div>
          {isLoading ? (
            spinner
          ) : (
            <Fragment>
              <div className={`${product_detail}`}>
                <div className={`${product_box} d-flex`}>
                  <PicRender product_id={detail.id} />

                  <div className={`${detail_content}`}>
                    <ProductInfo
                      productsCount={productsCount}
                      setProductsCount={setProductsCount}
                      title={detail.name}
                      content={detail.introduction}
                      price={detail.price}
                      type={detail.type}
                      place={detail.place}
                      product_package={detail.package}
                    />
                  </div>
                </div>
              </div>
              <div className={`${specification_box}`}>
                <br />
                <br />
                <Specification spec={detail.detail} />
              </div>
            </Fragment>
          )}
          <div className={`${orther_product}`}>
            <br />
            <br />
            <OrtherWrap />
          </div>
          <div
            className={`${evaluate_area} d-flex flex-column align-items-center `}
          >
            <h3 className="my-5">顧客評論區</h3>
            {/* <EvaluateArea /> */}
          </div>

          {filteredMessage.length === 0 ? (
            <h1 className="d-flex justify-content-center">
              此商品目前暫無評論
            </h1>
          ) : (
            filteredMessage.map((mes) => {
              return (
                <Fragment key={mes.id}>
                  {/* {haveMessage === 0 ? (
                  <p>目前尚未有留言</p>
                ) : (
                  <MessageArea
                    rating={mes.message_rating}
                    time={mes.message_time}
                    s={mes.speak}
                  />
                )} */}
                  <MessageArea
                    rating={mes.message_rating}
                    time={mes.message_time}
                    s={mes.speak}
                    name={mes.account}
                    img={mes.img}
                  />
                </Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
