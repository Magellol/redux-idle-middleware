import { Reducer } from 'redux';
import { REDUX_IDLE_ACTION_TYPE } from './middleware';

export type UserIdlenessReducerFactory = () => Reducer<boolean>;

export const userIdlenessReducer: UserIdlenessReducerFactory = () => {
  return (state = false, action) => {
    if (action.type === REDUX_IDLE_ACTION_TYPE) {
      return action.isIdle;
    }

    return state;
  };
};
