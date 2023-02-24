import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import 'react-credit-cards-2/es/styles-compiled.css';
import { Button, Collapse, Col, Form, Table, Row } from 'react-bootstrap';
import PopupWindow from '../../ComponentShare/PopupWindow';
import { useNavigate } from 'react-router-dom';
function AddressDetail() {
  const navigate = useNavigate();
  const [submittedData, setSubmittedData] = useState({});
  const [backendCounty, setBackendCounty] = useState([]);
  const [backendDistrict, setBackendDistrict] = useState([]);
  const [backendData, setbackendData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [districtData, setDistrictData] = useState([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    otherError: '',
    other: false,
    countyError: '',
    county: false,
    districtError: '',
    district: false,
  });
  useLayoutEffect(() => {
    async function getAccountData() {
      let response = await axios.get(
        'http://localhost:3001/api/members/myaddress',
        {
          withCredentials: true,
        }
      );
      setBackendCounty(response.data.county);
      setBackendDistrict(response.data.district);
      setDistrictData(response.data.district);
      setbackendData(response.data);
    }
    getAccountData();
  }, []);

  function handleChange(event) {
    console.log(event.target.value);
    // console.log(backendData);

    switch (event.target.value) {
      case '1':
        // console.log('1號');
        setDistrictData(backendDistrict.slice(158, 165));
        break;
      case '2':
        // console.log('2號');
        setDistrictData(backendDistrict.slice(29, 41));
        break;
      case '3':
        // console.log('3號');
        setDistrictData(backendDistrict.slice(0, 29));
        break;
      case '4':
        // console.log('4號');
        setDistrictData(backendDistrict.slice(41, 54));
        break;
      case '5':
        // console.log('5號');
        setDistrictData(backendDistrict.slice(165, 168));
        break;
      case '6':
        // console.log('6號');
        setDistrictData(backendDistrict.slice(182, 195));
        break;
      case '7':
        // console.log('7號');
        setDistrictData(backendDistrict.slice(195, 213));
        break;
      case '8':
        // console.log('8號');
        setDistrictData(backendDistrict.slice(54, 83));
        break;
      case '9':
        // console.log('9號');
        setDistrictData(backendDistrict.slice(213, 239));
        break;
      case '10':
        // console.log('10號');
        setDistrictData(backendDistrict.slice(239, 252));
        break;
      case '11':
        // console.log('11號');
        setDistrictData(backendDistrict.slice(252, 272));
        break;
      case '12':
        // console.log('12號');
        setDistrictData(backendDistrict.slice(168, 170));
        break;
      case '13':
        // console.log('13號');
        setDistrictData(backendDistrict.slice(272, 290));
        break;
      case '14':
        // console.log('14號');
        setDistrictData(backendDistrict.slice(83, 120));
        break;
      case '15':
        // console.log('15號');
        setDistrictData(backendDistrict.slice(120, 158));
        break;
      case '16':
        // console.log('16號');
        setDistrictData(backendDistrict.slice(290, 323));
        break;
      case '17':
        // console.log('17號');
        setDistrictData(backendDistrict.slice(323, 339));
        break;
      case '18':
        // console.log('18號');
        setDistrictData(backendDistrict.slice(339, 352));
        break;
      case '19':
        // console.log('19號');
        setDistrictData(backendDistrict.slice(170, 182));
        break;
      case '20':
        // console.log('20號');
        setDistrictData(backendDistrict.slice(352, 358));
        break;
      case '21':
        // console.log('21號');
        setDistrictData(backendDistrict.slice(358, 364));
        break;
      case '22':
        // console.log('22號');
        setDistrictData(backendDistrict.slice(364, 368));
        break;
      default:
        console.log(`都不符合`);
    }
    console.log(backendCounty[Number(event.target.value) - 1].county);
    setSubmittedData({
      ...submittedData,
      county: backendCounty[Number(event.target.value) - 1].county,
    });
  }
  function handleChange2(event) {
    console.log(backendDistrict[Number(event.target.value) - 1].district);
    setSubmittedData({
      ...submittedData,
      district: backendDistrict[Number(event.target.value) - 1].district,
    });
  }
  function handleChange3(event) {
    // 輸入框偵測
    setSubmittedData({
      ...submittedData,
      other: event.target.value,
    });
  }

  async function handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();
    console.log(submittedData);
    try {
      let response = await axios.post(
        'http://localhost:3001/api/members/addresschange',
        submittedData,
        {
          // 為了跨源存取 cookie
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log('更新成功');
        setShowModal(true);
        setErrors({
          otherError: '',
          other: false,
          countyError: '',
          county: false,
          districtError: '',
          district: false,
        });
      }
    } catch (e) {
      if (e.response.status === 401) {
        let allErrors = e.response.data.errors;
        console.log('更新失敗');
        console.log(allErrors);
        let newErrors = {
          otherError: '',
          other: false,
          countyError: '',
          county: false,
          districtError: '',
          district: false,
        };
        allErrors.forEach((thisError) => {
          newErrors[thisError.param] = true;
          newErrors[thisError.param + 'Error'] = thisError.msg;
        });
        setErrors(newErrors);
        console.log(errors);
      }
    }
  }
  return (
    <Form className={`shadow px-2 py-4 p-md-5 rounded-5 chicofgo-font`} Validate>
      <h2 className={`text-center chicofgo-font-700 chicofgo_brown_font pb-3`}>
        配送資訊修改
      </h2>
      <Row>
        <Col>
          <Table borderless hover className="chicofgo-font pt-2 mb-0">
            <thead>
              <tr>
                <th>
                  <h3 className="chicofgo-font-700 fs-4">我的地址</h3>
                </th>
                <th className="text-end">
                  <Button variant="outline-chicofgo-brown" className={`mt-2`}>
                    預設地址
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>姓名：{backendData.name}</td>
                <td>電話：{backendData.phone}</td>
              </tr>
              <tr>
                <td colSpan={2}>{backendData.address || '尚未設定地址'}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr />
      <Button
        className={`mt-2`}
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="outline-chicofgo-green"
      >
        編輯地址
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Row className="my-2">
            <Col className="mt-2 pt-2">
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>縣市</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    isInvalid={errors.county}
                  >
                    <option selected disabled value="0">
                      縣市
                    </option>
                    {backendCounty.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.county}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.countyError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>鄉鎮市區</Form.Label>
                  <Form.Select
                    onChange={handleChange2}
                    isInvalid={errors.district}
                  >
                    <option selected disabled value="0">
                      鄉鎮
                    </option>
                    {districtData.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.district}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.districtError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12">
                  <Form.Label>詳細地址</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="other"
                    onChange={handleChange3}
                    isInvalid={errors.other}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.otherError}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Col>
          </Row>

          <Button
            type="submit"
            variant="chicofgo-green"
            className={``}
            onClick={handleSubmit}
          >
            送出
          </Button>
          <PopupWindow
            show={showModal}
            onclose={() => navigate('/member')}
            title="修改結果"
            content="成功修改!"
            btnContent="回到會員中心"
          />
        </div>
      </Collapse>
    </Form>
  );
}

export default AddressDetail;
