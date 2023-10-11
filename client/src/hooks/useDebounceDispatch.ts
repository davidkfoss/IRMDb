import _ from 'lodash';
import { useMemo } from 'react';
import { useAppDispatch } from '../store/store';

export default (delay: number) => {
  const dispatch = useAppDispatch();

  const debouncedDispatch = useMemo(
    () => _.debounce((actionType) => dispatch(actionType), delay, { leading: true, trailing: false }),
    [dispatch, delay]
  );

  return debouncedDispatch;
};
