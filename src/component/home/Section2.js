import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Section2() {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());

  return (
    <section id="content-section-2">
    <div className="gdlr-color-wrapper  gdlr-show-all gdlr-skin-dark-brown" style={{backgroundColor: '#322b23', paddingTop: '48px', paddingBottom: '27px'}}>
      <div className="container">
        <div className="gdlr-hotel-availability-wrapper" style={{marginBottom: '20px'}}>
          <form className="gdlr-hotel-availability gdlr-item" id="gdlr-hotel-availability" method="post" action="https://demo.goodlayers.com/hotelmaster/dark/?booking">
            <div className="gdlr-reservation-field gdlr-resv-datepicker"><span className="gdlr-reservation-field-title">Thời gian vào</span>
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
            <div className="gdlr-reservation-field gdlr-resv-combobox "><span className="gdlr-reservation-field-title">Đêm</span>
              <div className="gdlr-combobox-wrapper"><select name="gdlr-night" id="gdlr-night"><option value={1} selected>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option><option value={5}>5</option><option value={6}>6</option><option value={7}>7</option><option value={8}>8</option><option value={9}>9</option></select></div>
            </div>
            <div className="gdlr-reservation-field gdlr-resv-datepicker"><span className="gdlr-reservation-field-title">Thời gian ra</span>
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
            <div className="gdlr-reservation-field gdlr-resv-combobox "><span className="gdlr-reservation-field-title">Số người lớn</span>
              <div className="gdlr-combobox-wrapper"><select name="gdlr-adult-number[]"><option value={0}>0</option><option value={1}>1</option><option value={2} selected>2</option><option value={3}>3</option><option value={4}>4</option><option value={5}>5</option><option value={6}>6</option><option value={7}>7</option><option value={8}>8</option><option value={9}>9</option></select></div>
            </div>
            <div className="gdlr-reservation-field gdlr-resv-combobox "><span className="gdlr-reservation-field-title">Số trẻ em</span>
              <div className="gdlr-combobox-wrapper"><select name="gdlr-children-number[]"><option value={0}>0</option><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option><option value={5}>5</option><option value={6}>6</option><option value={7}>7</option><option value={8}>8</option><option value={9}>9</option></select></div>
            </div>
            <div className="gdlr-hotel-availability-submit"><input type="hidden" name="hotel_data" defaultValue={1} /><input type="hidden" name="gdlr-room-number" defaultValue={1} /><input type="submit" className="gdlr-reservation-bar-button gdlr-button with-border" defaultValue="Kiểm tra" /></div>
            <div className="clear" />
          </form>
        </div>
        <div className="clear" />
        <div className="clear" />
      </div>
    </div>
    <div className="clear" />
  </section>  
  );
}

export default Section2;