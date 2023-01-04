import { ToastContainer } from 'react-toastify';
import { DataLoader } from './DataLoader';
import { IsMobile } from './IsMobile';
import { SocketManager } from './SocketManager';

export const Helpers = () => {
  return (
    <>
      <DataLoader />
      <SocketManager />
      <IsMobile />
      <ToastContainer position='bottom-left' theme='colored' />
    </>
  );
};
