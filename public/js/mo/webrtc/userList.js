const socket = io()
socket.on('room closed notification to viewer', ()=>{
  console.log('새로고침 요청 받았나?')
  window.location.reload()
})