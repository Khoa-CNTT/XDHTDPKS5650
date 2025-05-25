import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, Link } from "react-router-dom";

function Booking3() {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bookingInfo = localStorage.getItem("bookingInfo");

    if (bookingInfo) {
      const parsedInfo = JSON.parse(bookingInfo);
      if (parsedInfo.IssueDate) setCheckInDate(new Date(parsedInfo.IssueDate));
      if (parsedInfo.DueDate) setCheckOutDate(new Date(parsedInfo.DueDate));
      if (parsedInfo.adult) setAdults(parsedInfo.adult);
      if (parsedInfo.children) setChildren(parsedInfo.children);
    }
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/list-service");
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error("Lỗi khi lấy danh sách dịch vụ:", response.statusText);
        }
      } catch (error) {
        console.error("Lỗi mạng khi gọi API:", error);
      }
    };
  
    fetchServices();
  }, []);

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter((id) => id !== serviceId);
      } else {
        return [...prevSelected, serviceId];
      }
    });
  };

  const handleBack = () => {
    navigate("/Booking");
  };

  const handleServiceSelection = () => {
    const bookingInfo = localStorage.getItem("bookingInfo");
    if (bookingInfo) {
      const parsedInfo = JSON.parse(bookingInfo);
      parsedInfo.more_service = selectedServices;
      localStorage.setItem("bookingInfo", JSON.stringify(parsedInfo));
      navigate("/Booking/Reservation");
    } else {
      console.error("Không tìm thấy bookingInfo trong localStorage");
    }
  }

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
                      <div
                        className="gdlr-reservation-bar-room-form gdlr-active"
                        id="gdlr-reservation-bar-room-form"
                        style={{ display: "block" }}
                      >
                        <div className="gdlr-reservation-room gdlr-title-font gdlr-active">
                          <i className="fa fa-angle-double-right icon-double-angle-right" />
                          <div className="gdlr-reservation-room-content">
                            <div className="gdlr-reservation-room-title">
                              Phòng :
                            </div>
                            <div className="gdlr-reservation-room-info">
                              <span>Người lớn : {adults}</span>
                              <span>Trẻ em : {children}</span>
                            </div>
                            <Link to="/Booking/Choose-room" className="gdlr-reservation-change-room" style={{ textDecoration: 'none' }}>
                              <span className="back-choose-room">Thay đổi phòng</span>
                            </Link>
                          </div>
                          <input
                            type="text"
                            name="gdlr-room-id[]"
                            defaultValue
                          />
                        </div>
                      </div>
                      <div className="gdlr-reservation-bar-date-form">
                        {/* Thời gian vào */}
                        <div className="gdlr-reservation-field gdlr-resv-datepicker">
                          <span className="gdlr-reservation-field-title">
                            Thời gian vào
                          </span>
                          <div className="gdlr-datepicker-wrapper">
                            <DatePicker
                              selected={checkInDate}
                              onChange={(date) => setCheckInDate(date)}
                              dateFormat="dd/MM/yyyy"
                              minDate={new Date()}
                              className="gdlr-datepicker"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="clear" />
                        {/* Thời gian ra */}
                        <div className="gdlr-reservation-field gdlr-resv-datepicker">
                          <span className="gdlr-reservation-field-title">
                            Thời gian ra
                          </span>
                          <div className="gdlr-datepicker-wrapper">
                            <DatePicker
                              selected={checkOutDate}
                              onChange={(date) => setCheckOutDate(date)}
                              dateFormat="dd/MM/yyyy"
                              minDate={checkInDate}
                              className="gdlr-datepicker"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="clear" />
                        <div
                          className="gdlr-reservation-field gdlr-resv-combobox "
                          style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            color: "#b89f80",
                          }}
                        >
                          <span>Xác nhận thông tin của bạn!</span>
                        </div>
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
                          className="gdlr-booking-process gdlr-active"
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
                          className="gdlr-booking-process "
                        >
                          4. Xác nhận
                        </div>
                      </div>
                      <div className="gdlr-booking-content-wrapper">
                      <div className="gdlr-room-selection-complete">
                        <div className="gdlr-room-selection-title">Lựa chọn phòng đã hoàn tất</div>
                        <div className="gdlr-room-selection-caption">Bạn có thể chỉnh sửa đặt phòng của mình bằng cách sử dụng bảng điều khiển bên trái</div>
                        <div className="gdlr-room-selection-divider" />
                        <div className="gdlr-booking-service-wrapper">
                          <span className="gdlr-booking-service-head">
                          Vui lòng chọn dịch vụ bổ sung mà bạn muốn. (tùy chọn)</span> 
                            
                            {services.map((service) => (
                              <div key={service.id} className="gdlr-room-service-option">
                                <input className="gdlr-room-service-checkbox" type="checkbox" name=""
                                  value={service.id} checked={selectedServices.includes(service.id)}
                                  onChange={() => handleCheckboxChange(service.id)}
                                />
                                <span className="gdlr-room-service-title">
                                  {service.service_name}
                                </span>
                                <span className="gdlr-room-service-unit">
                                <span className="gdlr-room-service-unit">
                                  ${parseFloat(service.price).toLocaleString("en-US", 
                                  { minimumFractionDigits: 0, maximumFractionDigits: 0 })} / slot
                                </span>
                                </span>
                              </div>
                            ))}
                        </div>
                        <div className="gdlr-room-selection-divider" />
                        <button className="gdlr-room-selection gdlr-button with-border" onClick={() => handleServiceSelection()}>
                          Bước tiếp theo
                        </button>
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

export default Booking3;