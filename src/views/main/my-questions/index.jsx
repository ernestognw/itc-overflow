import React from 'react';
import { useTitle } from '@providers/layout';
import { useQuery } from 'react-query';
import api from '@api';
import { useUser } from '@providers/user';
import Box from '@components/box';
import Loading from '@components/loading';
import { Empty } from 'antd';

const MyQuestions = () => {
  useTitle('My questions');

  const { user } = useUser();

  const { data, isLoading } = useQuery('my-question', () =>
    api.question.getAll({ user: user._id })
  );

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" m={60}>
        <Loading />
      </Box>
    );
  }

  if (data.results.length === 0) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" m={60}>
        <Empty />
      </Box>
    );
  }

  if (data.results.length === 0) {
    return (
      <>
        <p>No data</p>
      </>
    );
  }

  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default MyQuestions;
