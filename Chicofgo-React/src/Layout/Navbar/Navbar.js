import { Link, NavLink } from 'react-router-dom';
import { Container, Button, Image, Nav, Navbar } from 'react-bootstrap';
import {
  BsFillBellFill,
  BsSuitHeartFill,
  BsFillPersonFill,
  BsFillCartFill,
} from 'react-icons/bs';
import style from './Navbar.module.scss';
import { useAuth } from '../../Contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChicofgoNavBar() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    // 監聽導覽列展開/收合狀態
    console.log('expanded:', expanded);
  }, [expanded]);

  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    userid,
    setUserid,
    userRank,
    setUserRank,
  } = useAuth();
  async function handleLogout() {
    await axios.get('http://localhost:3001/api/auth/logout', {
      withCredentials: true,
    });
    setIsLoggedIn(false);
    setUserid('');
    setUsername('');
    setUserRank('');
    localStorage.removeItem('MyCoupon');
    localStorage.removeItem('productsViewed');
  }

  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      expand="md"
      sticky="top"
      className={`p-0 chicofgo-font-700 border-bottom shadow-sm`}
      collapseOnSelect
    >
      <Container fluid className={`${style.navbarBody} py-2`}>
        <Navbar.Brand as={NavLink} to="/home">
          <Image
            src={require('./logo.png')}
            className={`d-inline-block align-top ms-md-5`}
            alt="Responsive image"
            width="80"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={`justify-content-end`}
        >
          <Nav
            className={`${style.navbarCustom} my-0 text-nowrap py-2`}
            style={{ maxHeight: '100px' }}
            navbarScroll
            variant="chicofgo-brown"
            defaultActiveKey="home"
          >
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/home"
                className={`px-3 py-1 me-1`}
                onClick={() => setExpanded(false)}
              >
                首頁
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/products"
                className={`px-3 py-1 me-1`}
                onClick={() => setExpanded(false)}
              >
                商品
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/event"
                className={`px-3 py-1 me-1`}
                onClick={() => setExpanded(false)}
              >
                活動專區
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/coupon"
                className={`px-3 py-1 me-1`}
                onClick={() => setExpanded(false)}
              >
                折價券
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {isLoggedIn && (
            <>
              <Nav.Item>
                <Navbar.Text
                  className={`px-3 py-1 me-1 chicofgo-font-700 d-block d-md-none d-lg-block`}
                >
                  Hi!~ {username}
                  {/* {username ? username : storedUsername} */}
                </Navbar.Text>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant="outline-chicofgo-green"
                  onClick={handleLogout}
                  className={`px-3 py-1 me-0 ms-3 ms-md-0 chicofgo-font-70`}
                >
                  登出
                </Button>
              </Nav.Item>
            </>
          )}

          {/* <Button as={Link} to="/" variant="" className={`mx-1 mb-1`}>
            <BsFillBellFill />
          </Button> */}
          <Button
            as={Link}
            to={'/member/collect/items'}
            variant=""
            className={`me-1 mb-1`}
            onClick={() => setExpanded(false)}
          >
            <BsSuitHeartFill />
          </Button>
          <Button
            as={Link}
            to={userRank == '2' ? '/businessOrder' : '/member'}
            variant=""
            className={`me-1 mb-1`}
            onClick={() => setExpanded(false)}
          >
            <BsFillPersonFill />
          </Button>
          <Button
            as={Link}
            to="/member/shoppingcart"
            variant=""
            className={`me-1 align-center mb-1`}
            onClick={() => setExpanded(false)}
          >
            <BsFillCartFill />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ChicofgoNavBar;
