import { Reducer } from 'redux';

export type UserIdlenessReducerFactory = () => Reducer<boolean>;

export const REDUX_IDLE_ACTION_TYPE = 'REDUX_IDLE_UPDATE';

export const userIdlenessReducer: UserIdlenessReducerFactory = () => {
  return (state = false, action) => {
    if (action.type === REDUX_IDLE_ACTION_TYPE) {
      return action.isIdle;
    }

    return state;
  };
};
