import React, { useState } from 'react';
import { useTitle } from '@providers/layout';
import { useQuery } from 'react-query';
import api from '@api';
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
  useTitle('All questions');

  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [search, setSearch] = useState('');
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading } = useQuery(['all-questions', { search, sortBy, params }], () =>
    api.question.getAll({ ...sortBy, searchBy: ['title', 'content'], search, ...params })
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
