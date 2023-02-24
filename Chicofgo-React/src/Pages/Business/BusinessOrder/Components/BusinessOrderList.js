import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import style from './BusinessOrderList.module.scss';
import '../../BusinessProducts/Components/pagination.scss';

function BusinessOrderList(props) {
  const [orders, setOrders] = useState([]);

  //分頁
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  //要顯示的組數
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const filteredOrders = orders
    .filter((order) => {
      return props.search.toLowerCase() === ''
        ? order
        : order.name.toLowerCase().includes(props.search);
    })
    .filter((order) => {
      if (props.selectedStatus === '') {
        return order;
      } else if (props.selectedStatus === '已完成') {
        return order.status === 3 || order.status === 4 || order.status === 5;
      } else {
        return order.status == props.selectedStatus;
      }
    });

  const paginatedItems = filteredOrders.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );

  useEffect(() => {
    async function getorders() {
      let response = await axios.get(
        'http://localhost:3001/api/business/order'
      );
      setOrders(response.data);
    }
    getorders();
  }, []);
  // console.log(orders);
  //取得陣列資料放進orders
  // console.log(props.search);
  // console.log(props.selectedStatus);
  // console.log(orders);
  console.log('訂單', orders);
  return (
    <>
      {paginatedItems.map((order, index) => {
        return (
          <Row
            className={`text-center border-bottom align-items-center py-1 my-2 ${style.list} `}
            key={order.id}
          >
            <Col className="mb-2 ">{order.time}</Col>
            <Col className="mb-2 ">{order.number}</Col>
            <Col className="mb-2 ">{order.name}</Col>
            <Col className="mb-2 ">
              {' '}
              {order.status === 1
                ? '待出貨'
                : order.status === 2
                ? '運送中'
                : order.status === 3 || order.status === 4 || order.status === 5
                ? '已完成'
                : '未知狀態'}
            </Col>
            <Col className="text-center">
              <Link
                to={`/businessOrderDetail/${order.order_id}/${order.member}/${order.memberInfo}`}
              >
                <Button
                  className="mb-2 detail"
                  variant="chicofgo-khaki text-white"
                >
                  訂單詳細
                </Button>
              </Link>
            </Col>
          </Row>
        );
      })}
      <Row className="my-5 ">
        <Col className="col-4"></Col>
        <Col className="d-flex col-4">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={Math.ceil(filteredOrders.length / perPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            subContainerClassName={'pages pagination '}
            pageClassName="page-item "
            pageLinkClassName="page-link"
            previousClassName="page-item "
            previousLinkClassName="page-link "
            nextClassName="page-item "
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link "
            containerClassName="pagination "
            activeClassName="active "
            renderOnZeroPageCount={false}
          />
        </Col>
        <Col className="col-4"></Col>
      </Row>
    </>
  );
}

export default BusinessOrderList;
