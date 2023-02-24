import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Nav,
  InputGroup,
  Col,
  Row,
  Container,
  Collapse,
  Form,
} from 'react-bootstrap';

function ProductFilter() {
  let navigate = useNavigate();
  const brands = [
    'Maxim',
    '微美咖啡',
    '金車/伯朗',
    'Nestle雀巢',
    'UCC',
    '西雅圖',
    'STARBUCKS星巴克',
    '廣吉',
    'Casa卡薩',
  ];

  const cates = [
    '即飲咖啡',
    '即溶咖啡',
    '咖啡豆',
    '咖啡膠囊',
    '奶精',
    '濾掛式/茶包式',
    '咖啡粉',
  ];

  const items = ['罐裝', '袋裝', '盒裝', '箱裝', '瓶裝', '禮盒', '隨手包'];
  const origins = ['巴西', '印尼', '韓國', '英國', '義大利', '台灣', '日本'];

  const [open, setOpen] = useState(false);
  const [checkedMap, setCheckedMap] = useState({
    brands: {},
    cates: {},
    items: {},
    origins: {},
  });
  const [checkedList, setCheckedList] = useState({
    brands: [],
    cates: [],
    items: [],
    origins: [],
  });

  const handleCheck = (event) => {
    const {
      dataset: { type, name },
    } = event.target;

    setCheckedMap((prevState) => {
      const newCheckedMap = { ...prevState };

      if (event.target.checked) {
        newCheckedMap[type][name] = true;
      } else {
        delete newCheckedMap[type][name];
      }

      return newCheckedMap;
    });
    setCheckedList((prev) => {
      const prevList = prev[type] || [];
      const newList = event.target.checked
        ? [...prevList, name]
        : prevList.filter((item) => item !== name);

      return {
        ...prev,
        [type]: newList,
      };
    });
  };
  // const { currentPage } = useParams();
  // const [page, setPage] = useState(parseInt(currentPage, 10) || 1); // 目前在哪一頁
  // const [totalPage, setTotalPage] = useState(0); // 總共有幾頁
  // const [data, setData] = useState([]);

  useEffect(() => {
    // console.log('page 改變的 useEffect', page);
    // async function getData() {
    //   let response = await axios.get(
    //     `http://localhost:3001/api/products/?page=${page}`
    //   );
    //   setData(response.data.data);
    //   setTotalPage(response.data.pagination.totalPage);
    // }
    // getData();
  }, []);

  return (
    <Container>
      <Row className="">
        <Col>
          <div className="border-bottom pt-3 pb-2 ">
            <span className="fs-5 fw-semibold">商品搜尋</span>
          </div>
          <InputGroup className="pt-3">
            <Form.Control placeholder="Search" />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          <div className="border-bottom my-2 pt-1 pb-2">
            <Link
              as={Button}
              onClick={() => {
                console.log('按一下');
                console.log(checkedMap);
                console.log(checkedList);
              }}
              className="align-items-center link-dark text-decoration-none px-1"
            >
              清除搜尋 ↺
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="border-bottom pt-3 pb-2 ">
            <span className="fs-5 fw-semibold">商品篩選</span>
          </div>
          <ul className="list-unstyled">
            <li className="mb-1">
              <Button
                className="align-items-center px-1"
                onClick={() => setOpen(!open)}
                data-bs-target="#home-collapse"
                aria-expanded={open}
                variant=""
              >
                品牌 ▼
              </Button>
              <Collapse in={open}>
                <Form className="ms-3">
                  {brands.map((item, index) => {
                    return (
                      <Form.Check
                        key={index}
                        className="my-1"
                        type="switch"
                        label={item}
                        data-type="brands"
                        data-name={item}
                        checked={checkedMap.brands[item]}
                        onChange={handleCheck}
                      />
                    );
                  })}
                </Form>
              </Collapse>
            </li>

            <li className="">
              <Button
                className="align-items-center px-1"
                onClick={() => setOpen(!open)}
                data-bs-target="#home-collapse"
                aria-expanded={open}
                variant=""
              >
                種類 ▼
              </Button>
              <Collapse in={open}>
                <Form className="ms-3">
                  {cates.map((item, index) => {
                    return (
                      <Form.Check
                        key={index}
                        type="switch"
                        label={item}
                        data-type="cates"
                        data-name={item}
                        checked={checkedMap.cates[item]}
                        onChange={handleCheck}
                      />
                    );
                  })}
                </Form>
              </Collapse>
            </li>
            <li className="">
              <Button
                className="align-items-center px-1"
                onClick={() => setOpen(!open)}
                data-bs-target="#home-collapse"
                aria-expanded={open}
                variant=""
              >
                包裝 ▼
              </Button>
              <Collapse in={open}>
                <Form className="ms-3">
                  {items.map((item, index) => {
                    return (
                      <Form.Check
                        key={index}
                        type="switch"
                        label={item}
                        data-type="items"
                        data-name={item}
                        checked={checkedMap.items[item]}
                        onChange={handleCheck}
                      />
                    );
                  })}
                </Form>
              </Collapse>
            </li>
            <li className="">
              <Button
                className="align-items-center px-1"
                onClick={() => setOpen(!open)}
                data-bs-target="#home-collapse"
                aria-expanded={open}
                variant=""
              >
                產地 ▼
              </Button>
              <Collapse in={open}>
                <Form className="ms-3">
                  {origins.map((item, index) => {
                    return (
                      <Form.Check
                        key={index}
                        type="switch"
                        label={item}
                        data-type="origins"
                        data-name={item}
                        checked={checkedMap.origins[item]}
                        onChange={handleCheck}
                      />
                    );
                  })}
                </Form>
              </Collapse>
            </li>
            <li className="border-top mt-2"></li>
            <li className="py-2">
              <Link
                as={Button}
                onClick={() => {
                  console.log('按一下');
                  setCheckedMap({
                    brands: {},
                    cates: {},
                    items: {},
                    origins: {},
                  });
                  setCheckedList({
                    brands: [],
                    cates: [],
                    items: [],
                    origins: [],
                  });
                }}
                className="align-items-center link-dark text-decoration-none px-1"
              >
                清除篩選 ↺
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
export default ProductFilter;
