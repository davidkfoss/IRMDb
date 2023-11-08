import _ from 'lodash';
import { useMemo } from 'react';
import { useAppDispatch } from '../store/store';

/**
 * Returns a debounced version of the provided dispatch function.
 * @param delay - The delay in milliseconds before the dispatch function is called.
 * @returns A debounced version of the provided dispatch function.
 */
export default (delay: number) => {
  const dispatch = useAppDispatch();

  const debouncedDispatch = useMemo(
    () => _.debounce((actionType) => dispatch(actionType), delay, { leading: true, trailing: false }),
    [dispatch, delay]
  );

  return debouncedDispatch;
};
