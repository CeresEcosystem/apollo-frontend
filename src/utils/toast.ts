import { TOAST_ID } from '@constants/index';
import { Id, Slide, toast, TypeOptions } from 'react-toastify';

export const showSuccessNotify = (msg: string, toastId = TOAST_ID) =>
  toast.success(msg, {
    position: 'bottom-right',
    autoClose: 4000,
    toastId,
    hideProgressBar: true,
  });

export const showErrorNotify = (
  msg: string,
  autoClose = false,
  toastId = TOAST_ID,
) =>
  toast.error(msg, {
    position: 'bottom-right',
    autoClose: autoClose ? 4000 : autoClose,
    toastId,
    hideProgressBar: true,
  });

export const showLoadingNotify = () =>
  toast.info('Transaction in progress...', {
    position: 'bottom-right',
    closeOnClick: false,
    closeButton: false,
    autoClose: false,
    hideProgressBar: true,
  });

export const updateNotify = (toastId: Id, msg: string, type: TypeOptions) =>
  toast.update(toastId, {
    render: msg,
    type: type,
    position: 'bottom-right',
    closeOnClick: true,
    closeButton: true,
    autoClose: 4000,
    transition: Slide,
    hideProgressBar: true,
  });
