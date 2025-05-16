import React, { useState, useEffect } from "react";

function HistoryProduct() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);


  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để xem lịch sử đặt món.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/history?type=product", {
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

  if (error) {
    return (
      <div className="history-book">
        <p>{error}</p>
      </div>
    );
  }
  const handleViewDetail = async (invoiceId) => {
    const token = localStorage.getItem("token");
    setLoadingDetail(true);
    setShowModal(true);
    setOrderDetail(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/detail-order?id=${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrderDetail(data);
      } else {
        setOrderDetail({ error: "Không thể lấy chi tiết đơn hàng." });
      }
    } catch (err) {
      setOrderDetail({ error: "Lỗi mạng khi tải chi tiết đơn hàng." });
    } finally {
      setLoadingDetail(false);
    }
  };


  return (
    <>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Lịch sử đặt món</h1>
          <h1 className="gdlr-page-title">---</h1>
        </div>
      </div>

      <div style={{ marginBottom: "50px", marginTop: "50px" }}></div>

      <div className="history-book">
        <div className="history-container">
          {invoices.length === 0 ? (
            <p>Chưa có món nào được đặt.</p>
          ) : (
            <table className="history-table">
              <thead className="history-table-head">
                <tr className="history-table-row">
                  <th>Mã đơn</th>
                  <th>Tên khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody className="history-table-body">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.code}</td>
                    <td>{invoice.name}</td>
                    <td>{invoice.total.toLocaleString()}đ</td>
                    <td>
                      <button className="action-btn-view" onClick={() => handleViewDetail(invoice.id)}>
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="order-detail-modal">
              <h2>Chi tiết đơn hàng #{selectedInvoice?.code}</h2>

              {orderDetail?.orders?.length > 0 ? (
                orderDetail.orders.map((item, index) => (
                  <div key={index} className="order-item">
                    <p className="item-name">Sản phẩm: {item.name}</p>
                    <div className="item-info">
                      <p>Số lượng: {item.quantity}</p>
                      <p>Giá: {parseFloat(item.price).toLocaleString()}đ</p>
                    </div>
                  </div>
                ))
              ) : (
                !loadingDetail && <p>Không có dữ liệu đơn hàng.</p>
              )}

                <div class="modal-footer">
                  <button onClick={() => setShowModal(false)} className="close-btn">Đóng</button>
                </div>
            </div>
          </div>
        </div>
      )}


      <div style={{ marginBottom: "50px", marginTop: "50px" }}></div>
    </>
  );
}


export default HistoryProduct;