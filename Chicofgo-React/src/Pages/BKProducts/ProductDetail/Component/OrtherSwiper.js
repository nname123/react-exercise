// import styles from './OtherSwiper.module.scss';
// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// // import { Swiper, SwiperSlide } from 'swiper/react';
// import Card from '../../../ComponentShare/Card';
// import { cardInfo } from '../../../../Config/ProductConfig';

// // Import Swiper styles
// // import 'swiper/css';
// // import 'swiper/css/pagination';
// // import 'swiper/css/navigation';

// import './styles.scss';

// // import required modules
// // import { Pagination, Navigation } from 'swiper';

// const OrtherWrap = () => {
//   const { orther_swiper, title_contorl } = styles;
//   return (
//     // <div className={`${orther_swiper} d-flex  flex-column align-items-center`}>
//       <h3 className={`${title_contorl} mb-3`}>其他商品</h3>
//       <Swiper
//         slidesPerView={4}
//         spaceBetween={30}
//         slidesPerGroup={4}
//         loop={true}
//         loopFillGroupWithBlank={true}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Pagination, Navigation]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Card />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

import styles from './OtherSwiper.module.scss';
import React, { useRef, useState } from 'react';
// Import Swiper React components

import { cardInfo } from '../../../../Config/ProductConfig';
import PauseOnHover from './PauseOnHover';

const OrtherWrap = () => {
  const { orther_swiper, title_contorl } = styles;

  return (
    <div className={`${orther_swiper} d-flex  flex-column align-items-center`}>
      <h3 className={`${title_contorl} mb-3`}>其他商品</h3>
      <PauseOnHover />
    </div>
  );
};

export default OrtherWrap;
