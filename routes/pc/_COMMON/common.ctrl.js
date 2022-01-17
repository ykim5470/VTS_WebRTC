const passport = require("passport");
const bcrypt = require("bcrypt");
const Models = require("../../../models");
const handle_status = require("../../../middle/certification/status");
const handle_email = require("../../../middle/mail/mail");
const { sequelize } = require("../../../models");
const secret = require("../../../middle/encryption/secret");
const Form = require("../../../middle/mail/form");
const { Op } = require("sequelize");
const { createCipher } = require("crypto");

const output = {
  main: async (req, res) => {
    res.render("common/pc/index", { user: req.user });
  },

  PC_CO_KWP0001: async (req, res) => {
    res.render("common/pc/home/PC-CO-KWP0001", { user: req.user });
  },

  PC_CO_KWP0002: async (req, res) => {
    res.render("common/pc/home/PC-CO-KWP0002", { user: req.user });
  },

  PC_CO_LIN0001: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0001", { user: req.user });
  },

  PC_CO_LIN0004: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0004", { user: req.user });
  },

  PC_CO_LIN0005: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0005", { user: req.user });
  },

  PC_CO_LIN0006: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0006", { user: req.user });
  },

  PC_CO_LIN0007: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0007", { user: req.user });
  },

  PC_CO_LIN0008: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0008", { user: req.user });
  },

  // PC_CO_LIN0009: async (req, res) => {
  //   res.render("common/pc/home/PC-CO-LIN0009");
  // },

  // PC_CO_LIN0010: async (req, res) => {
  //   res.render("common/pc/home/PC-CO-LIN0010");
  // },

  PC_CO_MEM0001: async (req, res) => {
    res.render("common/pc/home/PC-CO-MEM0001", { user: req.user });
  },

  // PC_CO_MEM0004: async (req, res) => {
  //   res.render("common/pc/home/PC-CO-MEM0004");
  // },

  PC_CO_MEM0005: async (req, res) => {
    const { id } = req.params;

    console.log("id : " + id);
    res.render("common/pc/home/PC-CO-MEM0005", { user: req.user });
  },

  // PC_CO_MEM0006: async (req, res) => {
  //   res.render("common/pc/home/PC-CO-MEM0006");
  // },

  // PC_CO_MEM0007: async (req, res) => {
  //   res.render("common/pc/home/PC-CO-MEM0007");
  // },

  // PC_CO_MLP0001: async (req, res) => {
  //   res.render("common/pc/home/PC-CO-MLP0001");
  // },

  PC_CO_TER0001: async (req, res) => {
    res.render("common/pc/home/PC-CO-TER0001", { user: req.user });
  },

  PC_CO_TER0002: async (req, res) => {
    res.render("common/pc/home/PC-CO-TER0002", { user: req.user });
  },

  PC_CO_TER0003: async (req, res) => {
    res.render("common/pc/home/PC-CO-TER0003", { user: req.user });
  },

  PC_CO_CON0001: async (req, res) => {
    res.render("common/pc/home/PC-CO-CON0001", { user: req.user });
  },

  PC_CO_CON0002: async (req, res) => {
    res.render("common/pc/home/PC-CO-CON0002", { user: req.user });
  },

  home: async (req, res) => {
    res.render("home/main", { user: req.user });
  },

  profile: (req, res) => {
    res.render("home/profile", { user: req.user });
  },

  // write: (req, res) => {
  //   res.render("write/write");
  // },

  // login: (req, res) => {
  //   res.render("auth/login");
  // },

  // register: (req, res) => {
  //   res.render("auth/register");
  // },

  // password: (req, res) => {
  //   res.render("auth/password");
  // },

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

  emailAuth: (req, res, next) => {
    console.log("값 확인 : " + req.param("id"));
    res.render("common/pc/home/PC-CO-MEM0099");
    return next();
  },

  // emailAuthPassowrd: async (req, res, next) => {
  //   try {
  //     //
  //     console.log("값 확인 : " + req.param("id"));
  //     console.log(req);

  //     res.render("auth/pwchange");
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
  // },

  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  },

  // kakaoCallback: (req, res) => {
  //   res.redirect("/");
  // },

  device: async (req, res) => {
    res.render("common/pc/common/device/device");
  },
};

