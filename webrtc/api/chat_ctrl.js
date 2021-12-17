peers = {};

module.exports = (io) => {
  io.on("connect", (socket) => {
    console.log("a client is connected");

    // 클라이언트가 연결되는 즉시 연결 프로세스를 시작합니다.
    peers[socket.id] = socket;


    // 다른 모든 클라이언트에게 피어 연결 수신기를 설정하도록 요청
    for (let id in peers) {
      if (id === socket.id) continue;
      console.log("sending init receive to " + socket.id);
      peers[id].emit("initReceive", socket.id);
    }

    //피어 연결 신호를 특정 소켓에 릴레이
    socket.on("signal", (data) => {
      console.log("sending signal from " + socket.id + " to ", data);
      if (!peers[data.socket_id]) return;
      peers[data.socket_id].emit("signal", {
        socket_id: socket.id,
        signal: data.signal,
      });
    });

    //연결된 다른 모든 클라이언트에서 연결이 끊긴 피어 연결 제거
    socket.on("disconnect", () => {
      console.log("socket disconnected " + socket.id);
      socket.broadcast.emit("removePeer", socket.id);
      delete peers[socket.id];
    });

    //연결을 시작하기 위해 클라이언트에 메시지 보내기
    socket.on("initSend", (init_socket_id) => {
      console.log("INIT SEND by " + socket.id + " for " + init_socket_id);
      peers[init_socket_id].emit("initSend", socket.id);
    });
  });
};