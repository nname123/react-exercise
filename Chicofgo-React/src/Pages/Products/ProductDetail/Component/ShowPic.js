import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { Container, Image, Row } from 'react-bootstrap';

const ShowPic = (props) => {
  const location = useLocation();
  const urlArray = location.pathname.split('/');
  const id = parseInt(urlArray[urlArray.length - 1]);
  const product_id = id;
  const [imageUrls, setImageUrls] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
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
    // console.log(imageUrls);
  }, []);

  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: nav2,
    initialSlide: 1,
    arrows: false,
  };

  const settingsThumbs = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    adaptiveHeight: true,
    variableWidth: true,
    arrows: false,
  };

  return (
    <>
      <Container
        className={`mb-4 rounded-4`}
        style={{ backgroundColor: 'rgb(254,254,254)' }}
      >
        <Row>
          <Slider
            {...settingsMain}
            ref={(slider) => setNav1(slider)}
            className={`px-4 pt-4`}
          >
            {imageUrls.map((image) => (
              <div>
                <Image fluid src={image} className={`rounded-4`} />
              </div>
            ))}
          </Slider>
        </Row>
        <Row>
          <Slider
            {...settingsThumbs}
            ref={(slider) => setNav2(slider)}
            className={``}
          >
            {imageUrls.map((image) => (
              <div className={`mx-2 my-3`}>
                <Image
                  fluid
                  src={image}
                  className={`rounded-4`}
                  style={{
                    width: '80px',
                    height: '80px',
                  }}
                />
              </div>
            ))}
          </Slider>
        </Row>
      </Container>
    </>
  );
};

export default ShowPic;
