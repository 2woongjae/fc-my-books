import React, { useEffect } from 'react';
import { Table, PageHeader, Button } from 'antd';

import styles from './List.module.css';
import Layout from './Layout';
import { BookResType } from '../types';
import Book from './Book';

interface BooksProps {
  books: BookResType[] | null;
  error: Error | null;
  loading: boolean;
  getBooks: () => void;
  deleteBook: (bookId: number) => void;
  goAdd: () => void;
  goEdit: (bookId: number) => void;
  logout: () => void;
}

const Books: React.FC<BooksProps> = ({
  books,
  getBooks,
  error,
  loading,
  deleteBook,
  goAdd,
  logout,
  goEdit,
}) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button
            key="2"
            type="primary"
            onClick={goAdd}
            className={styles.button}
          >
            Add Book
          </Button>,
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button}
          >
            Logout
          </Button>,
        ]}
      />
      <img src="/bg_list.png" style={{ width: '100%' }} alt="books" />
      <Table
        dataSource={books || []}
        columns={[
          {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => (
              <Book
                {...record}
                deleteBook={deleteBook}
                goEdit={goEdit}
                key={record.bookId}
              />
            ),
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        className={styles.table}
        rowKey="bookId"
        pagination={false}
      />
    </Layout>
  );
};

export default Books;
