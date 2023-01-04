import { toast } from 'react-toastify';

export const useShare = () => {
  return (questionString: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: questionString,
          url: window.location.href,
        })
        .then(() => console.info('Successful share'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href).then(
        () => {
          toast('Share URL copied', { type: 'success' });
        },
        () => {
          toast('There was an error copying the share URL', { type: 'error' });
        },
      );
    }
  };
};
