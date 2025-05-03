import { Link } from "react-router-dom";

function Section4() {
  return (
    <section id="content-section-4">
    <div className="gdlr-parallax-wrapper gdlr-background-image gdlr-show-all gdlr-skin-light-grey" id="gdlr-parallax-wrapper-1" data-bgspeed="0.1" style={{backgroundImage: 'url("frontend/anh/duoi1.png")', paddingTop: '80px', paddingBottom: '10px'}}>
      <div className="container">
        <div className="gdlr-item-title-wrapper gdlr-item pos-center gdlr-nav-container ">
          <div className="gdlr-item-title-head">
            <h3 className="gdlr-item-title gdlr-skin-title gdlr-skin-border">Shilla Monogram Rooms</h3>
            <div className="gdlr-item-title-carousel"><i className="icon-angle-left gdlr-flex-prev" /><i className="icon-angle-right gdlr-flex-next" /></div>
            <div className="clear" />
          </div><a className="gdlr-item-title-link" href="http://demo.goodlayers.com/hotelmaster/room-classic-3-columns/">Xem tất cả phòng tại đây<i className="fa fa-long-arrow-right icon-long-arrow-right" /></a></div>
        <div className="room-item-wrapper type-modern">
          <div className="room-item-holder ">
            <div className="gdlr-room-carousel-item gdlr-item">
              <div className="" data-type="carousel" data-nav-container="room-item-wrapper" data-columns={3}>
                <ul className="slides">
                  <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\standard-room-one-king-bed\index.html"><img src="frontend/anh/1doi.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\standard-room-one-king-bed\index.html">Standard Room – Một giường đôi</a></h3>
                    <Link to="room\standard-room-one-king-bed\index.html" className="gdlr-room-detail" /></li>
                  <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\superior-room-two-double-beds\index.html"><img src="frontend/anh/1doi2don.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\superior-room-two-double-beds\index.html">Superior Room – 1 giường đôi hoặc 2 giường đơn</a></h3>
                    <Link to="room\superior-room-two-double-beds\index.html" className="gdlr-room-detail" /></li>
                  <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\junior-suite-one-single-bed\index.html"><img src="frontend/anh/2don.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\junior-suite-one-single-bed\index.html">Junior Suite – 2 giường đơn</a></h3>
                    <Link to="room\junior-suite-one-single-bed\index.html" className="gdlr-room-detail" /></li>
                  {/* <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\grand-superior-room-two-king-beds\index.html"><img src="frontend/anh/2doi.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\grand-superior-room-two-king-beds\index.html">Grand Superior Room – 2 giường đôi</a></h3>
                    <Link to="room\grand-superior-room-two-king-beds\index.html" className="gdlr-room-detail" /></li>
                  <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\superior-room-one-king-bed\index.html"><img src="frontend/anh/luxury.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\superior-room-one-king-bed\index.html">Superior Room – Phòng sang trọng</a></h3>
                    <Link to="room\superior-room-one-king-bed\index.html" className="gdlr-room-detail" /></li>
                  <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\deluxe-room-one-king-bed\index.html"><img src="frontend/anh/vua.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\deluxe-room-one-king-bed\index.html">Deluxe Room – Phòng tổng thống</a></h3>
                    <Link to="room\deluxe-room-one-king-bed\index.html" className="gdlr-room-detail" /></li>
                  <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\family-special-three-double-beds\index.html"><img src="frontend/anh/giadinh.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\family-special-three-double-beds\index.html">Family Special – Phòng gia đình</a></h3>
                    <Link to="room\family-special-three-double-beds\index.html" className="gdlr-room-detail" /></li>
                  <li className="gdlr-item gdlr-modern-room">
                    <div className="gdlr-room-thumbnail"><a href="room\premium-room-two-single-beds\index.html"><img src="frontend/anh/dacbiet.png" alt="" width={700} height={400} /></a></div>
                    <h3 className="gdlr-room-title"><a href="room\premium-room-two-single-beds\index.html">Super Premium – Phòng đặc biệt</a></h3>
                    <Link to="room\premium-room-two-single-beds\index.html" className="gdlr-room-detail" /></li> */}
                </ul>
                <div className="clear" />
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
        <div className="clear" />
        <div className="clear" />
      </div>
    </div>
    <div className="clear" />
  </section>
  
  );
}

export default Section4;