import { useCallback } from 'react';
import { WebRTCServices } from '../../services/web-RTC.services';

const webRTCServices = new WebRTCServices();

export function useVideoCall() {
  const getLocalStream = useCallback(async () => {
    try {
      const stream = await webRTCServices.getLocalStream();
      return stream;
    } catch {}
  }, []);

  const createPeerConnection = useCallback(() => {
    const connection = webRTCServices.getPeerConnection();
    return connection;
  }, []);
  return {
    getLocalStream,
    createPeerConnection,
  };
}
