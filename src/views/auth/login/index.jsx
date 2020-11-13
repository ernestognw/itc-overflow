import React, { useState } from 'react';
import api from '@api';
import { Link } from 'react-router-dom';
import { useUser } from '@providers/user';
import { Card, Form, Input, Button, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Text, Title } = Typography;

const Login = () => {
  const [logging, setLogging] = useState(false);
  const { setToken } = useUser();

  const onFinish = async (values) => {
    setLogging(true);
    try {
      const { token } = await api.auth.logIn({ ...values });
      setToken(token);
    } catch (err) {
      message.error('Account not recognized. Verify your email and password');
      setLogging(false);
    }
  };

  return (
    <Card style={{ maxWidth: 450, width: '100%' }}>
      <Title>ITC Overflow</Title>
      <Form onFinish={onFinish}>
        <Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Enter a valid email',
            },
            { required: true, message: 'Enter an email' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Item>
        <Item
          style={{ marginTop: 10 }}
          name="password"
          rules={[{ required: true, message: 'Enter your password' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Item>
        <Item style={{ marginTop: 20 }}>
          <Button loading={logging} block type="primary" htmlType="submit">
            Log in
          </Button>
        </Item>
      </Form>
      <Divider>
        <Text style={{ fontSize: 10 }} type="secondary">
          Don&lsquo;t have an account yet?
        </Text>
      </Divider>
      <Link to="/signup">
        <Button block>Create one</Button>
      </Link>
    </Card>
  );
};

export default Login;
