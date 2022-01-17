async function view(){
    const peer = createPeerC()
    peer.addTransceiver('video', {direction: 'recvonly'})
    peer.addTransceiver('audio', {direction: 'recvonly'})

    console.log("view 실행");
    console.log("////////////////////////////");
    console.log(peer);
    console.log("////////////////////////////");
}

function createPeerC(){
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
                urls: "turn:106.241.28.11:3478?transport=tcp",
                credential: "vredu1118",
                username: "webrtc",
            }
        ]
    })
    peer.ontrack = handlerTrack
    peer.onnegotiationneeded = () => handleNegotiationC(peer)
    
    console.log("createPeerC 실행");
    console.log("////////////////////////////");
    console.log(peer);
    console.log("////////////////////////////");

    return peer
}

async function handleNegotiationC(peer) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
        sdp: peer.localDescription
    }

    console.log("handleNegotiationC 실행");
    console.log("////////////////////////////");
    console.log(payload);
    console.log("////////////////////////////");

    const { data } = await axios.post('/consumer', payload)
    const desc = new RTCSessionDescription(data.sdp)
    peer.setRemoteDescription(desc).catch(e => console.log(e))
}

function handlerTrack(e) {
    document.getElementById('videos').srcObject = e.streams[0]
    
    console.log("////////////////////////////");
    console.log("handlerTrack 실행");
    console.log("////////////////////////////");
}