import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function EventCarousel(props) {
  const imgName = props.showImg;
  const srcollTo = props.srcollTo;

  const goCoupon = () => {
    setTimeout(() => {
      window.scrollTo(0, srcollTo);
    }, 100);
  };

  return (
    <>
      <Carousel fade={props.fade}>
        {imgName.map((v, i) => {
          return (
            <Carousel.Item interval={props.changeDelay} key={i}>
              <Link to="/coupon" onClick={goCoupon}>
                <img
                  className="d-block w-100"
                  src={require('../../../Img/Event/' + v)}
                  alt="slide"
                />
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default EventCarousel;
