import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, Link } from "react-router-dom";

function Booking2() {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bookingInfo = localStorage.getItem("bookingInfo");
    const rooms = localStorage.getItem("rooms");

    if (bookingInfo) {
      const parsedInfo = JSON.parse(bookingInfo);
      if (parsedInfo.IssueDate) setCheckInDate(new Date(parsedInfo.IssueDate));
      if (parsedInfo.DueDate) setCheckOutDate(new Date(parsedInfo.DueDate));
      if (parsedInfo.adult) setAdults(parsedInfo.adult);
      if (parsedInfo.children) setChildren(parsedInfo.children);
    }

    if (rooms) {
      const parsedRooms = JSON.parse(rooms);
      if (Array.isArray(parsedRooms) && parsedRooms.length > 0) {
        setRooms(parsedRooms);
      } else {
        console.error("Dữ liệu không hợp lệ trong localStorage");
      }
    }
  }, []);

  const handleRoomSelection = (roomId) => {
    const bookingInfo = localStorage.getItem("bookingInfo");
    if (bookingInfo) {
      const parsedInfo = JSON.parse(bookingInfo);
      parsedInfo.id_room = roomId;
      localStorage.setItem("bookingInfo", JSON.stringify(parsedInfo));
    }
    navigate("/Booking/Choose-service");
  };

  const handleBack = () => {
    navigate("/Booking");
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
                      {rooms.map((room) => (
                        <div className="gdlr-booking-content-inner" id="gdlr-booking-content-inner" style={{opacity: 1, height: 'auto'}}>
                        <div className="gdlr-booking-room-wrapper">
                        <div className="gdlr-item gdlr-room-item gdlr-medium-room ">
                        <div className="gdlr-ux gdlr-medium-room-ux">
                        <div className="gdlr-room-thumbnail"><Link to={''}>
                        <img src={room.images?.[0] || room.room_category?.image ||  "frontend/anh/default-room.png"} alt="" width={400} height={300} /></Link></div>
                        <div className="gdlr-room-content-wrapper">
                        <h3 className="gdlr-room-title">
                        <Link to={''} style={{ textDecoration: 'none' }}>
                          <span className="room-name-bk2">{room.room_category.room_type}</span>
                        </Link>
                        </h3>
                        <div className="gdlr-hotel-room-info">
                        <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Diện tích</span><span className="gdlr-tail">{room.room_category.size} m²</span></div>
                        <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người lớn</span><span className="gdlr-tail">{room.room_category.adult} người</span></div>
                        <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Trẻ em</span><span className="gdlr-tail">{room.room_category.children} người</span></div>
                        <div className="clear" /></div>
                        <div className="gdlr-room-content" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>{room.description}</div>
                        <button
                                  className="gdlr-room-selection gdlr-button with-border"
                                  onClick={() => handleRoomSelection(room.id)} 
                                  data-roomid={room.id}
                                >
                          Chọn phòng này
                        </button>
                        <div className="gdlr-room-price">
                          <span className="gdlr-head">Giá chỉ</span><span className="gdlr-tail">{room.price} VNĐ/ Đêm</span>
                          <div className="gdlr-price-break-down">
                              {/* <span>* Xem giảm giá</span> */}
                              <div className="price-breakdown-wrapper">
                                <div className="price-breakdown-close" />
                                    <div className="price-breakdown-content">
                                      <div className="price-breakdown-info"><span className="gdlr-head">Base Price<span>x 1 Night (Weekend)</span></span><span className="gdlr-tail">$100.00</span></div>
                                      <div className="price-breakdown-total"><span className="gdlr-head">Total<span className>*vat is not included yet</span></span><span className="gdlr-tail">$100.00</span></div>
                                    </div>
                                </div>
                              </div>
                          </div>
                          <div className="clear" /></div>
                          <div className="clear" /></div>
                        </div>
                          <div className="clear" /></div>
                        </div>
                      ))}
                      <div className="clear"></div>
                      <div className="gdlr-pagination gdlr-ajax"><span className="page-numbers current" data-paged={1}>1</span> <Link className="page-numbers" data-paged={2}>2</Link> <Link className="next page-numbers" data-paged={2}> Next ›</Link> </div>
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

export default Booking2;