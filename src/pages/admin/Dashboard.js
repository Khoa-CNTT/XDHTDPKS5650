// src/pages/admin/Dashboard.js
import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

function Dashboard() {
  return (
    <div className="content">
      <div className="container-fluid">
        <Row>
          <Col lg={6}>
            <Card>
              <Card.Header>
                <h3>Lượng khách truy cập trực tuyến</h3>
              </Card.Header>
              <Card.Body>
                {/* Biểu đồ thống kê */}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <Card.Header>
                <h3>Số lượng đặt</h3>
              </Card.Header>
              <Card.Body>
                {/* Biểu đồ doanh thu */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;