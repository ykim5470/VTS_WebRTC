const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const passport = require("passport");
const path = require("path");

var parser = require("ua-parser-js");
var requestIp = require("request-ip");

dotenv.config();
const indexRouter = require("./routes/index");
const { sequelize } = require("./models");
const passportConfig = require("./middle/passport");

const app = express();
passportConfig(); // 패스포트 설정
app.set("port", process.env.SERVER_PORT || 19082);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "api")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

app.use("/", indexRouter);

app.listen(app.get("port"), () => {
  console.log(`http://${process.env.SERVER_HOST }:${app.get("port")}`);
});
