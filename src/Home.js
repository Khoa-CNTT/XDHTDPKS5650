import Section1 from "./components/Content/Section1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css';
const rooms = [
  {
    name: "Grand Superior Room – 2 giường đôi",
    images: ["2doi.png", "2doi2.png"],
    link: "room/grand-superior-room-two-king-beds/index.html",
  },
  {
    name: "Superior Room – Phòng sang trọng",
    images: ["1giuong.jpg", "1giuong2.jpg"],
    link: "room/superior-room-two-double-beds/index.html",
  },
  {
    name: "Deluxe Room – Phòng thông thống",
    images: ["2don.png", "2don2.png"],
    link: "room/deluxe-room/index.html",
  },
];

function Home() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        <SwiperSlide>
          <img src="/frontend/anh/out.png" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/frontend/anh/hoboi.png" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/frontend/anh/nhahang.png" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
      <div className="content-wrapper">
        <div className="gdlr-content">
          {/* Above Sidebar Section*/}
          {/* Sidebar With Content Section*/}
          <div className="with-sidebar-wrapper">
            <section id="content-section-1">
              <div
                className="gdlr-full-size-wrapper gdlr-show-all"
                style={{ paddingBottom: "0px", backgroundColor: "#ffffff" }}
              >
                <div
                  className="gdlr-master-slider-item gdlr-slider-item gdlr-item"
                  style={{ marginBottom: "0px" }}
                >
                  {/* MasterSlider */}
                  <div id="P_MS5af5c0e887f3f" className="master-slider-parent">
                    {/* MasterSlider Main */}
                    <div id="MS5af5c0e887f3f" className="master-slider ms-skin-default">
                      {/* Slide 1 */}
                      <div className="ms-slide" data-delay={5} data-fill-mode="fill">
                        <img
                          src="plugins/masterslider/public/assets/css/blank.gif"
                          alt="hotel"
                          data-src="anh/slide1.jpg"
                        />
                        <div className="text-overlay fade-in-up" style={{ top: "40%" }}>
                          Welcome To
                        </div>
                        <div className="text-overlay fade-in-up delay-1" style={{ top: "50%" }}>
                          Shilla Monogram
                        </div>
                        <div className="text-overlay fade-in-up delay-2" style={{ top: "60%" }}>
                          Hotel số 1 Đà Nẵng
                        </div>
                      </div>

                      {/* Slide 2 */}
                      <div className="ms-slide" data-delay={5} data-fill-mode="fill">
                        <img
                          src="plugins/masterslider/public/assets/css/blank.gif"
                          alt="pool"
                          data-src="anh/hoboi.png"
                        />
                        <div className="text-overlay fade-in-up" style={{ top: "40%" }}>
                          Thỏa thích
                        </div>
                        <div className="text-overlay fade-in-up delay-1" style={{ top: "50%" }}>
                          Với hồ bơi
                        </div>
                        <div className="text-overlay fade-in-up delay-2" style={{ top: "60%" }}>
                          Hiện đại nhất thế giới
                        </div>
                      </div>

                      {/* Slide 3 */}
                      <div className="ms-slide" data-delay={5} data-fill-mode="fill">
                        <img
                          src="plugins/masterslider/public/assets/css/blank.gif"
                          alt="restaurant"
                          data-src="anh/nhahang.png"
                        />
                        <div className="text-overlay fade-in-up" style={{ top: "40%" }}>
                          Buffet ăn tối
                        </div>
                        <div className="text-overlay fade-in-up delay-1" style={{ top: "50%" }}>
                          Phục vụ đầy đủ các món Á - Âu
                        </div>
                        <div className="text-overlay fade-in-up delay-2" style={{ top: "60%" }}>
                          vào sáng và tối.
                        </div>
                      </div>
                    </div>
                    {/* END MasterSlider Main */}
                  </div>
                  {/* END MasterSlider */}
                </div>
              </div>
            </section>
            <section id="content-section-2">
              <div
                className="gdlr-color-wrapper  gdlr-show-all gdlr-skin-dark-brown"
                style={{
                  backgroundColor: "#322b23",
                  paddingTop: "48px",
                  paddingBottom: "27px"
                }}
              >
                <div className="container">
                  <div
                    className="gdlr-hotel-availability-wrapper"
                    style={{ marginBottom: "20px" }}
                  >
                    <form
                      className="gdlr-hotel-availability gdlr-item"
                      id="gdlr-hotel-availability"
                      method="post"
                      action="https://demo.goodlayers.com/hotelmaster/dark/?booking"
                    >
                      <div className="gdlr-reservation-field gdlr-resv-datepicker">
                        <span className="gdlr-reservation-field-title">
                          Thời gian vào
                        </span>
                        <div className="gdlr-datepicker-wrapper">
                          <input
                            type="text"
                            id="gdlr-check-in"
                            className="gdlr-datepicker"
                            autoComplete="off"
                            data-dfm="d M yy"
                            data-block="[]"
                            defaultValue="2018-05-11"
                          />
                          <input
                            type="hidden"
                            className="gdlr-datepicker-alt"
                            name="gdlr-check-in"
                            autoComplete="off"
                            defaultValue="2018-05-11"
                          />
                        </div>
                      </div>
                      <div className="gdlr-reservation-field gdlr-resv-combobox ">
                        <span className="gdlr-reservation-field-title">
                          Đêm
                        </span>
                        <div className="gdlr-combobox-wrapper">
                          <select name="gdlr-night" id="gdlr-night">
                            <option value={1} selected>
                              1
                            </option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                          </select>
                        </div>
                      </div>
                      <div className="gdlr-reservation-field gdlr-resv-datepicker">
                        <span className="gdlr-reservation-field-title">
                          Thời gian ra
                        </span>
                        <div className="gdlr-datepicker-wrapper">
                          <input
                            type="text"
                            id="gdlr-check-out"
                            className="gdlr-datepicker"
                            autoComplete="off"
                            data-min-night={1}
                            data-dfm="d M yy"
                            data-block="[]"
                            defaultValue="2018-05-12"
                          />
                          <input
                            type="hidden"
                            className="gdlr-datepicker-alt"
                            name="gdlr-check-out"
                            autoComplete="off"
                            defaultValue="2018-05-12"
                          />
                        </div>
                      </div>
                      <div className="gdlr-reservation-field gdlr-resv-combobox ">
                        <span className="gdlr-reservation-field-title">
                          Số người lớn
                        </span>
                        <div className="gdlr-combobox-wrapper">
                          <select name="gdlr-adult-number[]">
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2} selected>
                              2
                            </option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                          </select>
                        </div>
                      </div>
                      <div className="gdlr-reservation-field gdlr-resv-combobox ">
                        <span className="gdlr-reservation-field-title">
                          Số trẻ em
                        </span>
                        <div className="gdlr-combobox-wrapper">
                          <select name="gdlr-children-number[]">
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                          </select>
                        </div>
                      </div>
                      <div className="gdlr-hotel-availability-submit">
                        <input
                          type="hidden"
                          name="hotel_data"
                          defaultValue={1}
                        />
                        <input
                          type="hidden"
                          name="gdlr-room-number"
                          defaultValue={1}
                        />
                        <input
                          type="submit"
                          className="gdlr-reservation-bar-button gdlr-button with-border"
                          defaultValue="Kiểm tra"
                        />
                      </div>
                      <div className="clear" />
                    </form>
                  </div>
                  <div className="clear" />
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
            <section id="content-section-3">
              <div
                className="gdlr-color-wrapper  gdlr-show-all no-skin"
                style={{ backgroundColor: "#0a0a0a", paddingTop: "60px", paddingBottom: "60px" }}
              >
                <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                  <div className="four columns" style={{ flex: '1', minWidth: '300px' }} >
                    <div className="gdlr-ux column-service-ux" >
                      <div className="gdlr-item gdlr-column-service-item gdlr-type-2" >
                        <div className="column-service-image">
                          <img
                            src="/frontend/anh/letan.png"
                            alt=""
                            style={{ width: '300px', height: '179px', margin: '0', padding: '0' }}
                          />
                        </div>
                        <div className="column-service-content-wrapper" style={{ textAlign: 'center' }}>
                          <h3 className="column-service-title">
                            Dịch vụ lễ tân chu đáo chuyên nghiệp
                          </h3>
                          <div className="column-service-divider" />
                          <div className="column-service-content gdlr-skin-content">
                            <p>
                              Nhân viên được đào tạo với hơn 5 năm kinh nghiệm
                              và sự thấu hiểu khách hàng mang đến các lựa chọn
                              hoàn hảo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="four columns" style={{ flex: '1', minWidth: '300px' }}>
                    <div className="gdlr-ux column-service-ux">
                      <div className="gdlr-item gdlr-column-service-item gdlr-type-2">
                        <div className="column-service-image">
                          <img
                            src="/frontend/anh/spa.png"
                            alt=""
                            style={{ width: '300px', height: '179px', margin: '0', padding: '0' }}
                          />
                        </div>
                        <div className="column-service-content-wrapper" style={{ textAlign: 'center' }}>
                          <h3 className="column-service-title">
                            Phòng spa thư giãn mỗi cuối ngày
                          </h3>
                          <div className="column-service-divider" />
                          <div className="column-service-content gdlr-skin-content">
                            <p>
                              Phòng được trang bị các thiết bị tiện ích giúp
                              khách hàng thư giãn khi được tận hưởng.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="four columns" style={{ flex: '1', minWidth: '300px' }}>
                    <div className="gdlr-ux column-service-ux">
                      <div className="gdlr-item gdlr-column-service-item gdlr-type-2">
                        <div className="column-service-image">
                          <img
                            src="/frontend/anh/gym.png"
                            alt=""
                            style={{ width: '300px', height: '179px', margin: '0', padding: '0' }}
                          />
                        </div>
                        <div className="column-service-content-wrapper" style={{ textAlign: 'center' }}>
                          <h3 className="column-service-title">
                            Phòng tập gym đầy đủ hiện đại
                          </h3>
                          <div className="column-service-divider" />
                          <div className="column-service-content gdlr-skin-content">
                            <p>
                              Phòng được trang bị các thiết bị hiện đại và đầy
                              đủ giúp mọi người nâng cao sức khỏe.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
            <section id="content-section-4">
              <div
                className="gdlr-parallax-wrapper"
                style={{
                  backgroundImage: 'url("/frontend/anh/duoi1.png")',
                  paddingTop: "80px",
                  paddingBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="container" style={{ width: "90%" }}>
                  <h3 className="gdlr-item-title" style={{ textAlign: "center" }}>
                    Shilla Monogram Rooms
                  </h3>

                  <Swiper
                    spaceBetween={30}
                    slidesPerView={1} // Chỉ hiển thị một ảnh tại một thời điểm
                    navigation
                    loop
                    style={{ width: "100%", height: "400px" }}
                  >
                    {rooms.map((room, index) => (
                      <SwiperSlide key={index}>
                        <a href={room.link}>
                          <img
                            src={`/frontend/anh/${room.images[0]}`} // Hiển thị ảnh đầu tiên
                            alt={room.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "5px",
                              objectFit: "cover",
                            }}
                          />
                          <h4 style={{ textAlign: "center", marginTop: "10px", color: "#333" }}>
                            {room.name}
                          </h4>
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <a href="#" className="gdlr-item-title-link" style={{ display: "block", textAlign: "center", marginTop: "20px" }}>
                    Xem tất cả phòng tại đây <i className="fa fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </section>
            <section id="content-section-5">
              <div
                className="gdlr-parallax-wrapper gdlr-background-image gdlr-show-all gdlr-skin-dark-skin"
                id="gdlr-parallax-wrapper-2"
                data-bgspeed="0.1"
                style={{
                  backgroundImage: 'url("/frontend/anh/duoi2.png")',
                  paddingTop: "160px",
                  paddingBottom: "110px"
                }}
              >
                <div className="container">
                  <div className="six columns">
                    <div className="gdlr-title-item">
                      <div className="gdlr-item-title-wrapper gdlr-item pos-center pos-center-divider ">
                        <div className="gdlr-item-title-head">
                          <h3 className="gdlr-item-title gdlr-skin-title gdlr-skin-border">
                            Thông tin về chúng tôi
                          </h3>
                          <div className="clear" />
                        </div>
                        <div className="gdlr-item-title-divider" />
                        <div className="gdlr-item-title-caption gdlr-title-font gdlr-skin-info">
                          Cảm hứng có thể được tìm thấy ở khắp mọi nơi
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="six columns">
                    <div className="gdlr-item gdlr-content-item">
                      <p style={{ textAlign: "center" }}>
                        Khách sạn Đà Năng là khách sạn đầu tiên được ra mắt của
                        Shilla Monogram, mang đến truyền thống yêu thích phong
                        cảnh thiên nhiên vốn có của Hàn Quốc, chứa đựng trong tự
                        nhiên và văn hóa Việt Nam cùng thiết kế đặc trưng. Quý
                        khách có thể bắt gặp các tác phẩm nghệ thuật của họa sĩ
                        nổi tiếng Việt Nam Hà Mạnh Thắng, với cách trưu tượng
                        hóa cành biên Đà Năng thay đổi theo mùa, tại khắp nơi
                        trong khách sạn, truyền tải đến quý khách nét hấp dẫn
                        tại địa phương được chúng tôi chọn lọc kỹ lưỡng và tái
                        hiện lại. Hy vọng quý khách có thể tận hưởng những
                        khoảnh khắc như kỹ nghi mỗi ngày cùng các hoạt động đa
                        dạng tại khu vui chơi dành cho trẻ em Little Monogram,
                        không gian trãi nghiêm giải trí Activity Studio, các bề
                        bơi ngoài trời đa dạng hãp dẫn của Shilla Monogram Đà
                        Nẵng.&nbsp;
                      </p>
                    </div>
                  </div>
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
            <section id="content-section-6">
              <div
                className="gdlr-color-wrapper  gdlr-show-all no-skin"
                style={{ backgroundColor: "#292929", paddingTop: "70px" }}
              >
                <div className="container">
                  <div className="six columns">
                    <div className="gdlr-item-title-wrapper gdlr-item pos-left pos-left-divider ">
                      <div className="gdlr-item-title-head">
                        <h3 className="gdlr-item-title gdlr-skin-title gdlr-skin-border">
                          Các cấp thành viên
                        </h3>
                        <div className="clear" />
                      </div>
                      <div className="gdlr-item-title-divider" />
                    </div>
                    <div className="blog-item-wrapper">
                      <div className="blog-item-holder">
                        <div className="gdlr-item gdlr-blog-widget">
                          <div className="gdlr-ux gdlr-blog-widget-ux">
                            <article
                              id="post-862"
                              className="post-862 post type-post status-publish format-standard has-post-thumbnail hentry category-blog category-fit-row tag-blog tag-link tag-news"
                            >
                              <div className="gdlr-standard-style">
                                <div className="blog-date-wrapper gdlr-title-font">
                                  <span className="blog-date-day">Lần</span>
                                  <span className="blog-date-month">Đầu</span>
                                </div>
                                <header className="post-header">
                                  <h3 className="gdlr-blog-title">
                                    <a href="magna-pars-studiorum\index.html">
                                      Hạng đồng
                                    </a>
                                  </h3>
                                  <div className="gdlr-blog-excerpt">
                                    Quà lần đầu, điểm(3% giá trị phòng),...
                                    <div className="clear" />
                                    <a
                                      href="magna-pars-studiorum\index.html"
                                      className="excerpt-read-more"
                                    >
                                      Continue Reading
                                      <i className="fa fa-long-arrow-right icon-long-arrow-right" />
                                    </a>
                                  </div>
                                  <div className="clear" />
                                </header>
                                {/* entry-header */}
                                <div className="clear" />
                              </div>
                            </article>
                            {/* #post */}
                          </div>
                        </div>
                        <div className="gdlr-item gdlr-blog-widget">
                          <div className="gdlr-ux gdlr-blog-widget-ux">
                            <article
                              id="post-859"
                              className="post-859 post type-post status-publish format-standard has-post-thumbnail hentry category-blog category-fit-row"
                            >
                              <div className="gdlr-standard-style">
                                <div className="blog-date-wrapper gdlr-title-font">
                                  <span className="blog-date-day">1 ngày</span>
                                  <span className="blog-date-month">
                                    100 điểm
                                  </span>
                                </div>
                                <header className="post-header">
                                  <h3 className="gdlr-blog-title">
                                    <a href="sedial-eiusmod-tempor\index.html">
                                      Hạng bạc
                                    </a>
                                  </h3>
                                  <div className="gdlr-blog-excerpt">
                                    Quà thành viên, điểm (1000+3%), phiếu giảm
                                    giá 10%,...
                                    <div className="clear" />
                                    <a
                                      href="sedial-eiusmod-tempor\index.html"
                                      className="excerpt-read-more"
                                    >
                                      Continue Reading
                                      <i className="fa fa-long-arrow-right icon-long-arrow-right" />
                                    </a>
                                  </div>
                                  <div className="clear" />
                                </header>
                                {/* entry-header */}
                                <div className="clear" />
                              </div>
                            </article>
                            {/* #post */}
                          </div>
                        </div>
                        <div className="gdlr-item gdlr-blog-widget">
                          <div className="gdlr-ux gdlr-blog-widget-ux">
                            <article
                              id="post-2211"
                              className="post-2211 post type-post status-publish format-gallery has-post-thumbnail hentry category-blog category-life-style category-news-article tag-blog tag-gallery-thumbnail tag-life-style tag-news post_format-post-format-gallery"
                            >
                              <div className="gdlr-standard-style">
                                <div className="blog-date-wrapper gdlr-title-font">
                                  <span className="blog-date-day">10 ngày</span>
                                  <span className="blog-date-month">
                                    1000 điểm
                                  </span>
                                </div>
                                <header className="post-header">
                                  <h3 className="gdlr-blog-title">
                                    <a href="gallery-post-format-title\index.html">
                                      Hạng Vàng
                                    </a>
                                  </h3>
                                  <div className="gdlr-blog-excerpt">
                                    Quà thành viên, điểm(3000+5%), phiếu giảm
                                    giá 20%, quà khác...
                                    <div className="clear" />
                                    <a
                                      href="gallery-post-format-title\index.html"
                                      className="excerpt-read-more"
                                    >
                                      Continue Reading
                                      <i className="fa fa-long-arrow-right icon-long-arrow-right" />
                                    </a>
                                  </div>
                                  <div className="clear" />
                                </header>
                                {/* entry-header */}
                                <div className="clear" />
                              </div>
                            </article>
                            {/* #post */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="six columns">
                    <div className="gdlr-item-title-wrapper gdlr-item pos-left pos-left-divider ">
                      <div className="gdlr-item-title-head">
                        <h3 className="gdlr-item-title gdlr-skin-title gdlr-skin-border">
                          Trưng bày
                        </h3>
                        <div className="clear" />
                      </div>
                      <div className="gdlr-item-title-divider" />
                    </div>
                    <div className="gdlr-gallery-item gdlr-item">
                      <div className="gallery-column six columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb1.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb2.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb3.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb4.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb5.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="clear" />
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb6.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb7.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb8.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="gallery-column three columns">
                        <div className="gallery-item">
                          <img
                            src="frontend\anh\tb9.png"
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="clear" />
                    </div>
                  </div>
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
            <section id="content-section-7">
              <div className="gdlr-color-wrapper  gdlr-show-all gdlr-skin-dark-testimonial" style={{ backgroundColor: '#1e1e1e', paddingTop: '80px', paddingBottom: '45px', display: 'flex' }}>
                <div className="container">
                  <div className="gdlr-testimonial-item-wrapper">
                    <div className="gdlr-item-title-wrapper gdlr-item pos-center gdlr-nav-container ">
                      <div className="gdlr-item-title-head">
                        <h3 className="gdlr-item-title gdlr-skin-title gdlr-skin-border">SHILLA REWARDS</h3>
                        <div className="gdlr-item-title-carousel"><i className="icon-angle-left gdlr-flex-prev" /><i className="icon-angle-right gdlr-flex-next" /></div>
                        <div className="clear" />
                      </div>
                    </div>
                    <div className="gdlr-item gdlr-testimonial-item carousel large plain-style">
                      <div className="gdlr-ux gdlr-testimonial-ux">
                        <div className="flexslider" data-type="carousel" data-nav-container="gdlr-testimonial-item" data-columns={1}>
                          <ul className="slides">
                            <li className="testimonial-item">
                              <div className="testimonial-content gdlr-skin-content">
                                <p>Shilla Rewards là dịch vụ tổng hợp hoàn toàn mới dành cho hội viên, cung cấp các ưu đãi và lợi ích điểm thường tại Seoul/Jeju Shilla Hotel, Shilla Monogram, Shilla Stay và các khách sạn liên kết.</p>
                              </div>
                              <div className="testimonial-info"><span className="testimonial-author gdlr-skin-link-color">Co-op</span><span className="testimonial-position gdlr-skin-info"><span>, </span>Shilla Stay</span>
                              </div>
                            </li>
                            <li className="testimonial-item">
                              <div className="testimonial-content gdlr-skin-content">
                                <p>Tận hưởng kỳ nghi dưỡng của bạn tại Đà Năng.
                                  Việt Nam với nhiều hoạt động bao gồm các sự kiện và các môn thể thao giải trí.</p>
                              </div>
                              <div className="testimonial-info"><span className="testimonial-author gdlr-skin-link-color">Phòng giải trí</span><span className="testimonial-position gdlr-skin-info"><span>, </span>Shilla Monogram</span>
                              </div>
                            </li>
                            <li className="testimonial-item">
                              <div className="testimonial-content gdlr-skin-content">Tại Little Monogram, các khách hàng nhỏ tuổi có thể thoả sức vui chơi với các hoạt động như leo núi nhân tạo, nhà bóng, cầu trượt và cửa hàng cho các bạn nhỏ mặc thử nhiều loại trang phục khác nhau.<p />
                              </div>
                              <div className="testimonial-info"><span className="testimonial-author gdlr-skin-link-color">Không gian mở</span><span className="testimonial-position gdlr-skin-info"><span>, </span>Dành cho khách nhí</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
          </div>
        </div>
        {/* gdlr-content */}
        <div className="clear" />
      </div>
    </>
  );
}
export default Home;
