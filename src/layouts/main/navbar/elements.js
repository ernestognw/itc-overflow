import styled from 'styled-components';
import { Layout, Button } from 'antd';

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

export { NavbarContainer, NameContainer, ProfileButton };
