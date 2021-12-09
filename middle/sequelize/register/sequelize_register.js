const Models = require("../../../models");

const sequelizeRegister = {
  register: async (MY, connectIp, email, nick, password, gender, l_birthday, ph_num, guideLicense) => {
    console.log("회원가입");
    console.log(MY);
    console.log(connectIp);
    console.log(email);
    console.log(nick);
    console.log(password);
    console.log(gender);
    console.log(l_birthday);
    console.log(ph_num);
    console.log(guideLicense);

    if (MY == "users") {
      console.log("유저 생성");
      await Models.User.create({
        email,
        nick,
        password,
        auth: 0,
        status: 700,
      });
      console.log("마이페이지 생성");
      await Models.UserMy.create({
        email,
        mail: email,
        nick,
        guideLicense,
        gender,
        l_birthday,
        ph_num,
      });
      console.log("비밀번호 기록");
      await Models.UserPwCh.create({
        email,
        mail: email,
        password,
        connectIp,
      });
      console.log("회원가입 완료");
      return "완료";
      // const UserMy = {
      //   html: ``,
      // };
    } else if (MY == "guide") {
      console.log("유저 생성");
      await Models.User.create({
        email,
        nick,
        password,
        auth: 121,
        status: 700,
        confirm: 10,
      });
      console.log("마이페이지 생성");
      await Models.UserMy.create({
        email,
        mail: email,
        nick,
        guideLicense,
        gender,
        l_birthday,
        ph_num,
      });
      console.log("비밀번호 기록");
      await Models.UserPwCh.create({
        email,
        mail: email,
        password,
        connectIp,
      });
      console.log("회원가입 완료");
      return "완료";
    }
    // else if (MY == "store") {
    //   // return Fails;
    // } else if (MY == "store_") {
    //   // return Fails;
    // }
  },
};

module.exports = {
  sequelizeRegister,
};
