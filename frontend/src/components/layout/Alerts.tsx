import { useEffect } from 'react';
import { useAlert } from 'react-alert';

import {
  clearErrorMessage,
  clearMessageState,
} from '../../features/messages/messageSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function Alerts() {
  const { message, isMessage, error, isError } = useAppSelector(
    (state) => state.message
  );
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const setMessageAlert = () => {
    if (isMessage) {
      alert.success(message.toString(), {
        onClose: () => {
          dispatch(clearMessageState());
        },
      });
    } else if (isError) {
      alert.error(error.toString(), {
        onClose: () => {
          dispatch(clearErrorMessage());
        },
      });
    }
  };

  useEffect(() => {
    setMessageAlert();
  }, [message, error]);

  return <></>;
}
