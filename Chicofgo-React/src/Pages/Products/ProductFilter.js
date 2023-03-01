import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  InputGroup,
  Col,
  Row,
  Container,
  Collapse,
  Form,
} from 'react-bootstrap';
import { useProduct } from '../../Contexts/ProductProvider';

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

  const [open, setOpen] = useState(false);
  const [checkedMap, setCheckedMap] = useState({
    brands: {},
    types: {},
    packages: {},
    origins: {},
    theStyles: {},
  });

  const [theSearch, setTheSearch] = useState('');

  const handleInputChange = (event) => {
    console.log('輸入', event.target.value);
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
    setOpen(true);
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
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <div className="border-bottom pt-3 pb-2 ">
            <span className="fs-5 fw-semibold">商品搜尋</span>
          </div>
          <InputGroup className="pt-3">
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
          <div className="border-bottom my-2 pt-1 pb-2">
            <Link
              as={Button}
              onClick={() => {
                setTheSearch('');
                if (theSearch !== '') {
                  setChooseCategory((prev) => ({
                    ...prev,
                    theSearch: [],
                  }));
                }
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
            <li className="">
              <Button
                className="align-items-center px-1"
                onClick={() => setOpen(!open)}
                data-bs-target="#home-collapse"
                aria-expanded={open}
                variant=""
              >
                風味 ▼
              </Button>
              <Collapse in={open}>
                <Form className="ms-3">
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
