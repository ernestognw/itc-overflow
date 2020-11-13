import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import api from '@api';
import client from '@config/client';

export const userContext = React.createContext({});

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [canFetch, setCanFetch] = useState(!!localStorage.getItem('token'));
  const tokenPayload = token ? jwt.decode(token) : {};

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    client.defaults.headers.authorization = `Bearer ${token}`;
    setCanFetch(!!token);
  }, [token]);

  const { data, isLoading } = useQuery('user', () => api.user.get(tokenPayload.userId), {
    enabled: token && canFetch,
  });

  return (
    <userContext.Provider
      value={{
        user: data ?? {},
        loadingUser: isLoading,
        token,
        setToken,
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
