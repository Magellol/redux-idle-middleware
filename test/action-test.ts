import {
  createIdlenessUpdateAction,
  REDUX_IDLE_ACTION_TYPE,
} from '../src/action';

describe('createIdlenessUpdateAction', () => {
  test('Should return an action for a idleness update.', () => {
    const action = createIdlenessUpdateAction(false);

    expect(action).toEqual({
      isIdle: false,
      type: REDUX_IDLE_ACTION_TYPE,
    });
  });
});
