import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function Product() {
  const [listRoom, setListRoom] = useState([]);
  const fetchDataRoom = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/list-product`, {
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
  return (
    <div><div className="gdlr-page-title-wrapper"
      style={{
        backgroundImage: 'url(/frontend/anh/bgrTitle.png)',
        backgroundSize: '1518px 226px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(34, 34, 34, 0.5)', zIndex: 0, }} />
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">
            Vietnam's leading experienced restaurant
          </h1>
        </div>
      </div>
    </div>
      <div id="gdlr-header-substitute"></div>
      <div className="content-wrapper">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">

          </div>
          {/* Below Sidebar Section*/}
        </div>
        {/* gdlr-content */}
        <div className="clear" />
      </div>
      <section>
        <div className="container center" style={{ marginTop: "0px", marginLeft: "0px" }}>
          <h2>Các món chính tại đây</h2>
          <p className="desc" style={{ fontSize: "14px" }} >
            Được nhập khẩu từ các nước hàng đầu và chế biến bởi đầu bếp có tay
            nghề cực đỉnh
          </p>

          <h1 className="title-box">Bo</h1>
          <div className="grid-container" style={{ display: "flex", marginTop: "0px" }}>
            <div className="card">
              <img
                className="card-img"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473794tKi/bo-kobe-853263.jpg"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                alt=""
              />
              <div className="card-title">Bò Kobe</div>
              <div className="card-money">Giá: 850 $</div>
            </div>
            <div className="card" >
              <img
                className="card-img"
                src="https://media1.nguoiduatin.vn/media/dng-th-thu-nga/2019/02/22/salad-hoa-qua.jpg"
                alt=""
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <div className="card-title">Salad</div>
              <div className="card-money">Giá: 100 $</div>
            </div>
            <div className="card" >
              <img
                className="card-img"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473794abD/thit-bo-wagyu-853258.jpg"
                alt=""
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <div className="card-title">Bò Wagyu</div>
              <div className="card-money">Giá: 300 $</div>
            </div>
          </div>

          <h1 className="title-box">Heo</h1>
          <div className="grid-container" style={{ display: "flex" }}>
            <div className="card">
              <img
                className="card-img"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473794tKi/bo-kobe-853263.jpg"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                alt=""
              />
              <div className="card-title">Bò Kobe</div>
              <div className="card-money">Giá: 850 $</div>
            </div>
            <div className="card" >
              <img
                className="card-img"
                src="https://media1.nguoiduatin.vn/media/dng-th-thu-nga/2019/02/22/salad-hoa-qua.jpg"
                alt=""
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <div className="card-title">Salad</div>
              <div className="card-money">Giá: 100 $</div>
            </div>
            <div className="card">
              <img
                className="card-img"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473794abD/thit-bo-wagyu-853258.jpg"
                alt=""
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <div className="card-title">Bò Wagyu</div>
              <div className="card-money">Giá: 300 $</div>
            </div>
          </div>



          <h1 className="title-box">Cho</h1>
          <div className="grid-container" style={{ display: "flex" }}>
            <div className="card">
              <img
                className="card-img"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473794tKi/bo-kobe-853263.jpg"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                alt=""
              />
              <div className="card-title">Bò Kobe</div>
              <div className="card-money">Giá: 850 $</div>
            </div>
            <div className="card" >
              <img
                className="card-img"
                src="https://media1.nguoiduatin.vn/media/dng-th-thu-nga/2019/02/22/salad-hoa-qua.jpg"
                alt=""
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <div className="card-title">Salad</div>
              <div className="card-money">Giá: 100 $</div>
            </div>
            <div className="card">
              <img
                className="card-img"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473794abD/thit-bo-wagyu-853258.jpg"
                alt=""
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <div className="card-title">Bò Wagyu</div>
              <div className="card-money">Giá: 300 $</div>
            </div>
          </div>
        </div>



      </section>
    </div>
  );
}
export default Product;
