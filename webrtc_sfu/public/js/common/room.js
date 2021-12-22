'use strict'

// https가 아닐 경우 https로 이동
if(location.href.substr(0,5) !== 'https'){location.href = 'https'+ location.href.substr(4, location.href.length -4 )}

// 현재 방 URL 
const roomURL = window.location.href 

// 방 참여 인원 수 
let participantsCount = 0

// Peer 이름 고유하게 만들기 위한 랜덤 값 생성기
const getRandomNumber = (length)=> {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//====================로컬 변수 설정====================
let rc = null
let producer = null
let peerName = `peer_${getRandomNumber(5)}` 
let peerGeo = null 
let peerInfo = null

let roomId = location.pathname.substring(6)
// 오디오 & 비디오 기기가 허용되었을 때, true로 바뀔 것이다. 허용 전에는 default false
let isEnumerateDevices  = false 

let isAudioAllowed = false
let isVideoAllowed = false
let isScreenAllowed = false 
let initAudioButton = null
let initVideioButton = null

// 녹화 시간 타이머
let recTimer = null
let recElapsedTime = null

// webRTC 화면 관련 설정
const wbWidth= 800
const wbHeight = 600
let wbCanavas = null
let wbIsDrawing = false
let wbIsOpen = false
let wbIsRedoing = false
let wbIsEraser = false
let wbPop = []

let isButtonvisible = false 

//========================================
// client socket 사용
const socket = io()


// 방 생성 시 Client init
const initClient = () =>{
    initEnumerateDevices()
}

// 1. 기기에서 오디오 및 비디오 허용 체크
const initEnumerateDevices = async() =>{
    console.log('01 ---> 기기 장치 초기 허용 단계')

    // 오디오 허용 
    await navigator.mediaDevices.getUserMedia({audio: true})
    .then((stream) =>{
        enumerateAudioDevices(stream)
        isAudioAllowed = true 
    }).catch(()=>{
        isAudioAllowed = false 
    })

    // 비디오 허용
    await navigator.mediaDevices.getUserMedia({video: true})
    .then((stream)=>{
        enumerateVideoDevices(stream)
        isVideoAllowed = true 
    }).catch(()=>{
        isVideoAllowed = false 
    })

    // 허용 불가 시 permission page로 이동
    if(!isAudioAllowed && !isVideoAllowed){
        window.location.href = `/permission?roomId=${roomId}&message=Not allowed both Audio and Video`
    }else{
        // Peer의 IP address를 json으로 받는다.
        getPeerGeoLocation()
        // 향후 DB를 체크해서 guide ID 혹은 user ID로 대체할 예정.  
        whoAreYou()
    }
}

// 
const enumerateAudioDevices 