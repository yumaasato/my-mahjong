import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  EnhancedStore,
} from '@reduxjs/toolkit'
import { playerSlice } from './player'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null)
    },
    setItem(_key, value) {
      return Promise.resolve(value)
    },
    removeItem(_key) {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const rootReducer = combineReducers({
  player: playerSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'p-next-test',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const playerStore = (): EnhancedStore => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
}