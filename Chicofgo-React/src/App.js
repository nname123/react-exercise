import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './Layout/Navbar/Navbar';
import Products from './Pages/Products/Products';
import Event from './Pages/Event/Event';
import Coupon from './Pages/Coupon/Coupon';
import Account from './Pages/Account/Account';
import Password from './Pages/Account/Password/ChangePassword';
import Creditcard from './Pages/Account/CreditCard/CreditCard';
import Address from './Pages/Account/Address/Address';
// import AddressDetail from './Pages/Account/Address/AddressDetail';
import Footer from './Layout/Footer/Footer';
import ProductDetail from './Pages/Products/ProductDetail/ProductDetailPage';
import OrderHistory from './Pages/Order/OrderHistory';
import OrderStatus from './Pages/Order/OrderStatus';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Home from './Pages/Home/Home';
import ScrollToTop from './Hook/ScrollToTop';
import Member from './Pages/Member';
import Coupons from './Pages/Account/Coupons/Coupons';
import Messages from './Pages/Account/Messages/Messages';
import Collect from './Pages/Account/Collect/Collect';
import CollectItem from './Pages/Account/Collect/Component/CollectItem';
import CollectShop from './Pages/Account/Collect/Component/CollectShop';
import ShoppingCart from './Pages/Account/ShoppingCart/ShoppingCart';

import Checkout from './Pages/Account/ShoppingCart/Checkout';

import BusinessOrder from './Pages/Business/BusinessOrder/BusinessOrder';
import BusinessProducts from './Pages/Business/BusinessProducts/BusinessProducts';
import BusinessProductsAdd from './Pages/Business/BusinessProductsAdd/BusinessProductsAdd';
import BusinessReview from './Pages/Business/BusinessReview/BusinessReview';
import BusinessOrderDetail from './Pages/Business/BusinessOrder/BusinessOrderDetail';

import AllProviders from './Contexts/AllProviders';

function App() {
  return (
    <>
      <BrowserRouter>
        <AllProviders>
          <Navbar />
          {/* <Path /> */}
          {/* <MemberSideBar /> */}

          <ScrollToTop>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="/" element={<Navigate to="home" replace={true} />} />
              {/*product*/}
              <Route path="/products">
                <Route path=":currentPage" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/category" element={<Products />} />
                <Route
                  path="/products/product_detail/:product_id"
                  element={<ProductDetail />}
                />
              </Route>
              {/*product*/}
              <Route path="event" element={<Event />} />
              <Route path="coupon" element={<Coupon />} />
              <Route path="account" element={<Account />} />

              <Route path="orderHistory" element={<OrderHistory />} />
              <Route path="orderStatus" element={<OrderStatus />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="/product_detail/:product_id"
                element={<ProductDetail />}
              />

              {/* <Route path="/">
            <Route index element={}
          </Route> */}

              <Route path="member" element={<Member />}>
                <Route index element={<Account />} />
                <Route path="account" element={<Account />} />
                <Route path="orderHistory" element={<OrderHistory />} />
                <Route path="orderStatus/:order_id" element={<OrderStatus />} />
                <Route path="password" element={<Password />} />
                <Route path="creditcard" element={<Creditcard />} />
                <Route path="address" element={<Address />} />
                {/* <Route path="addressDatail" element={<AddressDetail />} /> */}
                <Route path="coupons" element={<Coupons />} />
                <Route path="messages" element={<Messages />} />
                <Route path="shoppingcart" element={<ShoppingCart />} />
                <Route path="checkout" element={<Checkout />} />

                <Route path="collect" element={<Collect />}>
                  <Route
                    index
                    element={
                      <Navigate to="/member/collect/items" replace={true} />
                    }
                  />
                  {/* <Route path="shop" element={<CollectShop />} /> */}
                  <Route path="items" element={<CollectItem />} />
                </Route>
              </Route>
              <Route path="businessOrder" element={<BusinessOrder />} />

              <Route
                path="businessOrderDetail/:orderId/:memberId/:memberinfoId"
                element={<BusinessOrderDetail />}
              />

              <Route path="businessProducts" element={<BusinessProducts />} />
              <Route
                path="businessProductsAdd"
                element={<BusinessProductsAdd />}
              />
              <Route path="businessReview" element={<BusinessReview />} />
            </Routes>
          </ScrollToTop>

          <Footer />
        </AllProviders>
      </BrowserRouter>
    </>
  );
}

export default App;
