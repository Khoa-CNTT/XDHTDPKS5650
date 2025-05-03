import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import Home from './component/Home';
import AboutUs from './pages/AboutUs';
import Room from './pages/Room';
import Booking from './pages/Booking';
import Booking2 from './pages/Booking2';
import Booking3 from './pages/Booking3';
import Booking4 from './pages/Booking4';
import Blog from './pages/Blog';
import Menu from './pages/Menu';
import RoomDetail from "./pages/detail/RoomDetail";
import DetailBlog from "./pages/detail/DetailBlog";
import Login from './pages/client/login';
import Register from './pages/client/register';

document.body.classList.add('home', 'page-template-default', 'page', 'page-id-3720', '_masterslider', '_msp_version_3.2.2', 'hotelmaster-button-classic-style', 'header-style-2', 'hotelmaster-classic-style', 'hotelmaster-single-classic-style');

function App() {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn là "/login" hoặc "/register"
  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Register';

  return (
    <div className="body-wrapper float-menu gdlr-icon-light gdlr-header-solid" data-home="#">
      {!isAuthPage && <Header />} {/* Hiển thị Header nếu không phải trang login/register */}
      <div id="gdlr-header-substitute"></div>
      <div className="content-wrapper">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">
            <Routes>
              {/* Các trang có Header và Footer */}
              <Route path="/" element={<Home />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Room" element={<Room />} />
              <Route path="/Room-detail/:id" element={<RoomDetail />} />
              <Route path="/Booking" element={<Booking />} />
              <Route path="/Booking/Choose-room" element={<Booking2 />} />
              <Route path="/Booking/Choose-service" element={<Booking3 />} />
              <Route path="/Booking/Confirm" element={<Booking4 />} />
              <Route path="/Blog" element={<Blog />} />
              <Route path="/Blog-detail/:id" element={<DetailBlog />} />
              <Route path="/Menu" element={<Menu />} />

              {/* Trang login và register không có Header và Footer */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
      {!isAuthPage && <Footer />} {/* Hiển thị Footer nếu không phải trang login/register */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
