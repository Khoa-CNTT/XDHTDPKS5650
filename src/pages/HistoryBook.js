import React, { useState, useEffect } from "react";

function HistoryBook() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để xem lịch sử đặt phòng.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
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
                    <td>
                      <button className="action-btn-rate">Đánh giá</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div style={{ marginBottom: "50px", marginTop: "50px" }}></div>
    </>
  );
}

export default HistoryBook;