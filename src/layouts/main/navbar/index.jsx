import React, { useState } from 'react';
import { PageHeader, Dropdown, Menu, Typography, Button } from 'antd';
import { useLayout } from '@providers/layout';
import { useUser } from '@providers/user';
import { useLocation, Link } from 'react-router-dom';
import {
  DownOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  CommentOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { NavbarContainer, NameContainer, ProfileButton, Avatar } from './elements';
import CreateQuestionModal from './create-question-modal';

const { Item, ItemGroup } = Menu;
const { Text } = Typography;

const NavBar = () => {
  const { title } = useLayout();
  const { user, setToken } = useUser();
  const { pathname } = useLocation();
  const [createQuestionModalOpen, toggleQuestionModal] = useState(false);

  const handleLogout = () => setToken();

  return (
    <>
      <CreateQuestionModal
        visible={createQuestionModalOpen}
        onCancel={() => toggleQuestionModal(false)}
      />
      <NavbarContainer>
        <PageHeader
          backIcon={false}
          style={{ marginRight: 'auto', padding: '0px 20px' }}
          title={title}
          theme="dark"
        />
        <Button
          size="small"
          icon={<PlusOutlined />}
          style={{ marginRight: 15 }}
          onClick={() => toggleQuestionModal(true)}
          type="primary"
        >
          New question
        </Button>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu mode="vertical">
              <ItemGroup title="Session">
                <Item onClick={handleLogout} icon={<LogoutOutlined />}>
                  Logout
                </Item>
              </ItemGroup>
            </Menu>
          }
        >
          <ProfileButton type="text">
            <Avatar size={35}>{user.firstName?.[0]}</Avatar>
            <NameContainer>
              <Text style={{ fontSize: 12 }} type="secondary">
                Welcome
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
          <Link to="/">My questions</Link>
        </Item>
        <Item key="/all" icon={<AppstoreOutlined />}>
          <Link to="/all">All questions</Link>
        </Item>
      </Menu>
    </>
  );
};

export default NavBar;
