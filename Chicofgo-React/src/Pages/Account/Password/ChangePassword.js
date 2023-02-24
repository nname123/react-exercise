import { Row, Col, Form, Button } from 'react-bootstrap';
import MemberBar from '../Components/MemberBar';
import ChContainer from '../../ComponentShare/ChContainer';
import { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import PopupWindow from '../../ComponentShare/PopupWindow';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({
    oldPasswordError: '',
    oldPassword: false,
    passwordError: '',
    password: false,
    confirmPasswordError: '',
    confirmPassword: false,
  });
  const [showModal, setShowModal] = useState(false);
  useLayoutEffect(() => {
    async function getAccountData() {
      let response = await axios.get(
        'http://localhost:3001/api/members/account',
        {
          withCredentials: true,
        }
      );
      setPasswordData({ account: response.data.account });
    }
    getAccountData();
  }, []);

  function handleChange(e) {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    // 送出
    console.log('handleSubmit');
    console.log(passwordData);

    // 關閉表單的預設行為
    e.preventDefault();
    try {
      let response = await axios.post(
        'http://localhost:3001/api/members/passwordChange',
        passwordData,
        {
          // 為了跨源存取 cookie
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log('更新成功');
        setShowModal(true);
        setPasswordErrors({
          oldPasswordError: '',
          oldPassword: false,
          passwordError: '',
          password: false,
          confirmPasswordError: '',
          confirmPassword: false,
        });
        // 島葉
        // setPasswordData({ ...passwordData, [e.target.name]: '' });
        // e.target.reset();
      }
    } catch (e) {
      if (e.response.status === 401) {
        let allPsErrors = e.response.data.errors;
        console.log('更新失敗');
        console.log(allPsErrors);

        let newErrors = {
          oldPasswordError: '',
          oldPassword: false,
          passwordError: '',
          password: false,
          confirmPasswordError: '',
          confirmPassword: false,
        };
        allPsErrors.forEach((thisError) => {
          newErrors[thisError.param] = true;
          newErrors[thisError.param + 'Error'] = thisError.msg;
        });
        setPasswordErrors(newErrors);
        console.log(passwordErrors);
      }
    }
  }
  // ---顯示密碼---
  const [passwordIsOpen, setPasswordIsOpen] = useState(false);
  const passwordOpen = () => {
    setPasswordIsOpen(!passwordIsOpen);
  };
  return (
    <ChContainer
      ChClass={'chicofgo-font-700 border border-5'}
      breadCrumb={'修改密碼'}
    >
      <MemberBar />
      <Row className="d-flex justify-content-center">
        <Col sm={9} className="border border-5  pt-3 pb-4 px-md-5 mb-5 mt-3 ">
          <h2 className="text-center chicofgo_brown_font chicofgo-font-700 py-3">
            修改密碼
          </h2>
          <Form.Floating className="mb-3 chicofgo_brown_font">
            <Form.Control
              // id="floatingInputCustom"
              placeholder="帳號"
              type="email"
              name="account"
              disabled
            />
            <label htmlFor="floatingInputCustom">
              帳號:
              <span className="chicofgo-font-700 chicofgo_dark_font ms-2 fs-6">
                {passwordData.account}
              </span>
            </label>
          </Form.Floating>
          <Form.Floating className="my-3 chicofgo_brown_font">
            <Form.Control
              // id="floatingPasswordCustom"
              // className="fs-6"
              type="password"
              name="oldPassword"
              placeholder="請輸入舊密碼"
              onChange={handleChange}
              isInvalid={passwordErrors.oldPassword}
            />
            <Form.Control.Feedback type="invalid" className="ms-2">
              {passwordErrors.oldPasswordError}
            </Form.Control.Feedback>
            <label htmlFor="floatingPasswordCustom">舊密碼:</label>
          </Form.Floating>
          <Form.Floating className="my-3 chicofgo_brown_font">
            <Form.Control
              // id="floatingPasswordCustom"
              type={passwordIsOpen ? 'text' : 'password'}
              name="password"
              placeholder="請輸入新密碼"
              onChange={handleChange}
              isInvalid={passwordErrors.password}
            />
            <Form.Control.Feedback type="invalid" className="ms-2">
              {passwordErrors.passwordError}
            </Form.Control.Feedback>
            <label htmlFor="floatingPasswordCustom">新密碼:</label>
          </Form.Floating>
          <Form.Floating className="my-3 chicofgo_brown_font">
            <Form.Control
              // id="floatingPasswordCustom"
              type={passwordIsOpen ? 'text' : 'password'}
              placeholder="請確認新密碼"
              name="confirmPassword"
              onChange={handleChange}
              isInvalid={passwordErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid" className="ms-2">
              {passwordErrors.confirmPasswordError}
            </Form.Control.Feedback>
            <label htmlFor="floatingPasswordCustom">確認新密碼:</label>
          </Form.Floating>
          <Form.Check
            inline
            label="顯示密碼"
            name="group1"
            type="checkbox"
            onClick={passwordOpen}
            // id={`inline-${type}-3`}
          />
          <div className="text-center my-3">
            <Button
              variant="chicofgo-brown"
              className={` px-5 py-1 shadow chicofgo_white_font`}
              onClick={handleSubmit}
            >
              確定修改
            </Button>
            <PopupWindow
              show={showModal}
              // onclose={() => setShowModal(false)}
              onclose={() => navigate('/member')}
              title="修改結果"
              content="成功修改!"
              btnContent="回到會員中心"
            />
          </div>
        </Col>
      </Row>
    </ChContainer>
  );
}

export default ChangePassword;
