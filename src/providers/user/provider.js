import React from 'react';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import api from '@api';

export const userContext = React.createContext({});

const UserProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const tokenPayload = token ? jwt.decode(token) : {};

  const { data, isLoading } = useQuery(
    'user',
    () => api.user.get(tokenPayload.userId),
    {
      enabled: token,
    }
  );

  return (
    <userContext.Provider
      value={{
        user: data ?? {},
        loadingUser: isLoading,
        token,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
