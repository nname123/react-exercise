import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  pagination,
  Modal,
  InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import style from './productsList.module.scss';
import './pagination.scss';

function ProductsList(props) {
  const [products, setProducts] = useState([]);
  const [valid, setValid] = useState('');
  const { productId } = useParams();

  //分頁
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);

  //要顯示的組數
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filteredOrders = products
    .filter((product) => {
      return props.searchName.toLowerCase() === ''
        ? product
        : product.name.toLowerCase().includes(props.searchName);
    })
    .filter((product) => {
      return props.searchType === ''
        ? product
        : props.searchType === '類別'
        ? product
        : product.type === props.searchType;
    })
    .filter((product) => {
      return props.searchPackage === ''
        ? product
        : props.searchType === '包裝'
        ? product
        : product.package === props.searchPackage;
    })
    .filter((product) => {
      return product.valid < 2;
    });

  const paginatedItems = filteredOrders.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );

  //彈跳視窗
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function getproducts() {
      let response = await axios.get(
        'http://localhost:3001/api/business/products'
      );
      setProducts(response.data);
    }
    getproducts();
  }, [show, valid]);

  const handleOn = async (productId) => {
    try {
      const responseOff = await axios.put(
        `http://localhost:3001/api/business/products/${productId}`,
        {
          valid: '0',
        }
      );

      setValid(0);

      console.log(responseOff);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOff = async (productId) => {
    try {
      const responseOff = await axios.put(
        `http://localhost:3001/api/business/products/${productId}`,
        {
          valid: '1',
        }
      );

      setValid(1);

      console.log(responseOff);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const responseDelete = await axios.put(
        `http://localhost:3001/api/business/products/${productId}`,
        {
          valid: '2',
        }
      );
      setValid(2);
      console.log(responseDelete);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(handleGo)
  //取得陣列資料放進products

  return (
    <>
      {paginatedItems.map((product) => {
        return (
          <Row
            className="text-center border-bottom align-items-center py-1 mt-1 d-flex"
            key={product.id}
          >
            <Col sm={2} className="my-1">
              {product.name}
            </Col>
            <Col sm={2} className="my-1">
              <span className={`${style.select} py-4`}>種類：</span>
              {product.type}
            </Col>
            <Col sm={2} className="my-1">
              <span className={`${style.select} py-4`}>包裝：</span>
              {product.package}
            </Col>
            <Col sm={2} className="my-1">
              <span className={`${style.select} py-4`}>價格：</span>
              {product.price}
            </Col>
            <Col sm={2} className="my-1">
              <span className={`${style.select} py-4`}>數量：</span>
              {product.amount}
            </Col>
            <Col md={2} className="text-center">
              {/* <Button
                      className="px-2 mx-1"
                      variant="chicofgo-brown text-white"
                    >
                      詳細
                    </Button> */}
              {product.valid === 1 ? (
                <Button
                  className="px-2 mx-1"
                  variant="chicofgo-khaki text-white"
                  id={product.id}
                  value={product.valid}
                  onClick={(e) => handleOn(e.target.id)}
                >
                  上架
                </Button>
              ) : (
                <Button
                  className="px-2 mx-1"
                  id={product.id}
                  value={product.valid}
                  variant="chicofgo-brown text-white"
                  onClick={(e) => handleOff(e.target.id)}
                >
                  下架
                </Button>
              )}
            </Col>

            <Col className="pb-2">
              <Row className="justify-content-between text-center">
                <Col md={2} className="text-center">
                  <Link to={`/products/product_detail/${product.id}`}>
                    <Button
                      className="px-2 mx-1 btn-danger"
                      id={product.id}
                      value={product.valid}
                      variant="chicofgo-green"
                    >
                      前往商品
                    </Button>
                  </Link>
                </Col>
                <Col md={2} className="text-center">
                  <Button
                    className="px-2 mx-1 btn-danger"
                    id={product.id}
                    value={product.valid}
                    onClick={(e) => handleDelete(e.target.id)}
                  >
                    刪除
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        );
      })}
      <Row className="my-5 ">
        <Col className="col-md-4"></Col>
        <Col className="d-flex col-md-4">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={Math.ceil(filteredOrders.length / perPage)}
            marginPagesDisplayed={2}
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
            renderOnZeroPageCount={null}
          />
        </Col>
        <Col className="col-md-4"></Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>刪除成功</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="chicofgo-brown text-white" onClick={handleClose}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductsList;
