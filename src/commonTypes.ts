import { RootState } from './app/store';
import { AppDispatch } from './app/store';

export type AsyncThunkConfig = {
  state: RootState;
  rejectValue: string;
  serializedErrorType: string;
  dispath: AppDispatch;
}
