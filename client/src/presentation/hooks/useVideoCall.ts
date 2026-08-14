import { useCallback } from 'react';
import { WebRTCServices } from '../../services/web-RTC.services';

const webRTCServices = new WebRTCServices();

export function useVideoCall() {
  const getVideoStream = useCallback(async () => {
    try {
      const stream = await webRTCServices.getVideoStream();
      return stream;
    } catch {}
  }, []);
  const getAudioStream = useCallback(async () => {
    try {
      const stream = await webRTCServices.getAudioStream();
      return stream;
    } catch {}
  }, []);

  const createPeerConnection = useCallback(() => {
    const connection = webRTCServices.getPeerConnection();
    return connection;
  }, []);
  return {
    getAudioStream,
    getVideoStream,
    createPeerConnection,
  };
}
