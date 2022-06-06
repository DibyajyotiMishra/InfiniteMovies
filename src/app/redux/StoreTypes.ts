import exportedStore from './store';

interface MoviesReducer {
  readonly movies: Array<any>;
  readonly page: number;
  readonly totalPages: number;
  readonly movieType: string;
}

export default interface IStoreState {
  readonly errors: any;
  readonly movies: MoviesReducer; //TODO: define type
}

export type DispatchType = typeof exportedStore.dispatch;
