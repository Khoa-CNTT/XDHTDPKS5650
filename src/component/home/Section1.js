
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Section1() {
  return (
    <section id="content-section-1">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false, 
        }}
        spaceBetween={20}
        slidesPerView={1}
        className="mySwiper"
      >
      <SwiperSlide>
      <div style={{ position: 'relative' }}>
        <img src="/frontend/anh/slide1.jpg" alt="Slide 1" style={{ width: '100%', height: 'auto'}} />
        <div className="intro-text">
          <p className="line line-1">WELCOME TO</p>
          <p className="line line-2">____</p>
          <p className="line line-3">Shilla Monogram</p>
          <p className="line line-4">Khách sạn số 1 Việt Nam</p>
        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/frontend/anh/hoboi.png" alt="Slide 1" style={{ width: '100%', height: 'auto'}} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/frontend/anh/nhahang.png" alt="Slide 1" style={{ width: '100%', height: 'auto'}} />
      </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Section1;
