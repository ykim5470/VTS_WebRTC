const passport = require("passport");
const bcrypt = require("bcrypt");
const Models = require("../../../models");
const handle_status = require("../../../middle/certification/status");
const handle_email = require("../../../middle/mail/mail");
const { sequelize } = require("../../../models");
const secret = require("../../../middle/encryption/secret");
const Form = require("../../../middle/mail/form");
const sequelizeRegester = require("../../../middle/sequelize/register/sequelize_register");
const sequelizeEmail = require("../../../middle/sequelize/mail/sequelize_mail");

const output = {
  dupCheck: async (req, res) => {
    const email = req.params.checkId;
    try {
      const exUser = await Models.User.findOne({ attributes: ["email"], where: { email } });
      res.send(exUser);
    } catch (error) {
      console.log(error);
    }
  },

  companyCheck: async (req, res) => {
    const company = req.params.checkId;
    console.log("------------------");
    console.log("company : " + company);
    try {
      const exUser = await Models.UserMy.findOne({ attributes: ["cmpRgsNmb"], where: { cmpRgsNmb: company } });
      console.log("exUser : " + exUser);
      res.send(exUser);
    } catch (error) {
      console.log(error);
    }
  },

  LOGIN: async (req, res) => {
    res.render("common/mo/index");
  },

  MO_MN_MNP0001: async (req, res) => {
    res.render("common/mo/home/MO-MN-MNP0001", { user: req.user });
  },

  MO_CO_MEM0001: async (req, res) => {
    res.render("common/mo/home/MO-CO-MEM0001");
  },

  MO_CO_MEM0002: async (req, res) => {
    res.render("common/mo/home/MO-CO-MEM0002");
  },

  MO_CO_MEM0003: async (req, res) => {
    // -----------
    const { id } = req.params;
    // console.log(id);
    res.render("common/mo/home/MO-CO-MEM0003", { email: id });
  },

  MO_CO_LIN0002: async (req, res) => {
    res.render("common/mo/home/MO-CO-LIN0002");
  },

  MO_CO_LIN0005: async (req, res) => {
    res.render("common/mo/home/MO-CO-LIN0005");
  },

  MO_CO_LIN0006: async (req, res) => {
    res.render("common/mo/home/MO-CO-LIN0006");
  },

  MO_CO_LIN0007: async (req, res) => {
    const { id, token } = req.params;
    console.log(id);
    console.log(token);
    try {
      if (6 < id.length && 10 < token.length) {
        console.log(id);
        console.log(token);
        res.render("common/mo/home/MO-CO-LIN0007");
      } else {
        res.send("글자수가 짧다."); // Error 핸들링
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  },

  MO_CO_LIN0008: async (req, res) => {
    res.render("common/mo/home/MO-CO-LIN0008");
  },

  password: (req, res) => {
    res.render("auth/password");
  },

  resetPassword: (req, res, next) => {
    const { id, token } = req.params;
    try {
      if (10 < id.length && 10 < token.length) {
        console.log(id);
        console.log(token);
        res.render("auth/pwchange");
      } else {
        res.send("글자수가 짧다.");
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  },

  //  이메일 인증 토큰 값 , 완료 화면 리다이렉팅
  emailAuth: (req, res, next) => {
    console.log("값 확인 : " + req.param("id"));
    res.render("common/pc/home/PC-CO-MEM0099");
    return next();
  },

  emailAuthPassowrd: async (req, res, next) => {
    try {
      //
      console.log("값 확인 : " + req.param("id"));
      console.log(req);

      res.render("auth/pwchange");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/m/login");
  },
};

const process = {
  //  회원가입
  userRegister: async (req, res, next) => {
    const MY = "users";
    const Reason = "email";
    const { email_01, email_02, name_01, password } = req.body;

    const email = email_01 + "@" + email_02;
    try {
      const exUser = await Models.User.findOne({ where: { email } });
      if (exUser) {
        return res.redirect("/join?error=exist");
      }
      const hash = await bcrypt.hash(password, 12);
      const mailHash = await secret.auth.emailEncoding(email);

      console.log("ctrl 회원가입")
      await sequelizeRegester.sequelizeRegister.register(MY, userIp, email, name_01, hash, null, null, null, null);
      console.log("ctrl 토큰")
      await sequelizeEmail.sequelizeEmail.email(MY, email, Reason, mailHash);

      console.log("ctrl 이메일 폼")
      const { subject, html } = await Form.form.mailForm(email, mailHash, Reason);
      console.log("ctrl 이메일 전송")
      await handle_email.mail.EmailVerification(email, subject, html);
      console.log("ctrl 이메일 전송 완료")
      
      return res.redirect("/m/signup/result/" + email);

      // return next();
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },

  userEmail: async (req, res, next) => {
    const Reason = "email";
    const { email_01, email_02 } = req.body;

    const email = email_01 + "@" + email_02;
    const mailHash = await secret.auth.emailEncoding(email);

    console.log("----------------------------------");

    console.log(userIp);
    console.log(email);
    console.log(mailHash);
    console.log();
    console.log();
    console.log();
    console.log();

    console.log("----------------------------------");

    console.log("-------------시작 ------------");
    const emailAuth = await Models.User.findOne({ where: { email } });

    console.log("-------------종료 ------------");

    try {
      // const emailAuth = await Models.UserMy.findOne({ where: {  email } });
      // console.log(emailAuth)
      // if (emailAuth) {
      //   await Models.UserToken.create({
      //     mail: email,
      //     authKinds: Reason,
      //     emailAuth: "300",
      //     emailToken: mailHash,
      //     emailTime: sequelize.literal("CURRENT_TIMESTAMP"),
      //   });
      //   await handle_status.authChack.tokenLog(email, Reason);
      //   const { subject, html } = await Form.form.mailForm(email, mailHash, Reason);
      //   await handle_email.mail.EmailVerification(email, subject, html);
      //   // return res.redirect("/m/login");
      //   return res.redirect("/m/signup/result/" + email);
      // } else {
      //   res.status(404).send("no user");
      // }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  //  이메일 인증
  emailAuthChack: async (req, res, next) => {
    const emailFinalChack = await req.param("id");
    console.log("-----------------------------------");
    try {
      const { mail, authKinds } = await Models.UserToken.findOne({ where: { emailToken: emailFinalChack } });
      const { email } = await Models.UserMy.findOne({ where: { mail: mail } });

      // 유효기간 체크 후 에러처리도 해야함.
      if (mail) {
        // console.log(emailFinal);
        console.log(email);
        console.log(authKinds);
        if (authKinds == "email") {
          // email
          await handle_status.authChack.mailIsTure(email, authKinds, emailFinalChack);
          return res.redirect("/m/login");
        } else {
          // await handle_status.authChack.mailPassodTure(email, authKinds, emailFinalChack);
          // next()
          // return res.redirect("/");
          console.log(error.message);
          res.send(error.message);
        }
      } else {
        res.status(404).send("no user");
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  },

  // 이메일 재발송
  signupReMail: async (req, res, next) => {
    const { id } = req.params;
    try {
      const errorCode = 1;
      console.log(id);
      const Reason = "email";
      const { email } = await Models.UserMy.findOne({ where: { email: id } });
      if (email) {
        const realTime = new Date().getTime();
        const timeHash = await secret.auth.emailEncoding(Date.parse(realTime));
        console.log("timeHash : " + timeHash);

        await Models.UserToken.update(
          {
            authKinds: Reason,
            emailAuth: "300",
            emailToken: timeHash,
            emailTime: sequelize.literal("CURRENT_TIMESTAMP"),
          },
          { where: { mail: id } }
        );

        await Models.User.update(
          {
            status: "704",
          },
          { where: { email: id } }
        );

        await handle_status.authChack.tokenLog(id, Reason);
        // 이메일 해시로 변경해야함
        const { subject, html } = await Form.form.mailForm(id, timeHash, Reason);
        await handle_email.mail.EmailVerification(id, subject, html);
        res.render("common/mo/home/MO-CO-MEM0003", { email: id, errorCode: errorCode });
      }
    } catch (error) {
      const errorCode = 2;
      res.render("common/mo/home/MO-CO-MEM0003", { email: id, errorCode: errorCode });
    }
  },

  // 아이디 찾기
  // 사용자가 작성한 이메일 자체가 오류면 아이디가 없다고 뜸
  // 사용자가 작성한 이메일 주소는 존재하나 작성한 이름과 DB안의 이름이 다른 경우 잘못된 정보라고 뜸
  idFind: async (req, res, next) => {
    const { email_1, email_2, name_01 } = req.body;
    const confirm_mail = email_1 + "@" + email_2;

    try {
      const { nick, email } = await Models.User.findOne({ where: { email: confirm_mail } });

      if (nick == name_01 && email == confirm_mail) {
        // return next();
        res.render("common/mo/home/MO-CO-LIN0003", { email: confirm_mail });
      } else {
        const errorCode = 1;
        res.render("common/mo/home/MO-CO-LIN0002", { errorCode: errorCode });
      }
    } catch {
      const errorCode = 2;
      res.render("common/mo/home/MO-CO-LIN0002", { errorCode: errorCode });
    }
  },

  // 비밀번호 찾기
  password: async (req, res) => {
    const Reason = "pwFinds";
    const realTime = new Date().getTime();
    const { email_3, email_4, name_02 } = req.body;
    const emailChack = email_3 + "@" + email_4;

    try {
      const { mail } = await Models.UserMy.findOne({
        where: {
          email: emailChack,
          nick: name_02,
        },
      });
      const { nick, email } = await Models.User.findOne({ where: { email: emailChack } });
      if (nick == name_02 && email == emailChack) {
        const mailHash = await secret.auth.emailEncoding(mail);
        const timeHash = await secret.auth.emailEncoding(Date.parse(realTime));
        console.log("timeHash : " + timeHash);

        await Models.UserToken.update(
          {
            authKinds: Reason,
            emailAuth: "300",
            emailToken: timeHash,
            emailTime: sequelize.literal("CURRENT_TIMESTAMP"),
          },
          { where: { mail: mail } }
        );

        await Models.User.update(
          {
            status: "704",
          },
          { where: { email: email } }
        );

        await handle_status.authChack.tokenLog(mail, Reason);
        // 이메일 해시로 변경해야함
        const { subject, html } = await Form.form.mailForm(mail, timeHash, Reason);
        await handle_email.mail.EmailVerification(mail, subject, html);
        // return res.redirect("/m/forget/pw/result");
        res.render("common/mo/home/MO-CO-LIN0004");
      } else {
        const errorCode = 3;
        res.render("common/mo/home/MO-CO-LIN0002", { errorCode: errorCode });
      }
    } catch (error) {
      const errorCode = 3;
      res.render("common/mo/home/MO-CO-LIN0002", { errorCode: errorCode });
    }
  },

  resetPassword: async (req, res, next) => {
    console.log("-----------------------------");
    const Reason = "token_expiration";
    const realTime = new Date().getTime();
    const ttl = 24 * 60 * 60 * 1000; // 24hour

    const { id, token } = req.params;
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const mailHashDecode = id; //await secret.auth.emailDecoding(id);

    const { mail } = await Models.UserMy.findOne({ where: { mail: mailHashDecode } });

    const { emailTime } = await Models.UserToken.findOne({
      where: {
        mail,
        emailToken: token,
      },
    });
    const emailTimeValue = (await Date.parse(emailTime)) + ttl;

    // console.log("Reason------------------" + Reason);
    // console.log("realTime----------------" + realTime);
    // console.log("ttl---------------------" + ttl);
    // console.log("id----------------------" + id);
    // console.log("token-------------------" + token);
    // console.log("password----------------" + password);
    // console.log("hash--------------------" + hash);
    // console.log("mailHashDecode----------" + mailHashDecode);
    // console.log("mail--------------------" + mail);
    // console.log("emailTime---------------" + emailTime);
    // console.log("emailTimeValue----------"+emailTimeValue)
    // console.log("----------------");

    try {
      if (realTime < emailTimeValue) {
        // 기존 비밀번호와 동일한지 체크하는 기능 필요
        await Models.UserPwCh.create({
          email: mailHashDecode,
          mail,
          password: hash,
          connectIp: userIp,
        });

        await Models.User.update(
          {
            password: hash,
          },
          { where: { email: mailHashDecode } }
        );
        return res.redirect("/m/forget/reset/result");
      } else if (realTime > emailTimeValue) {
        console.log("------------ timeChack Fail ------------");
        await handle_status.authChack.tokenLog(emailChack, Reason);
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  },

  login: (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.error(authError);
        res.send(loginError.message);
      }
      if (!user) {
        const errorCode = info.message;
        console.log(errorCode);
        return res.render("common/mo/index", { errorCode: errorCode });
      }
      return req.login(user, async (loginError) => {
        if (loginError) {
          console.log(loginError.message);
          res.send(loginError.message);
        }
        await handle_status.authChack.loginLog(user.email);
        return next();
      });
    })(req, res, next);
  },

  statusCheck: async (req, res, next) => {
    const { status, email } = await req.user;
    const { authKinds } = await Models.UserToken.findOne({ where: { mail: email } });
    const { nick } = await Models.User.findOne({ where: { email: email } });
    console.log("-------------------------------------------------");
    console.log(email);
    console.log(status);
    console.log(nick);
    console.log(authKinds);
    console.log("-------------------------------------------------");
    try {
      if (status == "700") {
        return res.redirect("/m/home");
      } else if (status == "704") {
        console.log("704");
        await handle_status.authChack.statusLoginToken(email);
        return res.redirect("/m/signup/result/" + email);
        // return res.send("이메일인증받으쇼"); // 일단 임시
      } else {
        console.log("statusCheck : 알 수 없는 문제");
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
