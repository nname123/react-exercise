import { Link, useNavigate } from 'react-router-dom';
import { React, Fragment, useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import style from './Login.module.scss';
import axios from 'axios';
import { useAuth } from '../../Contexts/AuthContext';

function Login() {
  const { isLoggedIn, setUsername, setIsLoggedIn, setUserid, setUserRank } =
    useAuth();
  const [loginErrors, setLoginErrors] = useState(false);
  const [loginCheckbox, setLoginCheckbox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if (isLoggedIn) {
    //   navigate(-1);
    // }

    isLoggedIn ? navigate('/') : console.log('尚未登入');
  }, [isLoggedIn, navigate]);

  const [member, setMember] = useState({
    account: 'c8763',
    password: 'test1234',
  });

  //-----------記住帳號功能-------------
  // const [member, setMember] = useState({
  //   account: localStorage.getItem('accountRememberMe') || '',
  // });
  //-----------記住帳號功能-------------

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    console.log(loginCheckbox);
    if (loginCheckbox) {
      console.log('記住帳號');
      localStorage.setItem('accountRememberMe', member.account);
      // localStorage.removeItem('accountRememberMe')
    } else {
      console.log('不記住帳號');
      localStorage.removeItem('accountRememberMe');
    }

    e.preventDefault();
    try {
      let response = await axios.post(
        'http://localhost:3001/api/auth/login',
        member,
        {
          // 為了跨源存取 cookie
          withCredentials: true,
        }
      );
      console.log(response.data);
      // console.log(response.status);
      if (response.status === 200) {
        console.log('登入成功');
        setIsLoggedIn(true);
        setUsername(response.data.member.name);
        setUserid(response.data.member.id);
        setUserRank(response.data.member.rank);
        navigate(-1);
      }
    } catch (e) {
      if (e.response.status === 401) {
        console.log('登入失敗');
        setLoginErrors(true);
      }
    }
  }

  // ---顯示密碼---
  const [passwordIsOpen, setPasswordIsOpen] = useState(false);
  const passwordOpen = () => {
    setPasswordIsOpen(!passwordIsOpen);
  };

  return (
    <Fragment>
      <Container fluid className={`${style.background} py-4`}>
        <div className={`${style.content} mx-auto`}>
          <div>
            <h2
              className={`text-center fs-2 chicofgo-font-700 chicofgo_brown_font`}
            >
              會員登入
            </h2>
          </div>
          <div className={`${style.img}`}></div>
          <div className={`${style.formControl}`}>
            <Form className={`${style.form} mx-auto`}>
              <div className={`mb-3`}>
                <Link
                  to="/register"
                  className={`chicofgo_brown_font text-decoration-none`}
                >
                  前往註冊會員
                </Link>
              </div>
              <FloatingLabel
                // controlId="floatingInput"
                label="帳號："
                className={`mb-3`}
              >
                <Form.Control
                  type="text"
                  placeholder=" "
                  name="account"
                  value={member.account}
                  onChange={handleChange}
                  isInvalid={loginErrors}
                  list="datalistOptions"
                />

                <Form.Control.Feedback type="invalid">
                  帳號或密碼錯誤
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                // controlId="floatingInput"
                label="密碼："
                className={`mb-3`}
              >
                <Form.Control
                  type={passwordIsOpen ? 'text' : 'password'}
                  placeholder=" "
                  name="password"
                  value={member.password}
                  onChange={handleChange}
                  isInvalid={loginErrors}
                />
                <Form.Control.Feedback type="invalid">
                  帳號或密碼錯誤
                </Form.Control.Feedback>
              </FloatingLabel>
              <Row className={`mb-3 justify-content-bewteen`}>
                <Col md="auto">
                  <Form.Group controlId="showPassword">
                    <Form.Check
                      type="checkbox"
                      label="顯示密碼"
                      onClick={passwordOpen}
                    />
                  </Form.Group>
                </Col>
                <Col className={`col-auto`}>
                  <Form.Group controlId="remeberMe">
                    <Form.Check
                      type="checkbox"
                      label="記住我的帳號"
                      onChange={() => {
                        setLoginCheckbox(!loginCheckbox);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className={`mx-auto`} style={{ width: 200 }}>
                <Button
                  variant="chicofgo-brown"
                  className={`${style.loginBtn} mx-auto chicofgo_white_font`}
                  onClick={handleSubmit}
                >
                  登入
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
export default Login;
