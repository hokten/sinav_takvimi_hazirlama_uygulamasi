import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import type { RootState } from '../app/store';

// useSelector without re-render
export default function useSelectorRef<T = unknown>(
  selectHandler: (state: RootState) => T
): MutableRefObject<T> {
  const ref = useRef<T>();

  useAppSelector<T>(selectHandler, (_, b) => {
    ref.current = b;
    return true;
  });

  return ref as MutableRefObject<T>;
}
