"use strict";
const socketChat = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

// 전송 버튼 event
// 사용자가 작성한 이름, 메세지 불러와 socket에 파라미터 값으로 전송
sendButton.addEventListener("click", () => {
  const param = {
    name: nickname.value,
    msg: chatInput.value,
  };
  socketChat.emit("chatting", param);
});

//사용자가 채팅 전송 시 화면에 추가될 수 있도록 하는 코드
socketChat.on("chatting", (chatData) => {
  const li = document.createElement("li");
  // li.innerText = ` ${chatData.name}  ${chatData.msg}`
  li.innerHTML = `<b>` + `${chatData.name}`+ `</b>` + `${chatData.msg}`
  chatList.appendChild(li)
  chatInput.value=""; //채팅 전송 후 기존 작성 내용 초기화 하는 코드
  console.log(chatData);
});

console.log(socketChat);
