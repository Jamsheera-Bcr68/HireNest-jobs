export interface IWebRTCServices {
  getVideoStream(): Promise<MediaStream>;
  getAudioStream(): Promise<MediaStream>;
  getPeerConnection(): RTCPeerConnection;
}

export const VIDEO_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    width: { ideal: 1280, max: 1920 },
    height: { ideal: 720, max: 1080 },
    frameRate: { ideal: 24, max: 30 },
    facingMode: 'user',
  },
  audio: false,
};

export const AUDIO_CONSTRAINTS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  video: false, // Explicitly false so it does not touch the camera
};
export class WebRTCServices implements IWebRTCServices {
  constructor() {}

  // async getVideoStream() {
  //   return navigator.mediaDevices.getUserMedia({ video: true });
  // }
  // async getAudioStream() {
  //   return navigator.mediaDevices.getUserMedia({ audio: true });
  // }

  async getAudioStream(
    constraints: MediaStreamConstraints = AUDIO_CONSTRAINTS
  ): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
  
  getPeerConnection(): RTCPeerConnection {
    return new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
  }

  async getVideoStream(
    constraints: MediaStreamConstraints = VIDEO_CONSTRAINTS
  ): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
}
