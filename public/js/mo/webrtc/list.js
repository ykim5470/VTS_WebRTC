const tempScheduleTime = document.querySelectorAll('.schedule')

const currentTime = Date.now()

const scheduleArr = Array.from(tempScheduleTime)
scheduleArr.map(el => {
    el.value = currentTime + 50000 // 50,000 ms = 50 sec
})
