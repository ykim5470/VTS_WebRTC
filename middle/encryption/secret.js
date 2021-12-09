const crypter = require("./secretmodule");
const secretKey = "Sammy"; // 복호키

const auth = {
  emailEncoding: async (email) => {
    const reg = /[+\/\\]/gi;
    try {
      //특수문자 검증
      var sum = 0;
      for (var i = 0; i < 999; i++) {
        let str = crypter.secretModule.encrypt(email, secretKey);

        if (reg.test(str)) {
          // 특수문자 제거후 리턴
          sum += i;
          console.log("특수문자 : " + str);
        } else {
          if (reg.test(str)) {
            sum += i;
            console.log("특수문자 : " + str);
          } else {
            // 특수문자가 없으므로 본래 문자 리턴
            console.log("특수문자없음 : " + str);
            return str;
          }
        }
      }
    } catch (error) {
      console.error();
      return error;
    }
  },
  emailDecoding: async (email) => {
    try {
      //
      const dec = crypter.secretModule.decrypt(email, secretKey);
      return dec;
    } catch (error) {
      console.error();
      return error;
    }
  },
};

module.exports = {
  auth,
};
