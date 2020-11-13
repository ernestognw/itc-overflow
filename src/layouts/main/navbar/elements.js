import styled from 'styled-components';
import { Layout, Button, Avatar as DefaultAvatar } from 'antd';

const { Header } = Layout;

const NavbarContainer = styled(Header)`
  padding: 0px !important;
  display: flex;
  align-items: center;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 15px;
`;

const ProfileButton = styled(Button)`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Avatar = styled(DefaultAvatar)`
  margin-right: 15px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export { NavbarContainer, NameContainer, ProfileButton, Avatar };
