const fs = require("fs");
const https = require("https");
const parser = require("ua-parser-js");

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const passport = require("passport");
const path = require("path");
var requestIp = require("request-ip");

dotenv.config();
const indexRouter = require("./routes/index");
const { sequelize } = require("./models");
const Models = require("./models"); // 정리필요
const passportConfig = require("./middle/passport");

const bodyParser = require("body-parser");
const httpolyglot = require("httpolyglot");
const adapter = require('webrtc-adapter')
const uuid = require("node-uuid");
const webrtc = require("wrtc");

const app = express();
passportConfig(); // 패스포트 설정
app.set("port", process.env.SERVER_PORT || 19082);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "api")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// SSL 설정 적용
const options = {
  key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem"), "utf-8"),
  cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem"), "utf-8"),
};

const httpsServer = httpolyglot.createServer(options, app);
const io = require("socket.io")(httpsServer);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2000 * 60 * 60, //지속시간 2시간
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(requestIp.mw());
app.use((req, res, next) => {
  userDevice = parser(req.headers["user-agent"]);
  userIp = req.clientIp;
  next();
});

// socket 생성 시 DB에 sequelize를 통한 새로운 컬럼 생성 (room)
async function chatLogUpdate(chatData) {
  const name = chatData.name;
  const msg = chatData.msg;

  await Models.ChatLog.create({
    name: name,
    content: msg,
  });
}

// socket.io
io.on("connection", (socketChat) => {
  socketChat.on("chatting", (chatData) => {
    chatLogUpdate(chatData);
    io.emit("chatting", chatData);
  });

  socketChat.on("sendFile", async (blob) => {
    const { file, fileSize } = blob;
    console.log("Start save");
    const fileName = uuid.v4() + ".webm";
    // 녹화 파일 저장 /uploads
    fs.writeFile(`./uploads/${fileName}`, file, { encoding: "utf-8", flag: "w" }, (err) => {
    // fs.writeFile(`./public/uploads/${fileName}`, file, { encoding: "utf-8", flag: "w" }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File written successfully!");
      }
    });

    console.log("--------------------");
    console.log(blob);

    // 녹화 파일 metadata DB 저장.
    try {
      await Models.Record.create({
        filename: fileName,
        streamer: "streamer1",
        fileSize: fileSize,
      });
    } catch (err) {
      console.log(err);
    }
  });
});

app.use("/", indexRouter);


httpsServer.listen(app.get("port"), () => {
  console.log(`http://${process.env.SERVER_HOST}:${app.get("port")}`);
});

// app.listen(app.get("port"), () => {
//   console.log(`http://${process.env.SERVER_HOST }:${app.get("port")}`);
// });
