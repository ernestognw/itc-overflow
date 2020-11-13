import React from 'react';
import { useTitle } from '@providers/layout';
import { useQuery } from 'react-query';
import api from '@api';
import { Empty } from 'antd';
import Box from '@components/box';
import Loading from '@components/loading';

const AllQuestions = () => {
  useTitle('All questions');

  const { data, isLoading } = useQuery('all-question', api.question.getAll);

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

  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default AllQuestions;
