import _ from 'lodash';
import { useAppDispatch } from '../store/store';

export default (delay: number) => {
  const dispatch = useAppDispatch();

  const debouncedDispatch = _.debounce((actionType) => dispatch(actionType), delay, { leading: true, trailing: false });

  return debouncedDispatch;
};
