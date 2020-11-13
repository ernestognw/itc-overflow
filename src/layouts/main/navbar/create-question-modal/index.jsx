import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MessageOutlined } from '@ant-design/icons';
import { useMutation, useQueryCache } from 'react-query';
import api from '@api';
import { Modal, Form, Input, message } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

const AddUserModal = ({ visible, onCancel }) => {
  const [adding, setAdding] = useState('');

  const queryCache = useQueryCache();

  const [createQuestion] = useMutation(api.question.create, {
    onSuccess: () => {
      message.success('Question added');
      queryCache.invalidateQueries('my-questions');
      queryCache.invalidateQueries('all-questions');
    },
    onError: () => {
      message.error('An error has occurred. Try again');
    },
  });

  const addQuestion = async (values) => {
    setAdding(true);
    await createQuestion({ ...values });
    setAdding(false);
    onCancel();
  };

  return (
    <Modal
      title="Add a question"
      visible={visible}
      okButtonProps={{ form: 'category-editor-form', key: 'submit', htmlType: 'submit' }}
      onCancel={onCancel}
      confirmLoading={adding}
    >
      <Form id="category-editor-form" onFinish={addQuestion} layout="vertical">
        <Item
          style={{ marginTop: 10 }}
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Enter a question title' }]}
        >
          <Input prefix={<MessageOutlined />} type="title" placeholder="Title" />
        </Item>
        <Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Enter a question description' }]}
        >
          <TextArea placeholder="Describe your question" rows={4} />
        </Item>
      </Form>
    </Modal>
  );
};

AddUserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddUserModal;
