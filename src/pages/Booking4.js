import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Booking4() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [prices, setPrices] = useState("");
  const [infor, setInfor] = useState("");
  const [room, setRoom] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("vietqr");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: "",
        note: "",
      });
    }
  }, [user]);

  const fetchPriceTotal = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không tìm thấy token trong localStorage");
      return;
    }
  
    const bookingInfo = localStorage.getItem("bookingInfo");
    if (!bookingInfo) {
      console.error("Không tìm thấy bookingInfo trong localStorage");
      return;
    }
  
    const parsedInfo = JSON.parse(bookingInfo);
    setInfor(parsedInfo);
  
    const payload = {
      DueDate: parsedInfo.DueDate,
      IssueDate: parsedInfo.IssueDate,
      id_room: parsedInfo.id_room,
      more_service: parsedInfo.more_service,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/price-total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        setPrices(data);
      } else {
        const errorData = await response.json();
        console.error("Lỗi từ API price-total:", errorData);
      }
    } catch (error) {
      console.error("Lỗi mạng khi gọi API price-total:", error);
    }
  };
  
  useEffect(() => {
    fetchPriceTotal();
  }, []);

  const fetchRoomDetails = async () => {
    const bookingInfo = localStorage.getItem("bookingInfo");
    if (!bookingInfo) {
      console.error("Không tìm thấy bookingInfo trong localStorage");
      return;
    }
  
    const parsedInfo = JSON.parse(bookingInfo);
    const roomId = parsedInfo.id_room;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/detail-room/${roomId}`, {
        method: "GET",
      });
  
      if (response.ok) {
        const data = await response.json();
        setRoom(data);
      } else {
        const errorData = await response.json();
        console.error("Lỗi từ API detail-room:", errorData);
      }
    } catch (error) {
      console.error("Lỗi mạng khi gọi API detail-room:", error);
    }
  };
  
  useEffect(() => {
    fetchRoomDetails();
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
    const token = localStorage.getItem("token");

    if (parsedInfo.IssueDate === parsedInfo.DueDate) {
      alert("Số ngày đặt phòng không hợp lệ. Ngày đến và ngày đi không được trùng nhau.");
      return;
    }

    const payload = {
      IssueDate: parsedInfo.IssueDate,
      DueDate: parsedInfo.DueDate,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      more_service: parsedInfo.more_service,
      id_room: parsedInfo.id_room,
      note: formData.note,
      total: prices.total_price,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/booking", {
        method: "POST",
        headers: {
          "Accept": "application/json" ,
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmitOnline = async (e) => {
    e.preventDefault();
    const bookingInfo = localStorage.getItem("bookingInfo");
    if (!bookingInfo) {
      console.error("Không tìm thấy bookingInfo trong localStorage");
      return;
    }

    const parsedInfo = JSON.parse(bookingInfo);
    const token = localStorage.getItem("token");

    if (parsedInfo.IssueDate === parsedInfo.DueDate) {
      alert("Số ngày đặt phòng không hợp lệ. Ngày đến và ngày đi không được trùng nhau.");
      return;
    }

    const payload = {
      IssueDate: parsedInfo.IssueDate,
      DueDate: parsedInfo.DueDate,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      more_service: parsedInfo.more_service,
      id_room: parsedInfo.id_room,
      note: formData.note,
      total: prices.total_price,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/booking", {
        method: "POST",
        headers: {
          "Accept": "application/json" ,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.removeItem("bookingInfo");
        const invoiceId = data.invoice_id;
        let qrUrl = `http://127.0.0.1:8000/api/invoices/${invoiceId}/qr-link`;
        if (selectedPaymentMethod === "momo") {
          qrUrl += "?type=momo";
        }
        const qrResponse = await fetch(qrUrl);
        const qrResult = await qrResponse.json();
        const qrPageLink = qrResult['qr_page_link'];
        window.open(qrPageLink, "_blank");
        navigate("/Booking/Confirm");
      } else {
        const err = await response.json();
        alert("Đã có lỗi xảy ra: " + (err.message || JSON.stringify(err)));
      }
    } catch (error) {
      console.error("Lỗi mạng khi gửi dữ liệu:");
      alert("Lỗi kết nối mạng: " + error.message);
    }
  };

  const paymentMethods = [
    {
      key: 'vietqr',
      label: 'VietQR',
      imgSrc: 'https://img.vietqr.io/image/TCB-190387442-compact.png',
    },
    {
      key: 'momo',
      label: 'MoMo',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
    }
  ];

  return (
    <div>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Đặt phòng</h1>
          <h1 className="gdlr-page-title">---</h1>
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
                          <div className="gdlr-price-room-summary-title">Phòng : {room[0]?.room_category?.room_type || "Không xác định"}</div>
                          <div className="gdlr-price-room-summary-info gdlr-title-font"><span>Người lớn : {infor.adult}</span><span>Trẻ em : {infor.children}</span><span className="gdlr-price-room-summary-price" href="#">{room[0]?.price? `${room[0]?.price.toLocaleString()} VNĐ` : "Liên hệ"}</span></div>
                        </div>
                        <div className="gdlr-price-summary-vat">
                          <div className="gdlr-price-summary-vat-total">
                            <span className="gdlr-head">Tổng</span><span className="gdlr-tail">{prices.room_price ? `${prices.room_price.toLocaleString()} VNĐ` : "Liên hệ"}</span>
                          <div className="clear" /></div>
                          <div className="gdlr-price-summary-vat-total">
                            <span className="gdlr-head">Dịch vụ</span><span className="gdlr-tail">{prices.service_price ? `${prices.service_price.toLocaleString()} VNĐ` : "0 VNĐ"}</span>
                          <div className="clear" /></div>
                          <div className="gdlr-price-summary-vat-total">
                            <span className="gdlr-head">Thuế 8%</span><span className="gdlr-tail">{prices.vat ? `${prices.vat.toLocaleString()} VNĐ` : "Liên hệ"}</span>
                          <div className="clear" /></div>
                          <div className="gdlr-price-summary-vat-total">
                            <span className="gdlr-head">Số ngày</span><span className="gdlr-tail">{prices.days} Ngày</span>
                          <div className="clear" /></div>
                        </div>
                        <div className="gdlr-price-summary-grand-total gdlr-active"><span className="gdlr-head">Giá tổng cộng</span><span className="gdlr-tail">{prices.total_price} VNĐ</span></div>
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
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                        </p>
                        
                        <div className="clear" />
                        <p className="gdlr-form-half-left">
                            <span>Email *</span>
                            <input
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                        </p>
                        <p className="gdlr-form-half-right">
                            <span>Số điện thoại *</span>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                        </p>
                        <div className="clear" />
                        <p className="gdlr-form-half-left">
                            <span>Địa chỉ</span>
                            <textarea
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                        </p>
                        <p className="gdlr-form-half-right">
                            <span>Ghi chú</span>
                            <textarea
                              name="note"
                              value={formData.note}
                              onChange={handleInputChange}
                            />
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
                                   <div>
                                  <div style={{ 
                                      display: 'flex', 
                                      flexDirection: 'column', 
                                      alignItems: 'center',
                                      gap: 20,
                                      marginTop: 20
                                  }}>
                                    <div 
                                      className="gdlr-payment-method" 
                                      style={{ 
                                        display: 'flex', 
                                        gap: 20, 
                                        justifyContent: 'center',
                                        width: '100%', 
                                        maxWidth: 400
                                      }}
                                    >
                                      {paymentMethods.map(({ key, label, imgSrc }) => (
                                        <label
                                          key={key}
                                          className={selectedPaymentMethod === key ? "gdlr-active" : ""}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <input
                                            type="radio"
                                            name="payment-method"
                                            value={key}
                                            checked={selectedPaymentMethod === key}
                                            onChange={() => setSelectedPaymentMethod(key)}
                                            style={{ display: "none" }}
                                          />
                                          <img
                                            src={imgSrc}
                                            alt={label}
                                            style={{
                                              border:
                                                selectedPaymentMethod === key
                                                  ? "2px solid #007bff"
                                                  : "2px solid transparent",
                                              borderRadius: 6,
                                              width: 100,
                                              height: 100,
                                              objectFit: "contain",
                                            }}
                                          />
                                        </label>
                                      ))}
                                    </div>

                                    <button onClick={(e) => handleBookingSubmitOnline(e)}
                                      className="gdlr-button with-border gdlr-booking-payment-submit"
                                      // onClick={() => handleBookingSubmitOnline(selectedPaymentMethod)}
                                      style={{ marginTop: 10, alignSelf: 'center' ,paddingLeft: '250px',paddingRight: '250px'}}
                                    >
                                      Thanh toán ngay
                                    </button>
                                  </div>
                                    <div style={{ marginBottom: "50px" }}></div>
                                  </div>
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