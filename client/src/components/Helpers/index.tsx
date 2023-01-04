import { ToastContainer } from 'react-toastify';
import { DataLoader } from './DataLoader';
import { IsMobile } from './IsMobile';
import { ReloadPrompt } from './ReloadPrompt';
import { SocketManager } from './SocketManager';

export const Helpers = () => {
  return (
    <>
      <DataLoader />
      <SocketManager />
      <ReloadPrompt />
      <IsMobile />
      <ToastContainer position='bottom-left' theme='colored' />
    </>
  );
};
