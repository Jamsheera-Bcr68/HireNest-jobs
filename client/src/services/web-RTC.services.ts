export interface IWebRTCServices {
  getVideoStream(): Promise<MediaStream>;
  getAudioStream(): Promise<MediaStream>;
  getPeerConnection(): RTCPeerConnection;
}

export class WebRTCServices implements IWebRTCServices {
  constructor() {}

  async getVideoStream() {
    return navigator.mediaDevices.getUserMedia({ video: true });
  }
  async getAudioStream() {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }

  getPeerConnection(): RTCPeerConnection {
    return new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
  }
}
