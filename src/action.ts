export const REDUX_IDLE_ACTION_TYPE = '@@REDUX_IDLE_IDLENESS_UPDATE';

export const createIdlenessUpdateAction = (isIdle: boolean) => ({
  isIdle,
  type: REDUX_IDLE_ACTION_TYPE,
});
