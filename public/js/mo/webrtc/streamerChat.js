"use strict";
const socketChat = io();

const nickname = document.querySelector("#nickname");
// const prefixNickname = document.querySelector('#prefixNickname')
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");





// 전송 버튼 event
// 사용자가 작성한 이름, 메세지 불러와 socket에 파라미터 값으로 전송
sendButton.addEventListener("click", () => {
  const { room_id } = getUrlParams();
  const param = {
    name:  nickname.value,
    msg: chatInput.value,
    room: room_id  
  };

  // 채팅 Name, Text 빈칸 체크
  const isEmptyText = (text) => {
    if (text !== undefined) {
      if (text.replace(" ", "").length === 0) {
        return true;
      } else return false;
    } else {
      true;
    }
  };

  if (isEmptyText(nickname.value) || isEmptyText(chatInput.value)) {
    console.log("유저 이름 입력 혹은 텍스트를 입력해야 합니다");
  }
  else{
    socketChat.emit("chatting", param)
  }
});

//사용자가 채팅 전송 시 화면에 추가될 수 있도록 하는 코드
socketChat.on("chatting", (chatData) => {
  const li = document.createElement("li");
  // li.innerText = ` ${chatData.name}  ${chatData.msg}`
//   li.innerHTML =`<b>` + `${chatData.name}` + `</b>` + `${chatData.msg}`;
if (chatData.prefix === undefined){
    
    li.innerHTML =`<b>` + `${chatData.name}` + `</b>` + `${chatData.msg}`;
  }else{
    li.innerHTML =`<b>` + `${chatData.prefix}` + `</b>` + `<b>` + `${chatData.name}` + `</b>` + `${chatData.msg}`;
  }
  chatList.appendChild(li);
  chatInput.value = ""; //채팅 전송 후 기존 작성 내용 초기화 하는 코드
  console.log(chatData);
});

console.log(socketChat);
