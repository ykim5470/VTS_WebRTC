const Models = require("../../../models");
const webrtc = require("wrtc");
const {v4} = require('uuid')


let senderStream; 

// sender에서 rtpPeerConnection에 track을 add한 이후에 이 함수를 실행시켜야 한다. 아니면, 당연히 e는 없다.
function handleTrackEvent(e, peer) {
  console.log(e)
  senderStream = e.streams[0];
}

const output = {
  stream: async (req, res) => {
    const chats = await Models.ChatLog.findAll({
      where: {
        room: "test",
      },
    });
    const streamer = req.user.nick
    res.render("common/mo/calls/sender.html", { chats, streamer });
  },

  view: async (req, res) => {
    const chats = await Models.ChatLog.findAll({
      where: {
        room: "test",
      },
    });

    const likeCount = await Models.UserActivityLog.findAll({
      attributes:['likeAction']
    }).then(result =>{ 
      return result.length
    })

    const default_name = v4().slice(0,3)


    res.render("common/mo/calls/viewer.html", { chats,default_name, likeCount });
  },

  recView: async (req, res) => {
    try {
      const { resource } = req.query;
      res.render("common/mo/calls/recViewer.html", {
        recordedSource: `/uploads/${resource}`,
      });
    } catch (err) {
      console.log(err);
    }
  },

  layout: async (req, res) => {
    const chats = await Models.ChatLog.findAll({
      where: {
        room: "test",
      },
    });
    res.render("common/mo/calls/layout.html", { chats });
  },

  list: async (req, res) => {
    try {
      const recMetaData = await Models.Record.findAll({
        where: {
          streamer: req.user.nick,
        },
      }).then((result) => {
        return JSON.parse(JSON.stringify(result));
      });
      res.render("common/mo/calls/list.html", { sources: recMetaData, nickname: req.user.nick });
    } catch (err) {
      console.log(err);
    }
  },

  userList: async (req, res) => {
    try {
      const recMetaData = await Models.Record.findAll({
        where: {
          streamer: req.user.nick,
          uploaded: 1,
        },
      }).then((result) => {
        return JSON.parse(JSON.stringify(result));
      });
      res.render("common/mo/calls/userList.html", {
        sources: recMetaData,
        user: req.user.nick,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

const process = {
  // all.js에서 받아온 sdp 정보인 payload를 통해 PeerConnection 진행
  streamer: async ({ body }, res) => {
    const peer = new webrtc.RTCPeerConnection({
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

    console.log('영상 정보가 담긴 sdp를 가지고 peer 연결')
    console.log(peer)
    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    console.log('peer에 SDP를 저장 완료')
    console.log(peer.localDescription)
    const payload = {
      sdp: peer.localDescription,
    };

    res.json(payload);
  },

  // all.js에서 받아온 sdp 정보인 payload를 통해 PeerConnection 진행
  viewer: async ({ body }, res) => {
    try {
      const peer = new webrtc.RTCPeerConnection({
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
      const desc = new webrtc.RTCSessionDescription(body.sdp);
      await peer.setRemoteDescription(desc);
      // console.log(senderStream)
      if(senderStream !== undefined){
        senderStream
        .getTracks()
        .forEach((track) => peer.addTrack(track, senderStream));
      }else{
        console.log('현재 스트림 방송 peer 연결 불가능. 보통은 view 페이지만 따로 새로고침 한 경우')
      }
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      const payload = {
        sdp: peer.localDescription,
      };

      res.json(payload);
    } catch (err) {
      console.log(err);
    }
  },

  recUploads: async (req, res) => {
    try {
      // 녹화 활성화 및 방제목, 스케쥴 시간 업데이트
      const { recTitle, schedule, source } = req.body;
      await Models.Record.update(
        { uploaded: true, title: recTitle, schedule: schedule },
        { where: { filename: source } }
      );

      console.log("녹화 영상 활성화 성공");
      res.redirect("/call/l");
    } catch (err) {
      console.log(err);
    }
  },

  // 라이브 방송설정 정보 DB 저장
  liveStreamSetup: async(req,res,next)=>{
    const {filename, path } = req.file
    const { title, hostName, shceduleOption, scheduleTime} = req.body

    Models.Stream.create({
      // streamer: ,
      // thumbnailOrigin:,
      // thumbnailPath : ,
      // broadcaster : ,
      // schedule:,

    })
    next()
  }
};

module.exports = {
  output,
  process,
};
