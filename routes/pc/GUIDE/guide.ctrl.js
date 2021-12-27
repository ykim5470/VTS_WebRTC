const passport = require("passport");
const bcrypt = require("bcrypt");

const Models = require("../../../models");
const sequelizeRegester = require("../../../middle/sequelize/register/sequelize_register");
const sequelizeEmail = require("../../../middle/sequelize/mail/sequelize_mail");
const handle_status = require("../../../middle/certification/status");
const handle_email = require("../../../middle/mail/mail");
const secret = require("../../../middle/encryption/secret");
const Form = require("../../../middle/mail/form");
const output = {
  PC_CO_MEM0002: async (req, res) => {
    res.render("common/pc/home/PC-CO-MEM0002", { user: req.user });
  },

  PC_CO_LIN0001: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0001", { user: req.user });
  },
};

const process = {
  guideRegister: async (req, res, next) => {
    const { email_01, email_02, name_01, password, year, month, day, gender, ph_num } = req.body;
    const l_birthday = `${year}-${month}-${day}`;
    const email = email_01 + "@" + email_02;

    const image = `/uploads/GUIDE/license/${req.file.filename}`;

    try {
      const exUser = await Models.User.findOne({ where: { email } });
      if (exUser) {
        return res.redirect("/join?error=exist");
      }

      const MY = "guide";
      const Reason = "email";
      const hash = await bcrypt.hash(password, 12);
      const mailHash = await secret.auth.emailEncoding(email);

      // 회원가입
      if (ph_num) {
        console.log("추가 정보 있음");
        await sequelizeRegester.sequelizeRegister.register(MY, userIp, email, name_01, hash, gender, l_birthday, ph_num, image);
      } else {
        console.log("추가 정보 없음");
        await sequelizeRegester.sequelizeRegister.register(MY, userIp, email, name_01, hash, null, null, null, image);
      }

      // 이메일
      console.log("ctrl 토큰");
      await sequelizeEmail.sequelizeEmail.email(MY, email, Reason, mailHash);

      console.log("ctrl 이메일 폼");
      const { subject, html } = await Form.form.mailForm(email, mailHash, Reason);
      console.log("ctrl 이메일 전송");
      await handle_email.mail.EmailVerification(email, subject, html);
      console.log("ctrl 이메일 전송 완료");

      res.render("common/pc/home/PC-CO-MEM0005", { email: email, use: "여행전문가이드" });
      // return next();
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },

  guidelogin: (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.log("-------authError------");
        console.error(authError);
        res.send(loginError.message);
      }
      if (!user) {
        console.log("-------!user------");
        const errorCode = info.message;
        console.log(errorCode);
        return res.render("common/pc/home/PC-CO-LIN0001", { errorCode: errorCode });
      }
      return req.login(user, async (loginError) => {
        if (loginError) {
          console.log("-------loginError------");
          console.log(loginError.message);
          res.send(loginError.message);
        }
        await handle_status.authChack.loginLog(user.email);
        console.log("---------------------");
        return next();
      });
    })(req, res, next);
  },

  statusCheck: async (req, res, next) => {
    const { status, email, confirm, auth } = await req.user;
    const aa = await Models.UserToken.findAll({});
    const { authKinds } = await Models.UserToken.findOne({ where: { mail: email } });
    const { nick } = await Models.User.findOne({ where: { email: email } });
    console.log("-------------------------------------------------");
    // console.log(aa)
    console.log(email);
    console.log(status);
    console.log(nick);
    console.log(authKinds);
    console.log(confirm);
    console.log(auth);
    console.log("-------------------------------------------------");
    try {
      if (auth == 0) {
        if (status == "700") {
          return res.redirect("/");
        } else {
          if (status == "704") {
            console.log("704");
            await handle_status.authChack.statusLoginToken(email);
            return res.redirect("/signup/result/" + email);
          } else {
            console.log("statusCheck : 알 수 없는 문제");
          }
        }
      } else {
        if (status == "700") {
          if (confirm !== 99) {
            // console.log("승인받으세요");
            return res.redirect("/admin/authentication");
          } else {
            return res.redirect("/");
          }
        } else {
          if (status == "704") {
            console.log("704");
            await handle_status.authChack.statusLoginToken(email);
            return res.redirect("/signup/result/" + email);
          } else {
            console.log("statusCheck : 알 수 없는 문제");
          }
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = {
  output,
  process,
};
