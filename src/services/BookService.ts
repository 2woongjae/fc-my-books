import axios from 'axios';

import { BookReqType, BookResType } from '../types';

const BOOK_API_URL = 'https://api.marktube.tv/v1/book';

export default class BookService {
  public static async getBooks(token: string): Promise<BookResType[]> {
    const response = await axios.get<BookResType[]>(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  public static async addBook(
    token: string,
    book: BookReqType,
  ): Promise<BookResType> {
    const response = await axios.post<BookResType>(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  public static async editBook(
    token: string,
    bookId: number,
    book: BookReqType,
  ): Promise<BookResType> {
    const response = await axios.patch<BookResType>(
      `${BOOK_API_URL}/${bookId}`,
      book,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  public static async deleteBook(token: string, bookId: number): Promise<void> {
    await axios.delete(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
