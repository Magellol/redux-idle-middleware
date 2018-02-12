import reduxMockStore from 'redux-mock-store';
import {
  REDUX_IDLE_ACTION_TYPE,
  createIdlenessUpdateAction,
} from '../src/action';
import { idleMiddleware } from '../src/middleware';

describe('idleMiddleware', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  afterEach(() => jest.clearAllTimers());

  test('Should dispatch an idle action when the user goes idle.', () => {
    const loadedIdleMiddleware = idleMiddleware({
      timeToWaitBeforeIdleness: 0,
    });

    const store = reduxMockStore([loadedIdleMiddleware])();

    // This runs the timer that the middleware creates to know when a user goes idle.
    jest.runAllTimers();

    const dispatched = store.getActions();

    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toEqual(createIdlenessUpdateAction(true));
  });
});
