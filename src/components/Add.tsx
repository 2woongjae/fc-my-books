import React, { useEffect } from 'react';
import { message as messageDialog, PageHeader, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FormOutlined } from '@ant-design/icons';

import Layout from './Layout';
import { BookReqType, BookResType } from '../types';
import styles from './Add.module.css';

interface AddProps {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
  add: (book: BookReqType) => void;
  back: () => void;
  getBooks: () => void;
  logout: () => void;
}

const Add: React.FC<AddProps> = ({
  books,
  loading,
  error,
  add,
  getBooks,
  back,
  logout,
}) => {
  const titleRef = React.useRef<Input>(null);
  const messageRef = React.useRef<TextArea>(null);
  const authorRef = React.useRef<Input>(null);
  const urlRef = React.useRef<Input>(null);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  if (books === null) {
    return null;
  }

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <FormOutlined /> Add Book
          </div>
        }
        subTitle="Add Your Book"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button_logout}
          >
            Logout
          </Button>,
        ]}
      />

      <img src="/bg_list.png" className={styles.bg} alt="books" />

      <div className={styles.add}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="Title" ref={titleRef} className={styles.input} />
        </div>
        <div className={styles.input_comment}>
          Comment
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <TextArea
            rows={4}
            placeholder="Comment"
            ref={messageRef}
            className={styles.input}
          />
        </div>
        <div className={styles.input_author}>
          Author
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="Author"
            ref={authorRef}
            className={styles.input}
          />
        </div>
        <div className={styles.input_url}>
          URL
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="URL" ref={urlRef} className={styles.input} />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={click}
            className={styles.button}
          >
            Add
          </Button>
        </div>
      </div>
    </Layout>
  );

  function click() {
    const title = titleRef.current!.state.value;
    const message = messageRef.current!.state.value;
    const author = authorRef.current!.state.value;
    const url = urlRef.current!.state.value;

    if (
      title === undefined ||
      message === undefined ||
      author === undefined ||
      url === undefined
    ) {
      messageDialog.error('Please fill out all inputs');
      return;
    }
    add({
      title,
      message,
      author,
      url,
    });
  }
};
export default Add;
