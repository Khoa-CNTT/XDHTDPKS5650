import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Booking4() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://127.0.0.1:8000/api/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            console.error("Lỗi khi lấy thông tin người dùng:", await res.json());
          }
        } catch (err) {
          console.error("Lỗi mạng khi lấy thông tin người dùng:", err);
        }
      } else {
        console.log("Không tìm thấy token trong localStorage.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleBack = () => {
    navigate("/Booking/Choose-service");
  };

  const handleBookingSubmit = async () => {
    const bookingInfo = localStorage.getItem("bookingInfo");
    if (!bookingInfo) {
      console.error("Không tìm thấy bookingInfo trong localStorage");
      return;
    }

    const parsedInfo = JSON.parse(bookingInfo);
    const name = document.querySelector('input[name="first_name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const address = document.querySelector('textarea[name="address"]').value;
    const note = document.querySelector('textarea[name="additional-note"]').value;
    const token = localStorage.getItem("token");

    const payload = {
      IssueDate: parsedInfo.IssueDate,
      DueDate: parsedInfo.DueDate,
      name,
      email,
      phone,
      id_room: parsedInfo.id_room,
      note,
    };

    console.log("Dữ liệu gửi đi:", payload);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Phản hồi từ API:", data);
        localStorage.removeItem("bookingInfo");
        navigate("/Booking/Confirm");
      } else {
        console.error("Lỗi khi gửi dữ liệu:", await response.json());
      }
    } catch (error) {
      console.error("Lỗi mạng khi gửi dữ liệu:", error);
    }
  };

  const handlePaymentSubmit = () => {

  }

  return (
    <div>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Đặt phòng</h1>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">
            <div className="with-sidebar-container container gdlr-class-no-sidebar">
              <div className="with-sidebar-left twelve columns">
                <div className="with-sidebar-content twelve columns">
                  <div
                    className="gdlr-item gdlr-item-start-content"
                    id="gdlr-single-booking-content"
                  >
                    <form className="gdlr-reservation-bar">
                      <div className="gdlr-reservation-bar-title">
                        Đặt phòng cho bạn
                      </div>
                      <div className="gdlr-price-summary-wrapper">
                        <div className="gdlr-price-summary-head">Giá đặt phòng</div>
                        <div className="gdlr-price-room-summary">
                          <div className="gdlr-price-room-summary-title">Room 1 : Standard Room – One King Bed</div>
                          <div className="gdlr-price-room-summary-info gdlr-title-font"><span>Adult : 2</span><span>Children : 0</span><span className="gdlr-price-room-summary-price" href="#">$120.00</span></div>
                        </div>
                        <div className="gdlr-price-summary-vat">
                          <div className="gdlr-price-summary-vat-total">
                              <span className="gdlr-head">Tổng</span><span className="gdlr-tail">$120.00</span>
                              <div className="clear" /></div>
                              <div className="gdlr-price-summary-vat-amount">
                                <span className="gdlr-head">Thuế 8%</span><span className="gdlr-tail">$9.60</span>
                                <div className="clear" /></div>
                          </div>
                          <div className="gdlr-price-summary-grand-total gdlr-active"><span className="gdlr-head">Giá tổng cộng</span><span className="gdlr-tail">$129.60</span></div>
                        </div>
                      <div className="gdlr-reservation-bar-date-form">
                        <div className="clear" />
                        <button
                          type="button"
                          id="gdlr-reservation-bar-button"
                          className="gdlr-reservation-bar-button gdlr-button with-border"
                          onClick={handleBack}
                        >
                          Quay lại
                        </button>
                        <div className="clear" />
                      </div>
                      <div
                        className="gdlr-reservation-bar-service-form"
                        id="gdlr-reservation-bar-service-form"
                      />
                    </form>
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
                          className="gdlr-booking-process gdlr-active"
                        >
                          3. Đặt chỗ
                        </div>
                        <div
                          data-process={4}
                          className="gdlr-booking-process "
                        >
                          4. Xác nhận
                        </div>
                      </div>
                      <div className="gdlr-booking-content-wrapper">
                      <div className="gdlr-booking-content-inner" id="gdlr-booking-content-inner" style={{opacity: 1, height: 'auto'}}>
                      <div className="gdlr-booking-contact-container">
                      <form className="gdlr-booking-contact-form" method="post" data-ajax="https://demo.goodlayers.com/hotelmaster/dark/wp-admin/admin-ajax.php">
                        <p className="gdlr-form-half-left">
                            <span>Tên *</span>
                            <input type="text" name="first_name" value={user.name} />
                        </p>
                        
                        <div className="clear" />
                        <p className="gdlr-form-half-left">
                            <span>Email *</span>
                            <input type="text" name="email" value={user.email} />
                        </p>
                        <p className="gdlr-form-half-right">
                            <span>Số điện thoại *</span>
                            <input type="text" name="phone" value={user.phone} />
                        </p>
                        <div className="clear" />
                        <p className="gdlr-form-half-left">
                            <span>Địa chỉ</span>
                            <textarea name="address" defaultValue={""} />
                        </p>
                        <p className="gdlr-form-half-right">
                            <span>Ghi chú</span>
                            <textarea name="additional-note" defaultValue={""} />
                        </p>
                        <div className="clear" />
                        {/* <p className="gdlr-form-coupon">
                            <span>Mã giảm giá</span>
                            <input type="text" name="coupon" id="gdlr-coupon-id" defaultValue data-action="gdlr_hotel_coupon_check" />
                        </p> */}
                        <div className="clear" />
                        <div className="gdlr-error-message" />
                          <Link
                            className="gdlr-button with-border gdlr-booking-contact-submit"
                            onClick={handleBookingSubmit}
                          >
                            Đặt chỗ ngay qua email và chúng tôi sẽ liên hệ lại với bạn.
                          </Link>
                            <div className="gdlr-booking-contact-or">
                              Hoặc
                              <div className="gdlr-booking-contact-or-divider gdlr-left" />
                                  <div className="gdlr-booking-contact-or-divider gdlr-right" /></div>
                                  <div className="gdlr-payment-method"><label className="gdlr-active"><input type="radio" name="payment-method" defaultValue="paypal" defaultChecked /><img src="https://demo.goodlayers.com/hotelmaster/dark/wp-content/plugins/gdlr-hotel/include/../images/paypal.png" alt="" /></label><label><input type="radio" name="payment-method" defaultValue="stripe" /><img src="https://demo.goodlayers.com/hotelmaster/dark/wp-content/plugins/gdlr-hotel/include/../images/stripe.png" alt="" /></label><label><input type="radio" name="payment-method" defaultValue="authorize" /><img src="https://demo.goodlayers.com/hotelmaster/dark/wp-content/plugins/gdlr-hotel/include/../images/authorize.png" alt="" /></label></div>
                                    <Link
                                      className="gdlr-button with-border gdlr-booking-payment-submit"
                                      onClick={handlePaymentSubmit}
                                    >
                                      Thanh toán ngay
                                    </Link>
                                  <div style={{ marginBottom: '50px' }}></div>
                      </form>
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

export default Booking4;