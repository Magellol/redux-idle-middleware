import { throttle } from 'lodash-es';

export type Listener = (isIdle: boolean) => void;

const DEFAULT_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
];

export const idleControllerFactory = (options: {
  timeToWaitBeforeIdleness: number;
  events?: string[];
}) => {
  const { events = DEFAULT_EVENTS, timeToWaitBeforeIdleness } = options;
  let hasListenerAttached = false;
  let isUserIdle = false;

  const listenToEvents = (listener: EventListener) =>
    events.forEach(event => window.addEventListener(event, listener, true));

  const unsubscribeFromEvents = (listener: EventListener) =>
    events.forEach(event => window.removeEventListener(event, listener, true));

  return {
    subscribe(onChangeListener: Listener) {
      if (typeof onChangeListener !== 'function') {
        throw new Error('Expected "subscribe" to get a function as argument.');
      }

      if (hasListenerAttached) {
        throw new Error(
          'This idle controller has already one listener attached to it. Multiple listeners is not currently supported.',
        );
      }

      hasListenerAttached = true;
      const startUserIdleTimeout = window.setTimeout.bind(
        window,
        () => {
          isUserIdle = true;
          onChangeListener(isUserIdle);
        },
        timeToWaitBeforeIdleness,
      );

      let timeout = startUserIdleTimeout();

      const handleEvent: EventListener = throttle(() => {
        if (hasListenerAttached === false) {
          return;
        }

        if (isUserIdle) {
          isUserIdle = false;
          onChangeListener(isUserIdle);
        }

        clearTimeout(timeout);
        timeout = startUserIdleTimeout();
      }, 1000);

      listenToEvents(handleEvent);

      return () => {
        hasListenerAttached = false;
        unsubscribeFromEvents(handleEvent);
        clearTimeout(timeout);
      };
    },
  };
};
