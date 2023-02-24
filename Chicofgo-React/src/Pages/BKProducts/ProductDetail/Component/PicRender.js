import React, { useEffect, useState } from 'react';
import styles from './PicRender.module.scss';
// import mainPic from '../../../../Img/ProductsTest/test.jpg';
// import littlePic2 from '../../../../Img/ProductsTest/test2.jpg';
// import littlePic3 from '../../../../Img/ProductsTest/test3.jpg';
import { v4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';

const PicRender = (props) => {
  const location = useLocation();
  const urlArray = location.pathname.split('/');
  const id = parseInt(urlArray[urlArray.length - 1]);
  const product_id = id;
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const fetchImages = async (index) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/images/productImg/coffee_${product_id}/coffee_${product_id}-${index}.png`
        );
        if (response.status !== 200) {
          console.log(imageUrls);
          console.log(Array.from(imageUrls));
          return;
        }
        const url = response.url;
        if (!imageUrls.includes(url)) {
          // setImageUrls((prevUrls) => [...prevUrls, url]);
          setImageUrls((prevUrls) => [...new Set([...prevUrls, url])]);
        }
        fetchImages(index + 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages(1);
  }, []);

  const { left_picbox, main_pic, group_pic_box, group_pic } = styles;
  let pics = imageUrls;

  // const pics = [mainPic, littlePic2, littlePic3];
  const [picNm, setpicNm] = useState(0);
  const [showPic, setshowPic] = useState(pics[picNm]);
  useEffect(() => {
    setshowPic(picNm[picNm]);
    console.log(imageUrls);
  }, [picNm]);

  return (
    <div>
      <div className={`${left_picbox} d-flex flex-column`}>
        <div className={`${main_pic}`}>
          <img src={pics[picNm]} alt="main product's pic" />
        </div>
        <ul className={`${group_pic_box} d-flex align-items-center`}>
          {pics.map((i, v) => {
            return (
              <li
                onClick={() => setpicNm(v)}
                key={v4()}
                className={`${group_pic}`}
              >
                <img src={i} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PicRender;
