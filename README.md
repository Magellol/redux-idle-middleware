# Redux Idle

Redux middleware and reducer to update your store when your user goes idle.

## Table of Contents

* [Installation](#installation)
* [Quickstart](#quickstart)
* [API](#api)
* [Contribute](#contribute)
* [Misc](#misc)
* [License](#license)

## Installation

```bash
npm i redux-idle
```

`redux-idle` has a peer dependency over `redux`. You will get a warning if it's not already installed in your node nodules.

## Quickstart

```ts
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { idleMiddleware, idleReducer } from 'redux-idle';

/**
 * Use the provided reducer to quickly update some part of your state.
 */
const rootReducer = combineReducers({
  isUserIdle: idleReducer(),
});

/**
 * Configure the provided middleware.
 */
const loadedIdleMiddleware = idleMiddleware({ timeToWaitBeforeIdleness: 5000 });

/**
 * Create your store with your middlewares.
 */
const store = createStore(rootReducer, applyMiddleware(loadedIdleMiddleware));
```

## API

The following are part of the public API and can be imported from `redux-idle`.

### `idleReducer`

This provided reducer factory can be plugged into your state and automatically update some part of it out of the box. You choose to which part of the state it gets plugged in, `isUserIdle` is just for the example.

**Usage**

```ts
import { combineReducers } from 'redux';
import { idleReducer } from 'redux-idle';

const rootReducer = combineReducers({
  isUserIdle: idleReducer(),
});
```

### `idleMiddleware`

This provided middleware factory can be configured and used when creating the redux store. The following options can be provided:

```ts
{
  /**
   * How much time must enlapse before `redux-idle` considers the current user to be idle. The value is in **milliseconds**
   */
  timeToWaitBeforeIdleness: number;
}
```

**Usage**

```ts
import { createStore, applyMiddleware } from 'redux';
import { idleMiddleware } from 'redux-idle';

const rootReducer = ...;
const loadedIdleMiddleware = idleMiddleware({
  timeToWaitBeforeIdleness: 5000 // 5 seconds.
})

const store = createStore(rootReducer, applyMiddleware(loadedIdleMiddleware));
```

### `REDUX_IDLE_ACTION_TYPE`

This is the action type that's being dispatched by the idle middleware. Usually, if you use the provided reducer you are not going to need this. Although, for some cases if you need to react on this action in some other reducer, you can use it.

**Usage**

```ts
import { REDUX_IDLE_ACTION_TYPE } from 'redux-idle';

const bannerReducer = (state, action) => {
  if (action.type === REDUX_IDLE_ACTION_TYPE) {
    return { ...state, shouldShowIdleBanner: action.isIdle };
  }

  return state;
};
```

## Contribute

Contributions are welcome! Please open issues when you found a bug.
If you wish to fix a bug, a pull request is necessary. The PR is required to pass the tests and the linter before being merged.
If you wish to work on a new feature, open an issue and we'll talk about it.

### Run tests:

```bash
npm t
```

### Build

```bash
npm run build
```

## Misc

This aims to be a simple middleware you can plug into your store and gives you a `boolean` if your user is considered _idle_ or not. It doesn't do more than that.

### Bundlephobia

TBD.

## License

[MIT](LICENSE)
