import { Middleware } from 'redux';
import { idleControllerFactory } from './idle-controller';
import { createIdleUpdateAction } from './action';

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
    controller.subscribe(isIdle => {
      middlewareApi.dispatch(createIdleUpdateAction(isIdle));
    });

    return next => action => next(action);
  };
};
