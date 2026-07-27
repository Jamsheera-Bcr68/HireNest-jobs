import { WebRTCServices } from '../../services/web-RTC.services';

const webRTCServices = new WebRTCServices();

export function useVideoCall() {
  const getLocalStream = async () => {
    try {
      const stream = await webRTCServices.getLocalStream();
      return stream;
    } catch {}
  };

  const createPeerConnection =  () => {
    const connection = webRTCServices.getPeerConnection();
    return connection;
  };
  return {
    getLocalStream,
    createPeerConnection,
  };
}
