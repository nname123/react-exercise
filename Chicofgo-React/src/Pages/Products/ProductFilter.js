import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  InputGroup,
  Col,
  Row,
  Container,
  Form,
  Offcanvas,
  Accordion,
  Nav,
} from 'react-bootstrap';
import { useProduct } from '../../Contexts/ProductProvider';
import { MdManageSearch } from 'react-icons/md';

function ProductFilter() {
  const { chooseCategory, setChooseCategory } = useProduct();

  const brands = [
    'AGF',
    'BuonCaffe步昂咖啡',
    'CAFFINO',
    'camacafe',
    'CARRARO',
    'Casa卡薩',
    'Cofeel凱飛',
    'COFFEEFACTORY咖啡工廠',
    'EDIYACOFFEE',
    'G7',
    'GardenCafe花園咖啡',
    'HWC黑沃咖啡',
    'illy',
    'JC咖啡',
    'JuliusMeinl小紅帽咖啡',
    'KEYCOFFEE',
    'KingCoffee',
    'Krone皇雀咖啡',
    'LAVAZZA',
    'Maxim',
    'Maxwell麥斯威爾',
    'MinorFigures小人物',
    'Mocca摩卡',
    'MR.BROWN伯朗',
    'Nespresso',
    'Nestle雀巢',
    'Ogawa京都小川咖啡店',
    'OKLAO歐客佬',
    'okogreen生態綠',
    'PARANA義大利金牌咖啡',
    'RORISTA蘿莉絲塔',
    'SimpleKaffa興波咖啡',
    'smilecoffee微笑咖啡',
    'STARBUCKS星巴克',
    'TRIBOCOFFEE',
    'UCC',
    '上田/川雲/瑪尼咖啡館',
    '江鳥咖啡',
    '西雅圖',
    '味全',
    '咖樂迪咖啡農場',
    '金車/伯朗',
    '品皇',
    '壹咖啡',
    '湛盧咖啡',
    '雲谷',
    '農會',
    '熙舍咖啡',
    '廣吉',
    '澤井咖啡',
    '璞珞珈琲',
    '親愛的',
    '鮮一杯',
    '舊街場咖啡館',
  ];

  const types = [
    '咖啡豆',
    '濾掛式/茶包式',
    '即溶咖啡',
    '咖啡膠囊',
    '咖啡粉',
    '奶精',
    '即飲咖啡',
  ];

  const packages = [
    '袋裝',
    '盒裝',
    '箱裝',
    '瓶裝',
    '禮盒',
    '隨手包',
    '1入',
    '35入',
    '6~10入',
    '11~30入',
    '31~50入',
    '51~100入',
    '101~200入',
  ];
  const origins = [
    '台灣',
    '日本',
    '韓國',
    '中國大陸',
    '泰國',
    '土耳其',
    '印尼',
    '越南',
    '馬來西亞',
    '新加坡',
    '美國',
    '墨西哥',
    '祕魯',
    '巴西',
    '加拿大',
    '巴拿馬',
    '法國',
    '德國',
    '西班牙',
    '義大利',
    '英國',
    '瑞士',
    '比利時',
    '奧地利',
    '荷蘭',
    '葡萄牙',
    '波蘭',
    '哥倫比亞',
    '澳洲',
    '印度',
    '南非',
    '肯亞',
    '其他',
  ];

  const theStyles = [
    '義式',
    '藍山',
    '曼巴',
    '美式',
    '曼特寧',
    '哥斯大黎加',
    '耶加雪菲',
    '摩卡',
    '巴西',
    '哥倫比亞',
    '肯亞',
    '馬拉威',
    '盧安達',
    '薩爾瓦多',
    '巴拿馬',
    '安提瓜 花神',
    '綜合豆(配方豆)',
    '瓜地馬拉',
    '日曬',
    '藝伎Geisha',
    '衣索比亞',
    '尼加拉瓜',
    '宏都拉斯',
    '祕魯',
    '西達摩',
    '黃金曼特寧',
    '印尼',
    '水洗',
    '蜜處理',
    '其他',
  ];
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checkedMap, setCheckedMap] = useState({
    brands: {},
    types: {},
    packages: {},
    origins: {},
    theStyles: {},
  });

  const [theSearch, setTheSearch] = useState('');
  const handleInputChange = (event) => {
    // console.log('輸入', event.target.value);
    setTheSearch(event.target.value);
  };
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

    setChooseCategory((prev) => {
      const prevList = prev[type] || [];
      const newList = event.target.checked
        ? [...prevList, name]
        : prevList.filter((item) => item !== name);
      return {
        ...prev,
        [type]: newList,
      };
    });
    console.log('checkedMap', checkedMap);
  };
  useEffect(() => {
    const { theSearch, ...otherCategories } = chooseCategory;
    if (Object.values(otherCategories).every((arr) => arr.length === 0)) {
      console.log('沒篩選資料，除了theSearch以外');
      return;
    }
    // 若有資料，則執行以下程式碼

    const {
      brands = [],
      packages = [],
      origins = [],
      types = [],
      theStyles = [],
    } = otherCategories;

    const initialFilterData = {
      brands: brands.reduce((acc, brand) => ({ ...acc, [brand]: true }), {}),
      packages: packages.reduce((acc, item) => ({ ...acc, [item]: true }), {}),
      origins: origins.reduce(
        (acc, origin) => ({ ...acc, [origin]: true }),
        {}
      ),
      types: types.reduce((acc, type) => ({ ...acc, [type]: true }), {}),
      theStyles: theStyles.reduce(
        (acc, theStyle) => ({ ...acc, [theStyle]: true }),
        {}
      ),
    };
    setCheckedMap(initialFilterData);
    let openItem = [];
    if (brands.length > 0) {
      openItem.push('0');
    }
    if (types.length > 0) {
      openItem.push('1');
    }
    if (packages.length > 0) {
      openItem.push('2');
    }
    if (origins.length > 0) {
      openItem.push('3');
    }
    if (theStyles.length > 0) {
      openItem.push('4');
    }
    setOpen(openItem);
  }, []);

  return (
    <Container style={{ position: 'sticky', top: '65px' }}>
      <Row>
        <Col className="justify-content-center p-0 ">
          <Nav
            variant="pills"
            defaultActiveKey="/home"
            className="flex-column p-0 my-1"
          >
            <Nav.Item>
              <Nav.Link onClick={handleShow} className="fs-2 my-2 bg-light p-3">
                <div className="d-flex">
                  <MdManageSearch />
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="bg-light">
          <Offcanvas.Title>
            <span className="px-1 fs-4 fw-semibold">商品篩選</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <>
            <div className="border-bottom py-2 ">
              <span className="px-1 fs-5 fw-semibold">關鍵字搜尋</span>
              <Button
                className={`ms-1 py-0 px-1 align-baseline text-danger ${
                  theSearch.length > 0 ? 'd-inline' : 'd-none'
                }`}
                variant=""
                onClick={() => {
                  setTheSearch('');
                  if (theSearch !== '') {
                    setChooseCategory((prev) => ({
                      ...prev,
                      theSearch: [],
                    }));
                  }
                }}
              >
                清除搜尋 ↺
              </Button>
            </div>
            <InputGroup className="p-3">
              <Form.Control
                placeholder="Search"
                onChange={handleInputChange}
                value={theSearch}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                value={theSearch}
                onClick={() =>
                  setChooseCategory((prev) => ({
                    ...prev,
                    theSearch: [theSearch],
                  }))
                }
              >
                Search
              </Button>
            </InputGroup>

            <div className="border-bottom pt-3 pb-2 ">
              <span className="px-1 fs-5 fw-semibold">分類篩選</span>
              <Button
                className={`ms-1 py-0 px-1 align-baseline text-danger ${
                  Object.keys(checkedMap.brands).length > 0 ||
                  Object.keys(checkedMap.types).length > 0 ||
                  Object.keys(checkedMap.packages).length > 0 ||
                  Object.keys(checkedMap.origins).length > 0 ||
                  Object.keys(checkedMap.theStyles).length > 0
                    ? 'd-inline'
                    : 'd-none'
                }`}
                variant=""
                onClick={() => {
                  console.log('按一下');
                  setCheckedMap({
                    brands: {},
                    types: {},
                    packages: {},
                    origins: {},
                    theStyles: {},
                  });
                  setChooseCategory({
                    brands: [],
                    types: [],
                    packages: [],
                    origins: [],
                    theStyles: [],
                  });
                }}
              >
                清除篩選 ↺
              </Button>
            </div>
            <Accordion defaultActiveKey={open} flush alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>品牌</Accordion.Header>
                <Accordion.Body>
                  <Form>
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>種類</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    {types.map((item, index) => {
                      return (
                        <Form.Check
                          key={index}
                          type="switch"
                          label={item}
                          data-type="types"
                          data-name={item}
                          checked={checkedMap.types[item]}
                          onChange={handleCheck}
                        />
                      );
                    })}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>包裝</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    {packages.map((item, index) => {
                      return (
                        <Form.Check
                          key={index}
                          type="switch"
                          label={item}
                          data-type="packages"
                          data-name={item}
                          checked={checkedMap.packages[item]}
                          onChange={handleCheck}
                        />
                      );
                    })}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>產地</Accordion.Header>
                <Accordion.Body>
                  <Form>
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>風味</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    {theStyles.map((item, index) => {
                      return (
                        <Form.Check
                          key={index}
                          type="switch"
                          label={item}
                          data-type="theStyles"
                          data-name={item}
                          checked={checkedMap.theStyles[item]}
                          onChange={handleCheck}
                        />
                      );
                    })}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
export default ProductFilter;
