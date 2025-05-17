import React, { useState, useEffect } from "react";

function HistoryBook() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [stars, setStars] = useState(0);
  const [submitMessage, setSubmitMessage] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để xem lịch sử đặt phòng.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/history?type=room", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setInvoices(data.invoices || []);
        } else {
          const errorText = await response.text();
          setError(`Lỗi: ${errorText}`);
        }
      } catch (err) {
        setError("Lỗi mạng. Không thể kết nối đến server.");
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setStars(0);
    setSubmitMessage(null);
    setShowModal(true);
  };

  const handleSubmitRating = async () => {
  if (!stars || !selectedInvoice?.room?.id) {
    setSubmitMessage("Vui lòng chọn số sao và đảm bảo dữ liệu hợp lệ.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/create-rate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_room: selectedInvoice.room.id,
        id_invoice: selectedInvoice.id,
        stars: stars,
      }),
    });

    if (response.ok) {
      setSubmitMessage("Đánh giá thành công!");
    } else {
      // Chuyển về JSON để lấy message rõ ràng
      const errorJson = await response.json();
      setSubmitMessage(`Lỗi: ${errorJson.message || "Có lỗi xảy ra"}`);
    }
  } catch (err) {
    setSubmitMessage("Lỗi mạng khi gửi đánh giá.");
  }
};


  if (error) {
    return (
      <div className="history-book">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Lịch sử đặt phòng</h1>
          <h1 className="gdlr-page-title">---</h1>
        </div>
      </div>

      <div style={{ marginBottom: "50px", marginTop: "50px" }}></div>

      <div className="history-book">
        <div className="history-container">
          {invoices.length === 0 ? (
            <p>Chưa có phòng nào được đặt.</p>
          ) : (
            <table className="history-table">
              <thead className="history-table-head">
                <tr className="history-table-row">
                  <th>Mã đơn</th>
                  <th>Tên khách hàng</th>
                  <th>Loại phòng</th>
                  <th>Nhận / Trả</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="history-table-body">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.code}</td>
                    <td>{invoice.name}</td>
                    <td>
                      {invoice.room && invoice.room.room_category
                        ? invoice.room.room_category.room_type
                        : "Không rõ"}
                    </td>
                    <td>
                      {formatDate(invoice.issueDate)} →{" "}
                      {formatDate(invoice.dueDate)}
                    </td>
                    <td>{invoice.total.toLocaleString()}đ</td>
                    <td>{invoice.payment_status === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                    <td>
                      <button className="action-btn-rate" onClick={() => openModal(invoice)}>
                        Đánh giá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showModal && selectedInvoice && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title-rate">Đánh giá phòng</h2>
              <p><strong>Phòng:</strong> {selectedInvoice.room?.room_category?.room_type || "Không rõ"}</p>
              <p><strong>Giá:</strong> {selectedInvoice.total.toLocaleString()}đ</p>
              {selectedInvoice.check_rate === 1 ? (
                <p style={{ color: "green", fontWeight: "bold" }}>Bạn đã đánh giá hóa đơn này rồi.</p>
              ) : (
                <>
                  <p>Chọn số sao:</p>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= stars ? "selected" : ""}`}
                        onClick={() => setStars(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </>
              )}
            {submitMessage && <p>{submitMessage}</p>}
            <div className="modal-actions">
              <div style={{ marginTop: "20px" }}>
                {selectedInvoice.check_rate === 1 ? (
                  <>
                    <button className="btn-close-rate" onClick={() => setShowModal(false)}>Đóng</button>
                  </>
                ) : (
                  <>
                    <button className="btn-submit-rate" onClick={handleSubmitRating}>Gửi đánh giá</button>
                    <button className="btn-close-rate" onClick={() => setShowModal(false)}>Đóng</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginBottom: "50px", marginTop: "50px" }}></div>
    </>
  );
}

export default HistoryBook;