function  Booking5() {
  return (
    <div className="main-confirm-booking">
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Đặt phòng</h1>
        </div>
      </div>
      <div className="content-wrapper content-confirm-booking">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">
            <div className="with-sidebar-container container gdlr-class-no-sidebar">
              <div className="with-sidebar-left twelve columns">
                <div className="with-sidebar-content twelve columns">
                  <div
                    className="gdlr-item gdlr-item-start-content"
                    id="gdlr-single-booking-content"
                  >
                    
                    <div className="gdlr-booking-content">
                      <div
                        className="gdlr-booking-process-bar"
                        id="gdlr-booking-process-bar"
                        data-state={1}
                      >
                        <div
                          data-process={1}
                          className="gdlr-booking-process "
                        >
                          1. Chọn ngày
                        </div>
                        <div
                          data-process={2}
                          className="gdlr-booking-process "
                        >
                          2. Chọn phòng
                        </div>
                        <div
                          data-process={3}
                          className="gdlr-booking-process "
                        >
                          3. Đặt chỗ
                        </div>
                        <div
                          data-process={4}
                          className="gdlr-booking-process gdlr-active"
                        >
                          4. Xác nhận
                        </div>
                      </div>
                      <div className="gdlr-booking-content-wrapper">
                      <div className="gdlr-booking-content-inner" id="gdlr-booking-content-inner" style={{opacity: 1, height: 'auto'}}>
                      <div className="gdlr-booking-contact-container">
                        <div className="gdlr-booking-complete">
                          <div className="gdlr-booking-complete-title">Đặt chỗ đã hoàn tất!</div>
                          <div className="gdlr-booking-complete-caption">Chi tiết đặt phòng của bạn vừa được gửi đến email của bạn. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi. Cảm ơn bạn!</div>
                          <div className="gdlr-booking-complete-additional"><span style={{marginRight: '20px'}}><i className="fa fa-phone" /> +11-2233-442</span> <span><i className="fa fa-envelope" /> sales@DuyThai.com</span></div>
                        </div>
                      </div>
                      </div>
                      
                      </div>
                      <div className="clear" />
                    </div>
                    <div className="clear" />
                  </div>
                </div>
                <div className="clear" />
              </div>
              
              <div className="clear" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking5;