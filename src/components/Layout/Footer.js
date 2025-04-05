function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container container">
        <div className="footer-column three columns" id="footer-widget-1">
          <div id="text-5" className="widget widget_text gdlr-item gdlr-widget">
            <h3 className="gdlr-widget-title">Đặt ngay!</h3>
            <div className="clear" />
            <div className="textwidget">
              <p>
                <i
                  className="gdlr-icon fa fa-phone"
                  style={{ color: "#fff", fontSize: "16px" }}
                />{" "}
                +84-123-456-0000
              </p>
              <div className="clear" />
              <div className="gdlr-space" style={{ marginTop: "-15px" }} />
              <p>
                <i
                  className="gdlr-icon fa fa-envelope-o"
                  style={{ color: "#fff", fontSize: "16px" }}
                />{" "}
                Shilla@MonoGram.com
              </p>
              <div className="clear" />
              <div className="gdlr-space" style={{ marginTop: "25px" }} />
              <p>
                <a
                  href="http://themeforest.net/user/goodlayers/"
                  target="_blank"
                >
                  <i
                    className="gdlr-icon fa fa-facebook-square"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                </a>{" "}
                <a
                  href="http://themeforest.net/user/goodlayers/"
                  target="_blank"
                >
                  <i
                    className="gdlr-icon fa fa-twitter-square"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                </a>{" "}
                <a
                  href="http://themeforest.net/user/goodlayers/"
                  target="_blank"
                >
                  <i
                    className="gdlr-icon fa fa-linkedin-square"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                </a>{" "}
                <a
                  href="http://themeforest.net/user/goodlayers/"
                  target="_blank"
                >
                  <i
                    className="gdlr-icon fa fa-google-plus-square"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                </a>{" "}
                <a
                  href="http://themeforest.net/user/goodlayers/"
                  target="_blank"
                >
                  <i
                    className="gdlr-icon fa fa-pinterest-square"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                </a>{" "}
                <a
                  href="http://themeforest.net/user/goodlayers/"
                  target="_blank"
                >
                  <i
                    className="gdlr-icon fa fa-flickr"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-column three columns" id="footer-widget-2">
          <div
            id="recent-posts-5"
            className="widget widget_recent_entries gdlr-item gdlr-widget"
          >
            <h3 className="gdlr-widget-title">Giới thiệu</h3>
            <div className="clear" />
            <ul>
              <li>
                <a href="https://www.shillamonogram.com/dnmg/introduction/viewCont.do?lang=vi&contId=INTRD">
                  Giới thiệu về khách sạn
                </a>
              </li>
              <li>
                <a href="https://www.shillamonogram.com/dnmg/introduction/viewCont.do?lang=vi&contId=FTS">
                  Tờ thông tin chung
                </a>
              </li>
              <li>
                <a href="https://www.shillamonogram.com/dnmg/inquires/viewCont.do?lang=vi&contId=HTM">
                  Bản đồ theo tầng
                </a>
              </li>
              <li>
                <a href="https://www.shillamonogram.com/dnmg/inquires/viewCont.do?lang=vi&contId=LOC">
                  Vị trí
                </a>
              </li>
              <li>
                <a href="https://www.shillamonogram.com/dnmg/introduction/viewCont.do?lang=vi&contId=TOURIST">
                  Điểm tham quan xung quanh
                </a>
              </li>
              <li>
                <a href="https://www.shillamonogram.com/dnmg/inquires/viewCont.do?lang=vi&contId=CTU">
                  Vui lòng liên hệ
                </a>
              </li>
              <li>
                <a href="https://www.shillamonogram.com/dnmg/inquires/faq/ListFaq.do?lang=vi">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="https://www.shillahotels.com/membership/inquires/contactus/memSetVoc.do?propertyId=MGHUB&lang=vi&type=mgr&_ga=2.5975477.720953157.1696170968-1067634548.1695001553&_gl=1*1ssfa0f*_ga*MTA2NzYzNDU0OC4xNjk1MDAxNTUz*_ga_30Y6N61ES4*MTY5NjE3MDk2Ny4zLjEuMTY5NjE3MzIzNy41MS4wLjA.">
                  Yêu cầu hoặc thắc mắc
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-column six columns" id="footer-widget-3">
          <div
            id="text-10"
            className="widget widget_text gdlr-item gdlr-widget"
          >
            <h3 className="gdlr-widget-title">Ngoài ra</h3>
            <div className="clear" />
            <div className="textwidget">
              <img src="/frontend/anh/logo.png" alt="" />
              <div className="clear" />
              <div className="gdlr-space" style={{ marginTop: "20px" }} />
              Hotel Shilla 249, Dongho-ro, Jung-gu, Seoul 04605 Korea Copyright
              (C) HOTEL SHILLA CO, LTD. All Rights Reserved.
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
      <div className="copyright-wrapper">
        <div className="copyright-container container">
          <div className="copyright-left">
            <a href="index.html" style={{ marginRight: "10px" }}>
              Trang chủ
            </a>
            |
            <a
              href="booking.html"
              style={{ marginRight: "10px", marginLeft: "10px" }}
            >
              Đặt phòng
            </a>{" "}
          </div>
          <div className="copyright-right">Designer by Duy Thái </div>
          <div className="clear" />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
