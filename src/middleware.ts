import { Middleware } from 'redux';
import { idleControllerFactory } from './idle-controller';

export type IdleMiddlewareFactory = (
  options: { timeToWaitBeforeIdleness: number },
) => Middleware;

export interface IdleUpdateAction {
  type: typeof REDUX_IDLE_ACTION_TYPE;
  isIdle: boolean;
}

export const REDUX_IDLE_ACTION_TYPE = 'REDUX_IDLE_STATUS_UPDATE';

export const idleMiddleware: IdleMiddlewareFactory = ({
  timeToWaitBeforeIdleness,
}) => {
  const controller = idleControllerFactory({
    timeToWaitBeforeIdleness,
  });

  return middlewareApi => {
    controller.subscribe(isIdle => {
      const action: IdleUpdateAction = { isIdle, type: REDUX_IDLE_ACTION_TYPE };
      middlewareApi.dispatch(action);
    });

    return next => action => next(action);
  };
};
