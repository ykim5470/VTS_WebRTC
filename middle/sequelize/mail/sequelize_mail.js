const { sequelize } = require("../../../models");
const Models = require("../../../models");

const sequelizeEmail = {
  email: async ( MY, email, Reason, mailHash ) => {
    console.log("MY"+MY)
    console.log("email"+email)
    console.log("Reason"+Reason)
    console.log("mailHash : "+mailHash)

    console.log("메일 토큰 등록 시작")
    const { mail } = await Models.User.findOne({ where: { email } });
    console.log("mail : "+ mail)

    console.log("토큰 생성")
    await Models.UserToken.create({
      mail,
      authKinds: Reason,
      emailAuth: 300,
      emailToken: mailHash,
      emailTime: sequelize.literal("CURRENT_TIMESTAMP"),
    });
    
    console.log("토큰 로그 생성")
    await Models.UserTokenLog.create({
      mail,
      authKinds: Reason,
    });

    console.log("유저 상태 변경")
    await Models.User.update(
      {
        status: 704,
      },
      { where: { email } }
    );

    console.log("토큰 등록 완료")
    // if (MY == "users") {
    //   const Users = ""
    //   return "완료"
    // } else if (MY == "guide") {
    //   return Fails;
    // } else if (MY == "store") {
    //   return Fails;
    // } else if (MY == "store_") {
    //   return Fails;
    // }
  },
};

module.exports = {
  sequelizeEmail,
};
