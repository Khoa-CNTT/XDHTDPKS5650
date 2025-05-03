import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/layout/Layout';
import AdminLayout from './component/layout/AdminLayout';
import Home from './component/Home';
import AboutUs from './pages/AboutUs';
import Room from './pages/Room';
import Booking from './pages/Booking';
import Blog from './pages/Blog';
import Menu from './pages/Menu';
import Login from './pages/client/login';
import Register from './pages/client/register';
import Dashboard from './pages/admin/Dashboard';
import RoomDetail from "./pages/detail/RoomDetail";
import DetailBlog from "./pages/detail/DetailBlog";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="room" element={<Room />} />
          <Route path="room-detail/:id" element={<RoomDetail />} />
          <Route path="booking" element={<Booking />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog-detail/:id" element={<DetailBlog />} />
          <Route path="menu" element={<Menu />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;