import { Reducer } from 'redux';
import { REDUX_IDLE_ACTION_TYPE } from './action';

export type IdleReducerFactory = () => Reducer<boolean>;

export const idleReducer: IdleReducerFactory = () => {
  return (state = false, action) => {
    if (action.type === REDUX_IDLE_ACTION_TYPE) {
      return action.isIdle;
    }

    return state;
  };
};
