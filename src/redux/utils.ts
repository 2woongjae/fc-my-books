import { RootState } from './modules/rootReducer';
import { BookResType } from '../types';

export function getTokenFromState(state: RootState): string | null {
  return state.auth.token;
}

export function getBooksFromState(state: RootState): BookResType[] | null {
  return state.books.books;
}
