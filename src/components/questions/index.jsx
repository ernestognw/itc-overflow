import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Input, Radio, Card, Comment, Tooltip, Empty, Pagination } from 'antd';
import Box from '@components/box';
import moment from 'moment';
import Loading from '@components/loading';
import { orders } from '@config/constants';
import { Avatar } from './elements';
import { Link } from 'react-router-dom';

const { Paragraph, Title, Text } = Typography;
const { Search } = Input;

const Questions = ({
  params,
  setParams,
  defaultParams,
  search,
  setSearch,
  sortBy,
  setSortBy,
  defaultSortBy,
  questions,
  loading,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center" width="100%" my={20}>
        <Box>
          <Paragraph style={{ margin: 0 }} type="secondary">
            Search question
          </Paragraph>
          <Search
            style={{ width: 250, marginRight: 10 }}
            allowClear
            placeholder="Buscar"
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
          />
        </Box>
        <Box style={{ marginLeft: 'auto' }}>
          <Paragraph style={{ margin: 0 }} type="secondary">
            Order
          </Paragraph>
          <Radio.Group
            optionType="button"
            options={Object.keys(orders).map((order) => ({ label: orders[order], value: order }))}
            onChange={({ target: { value } }) => setSortBy({ ...sortBy, order: value })}
            defaultValue={defaultSortBy.order}
          />
        </Box>
      </Box>
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center" m={60}>
          <Loading />
        </Box>
      )}
      {!loading &&
        (questions.results.length === 0 ? (
          <Box display="flex" alignItems="center" justifyContent="center" m={60}>
            <Empty />
          </Box>
        ) : (
          <>
            {questions.results.map(({ _id, title, content, user: author, createdAt }) => (
              <Box as={Card} my={10} key={_id}>
                <Comment
                  author={`${author.firstName} ${author.lastName}`}
                  avatar={
                    <Avatar size={40} alt={`${author.firstName} ${author.lastName}`}>
                      {author.firstName[0]}
                    </Avatar>
                  }
                  content={
                    <>
                      <Title style={{ margin: 0 }} level={5}>
                        <Link to={`/questions/${_id}`}>{title}</Link>
                      </Title>
                      <Paragraph m={0} style={{ margin: 0 }}>
                        {content}
                      </Paragraph>
                    </>
                  }
                  datetime={
                    <Tooltip title={moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                      <Text>{moment(createdAt).fromNow()}</Text>
                    </Tooltip>
                  }
                />
              </Box>
            ))}
            <Pagination
              style={{ textAlign: 'center', marginTop: 20 }}
              current={params.page}
              defaultCurrent={defaultParams.page}
              pageSize={params.pageSize}
              defaultPageSize={defaultParams.pageSize}
              total={questions.info.count}
              showTotal={(total) => `${total} desarrollos`}
              showSizeChanger
              onChange={(page, pageSize) => setParams({ ...params, page, pageSize })}
              onShowSizeChange={(page, pageSize) => setParams({ ...params, page, pageSize })}
            />
          </>
        ))}
    </>
  );
};

const paramsPropTypes = PropTypes.shape({
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
});

const sortByPropTypes = PropTypes.shape({
  sortBy: PropTypes.string.isRequired,
  order: PropTypes.oneOf(Object.keys(orders)).isRequired,
});

Questions.defaultProps = {
  questions: {
    results: [],
    info: {
      count: 0,
    },
  },
};

Questions.propTypes = {
  params: paramsPropTypes.isRequired,
  setParams: PropTypes.func.isRequired,
  defaultParams: paramsPropTypes.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  sortBy: sortByPropTypes.isRequired,
  setSortBy: PropTypes.func.isRequired,
  defaultSortBy: sortByPropTypes.isRequired,
  questions: PropTypes.shape({
    info: PropTypes.shape({
      count: PropTypes.number.isRequired,
    }),
    results: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        user: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
        }),
      })
    ),
  }),
  loading: PropTypes.bool.isRequired,
};

export default Questions;
