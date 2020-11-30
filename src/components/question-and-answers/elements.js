import styled from 'styled-components';
import { Avatar as DefaultAvatar } from 'antd';

const Avatar = styled(DefaultAvatar)`
  margin-right: 15px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export { Avatar };
