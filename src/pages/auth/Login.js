// src/pages/auth/Login.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <div className="auth-wrapper">
      <Form>
        <h2>Đăng nhập</h2>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Nhập email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;