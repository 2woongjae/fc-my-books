import React from 'react';
import { Button, Tooltip } from 'antd';
import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

import styles from './Book.module.css';

interface BookProps {
  bookId: number;
  title: string;
  author: string;
  url: string;
  createdAt: string;
  deleteBook: (bookId: number) => void;
  goEdit: (bookId: number) => void;
}

const Book: React.FC<BookProps> = React.memo(
  ({ bookId, title, author, url, createdAt, deleteBook, goEdit }) => {
    return (
      <div className={styles.book}>
        <div className={styles.title}>
          <Link to={`/book/${bookId}`} className={styles.link_detail_title}>
            <BookOutlined /> {title}
          </Link>
        </div>
        <div className={styles.author}>
          <Link to={`/book/${bookId}`} className={styles.link_detail_author}>
            {author}
          </Link>
        </div>
        <div className={styles.created}>
          {moment(createdAt).format('MM-DD-YYYY hh:mm a')}
        </div>
        <div className={styles.tooltips}>
          <Tooltip title={url}>
            <a
              href={url}
              target="_BLANK"
              rel="noopener noreferrer"
              className={styles.link_url}
            >
              <Button
                size="small"
                type="primary"
                shape="circle"
                icon={<HomeOutlined />}
                className={styles.button_url}
              />
            </a>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              size="small"
              shape="circle"
              onClick={clickEdit}
              icon={<EditOutlined />}
              className={styles.button_edit}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              size="small"
              type="primary"
              shape="circle"
              danger
              onClick={click}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </div>
      </div>
    );

    function click() {
      deleteBook(bookId);
    }
    function clickEdit() {
      goEdit(bookId);
    }
  },
);

export default Book;
