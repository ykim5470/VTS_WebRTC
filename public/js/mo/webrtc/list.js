const tempScheduleTime = document.querySelectorAll(".schedule");
const liveStreamStartBtn = document.querySelector("#liveStreamStartBtn");
const liveStreamSettingModal = document.querySelector(
  ".liveStreamSettingModal"
);
const setupCancel = document.querySelector('.setupCancel')

const currentTime = Date.now();

const scheduleArr = Array.from(tempScheduleTime);
scheduleArr.map((el) => {
  el.value = currentTime + 50000; // 50,000 ms = 50 sec
});

// 라이브방송 설정 모달 Show
const modalStart = () => {
    liveStreamSettingModal.hidden = false
};
// 라이브방송 설정 모달 Close
const modalClose = () => {
    liveStreamSettingModal.hidden = true
};

// 라이브방송 시작 버튼 클릭
liveStreamStartBtn.addEventListener("click", () => {
  modalStart();
  modalClose()
});
