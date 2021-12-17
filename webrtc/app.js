const fs = require("fs");
const path = require("path");
const express = require('express')
const webrtc = require('wrtc')
const nunjucks = require("nunjucks");
const bodyParser = require('body-parser')

const indexRouter = require("./routes/index");

const httpolyglot = require("httpolyglot");
const https = require("https");
const port = process.env.PORT;

const { sequelize } = require("./models");
const Models = require("./models");

const app = express();

//sequelize 설정에 의한 DB 생성
sequelize
  .sync({ force: true })
  //최초생성 이후 false로 바꿀 것
  //true 설정 시 기존 DB 날리고 새로 생성
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// SSL 설정 적용
const options = {
    key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem"), "utf-8"),
    cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem"), "utf-8"),
};

// https 서버 사용을 위한 설정, 해당 서버에 socket.io 사용을 위한 설정
const httpsServer = httpolyglot.createServer(options, app);
const io = require("socket.io")(httpsServer);
require("./api/chat_ctrl.js")(io); //socket.io가 적용 될 api 경로 설정

//view engine 셋팅
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use("/", indexRouter);


// socket 생성 시 DB에 sequelize를 통한 새로운 컬럼 생성 (room)
async function chatLogUpdate(chatData){

    const name = chatData.name;
    const msg = chatData.msg;

    await Models.ChatLog.create(
        {
          name: name,
          content: msg,
        },
      );
}

// socket.io
io.on("connection", (socketChat) => {
    socketChat.on("chatting", (chatData) => {
    chatLogUpdate(chatData);
      io.emit("chatting", chatData);
    });


    // socketChat.on('blobSave', async(blob)=>{
    //   fs.writeFile('path.webm', new Buffer(encoder.compile(true)),
    //   'base64')
    // })
  });

// 서버 on
httpsServer.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });