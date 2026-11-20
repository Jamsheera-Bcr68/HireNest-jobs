import { useCallback } from 'react';
import { WebRTCServices } from '../../services/web-RTC.services';

const webRTCServices = new WebRTCServices();

export function useVideoCall() {
  const getVideoStream = useCallback(
    async (constraints?: MediaStreamConstraints) => {
      // DO NOT catch and swallow here; let the caller handle permission errors
      return webRTCServices.getVideoStream(constraints);
    },
    []
  );

  // const getVideoStream = useCallback(async () => {
  //   try {
  //     const stream = await webRTCServices.getVideoStream();
  //     return stream;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  const getAudioStream = useCallback(async () => {
    return webRTCServices.getAudioStream();
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
