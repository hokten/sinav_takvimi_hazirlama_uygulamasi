import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import osbReducer from '../features/counter/osbSlice'
import bbarReducer from '../features/counter/bbarSlice'
import bolumoturumeslesmeReducer from '../features/counter/bolumOturumEslesmeleri'
import { api } from '../app/services/users'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    osb : osbReducer,
    bbar: bbarReducer,
    bolumoturumeslesmeleri : bolumoturumeslesmeReducer,
    [api.reducerPath]: api.reducer,


  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
