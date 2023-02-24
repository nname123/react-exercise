import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useProduct } from '../../../Contexts/ProductProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../../ComponentShare/Card';
import styles from './List.module.scss';
import Path from '../../../Layout/Item/Path/Path';
import axios from 'axios';
// import Pagination from '../../ComponentShare/Pagination';
import { Fragment } from 'react';
import Pagination from '@mui/material/Pagination';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import {
  brands,
  cates,
  items,
  origins,
  // cardInfo,
} from '../../../Config/ProductConfig';
//搜尋套件
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const List = () => {
  const {
    list_control,
    sidebar,
    block_brand,
    block_cate,
    block_items,
    block_origin,
    block_price,
    Inquire,
    text_c,
    card_group,
    card_control,
    card_block,
    list_container,
    productd_search,
    btn_push,
    pages,
    list_sendCart,
    brands_show,
    brands_show2,
    box1,
  } = styles;

  const goToTop = () => {
    window.scrollTo({
      behavior: 'instant',
      top: 0,
      left: 0,
    });
  };

  //資料庫取資料
  // const [products, setProducts] = useState([]);
  // ============================2/13改================================

  const { products, getProducts, chooseCategory } = useProduct();
  const location = useLocation();
  const urlArray = location.pathname.split('/');
  const lastWord = urlArray[urlArray.length - 1];
  // ============================2/13改================================
  // 載入指示的spinner動畫用的
  const [isLoading, setIsLoading] = useState(false);

  //篩選所需值
  const [inputValue, setInputValue] = useState('');

  //控制搜尋
  // const [searchValue, setSearchValue] = useState('');

  //種類
  const [brandsValue, setBrandsValue] = useState('');
  // ============================2/13改================================
  const [catesValue, setCatesValue] = useState(
    lastWord === 'category' ? chooseCategory : []
  );
  // ============================2/13改================================

  const [orginValue, setOrginValue] = useState('');
  const [packageValue, setPackageValue] = useState('');

  // x秒後自動關掉spinner(設定isLoading為false)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    // setIsLoading(true);
    // if (products.length === 0) {
    // }

    getProducts();
  }, []);

  //列表選項下拉
  const [showMore, setShowMore] = useState(false);
  const [showMoreCate, setShowMoreCate] = useState(false);
  const [showMoreItem, setShowMoreItem] = useState(false);
  const [showMoreOrigin, setShowMoreOrigin] = useState(false);
  const navigate = useNavigate();
  function clickHandler() {
    setShowMore(!showMore);
  }
  function clickHandlerCate() {
    setShowMoreCate((pre) => !pre);
  }
  function clickHandlerItem() {
    setShowMoreItem((pre) => !pre);
  }
  function clickHandlerOrigin() {
    setShowMoreOrigin((pre) => !pre);
  }
  //到商品細節頁
  //cardID=info.id
  function goToDetail(cardId) {
    navigate(`/products/product_detail/${cardId}`, { replace: false });
  }

  //分頁
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = products.slice(firstPostIndex, lastPostIndex);
  useEffect(() => {
    console.log('products: ', products);
  }, [products]);

  // 條件篩選

  const searchProducts = useMemo(() => {
    const searchFilter = products.filter((product) => {
      // 如果沒有搜尋就全顯示
      if (inputValue === '') return true;
      // 如果有搜尋 name 裡面有搜尋的留下 其餘篩選掉
      if (product.name.indexOf(inputValue) !== -1) {
        return true;
      } else {
        return false;
      }
    });
    //品牌
    const brandFilter = searchFilter.filter((product) => {
      if (brandsValue.length === 0) {
        return true;
      } else {
        return brandsValue.indexOf(product.brand) !== -1;
      }
    });
    //種類
    const cateFilter = brandFilter.filter((product) => {
      if (catesValue.length === 0) {
        return true;
      } else {
        return catesValue.indexOf(product.type) !== -1;
      }
    });
    //產地orginValue
    const orginFilter = cateFilter.filter((product) => {
      if (orginValue.length === 0) {
        return true;
      } else {
        return orginValue.indexOf(product.place) !== -1;
      }
    });
    //包裝packageValue
    const packageFilter = orginFilter.filter((product) => {
      if (packageValue.length === 0) {
        return true;
      } else {
        return packageValue.indexOf(product.package) !== -1;
      }
    });
    return packageFilter;
  }, [products, inputValue, brandsValue, catesValue, orginValue, packageValue]);

  // 分頁
  const filteredProducts = useMemo(() => {
    return searchProducts.filter((_, index) => {
      if (
        index >= postsPerPage * (currentPage - 1) &&
        index < postsPerPage * currentPage
      ) {
        return true;
      } else {
        return false;
      }
    });
  }, [searchProducts, postsPerPage, currentPage]);
  function handleChange(event, value) {
    setCurrentPage(value);
  }
  // 如果篩選條件有改 回到第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [inputValue, brandsValue, catesValue, orginValue, packageValue]);

  // bootstrap 的spinner
  const spinner = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );
  //CheckBox功能
  function checkBrandHandler(event) {
    // setIsLoading(true);
    const value = event.target.value;
    setBrandsValue((pre) => {
      if (pre.indexOf(value) === -1) {
        return [...pre, value];
      } else {
        return pre.filter((item) => item !== value);
      }
    });
  }

  function checkCateHandler(event) {
    const value = event.target.value;
    setCatesValue((pre) => {
      if (pre.indexOf(value) === -1) {
        return [...pre, value];
      } else {
        return pre.filter((item) => item !== value);
      }
    });
  }

  function checkOrginHandler(event) {
    const value = event.target.value;
    setOrginValue((pre) => {
      if (pre.indexOf(value) === -1) {
        return [...pre, value];
      } else {
        return pre.filter((item) => item !== value);
      }
    });
  }

  function checkPackageHandler(event) {
    const value = event.target.value;
    setPackageValue((pre) => {
      if (pre.indexOf(value) === -1) {
        return [...pre, value];
      } else {
        return pre.filter((item) => item !== value);
      }
    });
  }

  return (
    <div className="custom-container d-flex justify-content-center">
      <div className={list_container}>
        <Path pathObj={{ path: ['商品列表'] }} />

        <div className={`${list_control} row mx-2`}>
          <div
            className={`${sidebar} col-md-2 d-flex flex-row flex-md-column  `}
          >
            <div className={`${box1}`}>
              <div className={`${block_brand} d-flex flex-column px-2`}>
                <h4>品牌</h4>

                {brands
                  .filter((brand, index) => (showMore ? true : index <= 3))
                  .map((brand) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={brand.name}
                          onChange={checkBrandHandler}
                        />
                        <label class="form-check-label" for="gridCheck1">
                          {brand.name}
                        </label>
                      </div>
                    );
                  })}

                <button
                  className={`${brands_show} btn2 d-block d-md-none`}
                  onClick={clickHandler}
                >
                  {showMore ? 'close ▲' : 'open ▼'}
                </button>
                {!showMore && (
                  <button
                    className={`${brands_show2} btn2 d-none d-md-block`}
                    onClick={clickHandler}
                  >
                    更多 ▼
                  </button>
                )}
              </div>


              <div className={`${block_cate} d-flex flex-column px-2`}>
                <h4>類別</h4>
                {cates
                  .filter((cate, index) => (showMoreCate ? true : index <= 3))
                  .map((cate) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={cate.name}
                          onChange={checkCateHandler}
                          // ============================2/13改================================
                        checked={catesValue.includes(cate.name)}
                        // ============================2/13改================================
                        />
                        <label class="form-check-label" for="gridCheck1">
                          {cate.name}
                        </label>
                      </div>
                    );
                  })}
                <button
                  className="btn2 d-block d-md-none"
                  onClick={clickHandlerCate}
                >
                  {showMoreCate ? 'close ▲' : 'open ▼'}

                </button>
                {!showMoreCate && (
                  <button
                    className="btn2 d-none d-md-block"
                    onClick={clickHandlerCate}
                  >
                    更多▼
                  </button>
                )}
              </div>
            </div>
            <div className={`${box1}`}>
              <div className={`${block_items} d-flex flex-column px-2`}>
                <h4>包裝</h4>
                {items
                  .filter((item, index) => (showMoreItem ? true : index <= 3))
                  .map((item) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.name}
                          onChange={checkPackageHandler}
                        />
                        <label class="form-check-label" for="gridCheck1">
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
                <button
                  className="btn2 d-block d-md-none"
                  onClick={clickHandlerItem}
                >
                  {showMoreItem ? 'close ▲' : 'open ▼'}
                </button>
                {!showMoreItem && (
                  <button
                    className="btn2 d-none d-md-block"
                    onClick={clickHandlerItem}
                  >
                    更多▼
                  </button>
                )}
              </div>

              <div className={`${block_origin} d-flex flex-column px-2`}>
                <h4>產地</h4>
                {origins
                  .filter((origin, index) =>
                    showMoreOrigin ? true : index <= 3
                  )
                  .map((origin) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={origin.name}
                          onChange={checkOrginHandler}
                        />
                        <label class="form-check-label" for="gridCheck1">
                          {origin.name}
                        </label>
                      </div>
                    );
                  })}
                <button
                  className="btn2 d-block d-md-none"
                  onClick={clickHandlerOrigin}
                >
                  {showMoreOrigin ? 'close ▲' : 'open ▼'}
                </button>
                {!showMoreOrigin && (
                  <button
                    className="btn2 d-none d-md-block"
                    onClick={clickHandlerOrigin}
                  >
                    更多▼
                  </button>
                )}
              </div>
            </div>

            {/* <div className={`${block_price} d-flex flex-column px-2`}>
              <h4>價格範圍</h4>
              <div className="price-check">
                <input type="text" className={text_c} placeholder="最小值$" />

                <div>到</div>
                <input type="text" className={text_c} placeholder="最大值$" />
              </div>
              <button type="submit" className={`btn1 ${Inquire} `}>
                查詢
              </button>
            </div> */}
          </div>

          <div className={`${card_block} col-12 col-md-10 `}>
            <div className="search_box d-flex">
              <div
                style={{ backgroundColor: '' }}
                className={`${productd_search} d-flex border rounded-3`}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsLoading(true);
                    }}
                    placeholder="查詢商品"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </div>
              {/* <button
                onClick={() => {
                  setSearchValue(inputValue);
                }}
                className={`${btn_push} btn1 `}
              >
                查詢
              </button> */}
            </div>

            <div className={`${card_group} row mx-0`}>
              {/* {currentPosts.map((v, i) => {
                return (
                  <Fragment key={(v, i)}>
                    {currentPosts.map((info) => {
                      return (
                        <div
                          className={`${card_control} col-6 col-md-3 px-0 mb-3 `}
                          key={info.id}
                          onClick={() => goToDetail(info.id)}
                        >
                          <Card
                            title={info.name}
                            rating={info.rating}
                            price={info.price}
                          />
                        </div>
                      );
                    })}
                  </Fragment>

                );
              })} */}

              {isLoading ? (
                spinner
              ) : filteredProducts.length === 0 ? (
                <h1>查無商品</h1>
              ) : (
                filteredProducts.map((v, i) => {
                  return (
                    <div
                      className={`${card_control} col-6 col-md-3 px-0 mb-3 `}
                      key={v.id}
                      onClick={() => goToDetail(v.id)}
                    >
                      <Card
                        title={v.name}
                        rating={v.rating}
                        price={v.price}
                        id={v.id}
                      />
                    </div>
                  );
                })
              )}
              {/* <Pagination
                totalPosts={products.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              /> */}
              {isLoading ? null : (
                <div className={`${pages} d-flex justify-content-center`}>
                  <Pagination
                    count={Math.ceil(searchProducts.length / postsPerPage)}
                    page={currentPage}
                    onChange={handleChange}
                    onClick={goToTop}
                    siblingCount={3}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
