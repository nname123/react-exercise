import { Row, Col, Button, Form } from 'react-bootstrap';
import ChContainer from '../../ComponentShare/ChContainer';
import style from './ShoppingCart.module.scss';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import ShoppingItem from './Components/ShoppingItem';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../../Contexts/ShoppingCartProvider';
import axios from 'axios';

function ShoppingCart(props) {
  const [products, setProducts] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const { selectProducts, setSelectProducts } = useShoppingCart();
  useEffect(() => {
    async function getShoppingCartData() {
      try {
        let response = await axios.get(
          'http://localhost:3001/api/shoppingCarts/shoppingCart',
          {
            withCredentials: true,
          }
        );
        // console.log(response.data);
        setProducts(response.data);
      } catch (e) {
        if (e.response.status === 400) {
          console.log('購物車是空的');
          // setProducts([]);
        }
      }
    }
    getShoppingCartData();
  }, []);

  useEffect(() => {
    setIsCheckAll((prevIsCheckAll) =>
      products.every((product) => product.checked)
    );
  }, [products]);

  const handleCheckboxChange = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === id
          ? { ...product, checked: !product.checked }
          : product
      )
    );
  };

  const handleCheckAllChange = () => {
    setIsCheckAll((prevIsCheckAll) => !prevIsCheckAll);
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        checked: !isCheckAll,
      }))
    );
  };

  const handleQuantityChange = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === id
          ? {
              ...product,
              quantity:
                product.quantity + delta >= 1 ? product.quantity + delta : 1,
            }
          : product
      )
    );
  };

  const handleSelectProducts = () => {
    setSelectProducts(products.filter((product) => product.checked));
    // console.log(products.filter((product) => product.checked));
  };

  async function handleDeleteProducts(event) {
    const theCartId = event.currentTarget.value;
    try {
      let response = await axios.post(
        'http://localhost:3001/api/shoppingCarts/deleteShoppingCart',
        { deleteId: theCartId },
        {
          // 為了跨源存取 cookie
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setProducts(
          products.filter((items) => items.shoppingcart_id != theCartId)
        );
        console.log('刪除成功');
      }
    } catch (e) {
      if (e.response.status === 400) {
        let allErrors = e.response.data.errors;
        console.log('刪除失敗');
        console.log(allErrors);
      }
    }
  }

  const totalPrice = products
    .filter((product) => product.checked)
    .reduce((sum, product) => sum + product.price * product.quantity, 0);
  return (
    <ChContainer
      ChClass={'chicofgo-font border border-5'}
      breadCrumb={'我的購物車'}
    >
      {/* 標題 */}
      <Col>
        <Row>
          <Col>
            <h1
              className={`${style.shoppingcartTitle} text-center pt-3 pb-2 py-md-5`}
            >
              我的購物車
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className={` pb-5 chicofgo-font-700`}>
            {/* 內容 */}
            {/* ----------------------------------- */}
            {products.map((p) => (
              <ShoppingItem
                id={p.product_id}
                brandname={p.brandname}
                title={p.title}
                desc={p.desc}
                quantity={p.quantity}
                checked={p.checked}
                price={p.price}
                onCheckboxChange={() => handleCheckboxChange(p.product_id)}
                onQuantityChange={(delta) =>
                  handleQuantityChange(p.product_id, delta)
                }
                cartId={p.shoppingcart_id}
                onDeleteClick={handleDeleteProducts}
                // isChecked2={true}
              />
            ))}
            {/* ----------------------------------- */}
            <Row className={`px-5`}>
              <Col
                className={`${
                  products.length > 0 ? 'd-none' : 'd-inline'
                } shadow p-md-5 rounded-5 chicofgo-font text-center m-5`}
              >
                <h5
                  className={`py-3 rounded-5 chicofgo-font-700 chicofgo_green_font text-center`}
                >
                  購物車是空的
                </h5>
              </Col>
            </Row>

            {/* ----------------------------------- */}

            <Row
              className={`chicofgo_gray justify-content-between text-center px-0 px-md-4 py-2 py-md-3 mb-3`}
            >
              <Col className={`col-12 col-md-4 px-0`}>
                <Form className={`mx-3 chicofgo_brown_font my-1`}>
                  <Form.Check
                    type="checkbox"
                    label="全選"
                    // id="selectAll"
                    // name="selectAll"
                    className={`text-start`}
                    checked={isCheckAll}
                    onChange={handleCheckAllChange}
                  />
                </Form>
              </Col>
              <Col
                className={`${style.totalSum} col-12 col-md-5 chicofgo_gray text-nowrap`}
              >
                已選擇
                {products.filter((product) => product.checked).length}
                件商品商品總計:<span>{totalPrice}</span>
              </Col>
            </Row>
            <Row className={`mt-5`}>
              <Col className={`text-center`}>
                <Link
                  to={
                    (products.length <= 0) |
                    (products.filter((product) => product.checked).length <= 0)
                      ? '#'
                      : '/member/checkout'
                  }
                >
                  <Button
                    variant="chicofgo-brown"
                    className={` px-5 py-1 shadow chicofgo_white_font`}
                    onClick={handleSelectProducts}
                    disabled={
                      (products.length <= 0) |
                      (products.filter((product) => product.checked).length <=
                        0)
                    }
                  >
                    前往結帳
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </ChContainer>
  );
}

export default ShoppingCart;
