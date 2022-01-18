
const socket = io();
const tempScheduleTime = document.querySelectorAll(".schedule");
const liveStreamStartBtn = document.querySelector("#liveStreamStartBtn");
const liveStreamSettingModal = document.querySelector(
  ".liveStreamSettingModal"
);
const setupCancel = document.querySelector(".setupCancel");

const currentTime = Date.now();

const scheduleArr = Array.from(tempScheduleTime);
scheduleArr.map((el) => {
  el.value = currentTime + 50000; // 50,000 ms = 50 sec
});

// 라이브방송 설정 모달 Show
const modalStart = () => {
  liveStreamSettingModal.hidden = false;
};
// 라이브방송 설정 모달 Close
const modalClose = () => {
  liveStreamSettingModal.hidden = true;
};

// 라이브방송 시작 버튼 클릭
liveStreamStartBtn.addEventListener("click", () => {
  modalStart();
  modalClose();
});

/*========================== */
const setupDone = document.querySelector(".setupDone");

const hostNickName = document.querySelector("#hostNickName");
const thumbNailImg = document.querySelector("#thumbNailImg");
const title = document.querySelector("#title");
const scheduleOption = document.querySelector("#scheduleOption");
const scheduleTime = document.querySelector("#scheduleTime");

// 방 생성 요청
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

// 방송 정보 설정 Client 에러 체크
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

// 방송 정보 셋업
socket.on("room setup request", async (data) => {
  try {
    const { room_id } = data;
    console.log(room_id);

    var formData = new FormData();
    formData.append('room_id', room_id)
    formData.append('thumbNailImg', thumbNailImg.files[0])
    formData.append('host_nickname',hostNickName.value )
    formData.append('broad_schedule',scheduleTime.value )
    formData.append('category', '쇼핑')
    formData.append('title', title.value)

    // const setupInfo = {
    //   thumbNailImg: thumbNailImg.files[0],
    //   room_id: room_id,
    //   host_nickname: hostNickName.value,
    //   broad_schedule: scheduleTime.value,
    //   category: "쇼핑",
    //   title: title.value,
    // };

    // formData = {...setupInfo };
    // console.log(formData);

    const url = "/call/l/liveStreamSetup";
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return await axios.post(url, formData, headers).then(
      res => {
        const {status} = res.data
        console.log(status)
        if(status === 200){
          window.location.replace(`/call/g?room_id=${room_id}`)
        }
      }
    );
   
  
  } catch (err) {
    console.log(err);
  }
});
