import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Input,
  Card,
  Comment,
  Tooltip,
  Form,
  Button,
  Row,
  Divider,
  message,
  Avatar,
  Radio,
  Pagination,
} from 'antd';
import Box from '@components/box';
import { orders } from '@config/constants';
import api from '@api';
import moment from 'moment';
import Loading from '@components/loading';
import { useMutation, useQueryCache } from 'react-query';

const { Paragraph, Title, Text } = Typography;
const { TextArea } = Input;
const { Item } = Form;

const QuestionAndAnswers = ({
  params,
  setParams,
  defaultParams,
  sortBy,
  setSortBy,
  defaultSortBy,
  question,
  loading,
}) => {
  const [posting, setPosting] = useState(false);

  const [form] = Form.useForm();

  const queryCache = useQueryCache();

  const [createAnswer] = useMutation(api.answer.create, {
    onSuccess: () => {
      message.success('Answer posted');
      queryCache.invalidateQueries('question-by-id');
    },
    onError: () => {
      message.error('An error has occurred. Try again');
    },
  });

  const addAnswer = async (values) => {
    setPosting(true);
    const answer = { questionId: question.results._id, ...values };
    await createAnswer({ ...answer });
    setPosting(false);
    form.resetFields();
  };

  return (
    <>
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center" m={60}>
          <Loading />
        </Box>
      )}
      {!loading && question && (
        <Box display="flex" flexDirection="column" m={60}>
          <Box as={Card} display="flex" mb={30}>
            <Title style={{ margin: 0 }}>{question.results.title}</Title>
            <Comment
              datetime={
                <>
                  <Tooltip title={moment(question.results.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <Text style={{ marginRight: 8 }}>
                      Asked {moment(question.results.createdAt).fromNow()}
                    </Text>
                  </Tooltip>
                  <Tooltip title={moment(question.results.updatedAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <Text>Updated {moment(question.results.updatedAt).fromNow()}</Text>
                  </Tooltip>
                </>
              }
            />
            <Box display="flex">
              <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{question.results.content}</Paragraph>
            </Box>
          </Box>

          {question.results.answers.length !== 0 && (
            <>
              <Divider />
              <Title type="secondary">{question.results.answers.length} Answers</Title>
              {question.results.answers.map(({ _id, content, user: author, createdAt }) => (
                <Box as={Card} my={10} key={_id}>
                  <Comment
                    author={`${author.firstName} ${author.lastName}`}
                    avatar={
                      <Avatar size={40} alt={`${author.firstName} ${author.lastName}`}>
                        {author.firstName[0]}
                      </Avatar>
                    }
                    content={
                      <Paragraph m={0} style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {content}
                      </Paragraph>
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
                total={question.info.count[0].count}
                showTotal={(total) => `${total} answers`}
                showSizeChanger
                onChange={(page, pageSize) => setParams({ ...params, page, pageSize })}
                onShowSizeChange={(page, pageSize) => setParams({ ...params, page, pageSize })}
              />
              <Box display="flex" alignItems="center" width="100%" my={20}>
                <Box style={{ marginLeft: 'auto' }}>
                  <Paragraph style={{ margin: 0 }} type="secondary">
                    Order
                  </Paragraph>
                  <Radio.Group
                    optionType="button"
                    options={Object.keys(orders).map((order) => ({
                      label: orders[order],
                      value: order,
                    }))}
                    onChange={({ target: { value } }) => setSortBy({ ...sortBy, order: value })}
                    defaultValue={defaultSortBy.order}
                  />
                </Box>
              </Box>
            </>
          )}
          <Divider />
          <Box display="flex" flexDirection="column" my={20}>
            <Title type="secondary">Your Answer</Title>
            <Form form={form} onFinish={addAnswer} layout="vertical">
              <Item
                name="content"
                label="Content"
                rules={[{ required: true, message: 'Enter answer content' }]}
              >
                <TextArea placeholder="Describe your solution" rows={5} />
              </Item>
              <Row justify="end">
                <Button loading={posting} type="primary" htmlType="submit">
                  Post Your Answer
                </Button>
              </Row>
            </Form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default QuestionAndAnswers;
