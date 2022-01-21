const socket = io()
socket.on('content refresh', ()=>{
  console.log('새로고침 요청 받았나?')
  window.location.reload()
})