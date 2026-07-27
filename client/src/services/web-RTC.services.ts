export interface IWebRTCServices {
    getLocalStream():Promise<MediaStream>
  getPeerConnection():RTCPeerConnection
    
}

export class WebRTCServices implements IWebRTCServices{
  constructor() {}

  async getLocalStream() {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }

  getPeerConnection(): RTCPeerConnection {
    return new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]})
  }
}
