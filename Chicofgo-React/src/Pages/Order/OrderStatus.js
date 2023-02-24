import React, { useState, useLayoutEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import style from './OrderStatus.module.scss';
import { SlCup } from 'react-icons/sl';
import { TbMessage2 } from 'react-icons/tb';
import ChContainer from '../ComponentShare/ChContainer';
import RatingButton from './RatingButton';
import axios from 'axios';
import { useAuth } from '../../Contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function OrderStatus() {
  // ---訂單資料---
  const { userid } = useAuth();
  let { order_id } = useParams();
  const [orderStatusInfo, setOrderStatusInfo] = useState([]);
  const [orderMemberInfo, setOrderMemberInfo] = useState([]);
  const [orderReviewInfo, setOrderReviewInfo] = useState([]);

  useLayoutEffect(() => {
    async function getOrderData() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/members/orderDetail/${order_id}`,
          {
            withCredentials: true,
          }
        );
        console.log('OrderStatus', response.data.products);
        console.log('Member', response.data.member[0]);
        console.log('review', response.data.review);

        setOrderMemberInfo(response.data.member[0]);
        setOrderStatusInfo(response.data.products);
        setOrderReviewInfo(response.data.review);
      } catch (e) {
        if (e.response.status === 400) {
          console.log('訂單是空的');
        }
      }
    }
    getOrderData();
  }, []);

  return (
    <ChContainer
      ChClass={'chicofgo-font-700 border border-5'}
      breadCrumb={'訂單狀態'}
    >
      {/* 標題 */}
      <Col>
        <Row>
          <Col>
            <h1 className={`${style.orderTitle} text-center pt-3 pb-2 py-md-5`}>
              訂單狀態
            </h1>
          </Col>
        </Row>
        <Row
          className={`${style.orderStatusTitle} d-flex justify-content-between py-2 py-md-5 px-4`}
        >
          {/* 內容1 */}
          {/* 出貨狀態 */}
          <Col
            className={`text-center ${
              orderMemberInfo.status >= 1 ? 'chicofgo_brown_font' : 'text-muted'
            } `}
          >
            <h4>訂單成立</h4>
            <p className={`pb-2`}>(待店家出貨)</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="69.23"
              fill="currentColor"
              class="bi bi-cash-coin"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              />
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
            </svg>
          </Col>
          <Col
            className={`text-center ${
              orderMemberInfo.status >= 2 ? 'chicofgo_brown_font' : 'text-muted'
            } `}
          >
            <h4>店家出貨</h4>
            <p className={`pb-2`}>(待送達超商)</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="91"
              height="75"
              fill="currentColor"
              class="bi bi-truck"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </Col>
          <Col
            className={`text-center ${
              orderMemberInfo.status >= 3 ? 'chicofgo_brown_font' : 'text-muted'
            }`}
          >
            <h4>商品到貨</h4>
            <p className={`pb-2`}>(待買家完成取貨)</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="83"
              height="82"
              fill="currentColor"
              class="bi bi-shop"
              viewBox="0 0 16 16"
            >
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
            </svg>
          </Col>
          <Col
            className={`text-center ${
              orderMemberInfo.status >= 4 ? 'chicofgo_brown_font' : 'text-muted'
            }`}
          >
            <h4>取貨成功</h4>
            <p className={`pb-2`}>&nbsp;</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="83"
              height="75"
              fill="currentColor"
              class="bi bi-clipboard2-check"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
              <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
              <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z" />
            </svg>
          </Col>
          <Col
            className={`text-center ${
              orderMemberInfo.status >= 5 ? 'chicofgo_brown_font' : 'text-muted'
            }`}
          >
            <h4>完成評價</h4>
            <p className={`pb-2`}>&nbsp;</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              class="bi bi-star"
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
          </Col>
        </Row>
        <Row
          className={`chicofgo_gray justify-content-evenly text-center px-0 px-md-4 pt-1 py-md-4 mb-md-3`}
        >
          <Col className={`col-7`}>商家/商品資訊</Col>
          <Col className={`col-5`}>
            <Row>
              <Col className={`col text-nowrap`}>數量</Col>
              <Col className={`col text-nowrap`}>單價</Col>
              <Col className={`col-md-6`}></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className={`${style.poductInfoBorder}`}>
            {/* 內容2 */}
            {/* 訂單內容-個別 */}
            {/* text-center align-middle */}

            {orderStatusInfo.map((info) => {
              return (
                <Row
                  key={info.shoppingcart_id}
                  className={`align-items-center ${style.poductInfo} px-1 px-md-4 py-3`}
                >
                  <Col className={`col-7 pe-0`}>
                    <Row
                      className={`${style.contactShop} justify-content-evenly `}
                    >
                      <Col className={`d-none d-md-block col-4`}>
                        <span>
                          <SlCup />
                          {info.brandname}
                        </span>
                      </Col>
                      <Col className={`d-none d-md-block col-4 m-0`}>
                        <p>
                          <TbMessage2 />
                          聯絡商家
                        </p>
                      </Col>
                    </Row>
                    <Row
                      className={`align-items-center  justify-content-between`}
                    >
                      <Col className={`${style.orderItemImg} col-3 p-0 d-none d-md-block `}>
                        <img
                          src={`http://localhost:3001/api/images/productImg/coffee_${info.product_id}/coffee_${info.product_id}-1.png`}
                          fluid
                          alt="pic"
                        />
                      </Col>
                      <Col className={`${style.orderItem} col-12 col-md-9 `}>
                        <p className={`text-truncate`}>{info.title}</p>
                        <span className={`text-truncate`}>{info.desc}</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col className={`col-5`}>
                    <Row
                      className={`${style.orderDetail} align-items-center justify-content-evenly pt-3`}
                    >
                      <Col className={`col`}>
                        <p
                          className={`text-success fw-bold my-auto text-center`}
                        >
                          {info.quantity}
                        </p>
                      </Col>
                      <Col className={`col`}>
                        <p
                          className={`text-success fw-bold my-auto text-center`}
                        >
                          ${info.price}
                        </p>
                      </Col>
                      <Col className={`col-md-6 d-grid text-center`}>
                        <Button
                          variant="chicofgo-green"
                          className={`my-1 py-1 chicofgo_white_font d-none d-md-block `}
                          as={Link}
                          to={`/products/product_detail/${info.product_id}`}
                        >
                          再買一次
                        </Button>

                        {/* --------------------評價按鈕(有會員ID還沒有商品ID)--------------------- */}
                        <RatingButton
                          member_id={userid}
                          product_id={info.product_id}
                          orderId={orderMemberInfo.order_id}
                          disabled={orderMemberInfo.status <= 3}
                          // ||orderReviewInfo.includes(info.product_id.toString()
                        />

                        {/* <Button
                          variant="chicofgo-brown"
                          className={`my-1 py-1 chicofgo_white_font`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-star-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          評價
                        </Button> */}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
        <Row className={`chicofgo_gray mt-md-5`}>
          {/* 收件人資訊 */}
          <Col className={`p-1 pt-md-4 pb-md-3 mx-0 mx-md-5`}>
            <Table
              borderless
              hover
              size="sm"
              className={`${style.recipientTable} `}
            >
              <tbody>
                <tr>
                  <th scope="row">收件人姓名</th>
                  <td>{orderMemberInfo.name}</td>
                  <th>地址</th>
                  <td>{orderMemberInfo.address}</td>
                </tr>
                <tr>
                  <th scope="row">行動電話</th>
                  <td>0{orderMemberInfo.phone}</td>
                  <th>寄送資訊</th>
                  <td>
                    {orderMemberInfo.send_information == 1
                      ? '7-ELEVEN'
                      : orderMemberInfo.send_information == 2
                      ? '全家'
                      : orderMemberInfo.send_information == 3
                      ? '萊爾富'
                      : orderMemberInfo.send_information == 4
                      ? 'OK'
                      : orderMemberInfo.send_information == 5
                      ? '宅配'
                      : '未使用'}
                  </td>
                </tr>
                <tr>
                  <th scope="row">使用票券</th>
                  <td>
                    {orderMemberInfo.coupon === 60
                      ? '$60免運券'
                      : orderMemberInfo.coupon === 200
                      ? '$200折價券'
                      : '未使用'}
                  </td>
                  <th>電子發票</th>
                  <td>
                    {orderMemberInfo.bill_id === 1
                      ? '二聯式發票'
                      : orderMemberInfo.bill_id === 2
                      ? '三聯式發票'
                      : orderMemberInfo.bill_id === 3
                      ? '捐贈發票'
                      : '未使用'}
                  </td>
                </tr>
                <tr>
                  <th scope="row">付款方式</th>
                  <td>
                    {orderMemberInfo.pay === 1
                      ? '貨到付款'
                      : orderMemberInfo.pay === 2
                      ? '信用卡/金融卡'
                      : orderMemberInfo.pay === 3
                      ? '銀行轉帳'
                      : '沒付錢'}
                  </td>
                  <th>訂單備註</th>
                  <td>{orderMemberInfo.pay_info}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className={`chicofgo_gray mb-4 `}>
          <Col className={`${style.bgYellow} px-0 px-md-5 my-0 my-md-3 text-end`}>
            {/* 內容4 */}
            <p className={`${style.priceTotal} my-2 my-md-4`}>
              訂單加總:<span className={`mx-2`}>${orderMemberInfo.total}</span>
            </p>
          </Col>
        </Row>
      </Col>
    </ChContainer>
  );
}

export default OrderStatus;
