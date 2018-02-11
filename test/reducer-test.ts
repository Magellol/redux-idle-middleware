import { idleReducer } from '../src/reducer';
import { REDUX_IDLE_ACTION_TYPE } from '../src/action';

const testAction = { type: '@@TEST' };
const reduce = idleReducer();

describe('idleReducer', () => {
  test('Should define the initial state value.', () => {
    const result = reduce(undefined, testAction);

    expect(result).toBe(false);
  });

  test('Should not update the original state when the action type is not expected.', () => {
    const result = reduce(true, testAction);

    expect(result).toBe(true);
  });

  test('Should update the state according to the expected action payload.', () => {
    const result = reduce(undefined, {
      type: REDUX_IDLE_ACTION_TYPE,
      isIdle: true,
    });

    expect(result).toBe(true);
  });
});
