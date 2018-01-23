export const REDUX_IDLE_ACTION_TYPE = 'REDUX_IDLE_STATUS_UPDATE';

export const createIdleUpdateAction = (isIdle: boolean) => ({
  isIdle,
  type: REDUX_IDLE_ACTION_TYPE,
});
