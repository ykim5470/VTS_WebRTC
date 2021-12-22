const Models = require("../../../models");
const webrtc = require("wrtc");

let senderStream;

function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
}

const output = {
  stream: async (req, res) => {
    const chats = await Models.ChatLog.findAll({
      where: {
        room: "test",
      },
    });
    res.render("common/mo/calls/sender.html", { chats });
    // res.render("common/mo/calls/sender.html");
  },

  view: async (req, res) => {
    const chats = await Models.ChatLog.findAll({
      where: {
        room: "test",
      },
    });
    res.render("common/mo/calls/viewer.html", { chats });
  },

  recView: async (req, res) => {
    try {
      const { resource } = req.query;
      res.render("common/mo/calls/recViewer.html", {
        recordedSource: `https://106.241.28.11:19082/uploads/${resource}`,
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
          streamer: "streamer1",
        },
      }).then((result) => {
        return JSON.parse(JSON.stringify(result));
      });
      res.render("common/mo/calls/list.html", { sources: recMetaData });
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
          urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302"],
        },
        {
          urls: "turn:106.241.28.11:3478?transport=tcp",
          credential: "1118",
          username: "vredu",
        },
      ],
    });

    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
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
            urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302"],
          },
          {
            urls: "turn:106.241.28.11:3478?transport=tcp",
            credential: "1118",
            username: "vredu",
          },
        ],
      });
      const desc = new webrtc.RTCSessionDescription(body.sdp);
      await peer.setRemoteDescription(desc);
      senderStream.getTracks().forEach((track) => peer.addTrack(track, senderStream));
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
};

module.exports = {
  output,
  process,
};
