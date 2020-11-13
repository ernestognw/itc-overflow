import React, { useState } from 'react';
import api from '@api';
import { Card, Form, Input, Button, Image, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Item } = Form;

const Login = () => {
  const [logging, setLogging] = useState(false);

  const onFinish = async (values) => {
    setLogging(true);
    try {
      const { token } = await api.auth.logIn({ ...values });
      localStorage.setItem('token', token);
      window.location.reload();
    } catch (err) {
      message.error('Cuenta no reconocida. Verifica tu correo y contraseña');
      setLogging(false);
    }
  };

  return (
    <Card style={{ maxWidth: 450, width: '100%' }}>
      <Form onFinish={onFinish}>
        <Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Ingresa un correo válido',
            },
            { required: true, message: 'Ingresa tu email' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Item>
        <Item
          style={{ marginTop: 10 }}
          name="password"
          rules={[{ required: true, message: 'Ingresa tu password' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Item>
        <Item style={{ marginTop: 20 }}>
          <Button loading={logging} block type="primary" htmlType="submit">
            Log in
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default Login;
