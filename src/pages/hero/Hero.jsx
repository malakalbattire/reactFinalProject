import heroImg1 from '../../../public/sheinhero.webp';
import heroImg2 from '../../../public/sheinhero1.png';
import './Hero.css';
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import 'swiper/css/autoplay';

export default function Hero() {
  return (
    <>
      <div className="container ">
        <Swiper
          className="swiperContainer"
          modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide className="mm">
            <NavLink to="category/656afd2a5f24a07ecd5a5090">
              <img className=" w-100 " src={heroImg2}></img>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="category/656b5d2e7ef25cbb57716392">
              <img className="w-100 " src={heroImg1}></img>
            </NavLink>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="container d-flex justify-content-center w-100"></div>
    </>
  );
}
