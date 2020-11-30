import React, { useState } from 'react';
import { useTitle } from '@providers/layout';
import { useQuery } from 'react-query';
import api from '@api';
import Box from '@components/box';
import QuestionAndAnswers from '@components/question-and-answers';

const defaultSortBy = {
  sortBy: 'createdAt',
  order: 'desc',
};

const defaultParams = {
  page: 1,
  pageSize: 20,
};

const QuestionById = ({ match }) => {
  const questionId = match.params.id;

  useTitle('Question');
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading } = useQuery('question-by-id', () =>
    api.question.getOne({ id: questionId, ...sortBy, ...params })
  );

  return (
    <Box px={20}>
      <QuestionAndAnswers
        params={params}
        setParams={setParams}
        defaultParams={defaultParams}
        sortBy={sortBy}
        setSortBy={setSortBy}
        defaultSortBy={defaultSortBy}
        question={data}
        loading={isLoading}
      />
    </Box>
  );
};

export default QuestionById;
