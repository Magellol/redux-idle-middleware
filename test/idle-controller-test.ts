import { idleControllerFactory } from '../src/idle-controller';

const noop = () => undefined;
const forceToBeIdle = () => jest.runAllTimers();

describe('idleControllerFactory', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  afterEach(() => jest.clearAllTimers());

  test('idleController#subscribe should throw if it does not receive a function as argument.', () => {
    const controller = idleControllerFactory({
      timeToWaitBeforeIdleness: 0,
    });

    expect(() =>
      controller.subscribe(<any>'not a function'),
    ).toThrowErrorMatchingSnapshot();
  });

  test('idleController#subscribe should throw if we are trying to subscribe multiple times without cancelling.', () => {
    const controller = idleControllerFactory({
      timeToWaitBeforeIdleness: 0,
    });

    controller.subscribe(noop);
    expect(() => controller.subscribe(noop)).toThrowErrorMatchingSnapshot();
  });

  test('idleController#subscribe should notify its callback when the user goes idle.', () => {
    const callback = jest.fn();
    const controller = idleControllerFactory({
      timeToWaitBeforeIdleness: 0,
    });

    controller.subscribe(callback);
    forceToBeIdle();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith(true);
  });

  test('idleController#subscribe should notify its callback when the user triggers activity after being idle.', () => {
    const fakeUserActivityEvent = new Event('mousemove');
    const callback = jest.fn();
    const controller = idleControllerFactory({
      timeToWaitBeforeIdleness: 0,
    });

    controller.subscribe(callback);
    forceToBeIdle();

    window.dispatchEvent(fakeUserActivityEvent);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[0][0]).toBe(true);
    expect(callback.mock.calls[1][0]).toBe(false);
  });

  test('idleController#subscribe should _not_ notify its callback when the user triggers activity without being idle first.', () => {
    const fakeUserActivityEvent = new Event('keydown');
    const callback = jest.fn();
    const controller = idleControllerFactory({
      timeToWaitBeforeIdleness: 0,
    });

    controller.subscribe(callback);
    window.dispatchEvent(fakeUserActivityEvent);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('idleController#subscribe should return a function that unsubscribes the controller.', () => {
    const fakeUserActivityEvent = new Event('mousemove');
    const callback = jest.fn();
    const controller = idleControllerFactory({
      timeToWaitBeforeIdleness: 0,
    });

    const cancel = controller.subscribe(callback);
    cancel();

    forceToBeIdle();
    window.dispatchEvent(fakeUserActivityEvent);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('idleController#subscribe should subscribe to custom passed in events.', () => {
    const fakeUserActivityEvent = new Event('customEvent');
    const callback = jest.fn();
    const controller = idleControllerFactory({
      timeToWaitBeforeIdleness: 0,
      events: ['customEvent'],
    });

    controller.subscribe(callback);
    forceToBeIdle();

    window.dispatchEvent(fakeUserActivityEvent);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
