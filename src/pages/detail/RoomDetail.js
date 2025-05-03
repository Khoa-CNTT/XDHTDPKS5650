import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/detail-room/${id}`);
        console.log('Room data:', response.data);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError('Không thể tải thông tin phòng. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [id]);

  const handleRating = async (stars) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/create-rate', {
        id_user: 1,
        id_room: id,
        stars: stars
      });
      setRating(stars);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', room);
  };

  const handleBuyNow = () => {
    console.log('Buy now:', room);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy phòng
        </div>
      </div>
    );
  }

  return (
    <>
      {room.map((item) => (
        <div className="gdlr-page-title-wrapper">
          <div className="gdlr-page-title-overlay" />
          <div className="gdlr-page-title-container container">
            <h1 className="gdlr-page-title">{item.room_category['room_type']}</h1>
            <span>_______</span>
          </div>
        </div>
      ))}
      {room.map((item) => (
        <div className="content-wrapper">
          <div className="gdlr-content">
            <div className="with-sidebar-wrapper">
              <div className="with-sidebar-container container gdlr-class-no-sidebar">
                <div className="row">
                  {/* Bên trái: Nội dung */}
                  <div className="col-md-8">
                    <div className="with-sidebar-left twelve columns">
                      <div className="with-sidebar-content twelve columns">
                        <div className="gdlr-item gdlr-item-start-content">
                          <div id="room-3596" className="post-3596 room type-room status-publish has-post-thumbnail hentry room_category-room room_tag-luxury room_tag-room room_tag-standard">
                            <div className="gdlr-room-main-content ">
                              <div className="gdlr-room-thumbnail gdlr-single-room-thumbnail">
                                <Image src={item.room_category.image || "frontend/anh/default-room.png"} fluid className="mb-4" alt={item.room_name}/>
                              </div>
                              <div className="gdlr-room-title-wrapper">
                                <h3 className="gdlr-room-title">Standard Room – One King Bed</h3>
                                <div className="gdlr-room-price">
                                  <span className="gdlr-head">Start From </span>
                                  <span className="gdlr-tail price"> $90.00 / Night</span>
                                </div>											
                                <div className="clear" />
                              </div>
                              <hr className="section-divider detail" />
                              <div className="gdlr-hotel-room-info detail">
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">Bed</span><span className="gdlr-tail">1 King Bed</span>
                                </div>
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">Max</span>
                                  <span className="gdlr-tail">3 People</span>
                                </div>
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">View</span>
                                  <span className="gdlr-tail">City</span>
                                </div>
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">Room Size</span>
                                  <span className="gdlr-tail">80 sqm.</span>
                                </div>
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">Wifi</span>
                                  <span className="gdlr-tail">Yes</span>
                                </div>
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">Breakfast Included</span>
                                  <span className="gdlr-tail">Yes</span>
                                </div>
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">Room Service</span>
                                  <span className="gdlr-tail">Yes</span>
                                </div>
                                <div className="gdlr-room-info detail">
                                  <i className="fa fa-check-square-o icon-check" />
                                  <span className="gdlr-head">Airport Pickup Service</span>
                                  <span className="gdlr-tail">$40/round</span>
                                </div>
                                <div className="clear" />
                              </div>
                              <div className="gdlr-room-content"><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                                <p>Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Donec sed odio dui.</p>
                                <div className="clear" /><div className="gdlr-space" style={{marginTop: '35px'}} />
                                <div className="gdlr-shortcode-wrapper"><div className="gdlr-gallery-item gdlr-item"><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2676493-suite-bed-room-with-balcony-of-a-luxury-resort-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2676493-suite-bed-room-with-balcony-of-a-luxury-resort-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-3973259-hotel-room-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-3973259-hotel-room-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2232283-hotel-room-with-bed-and-wooden-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2232283-hotel-room-with-bed-and-wooden-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-1231437-tropical-pool-bar-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img loading="lazy" decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-1231437-tropical-pool-bar-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-7751505-luxury-home-with-swimming-pool-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img loading="lazy" decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-7751505-luxury-home-with-swimming-pool-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="clear" /><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-3290449-concierges-holding-the-cart-and-posing-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img loading="lazy" decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-3290449-concierges-holding-the-cart-and-posing-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2673580-brown-sofas-the-lobby-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img loading="lazy" decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2673580-brown-sofas-the-lobby-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2681114-penthouse-room-on-a-sunny-day-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img loading="lazy" decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-2681114-penthouse-room-on-a-sunny-day-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-1177463-spa-woman-hot-stones-massage-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img loading="lazy" decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-1177463-spa-woman-hot-stones-massage-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="gallery-column one-fifth column"><div className="gallery-item"><a href="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-396585-spa-m.jpg" data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img loading="lazy" decoding="async" src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2015/03/photodune-396585-spa-m-150x150.jpg" alt="" width={150} height={150} style={{opacity: 0}} /></a></div></div><div className="clear" /></div></div>
                                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis.</p>
                                <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bên phải: Form đặt phòng */}
                  <div className="col-md-4 form-room-detail">
                    <form className="gdlr-reservation-bar" id="gdlr-reservation-bar" data-action="gdlr_hotel_booking" method="post" action="https://demo.goodlayers.com/hotelmaster/dark/?booking">
                      <div className="gdlr-reservation-bar-title">Your Reservation</div>
                      <div className="gdlr-reservation-bar-summary-form" id="gdlr-reservation-bar-summary-form" />
                      <div className="gdlr-reservation-bar-room-form" id="gdlr-reservation-bar-room-form" />
                      <div className="gdlr-reservation-bar-date-form" id="gdlr-reservation-bar-date-form">
                      <div className="gdlr-reservation-field gdlr-resv-datepicker">
                          <span className="gdlr-reservation-field-title">Check In</span>
                          <div className="gdlr-datepicker-wrapper"><input type="text" id="gdlr-check-in" className="gdlr-datepicker hasDatepicker" data-current-date="2025-05-02" autoComplete="off" data-dfm="d M yy" data-block="[]" defaultValue="2025-05-02" /><input type="hidden" className="gdlr-datepicker-alt" name="gdlr-check-in" autoComplete="off" defaultValue="2025-05-02" /></div>
                      </div>
                      <div className="gdlr-reservation-field gdlr-resv-combobox gdlr-resv-night">
                          <span className="gdlr-reservation-field-title">Nights</span>
                          <div className="gdlr-combobox-wrapper">
                            <select name="gdlr-night" id="gdlr-night">
                                <option value={1} selected>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                            </select>
                          </div>
                      </div>
                      <div className="clear" />
                      <div className="gdlr-reservation-field gdlr-resv-datepicker">
                          <span className="gdlr-reservation-field-title">Check Out</span>
                          <div className="gdlr-datepicker-wrapper"><input type="text" id="gdlr-check-out" className="gdlr-datepicker hasDatepicker" data-current-date="2025-05-02" autoComplete="off" data-min-night={1} data-dfm="d M yy" data-block="[]" defaultValue="2025-05-03" /><input type="hidden" className="gdlr-datepicker-alt" name="gdlr-check-out" autoComplete="off" defaultValue="2025-05-03" /></div>
                      </div>
                      <div className="clear" />
                      <div className="gdlr-reservation-field gdlr-resv-combobox gdlr-reservation-bar-room-number">
                          <span className="gdlr-reservation-field-title">Rooms</span>
                          <div className="gdlr-combobox-wrapper">
                            <select name="gdlr-room-number" id="gdlr-room-number">
                                <option value={1} selected>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                            </select>
                          </div>
                      </div>
                      <div className="clear" />
                      <div className="gdlr-reservation-people-amount-wrapper" id="gdlr-reservation-people-amount-wrapper">
                      <div className="gdlr-reservation-people-amount">
                          <div className="gdlr-reservation-people-title">Room <span>1</span></div>
                          <div className="gdlr-reservation-field gdlr-resv-combobox ">
                            <span className="gdlr-reservation-field-title">Adults</span>
                            <div className="gdlr-combobox-wrapper">
                                <select name="gdlr-adult-number[]">
                                  <option value={1}>1</option>
                                  <option value={2} selected>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                  <option value={9}>9</option>
                                </select>
                            </div>
                          </div>
                          <div className="gdlr-reservation-field gdlr-resv-combobox ">
                            <span className="gdlr-reservation-field-title">Children</span>
                            <div className="gdlr-combobox-wrapper">
                                <select name="gdlr-children-number[]">
                                  <option value={0}>0</option>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                  <option value={9}>9</option>
                                </select>
                            </div>
                          </div>
                          <div className="clear" /></div>
                      </div>
                      <div className="clear" />
                      <input type="hidden" name="hotel_data" defaultValue={1} /><input type="submit" className="gdlr-reservation-bar-button gdlr-button with-border" defaultValue="Check Availability" />
                      <div className="clear" />
                      </div>
                      <div className="gdlr-reservation-bar-service-form" id="gdlr-reservation-bar-service-form" />
                      <input type="hidden" name="single-room" defaultValue={3596} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RoomDetail;