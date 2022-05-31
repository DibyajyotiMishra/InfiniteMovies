import exportedStore from './store';

export default interface IStoreState {
  readonly errors: any;
  readonly movies: Array<any>; //TODO: define type
}

export type DispatchType = typeof exportedStore.dispatch;
