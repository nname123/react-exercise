import { Container, Row, Col, Button } from 'react-bootstrap';
import Path from '../../Layout/Item/Path/Path';
// import { orderInfo } from '../../Config/orderConfig';
import { useNavigate } from 'react-router-dom';
import { FaSearchDollar } from 'react-icons/fa';
import ChContainer from '../ComponentShare/ChContainer';
import style from './OrderHistory.module.scss';
import axios from 'axios';
import React, { useState, useEffect, useLayoutEffect } from 'react';

function OrderHistory() {
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState([]);
  let reversedData = orderInfo.slice().reverse();
  useEffect(() => {
    async function getOrderData() {
      try {
        let response = await axios.get(
          'http://localhost:3001/api/members/orders',
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setOrderInfo(response.data);
      } catch (e) {
        if (e.response.status === 400) {
          console.log('OrderInfo是空的');
        }
      }
    }
    getOrderData();
  }, []);

  function goToDetail(orderNumber) {
    navigate(`/member/orderStatus/${orderNumber}`, { replace: false });
  }
  return (
    <ChContainer
      ChClass={'chicofgo-font border border-5'}
      breadCrumb={'歷史訂單'}
    >
      {/* 標題 */}
      <Col>
        <Row>
          <Col>
            <h1 className={`${style.orderTitle} text-center pt-3 pb-2 py-md-5`}>
              歷史訂單
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className={`px-0 pb-3 pb-md-5`}>
            {/* 內容 */}

            <table className={`table text-center table-secondary`}>
              <thead className={`mb-5`}>
                <tr
                  className={`${style.orderSubTitle} my-3 text-nowrap border-top border-bottom border-white border-5`}
                >
                  <th>訂單編號</th>
                  <th>日期</th>
                  <th>總價</th>
                  <th>訂單狀態</th>
                  <th>詳細</th>
                </tr>
              </thead>
              {/* <br /> */}
              <tbody>
                {reversedData.map((info) => {
                  return (
                    <tr
                      key={info.id}
                      className={`${style.orderContent} border-top border-bottom border-white border-5 align-middle`}
                    >
                      <td className={`py-2 py-md-4`}>{info.number}</td>
                      <td className={`py-2 py-md-4`}>{info.time}</td>
                      <td className={` chicofgo_green_font py-2 py-md-4`}>
                        ${info.price}
                      </td>
                      <td className={`py-2 py-md-4`}>
                        {info.status === 1
                          ? '訂單成立'
                          : info.status === 2
                          ? '店家出貨'
                          : info.status === 3
                          ? '商品到貨'
                          : info.status === 4
                          ? '取貨成功'
                          : info.status === 5
                          ? '完成評價'
                          : '取消'}
                      </td>
                      <td className={`py-2 py-md-4`}>
                        <Button
                          className={`${style.orderContentBtn} `}
                          onClick={() => goToDetail(info.order_id)}
                          variant=""
                        >
                          <FaSearchDollar />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </Col>
    </ChContainer>
  );
}

export default OrderHistory;
