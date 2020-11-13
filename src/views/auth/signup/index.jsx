import React, { useState } from 'react';
import api from '@api';
import { useUser } from '@providers/user';
import { passwordRegex } from '@config/constants';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Password } = Input;
const { Text, Title } = Typography;

const Login = () => {
  const [logging, setLogging] = useState(false);
  const { setToken } = useUser();

  const onFinish = async (values) => {
    setLogging(true);
    try {
      const { token } = await api.auth.signUp({ ...values });
      setToken(token);
    } catch (err) {
      message.error(err.message);
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
        <Item name="firstName" rules={[{ required: true, message: 'Enter your first name' }]}>
          <Input prefix={<UserOutlined />} placeholder="Nombre" />
        </Item>
        <Item name="lastName" rules={[{ required: true, message: 'Enter your last name' }]}>
          <Input prefix={<UserOutlined />} placeholder="Apellido" />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Enter your password',
            },
            () => ({
              validator: (_, value) => {
                const validPasswordToSet = passwordRegex.test(value);

                if (validPasswordToSet) return Promise.resolve();

                return Promise.reject(
                  'La contraseña debe tener al menos 8 caractéres, con un número y un caractér especial'
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Password prefix={<LockOutlined />} placeholder="Password" />
        </Item>
        <Item
          name="confirm"
          placeholder="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject("Passwords don't match");
              },
            }),
          ]}
        >
          <Password prefix={<LockOutlined />} placeholder="Confirmar password" />
        </Item>
        <Item style={{ marginTop: 20 }}>
          <Button loading={logging} block type="primary" htmlType="submit">
            Sign up
          </Button>
        </Item>
      </Form>
      <Divider>
        <Text style={{ fontSize: 10 }} type="secondary">
          Already have an account?
        </Text>
      </Divider>
      <Link to="/login">
        <Button block>Login</Button>
      </Link>
    </Card>
  );
};

export default Login;
