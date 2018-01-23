import { Middleware } from 'redux';
import { idleControllerFactory } from './idle-controller';

export type IdleMiddlewareFactory = (
  options: { timeToWaitBeforeIdleness: number },
) => Middleware;

export const REDUX_IDLE_ACTION_TYPE = 'REDUX_IDLE_UPDATE';

export const idleMiddleware: IdleMiddlewareFactory = ({
  timeToWaitBeforeIdleness,
}) => {
  const controller = idleControllerFactory({
    timeToWaitBeforeIdleness,
  });

  return middlewareApi => {
    controller.subscribe(isIdle =>
      middlewareApi.dispatch({ isIdle, type: REDUX_IDLE_ACTION_TYPE }),
    );

    return next => action => next(action);
  };
};
