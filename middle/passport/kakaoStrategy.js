const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const Models = require("../../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await Models.User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          const sessUser = await Models.User.findOne({ 
            where: { snsId: profile.id, provider: "kakao" },
            attributes: {
              exclude: [
                'password',
                'provider',
                'snsId',
                'confirm',
                'status',
                'createdAt',
                'updatedAt',
                'deletedAt'
              ]
            }
          });
          if (exUser) {
            done(null, sessUser.dataValues);
          } else {
            const newUser = await Models.User.create({
              email: profile._json && profile._json.kakao_account.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
              auth: "0",
              status: "700",
            });
            const newUserMy = await Models.UserMy.create({
              email: profile._json && profile._json.kakao_account.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
              gender: profile._json.kakao_account.gender,
              k_birthday: profile._json.kakao_account.birthday,
              k_age: profile._json.kakao_account.age_range,
              profile_image: profile._json.properties.profile_image,
            });
            done(null, newUser, newUserMy);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
