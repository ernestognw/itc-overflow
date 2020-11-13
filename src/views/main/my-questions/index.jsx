import React, { useState } from 'react';
import { useTitle } from '@providers/layout';
import { useQuery } from 'react-query';
import api from '@api';
import { useUser } from '@providers/user';
import Box from '@components/box';
import Questions from '@components/questions';

const defaultSortBy = {
  sortBy: 'createdAt',
  order: 'desc',
};

const defaultParams = {
  page: 1,
  pageSize: 20,
};

const MyQuestions = () => {
  useTitle('My questions');

  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [search, setSearch] = useState('');
  const [params, setParams] = useState(defaultParams);
  const { user } = useUser();

  const { data, isLoading } = useQuery(['my-questions', { search, sortBy }], () =>
    api.question.getAll({ user: user._id, ...sortBy, searchBy: ['title', 'content'], search })
  );

  return (
    <Box px={20}>
      <Questions
        params={params}
        setParams={setParams}
        defaultParams={defaultParams}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        defaultSortBy={defaultSortBy}
        questions={data}
        loading={isLoading}
      />
    </Box>
  );
};

export default MyQuestions;
