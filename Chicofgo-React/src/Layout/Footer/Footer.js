import React from 'react';
import logoSVG from '../../Img/logo.svg';
import { Link } from 'react-router-dom';
import logotw from '../../Img/twitter.svg';
import logofb from '../../Img/facebook.svg';
import logoyt from '../../Img/youtube.svg';
import logoig from '../../Img/instagram.svg';
import styles from './Footer.module.scss';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { foot_a, sociallink } = styles;
  return (
    <footer>
      <Container className={`py-5`}>
        <Button
          onClick={handleClick}
          variant="chicofgo-green"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          className={`rounded-2 shadow`}
        >
          <FaArrowUp />
        </Button>
        <Row className={``}>
          <Col
            className={`col-12 col-md-auto d-flex justify-content-center align-items-center`}
          >
            <Link to="/">
              <Image className={`fluid`} src={logoSVG} alt="" />
            </Link>
          </Col>
          <Col className={`col-12 d-block  d-md-none`}>
            <hr
              style={{
                border: '2px solid rgb(166, 155, 132)',
                opacity: '1',
              }}
              className={`my-5`}
            />
          </Col>
          <Col className={`pt-2 pt-md-5 pb-2`}>
            <Row className={`justify-content-evenly`}>
              <Col className={` `}>
                <ul className={`list-unstyled ps-3`}>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="/">
                      關於我們
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="">
                      品牌故事
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="">
                      商店介紹
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="">
                      會員權益說明
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col className={``}>
                <ul className={`list-unstyled ps-3`}>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="">
                      購物說明
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="">
                      付款方式
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="">
                      運送方式
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} to="">
                      退換貨方式
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col className={``}>
                <ul className={`list-unstyled ps-3 `}>
                  <li className={`py-2`}>
                    <Link href="" className={foot_a}>
                      客服資訊
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} href="">
                      客服留言
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} href="">
                      常見問題
                    </Link>
                  </li>
                  <li className={`py-2`}>
                    <Link className={foot_a} href="">
                      隱私權及
                      <br className={`d-block  d-md-none`} />
                      網站使用條款
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={`justify-content-between`}>
          <Col>
            <p className={`Copyrighttext`}>
              © 2023 Copyright Chicofgo Shop All Rights Reserved.
            </p>
          </Col>
          <Col>
            <div
              className={`${sociallink} d-flex justify-content-end align-items-center`}
            >
              <Link href="" className={`px-2`}>
                <Image src={logotw} alt="" />
              </Link>
              <Link href="" className={`px-2`}>
                <Image src={logofb} alt="" />
              </Link>
              <Link href="" className={`px-2`}>
                <Image src={logoyt} alt="" />
              </Link>
              <Link to="/" className={`px-2`}>
                <Image src={logoig} alt="" />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
