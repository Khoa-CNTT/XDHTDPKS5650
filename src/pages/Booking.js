import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [nights, setNights] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
      return;
    }

    const formData = {
      IssueDate: checkInDate.toISOString().split("T")[0],
      DueDate: checkOutDate.toISOString().split("T")[0],
      quantity: rooms,
      adult: adults,
      children: children,
    };
    console.log("Dữ liệu form gửi đi:", formData);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/choose-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        localStorage.setItem("bookingInfo", JSON.stringify(formData));
        navigate("/Booking/Choose-room");
      } else {
        const errorData = await res.json();
        console.error("Lỗi khi gửi yêu cầu:", errorData);
        alert(errorData.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Lỗi mạng:", err);
      alert("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    }
  };

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
                  <div className="gdlr-item gdlr-item-start-content" id="gdlr-single-booking-content" data-ajax="https://demo.goodlayers.com/hotelmaster/wp-admin/admin-ajax.php">
                    <form className="gdlr-reservation-bar" onSubmit={handleSubmit}>
                      <div className="gdlr-reservation-bar-title">Đặt phòng cho bạn</div>
                      <div className="gdlr-reservation-bar-summary-form" />
                      <div className="gdlr-reservation-bar-room-form" />
                      <div className="gdlr-reservation-bar-date-form">
                        {/* Thời gian vào */}
                        <div className="gdlr-reservation-field gdlr-resv-datepicker">
                          <span className="gdlr-reservation-field-title">Thời gian vào</span>
                          <div className="gdlr-datepicker-wrapper">
                            <DatePicker
                              selected={checkInDate}
                              onChange={(date) => setCheckInDate(date)}
                              dateFormat="dd/MM/yyyy"
                              minDate={new Date()}
                              className="gdlr-datepicker"
                            />
                          </div>
                        </div>

                        {/* Đêm */}
                        <div className="gdlr-reservation-field gdlr-resv-combobox">
                          <span className="gdlr-reservation-field-title">Đêm</span>
                          <div className="gdlr-combobox-wrapper">
                            <select
                              name="gdlr-night"
                              id="gdlr-night"
                              value={nights}
                              onChange={(e) => setNights(Number(e.target.value))}
                            >
                              {[...Array(10).keys()].map((i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="clear" />
                        {/* Thời gian ra */}
                        <div className="gdlr-reservation-field gdlr-resv-datepicker">
                          <span className="gdlr-reservation-field-title">Thời gian ra</span>
                          <div className="gdlr-datepicker-wrapper">
                            <DatePicker
                              selected={checkOutDate}
                              onChange={(date) => setCheckOutDate(date)}
                              dateFormat="dd/MM/yyyy"
                              minDate={checkInDate}
                              className="gdlr-datepicker"
                            />
                          </div>
                        </div>
                        <div className="clear" />
                        {/* Số phòng */}
                        <div className="gdlr-reservation-field gdlr-resv-combobox">
                          <span className="gdlr-reservation-field-title">Số phòng</span>
                          <div className="gdlr-combobox-wrapper">
                            <select
                              name="gdlr-room-number"
                              id="gdlr-room-number"
                              value={rooms}
                              onChange={(e) => setRooms(Number(e.target.value))}
                            >
                              {[...Array(10).keys()].map((i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="clear" />
                        {/* Người lớn */}
                        <div className="gdlr-reservation-field gdlr-resv-combobox">
                          <span className="gdlr-reservation-field-title">Người lớn</span>
                          <div className="gdlr-combobox-wrapper">
                            <select
                              name="gdlr-adult-number"
                              value={adults}
                              onChange={(e) => setAdults(Number(e.target.value))}
                            >
                              {[...Array(10).keys()].map((i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Trẻ em */}
                        <div className="gdlr-reservation-field gdlr-resv-combobox">
                          <span className="gdlr-reservation-field-title">Trẻ em</span>
                          <div className="gdlr-combobox-wrapper">
                            <select
                              name="gdlr-children-number"
                              value={children}
                              onChange={(e) => setChildren(Number(e.target.value))}
                            >
                              {[...Array(10).keys()].map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="clear" />
                        <button id="gdlr-reservation-bar-button" className="gdlr-reservation-bar-button gdlr-button with-border" type="submit">Kiểm tra</button>
                        <div className="clear" />
                      </div>
                      <div className="gdlr-reservation-bar-service-form" id="gdlr-reservation-bar-service-form" />
                    </form>
                    <div className="gdlr-booking-content">
                      <div className="gdlr-booking-process-bar" id="gdlr-booking-process-bar" data-state={1}>
                        <div data-process={1} className="gdlr-booking-process gdlr-active">1. Chọn ngày</div>
                        <div data-process={2} className="gdlr-booking-process ">2. Chọn phòng</div>
                        <div data-process={3} className="gdlr-booking-process ">3. Đặt chỗ</div>
                        <div data-process={4} className="gdlr-booking-process ">4. Xác nhận</div>
                      </div>
                      <div className="gdlr-booking-content-wrapper">
                        <div className="gdlr-booking-content-inner" id="gdlr-booking-content-inner">
                          <div className="gdlr-datepicker-range-wrapper">
                            <div className="gdlr-datepicker-range" id="gdlr-datepicker-range" data-dfm="d M yy" data-block="[&quot;2018-02-14&quot;,&quot;2018-02-15&quot;]" />
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
        <div className="clear" />
      </div>
    </div>

  );
}
export default Booking;