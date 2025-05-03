import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Room() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/list-room");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-zinc-300">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Phòng</h1>
          <span className="gdlr-page-caption">Tất cả đều có tại đây</span>
        </div>
      </div>
      <div id="gdlr-header-substitute"></div>
      <div className="content-wrapper">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">
            <section id="content-section-1">
              <div className="section-container container">
                <div className="room-item-wrapper type-classic" style={{ marginBottom: '30px' }}>
                  <div className="room-item-holder">
                    <div className="clear" />
                    {rooms.map((room, index) => (
                      <div key={room.id || index} className="four columns">
                        <div className="gdlr-item gdlr-room-item gdlr-classic-room">
                          <div className="gdlr-ux gdlr-classic-room-ux">
                            <div className="gdlr-room-thumbnail">
                              <Link to={`/room-detail/${room.id}`}>
                                <img src={room.room_category['image'] || "frontend/anh/default-room.png"} alt={room.name} width={700} height={400} />
                              </Link>
                            </div>
                            <h3 className="gdlr-room-title">
                              <Link to={`/room-detail/${room.id}`}>{room.name}</Link>
                            </h3>
                            <div className="gdlr-hotel-room-info">
                              <div className="gdlr-room-info">
                                <i className="fa fa-check-square-o icon-check" />
                                <span className="gdlr-head">Giường</span>
                                <span className="gdlr-tail">{room.bed_type || "1 giường đôi"}</span>
                              </div>
                              <div className="gdlr-room-info">
                                <i className="fa fa-check-square-o icon-check" />
                                <span className="gdlr-head">Người tối đa</span>
                                <span className="gdlr-tail">{room.max_people || "2"}</span>
                              </div>
                              <div className="gdlr-room-info">
                                <i className="fa fa-check-square-o icon-check" />
                                <span className="gdlr-head">View</span>
                                <span className="gdlr-tail">{room.view || "Thành phố"}</span>
                              </div>
                              <div className="gdlr-room-info">
                                <i className="fa fa-check-square-o icon-check" />
                                <span className="gdlr-head">Wifi</span>
                                <span className="gdlr-tail">Có</span>
                              </div>
                              <div className="gdlr-room-price">
                                <span className="gdlr-head">Giá từ</span>
                                <span className="gdlr-tail">{room.price ? `${room.price.toLocaleString()} VNĐ / Đêm` : "Liên hệ"}</span>
                              </div>
                              <div className="clear" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="clear" />
                  </div>
                </div>
                <div className="clear" />
              </div>
            </section>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
}

export default Room;