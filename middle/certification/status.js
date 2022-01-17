
const Models = require("../../models");

const authChack = {
  statusLoginToken: async (email) => {
    const userToken = await Models.UserToken.findOne({ where: { mail: email } });
    try {
      const authKinds = await userToken.authKinds;
      if (authKinds == "pwFails") {
        // 비밀번호 실패로 인증 필요(LoginPage)
        console.log(`비밀번호 실패로 인증 필요`);
        console.log(`authKinds : ${authKinds}`);
        return res.redirect("/home");
      } else if (authKinds == "pwFinds") {
        // 비밀번호 찾기 위해 인증 필요(LoginPage)
        console.log(`비밀번호를 찾기 위해 인증 필요`);
        console.log(`authKinds : ${authKinds}`);
        return res.redirect("/home");
      } else if (authKinds == "pwChange") {
        // 비밀번호 변경을 위해 인증 필요(MyPage)
        console.log(`비밀번호 변경을 위해 인증 필요`);
        console.log(`authKinds : ${authKinds}`);
        return res.redirect("/home");
      } else if (authKinds == "email") {
        // 이메일 인증 필요
        console.log(`이메일 인증 필요`);
        console.log(`authKinds : ${authKinds}`);
        return res.redirect("/home");
      } else if (authKinds == "dormant") {
        // 휴먼 인증 필요
        console.log(`휴먼 인증 필요`);
        console.log(`authKinds : ${authKinds}`);
        return res.redirect("/home");
      } else if (authKinds == "Withdrawal") {
        // 탈퇴
        console.log(`탈퇴`);
        console.log(`authKinds : ${authKinds}`);
      } else {
        return "LoginChack";
      }
    } catch (error) {
      console.error();
      return error;
    }
  },
  mailIsTure: async (email, authKinds, emailFinalChack) => {
    try {
      console.log("email : " + email);
      console.log("authKinds : " + authKinds);
      console.log("emailemailemailemailemailemailemailemailemail");
      await Models.UserToken.update({ emailAuth: 399 }, { where: { emailToken: emailFinalChack } });
      console.log("UserToken update END");
      await Models.User.update({ status: 700 }, { where: { email: email } });
      console.log("User update END");
    } catch (error) {
      console.error();
      return error;
    }
  },
  mailPassodTure: async () => {
    console.log("elseelseelseelseelseelseelseelseelseelseelseelseelse");
    try {
      ///
      if (authKinds == "pwFinds") {
        //
        console.log("  authKinds  :  " + authKinds);
      } else if (authKinds == "pwFails") {
        //
        console.log("  authKinds  :  " + authKinds);
      } else if (authKinds == "pwChange") {
        //
        console.log("  authKinds  :  " + authKinds);
      } else if (authKinds == "dormant") {
        //
        console.log("  authKinds  :  " + authKinds);
      } else if (authKinds == "Withdrawal") {
        //
        console.log("  authKinds  :  " + authKinds);
      } else if (authKinds == "email") {
        // 임시
        //
        console.log("  authKinds  :  " + authKinds);
      }
    } catch (error) {
      console.error();
      return error;
    }
  },
  loginLog: async (email) => {
    try {
      const log = await Models.ZLog.create({
        email: email,
        ip: userIp,
        osName: userDevice.os.name,
        osVersion: userDevice.os.version,
        deviceType: userDevice.device.type,
        deviceVendor: userDevice.device.vendor,
        deviceModel: userDevice.device.model,
        browserName: userDevice.browser.name,
        browserVersioon: userDevice.browser.version,
        browserMajor: userDevice.browser.major,
        engineName: userDevice.engine.name,
        engineVersion: userDevice.engine.version,
        cpuArchitecture: userDevice.cpu.architecture,
      });
    } catch (error) {
      console.error();
      return error;
    }
  },
  tokenLog: async (mail, Reason) => {
    try {
      const log = await Models.UserTokenLog.create({
        mail: mail,
        authKinds: Reason,
      });
    } catch (error) {
      console.error();
      return error;
    }
  },
};

module.exports = {
  authChack,
  process,
};