const process = {
  // guideRegister: async (req, res, next) => {
  //   console.log("================================");
  //   console.log(req.file);
  //   console.log(req.file.filename);
  //   console.log("================================");
  //   const { year, month, day, gender, ph_num } = req.body;
  //   console.log("year : " + year);
  //   console.log("month : " + month);
  //   console.log("day : " + day);
  //   console.log("gender : " + gender);
  //   console.log("ph_num : " + ph_num);
  //   const l_birthday = `${year}-${month}-${day}`;

  //   console.log("================================");

  //   const { email_01, email_02, name_01, password } = req.body;
  //   console.log(email_01);
  //   console.log(email_02);
  //   console.log(name_01);
  //   console.log(password);
  //   const email = email_01 + "@" + email_02;

  //   const image = `/uploads/GUIDE/license/${req.file.filename}`;

  //   try {
  //     const exUser = await Models.User.findOne({ where: { email } });
  //     if (exUser) {
  //       return res.redirect("/join?error=exist");
  //     }
  //     const hash = await bcrypt.hash(password, 12);
  //     await Models.User.create({
  //       email,
  //       nick: name_01,
  //       password: hash,
  //       auth: "121",
  //       status: "704",
  //       confirm: "10",
  //     });
  //     await Models.UserMy.create({
  //       email,
  //       mail: email,
  //       nick: name_01,
  //       guideLicense: image,
  //       gender: gender,
  //       l_birthday,
  //       ph_num,
  //     });

  //     await Models.UserPwCh.create({
  //       email,
  //       mail: email,
  //       password: hash,
  //       connectIp: userIp,
  //     });

  //     return next();
  //   } catch (error) {
  //     console.error(error);
  //     return next(error);
  //   }
  // },

  // guideEmail: async (req, res, next) => {
  //   const Reason = "email";
  //   const { email_01, email_02 } = await req.body;
  //   const emailChack = (await email_01) + "@" + email_02;
  //   const mailHash = await secret.auth.emailEncoding(emailChack);
  //   try {
  //     const emailAuth = await Models.UserMy.findOne({ where: { mail: emailChack } });
  //     if (emailAuth) {
  //       await Models.UserToken.create({
  //         mail: emailChack,
  //         authKinds: Reason,
  //         emailAuth: "300",
  //         emailToken: mailHash,
  //         emailTime: sequelize.literal("CURRENT_TIMESTAMP"),
  //       });

  //       await handle_status.authChack.tokenLog(emailChack, Reason);
  //       const { subject, html } = await Form.form.mailForm(emailChack, mailHash, Reason);
  //       await handle_email.mail.EmailVerification(emailChack, subject, html);
  //       res.render("common/pc/home/PC-CO-MEM0005", { email: emailChack, use: "여행전문가이드" });
  //     } else {
  //       res.status(404).send("no user");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
  // },

  // ----------------------------------------------------------------
  // 재발송용 if 가이드, 판매자 추가 메일들도 만들어야 함.
  // 메일 도착하지 않았을 때 재발송
  signupReMail: async (req, res, next) => {
    const { id } = req.params;
    console.log("-----------------------------------");
    try {
      const errorCode = 1;
      console.log(id);
      const Reason = "email";
      const { email } = await Models.UserMy.findOne({ where: { mail: id } });
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
        res.render("common/pc/home/PC-CO-MEM0005", { email: id, errorCode: errorCode });
      }
    } catch (error) {
      const errorCode = 2;
      console.log(errorCode);
      res.render("common/pc/home/PC-CO-MEM0005", { email: id, errorCode: errorCode });
    }
  },

  emailAuthChack: async (req, res, next) => {
    const emailFinalChack = await req.param("id");
    console.log("-----------------------------------");
    try {
      const { mail, authKinds } = await Models.UserToken.findOne({ where: { emailToken: emailFinalChack } });
      console.log("mail : "+mail)
      console.log("authKinds : "+authKinds)

      // 유효기간 체크 후 에러처리도 해야함.
      if (mail) {
        const { email } = await Models.UserMy.findOne({ where: { mail: mail } });
        console.log("email : "+email);
        if (authKinds == "email") {
          // email
          await handle_status.authChack.mailIsTure(email, authKinds, emailFinalChack);
          // return res.redirect("/");
          console.log("확인확인확인확인확인확인확인확인확인")
        } else {
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

  // guidelogin: (req, res, next) => {
  //   passport.authenticate("local", (authError, user, info) => {
  //     if (authError) {
  //       console.error(authError);
  //       res.send(loginError.message);
  //     }
  //     if (!user) {
  //       const errorCode = info.message;
  //       console.log(errorCode);
  //       return res.render("common/pc/home/PC-CO-LIN0001", { errorCode: errorCode });
  //     }
  //     return req.login(user, async (loginError) => {
  //       if (loginError) {
  //         console.log(loginError.message);
  //         res.send(loginError.message);
  //       }
  //       await handle_status.authChack.loginLog(user.email);
  //       return next();
  //     });
  //   })(req, res, next);
  // },

  idFind: async (req, res, next) => {
    const { email_01, email_02, name_01 } = req.body;
    const confirm_mail = email_01 + "@" + email_02;

    try {
      const { nick, email } = await Models.User.findOne({ where: { email: confirm_mail } });

      if (nick == name_01 && email == confirm_mail) {
        res.render("common/pc/home/PC-CO-LIN0005", { email: confirm_mail });
      } else {
        const errorCode = 1;
        res.render("common/pc/home/PC-CO-LIN0004", { errorCode: errorCode });
      }
    } catch {
      const errorCode = 2;
      res.render("common/pc/home/PC-CO-LIN0004", { errorCode: errorCode });
    }
  },

  statusCheck: async (req, res, next) => {
    const { status, email, confirm, auth } = await req.user;
    const { authKinds } = await Models.UserToken.findOne({ where: { mail: email } });
    const { nick } = await Models.User.findOne({ where: { email: email } });
    console.log("-------------------------------------------------");
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

  password: async (req, res) => {
    const Reason = "pwFinds";
    const realTime = new Date().getTime();
    const { email_03, email_04, name_02 } = req.body;
    const emailChack = email_03 + "@" + email_04;

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
        return res.redirect("/forget/pw/result");
      } else {
        const errorCode = 3;
        res.render("common/pc/home/PC-CO-LIN0004", { errorCode: errorCode });
      }
    } catch (error) {
      const errorCode = 3;
      res.render("common/pc/home/PC-CO-LIN0004", { errorCode: errorCode });
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
        return res.redirect("/forget/reset/result");
      } else if (realTime > emailTimeValue) {
        console.log("------------ timeChack Fail ------------");
        await handle_status.authChack.tokenLog(emailChack, Reason);
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  },
};

module.exports = {
  output,
  process,
};
