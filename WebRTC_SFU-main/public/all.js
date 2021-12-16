/*
* stream
*/

//stream 시작 시 streamer의 미디어기기 접근 후 peer 생성
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
    //신규 peer 생성 후 스트림 진행
    const peer = createPeer()
    stream.getTracks().forEach(track => peer.addTrack(track, stream))
}

// peer 생성 및 연결
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

// peer 관련 연결 정보 관련 코드
async function handleNegotiation(peer) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
        sdp: peer.localDescription
    }

    const { data } = await axios.post('/broadcast', payload)
    const desc = new RTCSessionDescription(data.sdp)
    peer.setRemoteDescription(desc).catch(e => console.log(e))
}


/*
*view
*/

//view 시작 시 viewer의 미디어기기 접근 후 peer 생성
//zoom 방식이 아닌 peer 연결 후 recive only로 진행
async function view(){
    const peer = createPeerC()
    peer.addTransceiver('video', {direction: 'recvonly'})
    peer.addTransceiver('audio', {direction: 'recvonly'})
}

// peer 생성 및 연결
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
                'urls': 'turn:106.241.28.11:3478?transport=tcp',
                'credential': '1118',
                'username': 'vredu'
            }
        ]
    })
    peer.ontrack = handlerTrack //peer 연결 후 track이 발생하면 hadlerTrack function 호출
    peer.onnegotiationneeded = () => handleNegotiationC(peer)

    return peer
}

// peer 관련 연결 정보 관련 코드
async function handleNegotiationC(peer) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
        sdp: peer.localDescription
    }

    const { data } = await axios.post('/consumer', payload)
    const desc = new RTCSessionDescription(data.sdp)
    peer.setRemoteDescription(desc).catch(e => console.log(e))
}

//viewer 화면에 streamer의 방송을 보여주는 코드
function handlerTrack(e) {
    document.getElementById('videos').srcObject = e.streams[0]
}
