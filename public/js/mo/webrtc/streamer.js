async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio:  {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
        }
    })
    const vid = document.getElementById('video');
    vid.muted = true;
    vid.srcObject = stream;
    const peer = createPeer()
    stream.getTracks().forEach(track => peer.addTrack(track, stream))
}

function createPeer(){
    const peer = new RTCPeerConnection({
        iceServers: [
            {
                'urls': [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                    "stun:stun4.l.google.com:19302",
                  ],
            },
            {
                'urls': 'turn:106.241.28.11:3478?transport=tcp',
                'credential': '1118',
                'username': 'vredu'
            }
        ]
    })
    peer.onnegotiationneeded = () => handleNegotiation(peer)

    return peer
}

async function handleNegotiation(peer) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
        sdp: peer.localDescription
    }

    const { data } = await axios.post('/call/broadcast', payload)
    const desc = new RTCSessionDescription(data.sdp)
    peer.setRemoteDescription(desc).catch(e => console.log(e))
}