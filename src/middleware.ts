import { Middleware } from 'redux';
import { idleControllerFactory } from './idle-controller';
import { REDUX_IDLE_ACTION_TYPE } from './reducer';

export type IdleMiddlewareFactory = (
  options: { timeToWaitBeforeIdleness: number },
) => Middleware;

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
