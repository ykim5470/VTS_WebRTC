const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Models = require("../../models");

module.exports = () => {
  passport.use(
    new LocalStrategy({ 
      usernameField: "email", 
      passwordField: "password",
      session: "true",
      passReqToCallback: true,
    }, async (req, email, password, done) => {
      try {

        const exUser = await Models.User.findOne({ where: { email }});

        const sessUser = await Models.User.findOne({ 
          where: { email },
          attributes: {
            exclude: [
              'password',
              'provider',
              'snsId',
              'createdAt',
              'updatedAt',
              'deletedAt'
            ]
          }
        });

        if (exUser) {
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
              done(null, sessUser.dataValues); // 검증성공
          } else {
            // 비밀번호 일치하지 않음 
            done(null, false, { message: 1 });
          }
        } else {
          // 아이디가 일치하지 않음
          done(null, false, { message: 2 });
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    })
  );
};
