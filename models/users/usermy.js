const Sequelize = require("sequelize");

module.exports = class UserMy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        provider: {
          // local=로컬, kakao=카카오
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        email: {
          // Local email
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        snsId: {
          // Kakao 고유 ID
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        mail: {
          // 추가 mail
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        nick: {
          // 사용자 이름
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        cmpRgsName: {
          // 회사명
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        cmpRgsNmb: {
          // 사업자 등록 번호
          type: Sequelize.STRING(12),
          allowNull: true,
        },
        guideLicense: {
          // 
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        gender: {
          // 성별
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        l_birthday: {
          // Local 생일 (1993/12/02)
          type: Sequelize.DATE,
          allowNull: true,
        },
        k_birthday: {
          // kakao 생일 (1202)
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        l_age: {
          // Local 나이(29)
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        k_age: {
          // kakao 나이 (20~29)
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        profile_image: {
          // 프로필 이미지
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        ph_num: {
          // 핸드폰 전화번호
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserMy",
        tableName: "userMy",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
