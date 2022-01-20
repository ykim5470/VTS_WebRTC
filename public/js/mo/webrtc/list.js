

/* ================= 라이브 방 생성 =================*/
const socket = io();
const setupDone = document.querySelector(".setupDone");
const hostNickName = document.querySelector("#hostNickName");
const thumbNailImg = document.querySelector("#thumbNailImg");
const title = document.querySelector("#title");
const scheduleOption = document.querySelector("#scheduleOption");
const scheduleTime = document.querySelector("#scheduleTime");
// 라이브 방 생성 요청
setupDone.addEventListener("click", () => {
  try {
    if (
      setupInfoCheck(
        thumbNailImg.value,
        title.value,
        hostNickName.value,
        scheduleOption.checked,
        scheduleTime.value
      )
    ) {
      console.log("다 통과");
      socket.emit("room create", { hostName: hostName.value });
    }
  } catch (err) {
    console.log(err);
  }
});

// 라이브 방송 정보 설정 Client 에러 체크
const setupInfoCheck = (img, title, name, option, date) => {
  const pass = true;
  // 썸네일 업로드 여부
  if (img === "") {
    throw "방송 사진을 첨부해주세요";
  }
  if (title === "") {
    throw "방송 제목을 입력해주세요";
  }
  if (name === "") {
    throw "방송 진행자를 입력해주세요";
  }
  if (option) {
    console.log("체크");
    scheduleTime.setAttribute("disabled", true);
    return pass;
  } else {
    console.log("체크 안 됨");
    scheduleTime.removeAttribute("disabled");
    if (date.value === "") {
      throw "등록일 예정시간을 선택해주세요";
    }
    return pass;
  }
};

// 라이브 방송 정보 셋업
socket.on("room setup request", async (data) => {
  try {
    const { room_id } = data;
    console.log(room_id);

    var formData = new FormData();
    formData.append("room_id", room_id);
    formData.append("thumbNailImg", thumbNailImg.files[0]);
    formData.append("host_nickname", hostNickName.value);
    formData.append("broad_schedule", scheduleTime.value);
    formData.append("category", "쇼핑");
    formData.append("title", title.value);

    const url = "/call/l/liveStreamSetup";
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return await axios.post(url, formData, headers).then((res) => {
      const { status } = res.data;
      console.log(status);
      if (status === 200) {
        window.location.replace(`/call/g?room_id=${room_id}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

/* ================= 녹화 콘텐츠 삭제 =================*/
// 녹화 영상 삭제 기능
const recSourceDeleteBox = document.querySelectorAll(".recSourceCheckbox");

const recSourceDeleteBoxList = Array.from(recSourceDeleteBox);

const deleteItemList = new Array();

// 녹화 영상 삭제 Request
const contentDelet = (el) => {
  el.addEventListener("click", (e) => {
    const recId = el.value;
    // 최초 단일 선택
    if (e.target.checked && deleteItemList.length === 0) {
      deleteItemList.push(recId);
    }
    // 다른 아이템 선택 replace
    else if (e.target.checked && deleteItemList.length !== 0) {
      deleteItemList.shift();
      deleteItemList.push(recId);
    }

    // 콘텐츠 삭제 및 새로고침
    document
      .querySelector("#deleteContentBtn")
      .addEventListener("click", () => {
        if (deleteItemList.length !== 0) {
          fetch(`/call/rec/delete/${deleteItemList[0]}`, {
            method: "DELETE",
          }).then((res) => {
            if (res.status === 200) {
              window.location.replace("/call/l");
            }
          });
        }
      });
  });
};

recSourceDeleteBoxList.map((el, idx) => {
  contentDelet(el);
});

/* ================= 녹화 콘텐츠 정보 셋업 =================*/
const recStreamSettingModal = document.querySelector('#recStreamSettingModal')




/* ================= 녹화 콘텐츠 정보 업데이트 =================*/
const updateContentBtn = document.querySelectorAll('.updateContentBtn')

const updateContentBtnList = Array.from(updateContentBtn)

// 녹화 콘텐츠 정보 수정
updateContentBtnList.map(el =>{
  el.addEventListener('click', (e)=>{
    const updateContentId = e.target.value
    console.log(updateContentId)

  })
})

