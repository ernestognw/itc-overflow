/* eslint-disable no-unused-expressions */
import React from 'react';
import { PageHeader, Avatar, Dropdown, Menu, Typography } from 'antd';
import { useLayout } from '@providers/layout';
import { useUser } from '@providers/user';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  AppstoreOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { NavbarContainer, NameContainer, ProfileButton } from './elements';

const { Item, ItemGroup } = Menu;
const { Text } = Typography;

const NavBar = () => {
  const { title } = useLayout();
  const { user } = useUser();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <NavbarContainer>
        <PageHeader
          backIcon={false}
          style={{ marginRight: 'auto', padding: '0px 20px' }}
          title={title}
          theme="dark"
        />
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu mode="vertical">
              <ItemGroup title="Sesión">
                <Item onClick={handleLogout} icon={<LogoutOutlined />}>
                  Salir
                </Item>
              </ItemGroup>
            </Menu>
          }
        >
          <ProfileButton type="text">
            <Avatar style={{ marginRight: 15 }} size={35} src={user.profileImg}>
              {user.firstName?.[0]}
            </Avatar>
            <NameContainer>
              <Text style={{ fontSize: 12 }} type="secondary">
                Bienvenido
              </Text>
              <Text style={{ marginTop: -5 }} strong>
                {user.firstName}
              </Text>
            </NameContainer>
            <DownOutlined />
          </ProfileButton>
        </Dropdown>
      </NavbarContainer>
      <Menu mode="horizontal" selectedKeys={[pathname]}>
        <Item key="/" icon={<CommentOutlined />}>
          <Link to="/">Mis preguntas</Link>
        </Item>
        <Item key="/all" icon={<AppstoreOutlined />}>
          <Link to="/all">Todas las preguntas</Link>
        </Item>
      </Menu>
    </>
  );
};

export default NavBar;
