// import { Link } from "react-router-dom";

import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/list-room') // <-- thay bằng URL API thật
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Lỗi khi fetch:', error));
  }, []);

}

function Room() {
  const navigate = useNavigate();
  const [listRoom, setListRoom] = useState([]);
  const fetchDataRoom = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/list-room`, {
        headers: {
          Accept: "application/json"
        }
      });
      console.log(response.data);
      setListRoom(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataRoom();
  }, []);
  const handleDetailRoom = (id) => {
    navigate(`/room/${id}`);
  };
  return (
    <div>
      <div className="gdlr-page-title-wrapper"  style={{ marginTop: "0px", paddingTop: "0px" }}>
        <div
          className="gdlr-page-title-container"
          style={{
            width: '100%',
            backgroundColor: 'rgba(34, 34, 34, 0.7)',
            padding: '60px 20px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <h1
            className="gdlr-page-title"
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              margin: 0
            }}
          >
            PHÒNG
          </h1>
          <span
            className="gdlr-page-caption"
            style={{
              display: 'block',
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#caa87d',
              marginTop: '10px'
            }}
          >
            Tất cả đều có tại đây
          </span>
        </div>
      </div>


      <div id="gdlr-header-substitute">
      </div>
      {/* is search */}
      <div className="content-wrapper">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">
            <section id="content-section-1" style={{ marginTop: "0px", paddingTop: "0px" }}>
              <div className="section-container container" style={{ marginTop: "0px", paddingTop: "0px" }}>
                <div className="room-item-wrapper type-classic" style={{ marginBottom: '30px' }}>
                  <div className="room-item-holder ">
                    <div className="clear" />
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">
                            <img src="/frontend/anh/1doi.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Standard Room – Một giường đôi</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">1 giường đôi</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người tối đa</span><span className="gdlr-tail">3</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Thành phố</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">5.000.000 VNĐ / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">
                            <img src="/frontend/anh/1doi2don.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Superior Room – Một giường đôi hoặc hai giường đơn</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">1 giường đôi / 2 giường đơn</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người tối đa</span><span className="gdlr-tail">3</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Thành phố</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">5.000.000 VNĐ / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">
                            <img src="/frontend/anh/2don.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Grand Superior Room – Hai giường đôi</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">2 giường đôi</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người tối đa</span><span className="gdlr-tail">6</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Biển</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">8.000.000 VNĐ / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="clear" />
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">
                            <img src="/frontend/anh/2doi.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Grand Superior Room – Hai giường đôi</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">2 giường đôi</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người tối đa</span><span className="gdlr-tail">6</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Biển</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">8.000.000 VNĐ / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">

                            <img src="/frontend/anh/dacbiet.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Superior Room – Phòng sang trọng</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">2 Giường vua</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người tối đa</span><span className="gdlr-tail">6</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Biển</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">12.000.000 VNĐ / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">

                            <img src="/frontend/anh/vua.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Deluxe Room – Phòng tổng thống</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">1 giường vua</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Max People</span><span className="gdlr-tail">3</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Biển ( Mặt monogram)</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">15.000.000 / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="clear" />
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">

                            <img src="/frontend/anh/giadinh.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Family Special – Phòng gia đình</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">5 giường đơn</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người tối đa</span><span className="gdlr-tail">8</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Biển</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">10.000.000 VNĐ / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="four columns">
                      <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                        <div className="gdlr-ux gdlr-classic-room-ux">
                          <div className="gdlr-room-thumbnail">

                            <img src="/frontend/anh/dacbiet.png" alt="" width={700} height={400} />
                          </div>
                          <h3 className="gdlr-room-title"><a href="#">Premium Room – Phòng đặc biệt</a></h3>
                          <div className="gdlr-hotel-room-info">
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Giường</span><span className="gdlr-tail">1 giường đặc biệt</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Người tối đa</span><span className="gdlr-tail">3</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">View</span><span className="gdlr-tail">Ngắm lòng biển</span></div>
                            <div className="gdlr-room-info"><i className="fa fa-check-square-o icon-check" /><span className="gdlr-head">Wifi</span><span className="gdlr-tail">Có</span></div>
                            <div className="gdlr-room-price"><span className="gdlr-head">Giá từ</span><span className="gdlr-tail">20.000.000 VNĐ / Đêm</span></div>
                            <div className="clear" />
                          </div></div>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                </div>
                <div className="clear" />
              </div>
            </section>
          </div>
          {/* Below Sidebar Section*/}
        </div>
        {/* gdlr-content */}
        <div className="clear"/>
      </div>
    </div>

  );
}
export default Room;
