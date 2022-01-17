/*
 * stream
 */
const socket = io();

let mediaRecorder;
let recordedBlobs;

//stream 시작 시 streamer의 미디어기기 접근 후 peer 생성
async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  });

  console.log(stream)
  const vid = document.querySelector("#video");
  vid.muted = true;
  vid.srcObject = stream;

  // 스트림 존재 시, 녹화 기능 활성화
  if (stream.id) {
    handleSuccess(stream);
  }

  // 녹화 시작
  document.querySelector("#record").addEventListener("click", () => {
    const codecPreferences = document.querySelector("#codecPreferences");
    if (document.querySelector("#record").textContent === "녹화 시작") {
      startRecording(codecPreferences);
    } else {
      stopRecording();
      document.querySelector("#record").textContent = "녹화 시작";
      document.querySelector("#download").disabled = false;
      codecPreferences.disabled = false;
    }
  });
  // 녹화본 다운로드
  document.querySelector("#download").addEventListener("click", () => {
    const blob = new Blob(recordedBlobs, { type: "video/webm" });
    // 사용자 녹화 다운 권한 확인 후, Blob -> File 변환 시작
    var file = new File([blob], "testOne");
    console.log(file);
    console.log(file.size);
    var streamer = document.getElementsByTagName('title')[0].innerHTML.split(' ')[0]
    // console.log('--------------')
    // console.log(streamer)
    // 녹화 파일 정보 및 스트리머 이름 서버에 SEND
    socket.emit("sendFile", { file: file, fileSize: file.size, streamer: streamer });
  });

  //신규 peer 생성 후 스트림 진행
  const peer = await createPeer().then(result => {return result});
  console.log('-----------1')
  console.log(peer)
  stream.getTracks().forEach((track) => peer.addTrack(track, stream)); 
}

// 녹화 옵션 추가
async function handleSuccess(stream) {
  try {
    document.querySelector("#record").disabled = false;
    console.log("녹화할 미디어 생성 완료");

    window.stream = stream;

    getSupportedMimeTypes().forEach((mimeType) => {
      const option = document.createElement("option");
      option.value = mimeType;
      option.innerText = option.value;
      document.querySelector("#codecPreferences").disabled = false;
      document.querySelector("#codecPreferences").appendChild(option);
    });

  } catch (error) {
    console.log(error);
  }
}

// 녹화 옵션 리스트
function getSupportedMimeTypes() {
  const possibleTypes = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm;codecs=h264,opus",
    "video/mp4;codecs=h264,aac",
  ];
  return possibleTypes.filter((mimeType) => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}

// 녹화 데이터 확인
function handleDataAvailable(e) {
  console.log("handleDataAvailable", e);
  if (e.data && e.data.size > 0) {
    recordedBlobs.push(e.data);
  }
}

// 녹화
function startRecording(codecPreferences) {
  recordedBlobs = [];
  const mimeType =
    codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = { mimeType };

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (err) {
    console.log(`Exception while creating MediaRecorder: ${err}`);
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  document.querySelector("#record").textContent = "녹화 중지";
  document.querySelector("#download").disabled = true;
  document.querySelector("#codecPreferences").disabled = true;

  mediaRecorder.onstop = (e) => {
    console.log("Recorder stopped ", e);
    console.log("Recorded Blobs", recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
}

// 녹화 중지
function stopRecording() {
  mediaRecorder.stop();
}

// peer 생성 및 연결
async function createPeer() {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
      {
        urls: "turn:106.241.28.11:3478?transport=tcp",
        credential: "1118",
        username: "vredu",
      },
    ],
  });
  peer.onnegotiationneeded = async() => await handleNegotiation(peer);
  return peer;
}

// peer 관련 연결 정보 관련 코드
async function handleNegotiation(peer) {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
    sdp: peer.localDescription,
  };

  const { data } = await axios.post("/call/broadcast", payload);
  const desc = new RTCSessionDescription(data.sdp);
  console.log('이건 Peer에 sdp 저장한 후 세션에 저장할 sdp 상세 정보')
  console.log(desc)
  await peer.setRemoteDescription(desc).catch((e) => console.log(e));
}

/*
 *view
 */

//view 시작 시 viewer의 미디어기기 접근 후 peer 생성
//zoom 방식이 아닌 peer 연결 후 recive only로 진행
async function view() {
  const peer = await createPeerC().then(result => {return result});
  peer.addTransceiver("video", { direction: "recvonly" });
  peer.addTransceiver("audio", { direction: "recvonly" });
}

// peer 생성 및 연결
async function createPeerC() {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
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
      },
    ],
  });
  console.log('사용자가 보는 peer는 스트리머가 보는 생성한 peer랑 같은 걸까?') // 다르다
  console.log(peer) 
  peer.ontrack = handlerTrack; // rtp peer connection에 track이 추가 되었을 경우 실행할 것 정함. 즉, track에 추가 되면 hanlderTrack을 실행시킬 것
  // peer.ontrack = (e) => console.log(e)
  
  peer.onnegotiationneeded = async() => await handleNegotiationC(peer); // rtp peer connection instance에 뭔가 event가 생기면 발생. 보통은 track이 추가되는 이벤트면 실행.

  return peer;
}

// peer 관련 연결 정보 관련 코드
async function handleNegotiationC(peer) {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
    sdp: peer.localDescription,
  };

  const { data } = await axios.post("/call/consumer", payload);
  const desc = new RTCSessionDescription(data.sdp);
  await peer.setRemoteDescription(desc).catch((e) => console.log(e));
}

//viewer 화면에 streamer의 방송을 보여주는 코드
function handlerTrack(e) {
  console.log('------------------------------')
  console.log(e.streams[0])
  document.getElementById("videos").srcObject = e.streams[0];
}
